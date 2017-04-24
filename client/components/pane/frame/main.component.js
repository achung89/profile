angular
  .module('pane')
    .component('mainFrame', {
      transclude:true,
      controllerAs:'frame',
      templateUrl:'pane/frame/main.html',
      controller: function ( $element, $scope, $attrs, setContentDimensions, scrollListener, init, view, setFirstDivToTop ) {    
        this.$onInit = init.bind(this);
        if($attrs.scroll === "true") {
          let content = $element[0].querySelector('.parent-content');
          content.addEventListener("wheel", scrollListener.bind(content, $element), false);
        }
        this.$doCheck = setContentDimensions;
        $scope.$on('$locationChangeStart', setFirstDivToTop );
      }
    })
    .factory('init', function() {
      return function() {
        //viewBox
        this.viewWidth = 200;
        this.viewHeight = 215;

        //lengths
        //less
        this.width = 199;
        this.widthShadow = 202;
        
        //heights
        //less
        this.height = 155;
        this.heightShadow = 157;

        //margins
        this.heightMargin = 10;
        this.greyleftMargin = 0;     
        this.whiteLeft = 3;
        this.greyTop = 13;
      }
    })
    .factory('scrollListener', function(scrollTimeout,  resetBackPane, scrollElement, backPane, animateBackPane, reset, view) {

      let contentChildren,
         offsetAdjust = 40,
         offsetNext;

      return function( $element, e) { 
        e.preventDefault();

        //resets scroll animcation
        clearTimeout(scrollTimeout.fn); 

        contentChildren = this.firstChild.firstChild;

        if (e.wheelDelta >= 0) {
          animateBackPane(140, 21);
          
          view.index--;
          if ( view.index < 0 ) {
            view.index = 0; 
          } 
          offsetNext = contentChildren.children[view.index].offsetTop;
          if (this.scrollTop !== (offsetNext - offsetAdjust)) {
            scrollElement(this, offsetNext - offsetAdjust);
          }
        } else  {
          animateBackPane(140, 5);

          view.index++;
          if ( view.index >= contentChildren.children.length ) {
            view.index = contentChildren.children.length-1; 
          }
          offsetNext = contentChildren.children[view.index].offsetTop;
          if (this.scrollTop !== (offsetNext - offsetAdjust)) {
            scrollElement(this, offsetNext - offsetAdjust);
          }
        }
        
        reset.timeout = resetBackPane();
      }
    })
    .factory('animateBackPane', function animateBackPane ( reset, backPane ) {
      return function(time, y) {    
          clearTimeout(reset.timeout);
          backPane().stop();
          backPane().animate(time).move(0,y);
      }
    })

    .factory("scrollElement", function(scrollTimeout) {
      var count = 0; 
      return function scrollIntoView (element, position) {
          var y = element.scrollTop;
          y += Math.round( ( position - y ) * 0.25 );
          if ( Math.abs(y-position) <= 5 ) {
              count = 0; 
              element.scrollTop = position;
              return;
          }
          element.scrollTop = y;
          count++;
          scrollTimeout.fn = setTimeout(function() {
            scrollIntoView(element, position);
          }, 40);
      }
    })
    .factory('resetBackPane', function(backPane) {
      return function() {
          return setTimeout(()=>{
          backPane().animate(300).move(0,13);
        }, 200); 
      }
    })
    .factory('setContentDimensions', function() {
      return function setContentDimensions() {
        var frameContent = document.getElementsByClassName('parent-content')[0];
        var frameDimens = document.getElementById('svg-inner-frame').getBoundingClientRect();
        frameContent.style.height = frameDimens.height - 100 + "px";
        frameContent.style.width = frameDimens.width -70 + "px";
      }
    })
    .factory('setFirstDivToTop', function(view) {
      return function setFirstDivToTop(event) {
          view.index = 0;
        }
    })
    .factory('backPane', function backPane() {
      return function queryBackPane() {
        return SVG.select('polyline.cls-1-frame');  
      }
    })
    .factory("scrollTimeout", function() {
      return {'fn':null}; 
    })
    .factory('view', function view(){
      return {index:0};
    })
    .factory('reset', function reset() {
      return { timeout:null };
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
