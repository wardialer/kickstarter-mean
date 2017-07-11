(() => {
    angular
        .module('kickstarter')
        .factory('UserService', factory);

    factory.$inject = ['$http'];

    /* @ngInject */
    function factory($http) {
        const prefix = '/api';

        function getUser() {
            return $http.get(`${prefix}/users/current`);
        }
        function hasPermission(role) {
            return $http.get(`${prefix}/users/authorized/${role}`);
        }

        return {
            getUser,
            hasPermission,
        };
    }
})();
