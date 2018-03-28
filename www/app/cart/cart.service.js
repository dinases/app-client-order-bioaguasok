/**
 * Created by ALEXIS ARDAYA on 18/9/2017.
 */
app.factory('cartService', ['$state', '$localStorage', '$rootScope', 'restClService',
  function ($state, $localStorage, $rootScope, restClService) {

    var service = {};

    service.cart = [];

    var filtrar = function (id) {
        for (var i = 0; i < service.cart.length; i++) {
            if (service.cart[i].id == id) {
                return service.cart[i];
            }
        }
        return null;
    };
    service.filtrar = filtrar;

    service.addProduct = function (counter, p) {
        var itemActual = filtrar(p.id);

        if (!itemActual) {
            p.state = true;
            service.cart.push(p);
            $localStorage.cart = service.cart;
        } else {
            if (counter < itemActual.count) {
                itemActual.count = itemActual.count - 1;
                $localStorage.cart[$localStorage.cart.indexOf(p)].count = itemActual.count;
            } else {
                $localStorage.cart[$localStorage.cart.indexOf(p)].count = itemActual.count;
            }
        }
        $rootScope.$broadcast("changingCart");
    };

    service.deleteProduct = function (item) {
        item.state = false;
        item.count = 1;
        service.cart.splice(service.cart.indexOf(item), 1);
        $rootScope.$broadcast("changingCart");
    };

    service.listCart = function (fc) {
        fc(service.cart);
    };

    service.buy = function () {
      var cart = $localStorage.cart;
      var request = [];
      for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var product = {
          codigo_producto: item.id,
          cantidad: item.count
        };
        request.push(product);
      }
      restClService.buyProducts(request).then(
        function (response) {
          service.cart = [];
          $localStorage.cart = [];
          $rootScope.$broadcast("cleanProducts");
          $rootScope.$broadcast("changingCart");
        }, function (response) {
            console.log('Problemas al registrar orden de compra de productos.');
        }
      );
    };

    return service;

}])
;
