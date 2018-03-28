'use strict';

/**
 * @ngdoc function
 * @name app.controller:AppCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */
angular.module('app')
    .controller('AppCtrl', ['$scope',
        '$localStorage',
        '$window', '$document',
        '$location', '$rootScope',
        '$timeout', '$mdSidenav',
        '$mdColorPalette', '$anchorScroll',
        '$mdToast', '$state', 'restClService',
        function ($scope, $localStorage, $window, $document, $location, $rootScope, $timeout, $mdSidenav, $mdColorPalette, $anchorScroll, $mdToast, $state, restClService) {
            // add 'ie' classes to html
            var isIE = !!navigator.userAgent.match(/MSIE/i) || !!navigator.userAgent.match(/Trident.*rv:11\./);
            isIE && angular.element($window.document.body).addClass('ie');
            isSmartDevice($window) && angular.element($window.document.body).addClass('smart');
            // config
            $scope.app = {
                name: 'Aguas OK',
                version: '0.1.0',
                // for chart colors
                color: {
                    primary: '#03A9F4',
                    info: '#2196f3',
                    success: '#4caf50',
                    warning: '#ffc107',
                    danger: '#f44336',
                    accent: '#536DFE',
                    white: '#ffffff',
                    light: '#B3E5FC',
                    dark: '#0288D1'
                },
                setting: {
                    theme: {
                        primary: 'light-blue',
                        accent: 'indigo-A200',
                        warn: 'amber'
                    },
                    asideFolded: false
                },
                search: {
                    content: '',
                    show: false
                }
            }

            $scope.user = {
              name: '',
              email: ''
            };
            restClService.getClientInformation().then(
              function (response) {
                $scope.user.name = response.data.full_name;
                $scope.user.email = response.data.mail;
              }
            );

            $rootScope.$on('loggedIn', function () {
              console.info('Refrescar datos del usuario en el menu');
              restClService.getClientInformation().then(
                function (response) {
                  $scope.user.name = response.data.full_name;
                  $scope.user.email = response.data.mail;
                }
              );
            }, true);

            $rootScope.$on('mapInitialized', function (evt, map) {
                $rootScope.map = map;
                $rootScope.$apply();
            });

            $scope.setTheme = function (theme) {
                $scope.app.setting.theme = theme;
            }

            // save settings to local storage
            if (angular.isDefined($localStorage.appSetting)) {
                $scope.app.setting = $localStorage.appSetting;
            } else {
                $localStorage.appSetting = $scope.app.setting;
            }
            $scope.$watch('app.setting', function () {
                $localStorage.appSetting = $scope.app.setting;
            }, true);

            function isSmartDevice($window) {
                // Adapted from http://www.detectmobilebrowsers.com
                var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
                // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
            };

            $scope.getColor = function (color, hue) {
                if (color == "bg-dark" || color == "bg-white") return $scope.app.color[color.substr(3, color.length)];
                return rgb2hex($mdColorPalette[color][hue]['value']);
            }

            //Function to convert hex format to a rgb color
            function rgb2hex(rgb) {
                return "#" + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
            }

            function hex(x) {
                var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
                return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
            }

            $rootScope.$on('$stateChangeSuccess', openPage);

            function openPage() {
                $scope.app.search.content = '';
                $scope.app.search.show = false;
                $scope.closeAside();
                // goto top
                $location.hash('view');
                $anchorScroll();
                $location.hash('');
            }

            $scope.goBack = function () {
                $window.history.back();
            }

            $scope.openAside = function () {
                $timeout(function () {
                    $mdSidenav('aside').open();
                });
            }
            $scope.closeAside = function () {
                $timeout(function () {
                    $document.find('#aside').length && $mdSidenav('aside').close();
                });
            }

            $scope.showCustomToast = function (data) {
                var toastClass;
                switch (data.type) {
                    case "SUCCESS":
                        toastClass = "success";
                        break;
                    case "ERROR":
                        toastClass = "error";
                        break;
                    case "INFO":
                        toastClass = "info";
                        break;
                    case "WARNING":
                        toastClass = "warning";
                        break;
                }
                ;

                $mdToast.show({
                    hideDelay: data.time,
                    position: 'bottom center',
                    controller: 'ToastCtrl',
                    templateUrl: 'toast-template.html',
                    locals: {
                        data: data
                    },
                    toastClass: toastClass
                });
            };

            $scope.logout = function () {
                // remove user from local storage and clear http auth header
                $localStorage.currentUserWeb = {
                    email: "",
                    isLogged: false
                };
                $state.transitionTo("access.signin");
                event.preventDefault();
            }
            $rootScope.$on("changingCart", function () {
                $scope.total = 0;
                $scope.badgeCart = 0;
                $scope.cart = $localStorage.cart;
                $scope.isItemOnCart = false;
                $scope.validate = $scope.cart.length;
                if ($scope.validate >= 1) {
                    $scope.isItemOnCart = true;

                    angular.forEach($localStorage.cart, function (data) {
                        $scope.total = (parseInt($scope.total) + parseInt(data.discount)).toFixed(2);
                        $scope.badgeCart =  $scope.badgeCart + data.count;
                    })
                }
            });
            document.addEventListener("backbutton", function(e){
              console.log('ABC');
              if ( ($location.absUrl() && $location.absUrl().includes("signin")) ||
                  ($location.absUrl() && $location.absUrl().includes("categorias")) )
                navigator.app.exitApp();
              else
                navigator.app.backHistory();
            }, false);
        }
    ])
    .controller('ToastCtrl', function ($scope, $mdToast, data) {
        $scope.data = data;
        $scope.closeToast = function () {
            $mdToast.hide()
        };
    });
