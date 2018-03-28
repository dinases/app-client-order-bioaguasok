/**
 * Created by David Batista on 9/9/2017.
 */
app.controller('productsCtrl', ['$scope', '$state', '$localStorage', '$rootScope', 'cartService', 'productService',
    function ($scope, $state, $localStorage, $rootScope, cartService, productService) {
        $scope.products = [];
        $scope.productTotalDiscount = 0;

        $scope.updateQnt = function (counter, p) {
            cartService.addProduct(counter, p);
        };

        $scope.addProduct = function (counter, p) {
            var data = {type: "SUCCESS", message: "Producto añadido correctamente..", time: 3000};
            $scope.showCustomToast(data);
            cartService.addProduct(counter, p);
        };

        $scope.deleteProduct = function (p) {
            var data = {type: "ERROR", message: "Se elimino correctamente el producto.", time: 3000};
            $scope.showCustomToast(data);
            cartService.deleteProduct(p);
        };

        productService.listProduct(function (data) {
            $scope.products = data;
            for (var i = 0; i < $scope.products.length; i++) {
              console.log('PRODUCT CODE: ' + $scope.products[i].id);
              var product = cartService.filtrar($scope.products[i].id);
              console.log('PRODUCT FILTERED : ' + JSON.stringify(product));
              if (product) {
                console.log('PRODUCTO ENCONTRADO YA EN CARRITO' + JSON.stringify(product));
                //$scope.products[i].state = true;
                //$scope.products[i].count = product.count;
                $scope.products[i] = product;
              }
            }
            $scope.$apply();
        });

        $scope.productDiscount = function (price, discount) {
            if (discount === "" || discount === null || discount === 0) {
                $scope.productTotalDiscount = 0;
            } else {
                $scope.productTotalDiscount = (price - discount).toFixed(2);
            }
            return $scope.productTotalDiscount;
        };

        $scope.isDiscountAviable = function (discount) {
            if (discount === "" || discount === null || discount === 0) {
                return false;
            } else {
                return true;
            }
        };

        $rootScope.$on("cleanProducts", function () {
            angular.forEach($scope.products,function (item) {
                item.state = false;
                item.count = 1;
            })
        });

    }])
;
