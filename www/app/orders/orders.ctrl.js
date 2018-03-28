/**
 * Created by MILTON CHAMBI on 16/11/2017.
 */
app.controller('ordersCtrl', ['$scope', '$state', '$localStorage', 'restClService',
  function($scope, $state, $localStorage, restClService) {
    $scope.genericError = function(response) {
      var data = {
        type: "ERROR",
        message: "Problemas al procesar su información, por favor vuelva a intentarlo.",
        time: 3000
      };
      $scope.showCustomToast(data);
    };
    restClService.getOrders().then(function(response) {
      $scope.orders = response.data;
      console.log("Pedidos registrados obtenidos correctamente");
    }, $scope.genericError);

    $scope.goToProductList = function(order) {
      console.log('Go to : ' + JSON.stringify(order));
      $localStorage.orderSelected = order.cod_pedido;
      $localStorage.orderSelectedStatus = order.estado;
      $state.go('app.order');
    }
  }
]);
