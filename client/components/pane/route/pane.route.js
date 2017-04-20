angular.module('pane',['ngRoute'])
  .config ( function( $routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
      .when('/portfolio', {
        template: '<main-frame><projects-pane></projects-pane></main-frame>'
      })
      .when('/blog', {
        template: '<main-frame><blogs-pane></blogs-pane></main-frame>'
      })
       .when('/snippets',{
        template: '<main-frame><snippets-pane></snippets-pane></main-frame>'
      })     
      .when('/', {
        template: '<main-frame><about-me></about-me></main-frame>'
      })
  })
    