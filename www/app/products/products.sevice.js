/**
 * Created by MILTON CHAMBI on 18/9/2017.
 */
app.factory('productService', ['$state', '$localStorage', '$rootScope', '$filter', 'restClService',
  function ($state, $localStorage, $rootScope, $filter, restClService) {
    var service = {};

    function formatProductList(response) {
      var data = [];
      for (var i = 0; i < response.length; i++) {
        var item = response[i];
        var product = {
            id: item.codigo,
            title: item.nombre,
            description: item.descripcion,
            image: item.foto,
            price: item.precio,
            discount: null,
            state: false,
            count: 1
        };
        data.push(product);
      }
      return data;
    }

    service.listProduct = function (fc) {
      restClService.getProducts($localStorage.categorySelected.codigo).then(
        function (response) {
          var products = formatProductList(response.data);
          fc(products);
        },
        function (response) {
          fc([]);
        }
      );
    };

    service.filtrar = function (reqId) {
        return $filter("filter")(data, {"id": reqId})[0];
    };

    return service;
}]);
