(() => {
    angular.module('kickstarter')
        .directive('requiredRole', ['$rootScope', 'UserService',
            ($rootScope, UserService) => ({
                restrict: 'A',
                link($scope, $element, attrs) {
                    $element.addClass('ng-hide');
                    UserService.hasPermission(attrs.requiredRole)
                        .then(
                            () => {
                                $element.removeClass('ng-hide');
                            },
                            () => {
                                $element.addClass('ng-hide');
                            },
                        );
                },
            }),
        ]);
})();
