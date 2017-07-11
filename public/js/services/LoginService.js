(() => {
    angular
        .module('kickstarter')
        .factory('LoginService', factory);

    factory.$inject = ['$http'];

    /* @ngInject */
    function factory($http) {
        const prefix = '/api';

        function login(params) {
            return $http.post(`${prefix}/login`, params);
        }

        function logout() {
            return $http.post(`${prefix}/logout`);
        }

        return {
            login,
            logout,
        };
    }
})();
