'use strict';

/**
 * @ngdoc function
 * @name app.config:uiRouter
 * @description
 * # Config
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams', '$http', '$location', '$localStorage',
            function ($rootScope, $state, $stateParams, $http, $location, $localStorage) {

                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;

                if ($localStorage.currentUserWeb === undefined) {
                    $localStorage.currentUserWeb = {
                        email: "",
                        isLogged: false
                    };

                    $localStorage.cart = [];
                }

                // keep user logged in after page refresh
                if (!$localStorage.currentUserWeb.isLogged) {
                    $state.transitionTo("access.signin");
                } else {
                    //to save token
                }

                // redirect to login page if not logged in and trying to access a restricted page
                $rootScope.$on('$locationChangeStart', function (event, next, current) {
                    var publicPages = ['/access/signin','/access/signup','/access/forgot-password'];

                    console.log('PATH: ' + $location.path());
                    var restrictedPage = publicPages.indexOf($location.path()) === -1;

                    if (restrictedPage && !$localStorage.currentUserWeb.isLogged) {
                        $state.transitionTo("access.signin");
                        event.preventDefault();
                    }
                });
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG',
            function ($stateProvider, $urlRouterProvider, MODULE_CONFIG) {
                $urlRouterProvider
                    .otherwise('/app/categorias');
                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        views: {
                            '': {
                                templateUrl: 'app/core/views/layout.html'
                            },
                            'aside': {
                                templateUrl: 'app/core/views/aside.html'
                            },
                            'content': {
                                templateUrl: 'app/core/views/content.html'
                            }
                        }
                    })
                    .state('app.categories', {
                        url: '/categorias',
                        templateUrl: 'app/categories/categories.html',
                        data: {title: 'Categorias', folded: true},
                        controller: 'categoriesCtrl',
                        resolve: load(['app/categories/categories.ctrl.js','app/core/services/restclient.service.js'])
                    })
                    .state('app.categories_list', {
                        url: '/categorias_lista',
                        templateUrl: 'app/categories/categories_list.html',
                        data: {title: 'Lista de Categorias', folded: true},
                        controller: 'categoriesCtrl',
                        resolve: load('app/categories/categories.ctrl.js')
                    })
                    .state('app.products', {
                        url: '/productos',
                        templateUrl: 'app/products/products.html',
                        data: {title: 'Productos', folded: true},
                        controller: 'productsCtrl',
                        resolve: load('app/products/products.ctrl.js')
                    })
                    .state('app.products_list', {
                        url: '/productos_lista',
                        templateUrl: 'app/products/products_list.html',
                        data: {title: 'Lista de Productos', folded: true},
                        controller: 'productsCtrl',
                        resolve: load(['app/cart/cart.service.js','app/products/products.ctrl.js','app/products/products.sevice.js'])
                    })
                    .state('app.cart', {
                        url: '/mi_carrito',
                        templateUrl: 'app/cart/cart.html',
                        data: {title: 'Mi carrito', folded: true},
                        controller: 'cartCtrl',
                        resolve: load(['app/cart/cart.service.js','app/cart/cart.ctrl.js'])
                    })
                    .state('app.orders', {
                        url: '/orders',
                        templateUrl: 'app/orders/orders.html',
                        data: {title: 'Pedidos', folded: true},
                        controller: 'ordersCtrl',
                        resolve: load(['app/orders/orders.ctrl.js','app/core/services/restclient.service.js'])
                    })
                    .state('app.order', {
                        url: '/order',
                        templateUrl: 'app/order/order.html',
                        data: {title: 'Pedido', folded: true},
                        controller: 'orderCtrl',
                        resolve: load(['app/order/order.ctrl.js','app/core/services/restclient.service.js'])
                    })
                    .state('page.profile', {
                        url: '/perfil',
                        templateUrl: 'app/profile/profile.html',
                        controller: 'profileCtrl',
                        data: {title: 'Perfil'},
                        resolve: load(['app/profile/profile.ctrl.js','app/core/services/restclient.service.js'])
                    })
                    .state('page', {
                        url: '/page',
                        views: {
                            '': {
                                templateUrl: 'app/core/views/layout.html'
                            },
                            'aside': {
                                templateUrl: 'app/core/views/aside.html'
                            },
                            'content': {
                                templateUrl: 'app/core/views/content.html'
                            }
                        }
                    })
                    .state('page.blank', {
                        url: '/blank',
                        templateUrl: 'app/core/views/pages/blank.html',
                        data: {title: 'Blank'}
                    })
                    .state('404', {
                        url: '/404',
                        templateUrl: 'app/core/views/pages/404.html'
                    })
                    .state('505', {
                        url: '/505',
                        templateUrl: 'app/core/views/pages/505.html'
                    })
                    .state('access', {
                        url: '/access',
                        template: '<div class="light-blue bg-big"><div ui-view class="fade-in-down smooth"></div></div>'
                    })
                    .state('access.signin', {
                        url: '/signin',
                        templateUrl: 'app/auth/signin.html',
                        data: {title: 'Signin'},
                        controller: 'loginCtrl',
                        resolve: load(['app/auth/auth.ctrl.js','app/core/services/restclient.service.js'])
                    })
                    .state('access.signup', {
                        url: '/signup',
                        templateUrl: 'app/auth/signup.html',
                        controller: 'loginCtrl',
                        resolve: load(['app/auth/auth.ctrl.js','app/core/services/restclient.service.js'])
                    })
                    .state('access.forgot-password', {
                        url: '/forgot-password',
                        templateUrl: 'app/auth/forgot-password.html',
                        controller: 'loginCtrl',
                        resolve: load(['app/auth/auth.ctrl.js','app/core/services/restclient.service.js'])
                    });


                function load(srcs, callback) {
                    return {
                        deps: ['$ocLazyLoad', '$q',
                            function ($ocLazyLoad, $q) {
                                var deferred = $q.defer();
                                var promise = false;
                                srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                                if (!promise) {
                                    promise = deferred.promise;
                                }
                                angular.forEach(srcs, function (src) {
                                    promise = promise.then(function () {
                                        angular.forEach(MODULE_CONFIG, function (module) {
                                            if (module.name == src) {
                                                if (!module.module) {
                                                    name = module.files;
                                                } else {
                                                    name = module.name;
                                                }
                                            } else {
                                                name = src;
                                            }
                                        });
                                        return $ocLazyLoad.load(name);
                                    });
                                });
                                deferred.resolve();
                                return callback ? promise.then(function () {
                                    return callback();
                                }) : promise;
                            }]
                    }
                }
            }
        ]
    );
