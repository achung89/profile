angular.module('pane',['ngRoute'])
  .config ( function( $routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
      .when('/', {
        template: '<main-frame><projects-pane></projects-pane></main-frame>'
      })
      .when('/blog', {
        template: '<main-frame><blogs-pane></blogs-pane></main-frame>'
      })
       .when('/snippets',{
        template: '<main-frame></main-frame>'
      })     
      .when('/aboutme', {
        template: '<main-frame></main-frame>'
      })
  })
    