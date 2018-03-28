/**
 * Created by ALEXIS ARDAYA on 15/9/2017.
 */
angular.module('revolunet.stepper', [])

    .directive('rnStepper', function () {
        return {
            restrict: "AE",
            require: "ngModel",
            scope: {
                min: "=",
                max: "=",
                ngModel: "="
            },
            template: '<div class="spinner-buttons input-group-btn"><button ng-click="decrement();" ng-disabled="isOverMin()"  class="btn spinner-down" type="button">- </button></div>' +
            '<input ng-model="ngModel" type="number" style="text-align: center;"  ng-keypress="onlyNumbers($event)"  class="spinner-input form-control"/>' +
            '<div class="spinner-buttons input-group-btn"><button ng-click="increment();" ng-disabled="isOverMax()" class="btn spinner-down" type="button">+ </button></div>',
            link: function (scope, iElement, iAttrs, ngModelController) {

                scope.label = '';

                scope.onlyNumbers = function (event) {
                    var keys = {
                        'up': 38, 'right': 39, 'down': 40, 'left': 37,
                        'escape': 27, 'backspace': 8, 'tab': 9, 'enter': 13, 'del': 46,
                        '0': 48, '1': 49, '2': 50, '3': 51, '4': 52, '5': 53, '6': 54, '7': 55, '8': 56, '9': 57
                    };
                    for (var index in keys) {
                        if (!keys.hasOwnProperty(index)) continue;
                        if (event.charCode === keys[index] || event.keyCode === keys[index]) {
                            return; //default event
                        }
                    }
                    event.preventDefault();
                };

                if (angular.isDefined(iAttrs.label)) {
                    iAttrs.$observe('label', function (value) {
                        scope.label = ' ' + value;
                        ngModelController.$render();
                    });
                }

                ngModelController.$render = function () {
                    // update the validation status
                    checkValidity();
                };

                // when model change, cast to integer
                ngModelController.$formatters.push(function (value) {
                    return parseInt(value, 10);
                });

                // when view change, cast to integer
                ngModelController.$parsers.push(function (value) {
                    return parseInt(value, 10);
                });
                scope.$watch(function () {
                    return ngModelController.$modelValue;
                }, function (newValue, oldval) {
                    if (newValue !== oldval) {
                        scope.$eval(iAttrs.ngChange);
                    }
                });

                function checkValidity() {
                    // check if min/max defined to check validity
                    var valid = !(scope.isOverMin(true) || scope.isOverMax(true));
                    // set our model validity
                    // the outOfBounds is an arbitrary key for the error.
                    // will be used to generate the CSS class names for the errors
                    ngModelController.$setValidity('outOfBounds', valid);
                }

                function updateModel(offset) {
                    // update the model, call $parsers pipeline...
                    ngModelController.$setViewValue(ngModelController.$viewValue + offset);
                    // update the local view
                    ngModelController.$render();
                }

                scope.isOverMin = function (strict) {
                    var offset = strict ? 0 : 1;
                    return (angular.isDefined(scope.min) && (ngModelController.$viewValue - offset) < parseInt(scope.min, 10));
                };
                scope.isOverMax = function (strict) {
                    var offset = strict ? 0 : 1;
                    return (angular.isDefined(scope.max) && (ngModelController.$viewValue + offset) > parseInt(scope.max, 10));
                };


                // update the value when user clicks the buttons
                scope.increment = function () {
                    updateModel(+1);
                };
                scope.decrement = function () {
                    updateModel(-1);
                };

                // check validity on start, in case we're directly out of bounds
                checkValidity();

                // watch out min/max and recheck validity when they change
                scope.$watch('min+max', function () {
                    checkValidity();
                });
            }
        }
    });
