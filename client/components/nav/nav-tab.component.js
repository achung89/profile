angular
  .module('nav')
    .component('navTab', {
      templateUrl:'files/nav/nav-tab.html',
      controllerAs:'tab',
      controller: function ( $attrs, $element, navInit, animateTab, navPostLink, changeView) {
        this.$onInit = navInit.bind(this);
        this.$postLink = navPostLink.bind(this, $attrs, $element);
        this.changeView = changeView.bind(this);
        $element[0].addEventListener('mouseenter', animateTab.bind($element[0], .875, 1.03, 200));
        $element[0].addEventListener('mouseleave', animateTab.bind($element[0], 1, 1, 150));
      }
    })
    .controller('NavController', function ( NavService, Current ) {
      this.tabs = NavService;
      this.page = Current;
    })
    .factory('NavService',function(){
      return [
        [ 'Portfolio', 'portfolio', [39,42] ],
        [ 'Blog', 'blog', [57,42] ],
        [ 'Snippets', 'snippets', [39,42] ],
        [ 'About', '', [47,42] ]
      ];
    })
    .factory('navInit', function() {
      return function navInit() {

          this.viewWidth = 66.5;
          this.viewHeight = 150;

          this.top = 2.5;
          this.left = 0;
          
          //less
          this.widthShadow = 147.5;
          this.width = 150;
          //less
          this.height = 63.75;
          this.heightShadow = 66.5;

          this.greyTop = 0;
          this.greyLeft = 2.5

        }
    })
    .factory('navPostLink', function(Current) {
      return function navPostLink($attrs, $element) {
          this.pageName = $attrs.pageName;
          this.path = $attrs.path;
          var coords = JSON.parse($attrs.coords);
          this.nameX = coords[0];
          this.nameY = coords[1];
          console.log(this.clicked);
        }
    })
    .factory('animateTab', function() {
      return function animateTab(x, y, time, e) {
        console.log(x,y,e)
        // var back = SVG.adopt(this.querySelector('.cls-1'))
        var front = SVG.adopt(this.querySelector('.cls-2'))
        var text = SVG.adopt(this.querySelector('.cls-3'))
        front.animate(time).transform({scaleX:x});

        // back.animate(100).transform({scaleX:y});
      }
    })
    .factory('changeView', function($location, Current) {
      return function changeView( page, current ) {
          $location.path(page);
          console.log(current);
          Current.$ = current;
        }
    })
    .factory('Current', function() {
      return {$:'About'}
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


