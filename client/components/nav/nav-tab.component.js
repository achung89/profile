angular
  .module('nav')
    .component('navTab', {
      templateUrl:'files/nav/nav-tab.html',
      controllerAs:'tab',
      controller: function ( $attrs, $location ) {
        this.$onInit = function() {
          this.width = 232.5;
          //less
          this.height = 64;
          this.heightShadow = 66.5;
          //less
          this.widthShadow = 230;
        }
        this.$postLink = function() {
          this.pageName = $attrs.pageName;
          this.path = $attrs.path;  
        }
        this.changeView = function ( page ) {
          $location.path(page);
        }
      }
    })
    .controller('NavController', function ( NavService ) {
      this.tabs = NavService;
    })
    .factory('NavService',function(){
      return [
        ['Portfolio','portfolio'],
        ['Blog', 'blog'],
        ['Snippets','snippets'],
        ['About', '']
      ];
    })
    .directive('ngViewbox', function() {
        return {
          link: function(scope, elem, attrs) {
            attrs.$observe('ngViewbox', function(x) {
                elem.attr('viewBox', x);
            });
          }
        }
    })
    .directive('ngPoints', function() {
        return function(scope, elem, attrs) {
            attrs.$observe('ngPoints', function(y) {
                elem.attr('points', y);
            });
        };
    })


