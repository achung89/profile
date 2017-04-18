angular.module('pane',['ngRoute'])
  .config ( function( $routeProvider ) {
    $routeProvider.when('/',{
      template: '<main-frame><projects-pane></projects-pane></main-frame>'
    })
  })
    