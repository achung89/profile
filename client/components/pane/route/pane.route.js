angular.module('pane',['ngRoute'])
  .config ( function( $routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
      .when('/', {
        template: '<main-frame scroll="false" id="about-main"><about-me></about-me></main-frame>'
      })
      .when('/portfolio', {
        template: '<main-frame scroll="true" id="portfolio-main"><projects-pane></projects-pane></main-frame>'
      })
      .when('/blog', {
        template: '<main-frame scroll="false" id="blog-main"><blogs-pane></blogs-pane></main-frame>'
      })
      //  .when('/snippets',{
      //   template: '<main-frame scroll="true" id="snippets-main"><snippets-pane></snippets-pane></main-frame>'
      // })     
      .when('/aboutsite', {
        template: '<main-frame scroll="false" id="about-site"><about-site></about-site></main-frame>'
      })
  })
    