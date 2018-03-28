/**
 * Created by ALEXIS ARDAYA on 13/9/2017.
 */
app.controller('cartCtrl', ['$scope', '$state', '$localStorage', '$rootScope', 'cartService', function ($scope, $state, $localStorage, $rootScope, cartService) {

    $scope.updateQnt = function (counterProduct, p) {
        cartService.addProduct(counterProduct, p);
    };

    $scope.cart = [];

    cartService.listCart(function (data) {
        $scope.cart = data;
    });

    $scope.priceTotal = function () {
        var total = 0;
        angular.forEach($scope.cart, function (item) {
            if (item.discount === null || item.discount === "" || item.discount === 0) {
                total = total + (item.price * item.count);
            } else {
                total = total + (item.count * (item.price - item.discount));
            }
        });

        return total;
    };

    $scope.deleteProduct = function (item) {
        var data = {type: "ERROR", message: "Se elimino correctamente el producto.", time: 8000};
        $scope.showCustomToast(data);
        cartService.deleteProduct(item);
    };

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
    }

    $scope.buyProducts = function () {
        cartService.buy();
        var data = {type: "SUCCESS", message: 'Registro exitoso!!! Le enviamos un correo con el detalle de su pedido.', time: 6000};
        $scope.showCustomToast(data);
        $state.go('app.categories');
    }
}])
;