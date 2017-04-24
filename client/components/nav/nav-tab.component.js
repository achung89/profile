angular
  .module('nav')
    .component('navTab', {
      templateUrl:'files/nav/nav-tab.html',
      controllerAs:'tab',
      controller: function ( $attrs, navInit, navPostLink, changeView ) {
        this.$onInit = navInit.bind(this);
        this.$postLink = navPostLink.bind(this, $attrs);
        this.changeView = changeView.bind(this);
      }
    })
    .controller('NavController', function ( NavService, Current ) {
      this.tabs = NavService;
      this.page = Current;
    })
    .factory('NavService',function(){
      return [
        ['Portfolio','portfolio',[70,42]],
        ['Blog', 'blog',[85,42]],
        ['Snippets','snippets',[70,42]],
        ['About', '',[80.5,42]]
      ];
    })
    .factory('Current', function() {
      return {$:'About'}
    })
    .factory('navInit', function() {
      return function navInit() {

          this.top = 2.5;
          this.left = 0;

          this.viewWidth = 66.5;
          this.viewHeight = 232.5;
          //less
          this.widthShadow = 232.5;
          this.width = 230;
          //less
          this.height = 66.5;
          
          this.heightShadow = 64;

          this.greyTop = 0;
          this.greyLeft = 2.5

        }
    })
    .factory('navPostLink', function() {
      return function navPostLink($attrs) {
          this.pageName = $attrs.pageName;
          this.path = $attrs.path;
          var coords = JSON.parse($attrs.coords);
          this.nameX = coords[0];
          this.nameY = coords[1];
        }
    })
    .factory('changeView', function($location, Current) {
      return function changeView( page, current ) {
          $location.path(page);
          console.log(current);
          Current.$ = current;
        }
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


