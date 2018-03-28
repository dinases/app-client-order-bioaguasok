// lazyload config

angular.module('app')
    .constant('MODULE_CONFIG', [
            {
                name: 'ui.select',
                module: true,
                files: [
                    'bower_components/angular-ui-select/dist/select.min.js',
                    'bower_components/angular-ui-select/dist/select.min.css'
                ]
            },
            {
                name: 'textAngular',
                module: true,
                files: [
                    'bower_components/textAngular/dist/textAngular-sanitize.min.js',
                    'bower_components/textAngular/dist/textAngular.min.js'
                ]
            },
            {
                name: 'vr.directives.slider',
                module: true,
                files: [
                    'bower_components/venturocket-angular-slider/build/angular-slider.min.js',
                    'bower_components/venturocket-angular-slider/angular-slider.css'
                ]
            },
            {
                name: 'angularBootstrapNavTree',
                module: true,
                files: [
                    'bower_components/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                    'bower_components//angular-bootstrap-nav-tree/dist/abn_tree.css'
                ]
            },
            {
                name: 'angularFileUpload',
                module: true,
                files: [
                    'bower_components/angular-file-upload/angular-file-upload.js'
                ]
            },
            {
                name: 'ngImgCrop',
                module: true,
                files: [
                    'bower_components/angular/ngImgCrop/compile/minified/ng-img-crop.js',
                    'bower_components/angular/ngImgCrop/compile/minified/ng-img-crop.css'
                ]
            },
            {
                name: 'smart-table',
                module: true,
                files: [
                    'bower_components/angular/angular-smart-table/dist/smart-table.min.js'
                ]
            },
            {
                name: 'ui.map',
                module: true,
                files: [
                    'bower_components/angular/angular-ui-map/ui-map.js'
                ]
            },
            {
                name: 'ngGrid',
                module: true,
                files: [
                    'bower_components/angular/ng-grid/build/ng-grid.min.js',
                    'bower_components/angular/ng-grid/ng-grid.min.css',
                    'bower_components/angular/ng-grid/ng-grid.bootstrap.css'
                ]
            },
            {
                name: 'ui.grid',
                module: true,
                files: [
                    'bower_components//angular/angular-ui-grid/ui-grid.min.js',
                    'bower_components/angular/angular-ui-grid/ui-grid.min.css',
                    'bower_components/angular/angular-ui-grid/ui-grid.bootstrap.css'
                ]
            },
            {
                name: 'xeditable',
                module: true,
                files: [
                    'bower_components/angular/angular-xeditable/dist/js/xeditable.min.js',
                    'bower_components/angular/angular-xeditable/dist/css/xeditable.css'
                ]
            },
            {
                name: 'smart-table',
                module: true,
                files: [
                    'bower_components/angular-smart-table/dist/smart-table.min.js'
                ]
            },
            {
                name: 'dataTable',
                module: false,
                files: [
                    'bower_components/datatables/media/js/jquery.dataTables.min.js',
                    'bower_components/plugins/integration/bootstrap/3/dataTables.bootstrap.js',
                    'bower_components/plugins/integration/bootstrap/3/dataTables.bootstrap.css'
                ]
            },
            {
                name: 'footable',
                module: false,
                files: [
                    'bower_components/footable/dist/footable.all.min.js',
                    'bower_components/footable/css/footable.core.css'
                ]
            },
            {
                name: 'easyPieChart',
                module: false,
                files: [
                    'bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.fill.js'
                ]
            },
            {
                name: 'sparkline',
                module: false,
                files: [
                    'bower_components/jquery.sparkline/dist/jquery.sparkline.retina.js'
                ]
            },
            {
                name: 'plot',
                module: false,
                files: [
                    'bower_components/flot/jquery.flot.js',
                    'bower_components/flot/jquery.flot.resize.js',
                    'bower_components/flot/jquery.flot.pie.js',
                    'bower_components/flot.tooltip/js/jquery.flot.tooltip.min.js',
                    'bower_components/flot-spline/js/jquery.flot.spline.min.js',
                    'bower_components/flot.orderbars/js/jquery.flot.orderBars.js'
                ]
            },
            {
                name: 'vectorMap',
                module: false,
                files: [
                    'bower_components/bower-jvectormap/jquery-jvectormap-1.2.2.min.js',
                    'bower_components/bower-jvectormap/jquery-jvectormap.css',
                    'bower_components/bower-jvectormap/jquery-jvectormap-world-mill-en.js',
                    'bower_components/bower-jvectormap/jquery-jvectormap-us-aea-en.js'
                ]
            },
            {
                name: 'moment',
                module: false,
                files: [
                    'bower_components/moment/moment.js'
                ]
            }
        ]
    )
    .config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function ($ocLazyLoadProvider, MODULE_CONFIG) {
        $ocLazyLoadProvider.config({
            debug: false,
            events: false,
            modules: MODULE_CONFIG
        });
    }]);
