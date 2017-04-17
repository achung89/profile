angular.module('pane',['ngRoute'])
  .config ( function( $routeProvider ) {
    $routeProvider.when('/',{
      template: '<main-frame><home-pane></home-pane></main-frame>'
    })
  })
    