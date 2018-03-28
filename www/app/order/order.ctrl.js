/**
 * Created by MILTON CHAMBI on 16/11/2017.
 */
app.controller('orderCtrl', ['$scope', '$state', '$localStorage', 'restClService',
  function($scope, $state, $localStorage, restClService) {
    $scope.genericError = function(response) {
      var data = {
        type: "ERROR",
        message: "Problemas al procesar su información, por favor vuelva a intentarlo.",
        time: 3000
      };
      $scope.showCustomToast(data);
    };
    $scope.orderId = $localStorage.orderSelected;
    $scope.orderStatus = $localStorage.orderSelectedStatus;
    restClService.getOrder($scope.orderId).then(function(response) {
      $scope.products = response.data;
      console.log("Detalle de pedido obtenido correctamente");
      $scope.total = 0;
      for (var i = 0; i < $scope.products.length; i++) {
        var item = $scope.products[i];
        $scope.total += item.subtotal;
      }
    }, $scope.genericError);
    $scope.cancelOrder = function() {
      restClService.cancelOrder($scope.orderId).then(function(response) {
        var data = {
          type: "ERROR",
          message: response.data.message,
          time: 8000
        };
        if (response.data.code == 0) {
          data.type = "SUCCESS";
          $scope.orderStatus = 4;
        }
        $scope.showCustomToast(data);
      }, $scope.genericError);
    }
  }
]);
