(() => {
    angular
        .module('kickstarter')
        .controller('NavController', Controller);

    Controller.$inject = ['$rootScope', '$scope', '$state', 'LoginService', 'UserService'];

    /* @ngInject */
    function Controller($rootScope, $scope, $state, LoginService, UserService) {
        const vm = this;

        activate();

        function activate() {
            vm.logout = logout;
            vm.currentState = $state.current.name;

            UserService.getUser()
                .then(
                    (data) => {
                        vm.user = data.data;
                    },
                    (data) => {
                        console.error(data.data);
                        vm.user = null;
                    },
                );
        }

        function logout() {
            LoginService.logout()
                .then(
                    () => {
                        $state.go('login');
                    },
                    (data) => {
                        console.log(data.data.message);
                    },
                );
        }

        const deregister = $rootScope.$on('$stateChangeSuccess', (event, current) => {
            vm.currentState = current.name;
        });

        $scope.$on('$destroy', deregister);
    }
})();
