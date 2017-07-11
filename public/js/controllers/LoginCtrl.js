(() => {
    angular
        .module('kickstarter')
        .controller('LoginController', Controller);

    Controller.$inject = ['$state', '$location', 'LoginService'];

    /* @ngInject */
    function Controller($state, $location, LoginService) {
        const vm = this;

        activate();

        function activate() {
            vm.formData = {};
            vm.login = login;
            vm.go = go;
            vm.imagePath = '/images/logo.jpg';
        }

        function go(url) {
            $location.path(url);
        }

        function login() {
            LoginService.login(vm.formData)
                .then(
                    () => {
                        $state.go('logged.home');
                    },
                    (data) => {
                        console.log(data.data.message);
                    },
                );
        }
    }
})();
