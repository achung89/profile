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
          var coords = JSON.parse($attrs.coords);
          this.nameX = coords[0];
          this.nameY = coords[1];
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
        ['Portfolio','portfolio',[70,42]],
        ['Blog', 'blog',[85,42]],
        ['Snippets','snippets',[70,42]],
        ['About', '',[80.5,42]]
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


