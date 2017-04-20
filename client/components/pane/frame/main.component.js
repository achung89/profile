angular
  .module('pane')
    .component('mainFrame', {
      transclude:true,
      controllerAs:'frame',
      templateUrl:'pane/frame/main.html',
      controller: function () {
        this.$onInit = () => {
          this.width = 1000;
          //less
          this.height = 1390;
          this.heightShadow = 1400;
          //less
          this.widthShadow = 990;
          this.heightMargin = 10;
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
