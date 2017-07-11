(() => {
    angular
        .module('kickstarter')
        .controller('AdminController', Controller);

    Controller.$inject = ['AdminService', '$mdDialog', '$state'];

    /* @ngInject */
    function Controller(AdminService, $mdDialog, $state) {
        const vm = this;
        activate();

        function activate() {
            getAllUsers();
            vm.showAddDialog = showAddDialog;
            vm.showEditDialog = showEditDialog;
            vm.cancel = cancelUserDialog;
            vm.saveUser = saveUser;
            vm.listUsers = true;
            vm.showListUsers = showListUsers;
        }

        function getAllUsers() {
            AdminService.getUsers()
                .then((data) => {
                    vm.users = data.data;
                }, (data) => {
                    console.log(data.data.message);
                });
        }

        function showUserDialog(ev, _title, _formData, _disableFields) {
            $mdDialog.show({
                controller: 'AdminController',
                controllerAs: 'adminCtrl',
                templateUrl: './../views/add-user-template.html',
                targetEvent: ev,
                clickOutsideToClose: true,
                bindToController: true,
                locals: {
                    title: _title,
                    formData: _formData,
                    disabled: _disableFields,
                },
            });
        }

        function showAddDialog(ev) {
            AdminService.setAction(true);
            showUserDialog(ev, 'New User', {}, false);
        }
        function showEditDialog(ev, user) {
            AdminService.setAction(false);
            const userCopy = Object.assign({}, user);
            showUserDialog(ev, 'Edit User', userCopy, true);
        }

        function cancelUserDialog() {
            $mdDialog.cancel();
        }

        function addUser(user) {
            AdminService.addUser(user)
                .then(
                    () => {
                        $mdDialog.hide();
                        $state.reload();
                    },
                    (data) => {
                        console.log(data.data.message);
                    },
                );
        }

        function editUser(user) {
            AdminService.editUser(user)
                .then(
                    () => {
                        $mdDialog.hide();
                        $state.reload();
                    },
                    (data) => {
                        console.log(data.data.message);
                    },
                );
        }

        function saveUser(user) {
            if (AdminService.getAction() === true) { addUser(user); } else {
                editUser(user);
            }
        }

        function showListUsers() {
            vm.listUsers = !vm.listUsers;
        }
    }
})();
