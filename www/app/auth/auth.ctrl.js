/**
 * Created by ALEXIS ARDAYA on 9/9/2017.
 */
// auth controller
app.controller('loginCtrl', ['$scope', '$state', '$localStorage', 'restClService',
  function ($scope, $state, $localStorage, restClService) {
    $scope.genericError = function(response) {
      var data = {type: "ERROR", message: "Problemas al procesar su información, por favor vuelva a intentarlo.",time: 3000};
      $scope.showCustomToast(data);
    };

    $scope.user = {
        email: "",
        password: ""
    };

    $scope.login = function login() {
      $scope.user.mail = $scope.user.email;
      restClService.login($scope.user).then(
        function (response) {
          if (response.data.code == 0) {
            $localStorage.currentUserWeb = {
                email: $scope.user.email,
                isLogged: true,
                token: response.data.token
            };
            var data = {type: "SUCCESS", message: 'Bienvenido',time: 3000};
            $scope.showCustomToast(data);
            $state.go('app.categories', null, {
                location: 'replace'
            });
          } else {
            clearInput();
            var data = {type: "ERROR", message: response.data.message, time: 10000};
            $scope.showCustomToast(data);
          }
        }, $scope.genericError
      );
    };

    function clearInput() {
        $scope.user = {
            password: ""
        };
    }

    $scope.latlng = [-17.783302473602816,-63.18213701248169];
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

    $scope.registerUser = function() {
      $scope.user.location_lat = $scope.latlng[0];
      $scope.user.location_log = $scope.latlng[1];
      $scope.user.email = $scope.user.mail;
      restClService.registerClient($scope.user).then(
        function (response) {
          if (response.data.code == 0) {
            $localStorage.currentUserWeb = {
                email: $scope.user.email,
                isLogged: true,
                token: response.data.token
            };
            var data = {type: "SUCCESS", message: 'Registro exitoso!!! ahora puede realizar los pedidos que desee',time: 6000};
            $scope.showCustomToast(data);
            $state.go('app.categories', null, {
                location: 'replace'
            });
          } else {
            var data = {type: "ERROR", message: response.data.message, time: 10000};
            $scope.showCustomToast(data);
          }
        },
        $scope.genericError
      );
    };

    $scope.sendForgotPasswordEmail = function () {
      $scope.user.mail = $scope.user.email;
      restClService.forgotPassword($scope.user).then(
        function (response) {
          if (response.data.code == 0) {
            var data = {type: "SUCCESS", message: response.data.message,time: 6000};
            $scope.showCustomToast(data);
            $state.go('access.signin');
          } else {
            var data = {type: "ERROR", message: response.data.message, time: 10000};
            $scope.showCustomToast(data);
          }
        },
        $scope.genericError
      );
    };
}])
;
