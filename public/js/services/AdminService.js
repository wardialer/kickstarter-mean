(() => {
    angular
        .module('kickstarter')
        .factory('AdminService', factory);

    factory.$inject = ['$http'];

    /* @ngInject */
    function factory($http) {
        let isAdding = true;
        const prefix = '/api';


        function getUsers(id) {
            if (id) {
                return $http.get(`${prefix}/users/${id}`);
            }
            return $http.get(`${prefix}/users`);
        }

        function addUser(params) {
            return $http.post(`${prefix}/signup`, params);
        }

        function editUser(params) {
            return $http.post(`${prefix}/users`, params);
        }

        function getAction() {
            return isAdding;
        }

        function setAction(_isAdding) {
            isAdding = _isAdding;
        }

        return {
            getUsers,
            addUser,
            editUser,
            getAction,
            setAction,
        };
    }
})();
