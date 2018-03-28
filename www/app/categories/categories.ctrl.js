/**
 * Created by ALEXIS ARDAYA on 9/9/2017.
 */
app.controller('categoriesCtrl', ['$scope', '$state', '$localStorage', 'restClService', '$rootScope',
  function ($scope, $state, $localStorage, restClService, $rootScope) {
    $rootScope.$broadcast("loggedIn");
    $scope.genericError = function(response) {
      var data = {type: "ERROR", message: "Problemas al procesar su información, por favor vuelva a intentarlo.",time: 3000};
      $scope.showCustomToast(data);
    };
    restClService.getCategories().then(function (response) {
      $scope.categories = response.data;
      console.log("Categorias obtenidas correctamente");
    }, $scope.genericError);

    $scope.goToProductList = function (category) {
      $localStorage.categorySelected = category;
      $state.go('app.products_list');
    }
  }
])
;
