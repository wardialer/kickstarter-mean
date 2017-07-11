angular.module('kickstarter', [
    'ui.router',
    'ngMaterial',
])
    .config(($mdThemingProvider) => {
        $mdThemingProvider.theme('default')
            .primaryPalette('light-blue')
            .accentPalette('pink')
            .warnPalette('red')
            .backgroundPalette('grey');

        $mdThemingProvider.theme('altTheme')
            .primaryPalette('green')
            .accentPalette('red')
            .warnPalette('yellow');
    });
