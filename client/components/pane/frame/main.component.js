angular
  .module('pane')
    .component('mainFrame', {
      transclude:true,
      controllerAs:'frame',
      templateUrl:'pane/frame/main.html',
      controller: function () {

        this.$onInit = () => {
        // set foreignObjects frame for site content to height of svg panel

          this.viewWidth = 200;
          this.viewHeight = 200;
          //less
          this.widthShadow = 199;
          this.width = 200;
          //less
          this.height = 159;
          this.heightShadow = 160;
 
          this.heightMargin = 1;
          this.greyleftMargin = 2;     


        }

        this.$doCheck = function() {
          var frameContent = document.getElementsByClassName('parent-content')[0];
          var frameDimens = document.getElementById('svg-inner-frame').getBoundingClientRect();
          frameContent.style.height = frameDimens.height - 100 + "px";
          frameContent.style.width = frameDimens.width -70 + "px";
        }
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
    .directive('ngD', function() {
        return function(scope, elem, attrs) {
            attrs.$observe('ngD', function(y) {
                elem.attr('d', y);
            });
        };
    })
    .directive('ngWidth', function() {
        return function(scope, elem, attrs) {
            attrs.$observe('ngWidth', function(y) {
                elem.attr('width', y);
            });
        };
    })
    .directive('ngHeight', function() {
        return function(scope, elem, attrs) {
            attrs.$observe('ngHeight', function(y) {
                elem.attr('height', y);
            });
        };
    })
