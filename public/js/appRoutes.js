angular.module('kickstarter')
    .config(['$stateProvider', '$httpProvider', '$locationProvider', '$urlRouterProvider',
        ($stateProvider, $httpProvider, $locationProvider, $urlRouterProvider) => {
            $locationProvider.html5Mode(true);

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'views/login.html',
                    controller: 'LoginController',
                    controllerAs: 'loginCtrl',
                })
                .state('logged', {
                    templateUrl: 'views/nav.html',
                    abstract: true,
                    controller: 'NavController',
                    controllerAs: 'navCtrl',
                })
                .state('logged.home', {
                    url: '/',
                    templateUrl: 'views/home.html',
                })
                .state('logged.admin', {
                    url: '/admin',
                    views: {
                        '': {
                            templateUrl: 'views/admin.html',
                            controller: 'AdminController',
                            controllerAs: 'adminCtrl',
                        },
                    },
                });

            $urlRouterProvider.otherwise('/');
        }])
    .run(['$rootScope', '$state', 'UserService', ($rootScope, $state, UserService) => {
        $rootScope.$on(
            '$stateChangeStart',
            (event, toState, toParams) => {
                UserService.getUser().then(
                    () => {
                        if (toState.name === 'login') {
                            $state.go('logged.home');
                        } else {
                            $state.go(toState.name, toParams);
                        }
                    },
                    () => {
                        $state.go('login');
                    },
                );
            },
        );
    }]);
