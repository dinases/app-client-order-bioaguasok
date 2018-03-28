/**
* Created by MILTON CHAMBI on 14/11/2017.
*/
app.factory('restClService', ['$state', '$http', '$localStorage', '$rootScope',
  function ($state, $http, $localStorage, $rootScope) {

    var authorizationToken = "QU5ERVJTT05AR01BSUwuQ09NOjEyMzQ1Njc4OQ==";
    var baseRestServiceUrl = "http://app.rechtlinks.com.bo:8080/api/";

    var service = {};

    service.registerClient = function (client) {
      console.log('Registrando cliente : ' + JSON.stringify(client));
      var request = {
        method: 'POST',
        url: baseRestServiceUrl + "clients",
        headers: {
          'Content-Type': 'application/json',
          'codeauthorization': authorizationToken
        },
        data: client
      };
      return $http(request);
    };

    service.login = function (user) {
      console.log('Autenticando cliente : ' + JSON.stringify(user));
      var request = {
        method: 'POST',
        url: baseRestServiceUrl + "clients/login",
        headers: {
          'Content-Type': 'application/json',
          'codeauthorization': authorizationToken
        },
        data: user
      };
      return $http(request);
    };

    service.forgotPassword = function (user) {
      console.log('Enviando correo para recuperación de contraseña' + JSON.stringify(user));
      var request = {
        method: 'PUT',
        url: baseRestServiceUrl + "clients/password",
        headers: {
          'Content-Type': 'application/json',
          'codeauthorization': authorizationToken
        },
        data: user
      };
      return $http(request);
    };

    service.getCategories = function () {
      console.log('Consultando las categorias registradas en el servidor');
      var request = {
        method: 'GET',
        url: baseRestServiceUrl + "products/category",
        headers: {
          'Content-Type': 'application/json',
          'codeauthorization': authorizationToken
        }
      };
      return $http(request);
    };

    service.getProducts = function (categoryId) {
      console.log('Consultando los productos de la categoria con ID: ' + categoryId);
      var request = {
        method: 'GET',
        url: baseRestServiceUrl + "products/category/" + categoryId,
        headers: {
          'Content-Type': 'application/json',
          'codeauthorization': authorizationToken
        }
      };
      return $http(request);
    };

    service.buyProducts = function (cart) {
      var clientToken = $localStorage.currentUserWeb.token;
      console.log('Enviando compra de productos al servidor : ' + JSON.stringify(cart));
      console.log('Token del usuario: ' + clientToken);
      var request = {
        method: 'POST',
        url: baseRestServiceUrl + "orders",
        headers: {
          'Content-Type': 'application/json',
          'codeauthorization': authorizationToken,
          'tokenauthorization': clientToken
        },
        data: cart
      };
      return $http(request);
    };

    service.getOrders = function () {
      var clientToken = $localStorage.currentUserWeb.token;
      console.log('Consultando los pedidos registradas en el servidor');
      var request = {
        method: 'GET',
        url: baseRestServiceUrl + "orders",
        headers: {
          'Content-Type': 'application/json',
          'codeauthorization': authorizationToken,
          'tokenauthorization': clientToken
        }
      };
      return $http(request);
    };

    service.getOrder = function (orderId) {
      var clientToken = $localStorage.currentUserWeb.token;
      console.log('Consultando detalle de pedido en el servidor');
      var request = {
        method: 'GET',
        url: baseRestServiceUrl + "orders/" + orderId + "/products",
        headers: {
          'Content-Type': 'application/json',
          'codeauthorization': authorizationToken,
          'tokenauthorization': clientToken
        }
      };
      return $http(request);
    };

    service.cancelOrder = function (orderId) {
      var clientToken = $localStorage.currentUserWeb.token;
      console.log('Cancelando orden : ' + orderId);
      var request = {
        method: 'DELETE',
        url: baseRestServiceUrl + "orders/" + orderId + "/cancels",
        headers: {
          'Content-Type': 'application/json',
          'codeauthorization': authorizationToken,
          'tokenauthorization': clientToken
        }
      };
      return $http(request);
    };

    service.getClientInformation = function() {
      var clientToken = $localStorage.currentUserWeb.token;
      console.log('Consultando informacion del cliente logeado : ' + clientToken);
      var request = {
        method: 'GET',
        url: baseRestServiceUrl + "clients",
        headers: {
          'Content-Type': 'application/json',
          'codeauthorization': authorizationToken,
          'tokenauthorization': clientToken
        }
      };
      return $http(request);
    };

    service.updateProfile = function (user) {
      var clientToken = $localStorage.currentUserWeb.token;
      console.log('Actualizando datos del cliente : ' + JSON.stringify(user));
      var request = {
        method: 'PUT',
        url: baseRestServiceUrl + "clients",
        headers: {
          'Content-Type': 'application/json',
          'codeauthorization': authorizationToken,
          'tokenauthorization': clientToken
        },
        data: user
      };
      return $http(request);
    };

    service.changePassword = function (body) {
      var clientToken = $localStorage.currentUserWeb.token;
      console.log('Actualizando contraseña del cliente : ' + JSON.stringify(body));
      var request = {
        method: 'PUT',
        url: baseRestServiceUrl + "password/clients",
        headers: {
          'Content-Type': 'application/json',
          'codeauthorization': authorizationToken,
          'tokenauthorization': clientToken
        },
        data: body
      };
      return $http(request);
    };

    return service;
  }
])
;
