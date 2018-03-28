/**
 * Created by David Batista on 14/09/2017.
 */
app.controller('profileCtrl', ['$scope', '$state', '$localStorage', 'restClService', '$rootScope',
  function ($scope, $state, $localStorage, restClService, $rootScope) {

  restClService.getClientInformation().then(
    function (response) {
      $scope.user = response.data;
      $scope.user.nit = Number($scope.user.nit);
      $scope.latlng = [$scope.user.location_lat, $scope.user.location_log];
    }
  );

  $scope.genericError = function(response) {
    var data = {type: "ERROR", message: "Problemas al procesar su información, por favor vuelva a intentarlo.",time: 3000};
    $scope.showCustomToast(data);
  };

  $scope.updateProfile = function () {
    console.log('Actualizar informacion del cliente : ' + JSON.stringify($scope.user));
    $scope.user.location_lat = $scope.latlng[0];
    $scope.user.location_log = $scope.latlng[1];
    $scope.user.nit = $scope.user.nit + "";
    restClService.updateProfile($scope.user).then(
      function (response) {
        var data = {type: "ERROR", message: response.data.message,time: 5000};
        if (response.data.code == 0) {
          data.type = "SUCCESS";
        }
        $scope.showCustomToast(data);
        $rootScope.$broadcast("loggedIn");
      }, $scope.genericError);
  };
  $scope.getpos = function(event){
       $scope.latlng = [event.latLng.lat(), event.latLng.lng()];
  };
  $scope.requestLocation = function() {
    navigator.geolocation.getCurrentPosition( function(position) {
      $scope.latlng = [position.coords.latitude, position.coords.longitude];
      var data = {type: "SUCCESS", message: 'Ubicación obtenida.',time: 2000};
      $scope.showCustomToast(data);
    },
    function(error ) {
      var data = {type: "ERROR", message: 'Problemas al obtener su ubicación, por favor revise si tiene activado su GPS.',time: 6000};
      $scope.showCustomToast(data);
      },
    { enableHighAccuracy: true }
    );
  };

  $scope.getMyLocation = function () {
      cordova.plugins.diagnostic.isLocationAvailable( function(available) {
        if (available) {
          $scope.requestLocation();
        } else {
          var data = {type: "ERROR", message: 'Por favor encienda su GPS.',time: 2000};
          $scope.showCustomToast(data);
          cordova.plugins.diagnostic.switchToLocationSettings(); // No funciona para iOS
          $scope.requestLocation();
        }
      }, function(error){
        var data = {type: "ERROR", message: 'Problemas al validar el estado de su GPS.',time: 6000};
        $scope.showCustomToast(data);
      });
  };

  $scope.changePasswordRequest = {
    old_password_cli: "",
    new_password_cli: "",
    new_password_cli_confirmation: ""
  };
  $scope.changePassword = function() {
    if ($scope.changePasswordRequest.new_password_cli &&
        $scope.changePasswordRequest.new_password_cli_confirmation &&
        $scope.changePasswordRequest.new_password_cli == $scope.changePasswordRequest.new_password_cli_confirmation) {
          restClService.changePassword($scope.changePasswordRequest).then(
            function (response) {
              var data = {type: "ERROR", message: response.data.message,time: 5000};
              if (response.data.code == 0) {
                data.type = "SUCCESS";
              }
              $scope.showCustomToast(data);
              $scope.changePasswordRequest = {
                old_password_cli: "",
                new_password_cli: "",
                new_password_cli_confirmation: ""
              };
            }, $scope.genericError
          );
        } else {
          var data = {type: "ERROR", message: "Contraseñas inválidas",time: 5000};
          $scope.showCustomToast(data);
          $scope.changePasswordRequest = {
            old_password_cli: "",
            new_password_cli: "",
            new_password_cli_confirmation: ""
          };
        }
  };

}])
;
