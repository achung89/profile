angular
  .module('pane')
    .component('mainFrame', {
      transclude:true,
      controllerAs:'frame',
      templateUrl:'pane/frame/main.html',
      controller: function ( $element, $scope, scrollElement ) {
        console.log($element);
        let timer = null,
            view = 1,
            polyline, 
            polyframe, 
            content = $element[0].querySelector('.parent-content'),
            contentChildren;
        console.log(content);
        // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
        content.addEventListener("wheel", (e) => { 
            e.preventDefault();
            contentChildren = content.firstChild.firstChild;

            if (e.wheelDelta >= 0) {
              clearTimeout(timer);
              polyline.stop();
              polyframe.stop();
              // polyframe.animate(100,'>').transform({scaleY:.95});
              // polyline.animate(100,'>').transform({scaleX:.95, scaleY:1.05});
              polyline.animate(100,'>').move(0,21);
              if ( view <= 0 ) {
                view = 1; 
              }
              console.log(view,contentChildren.children[view] );
              scrollElement(content,contentChildren.children[view].offsetTop);
              view--;
              console.log(view);


            } else {
              clearTimeout(timer);
              polyline.stop();
              polyframe.stop();
              // polyframe.animate(100,'>').transform({scaleY:.95});
              // polyline.animate(100,'>').transform({scaleX:.95, scaleY:1.05});
              polyline.animate(100,'>').move(0,5);
              if ( view >= contentChildren.children.length-1 ) {
                view = contentChildren.children.length-2; 
              }
              console.log(view,contentChildren.children[view], contentChildren.children );
              console.log(view);
              scrollElement(content,contentChildren.children[view].offsetTop);
              view++;   
   

            }
            timer = setTimeout(()=>{
              // polyframe.animate(200).transform({scaleY:1});
              // polyline.animate(200).transform({scaleX:1, scaleY:1});
              polyline.animate(300).move(0,13);
            }, 200);  
        }, false);
        this.$onInit = () => {
          polyline = SVG.select('polyline.cls-1-frame');
          polyframe = SVG.select('polyline.cls-2-frame');
          console.log(content.innerHTML);
          
        // set foreignObjects this for site content to height of svg panel

          this.viewWidth = 200;
          this.viewHeight = 215;
          //less
          this.width = 199;
          this.widthShadow = 202;
          //less
          this.height = 155;
          this.heightShadow = 157;
 
          this.heightMargin = 10;
          this.greyleftMargin = 0;     

          this.whiteLeft = 3;

          this.greyTop = 13;


        }

        this.$doCheck = function() {
          var frameContent = document.getElementsByClassName('parent-content')[0];
          var frameDimens = document.getElementById('svg-inner-frame').getBoundingClientRect();
          frameContent.style.height = frameDimens.height - 100 + "px";
          frameContent.style.width = frameDimens.width -70 + "px";
        }
      }
    })
    .factory("scrollElement", function(){
      return function scrollIntoView (element, pos) {
        console.log(pos)
          var y = element.scrollTop;
          y += Math.round( ( pos - y ) * 0.3 );;
          if ( Math.abs(y-pos) <= 2 ) {
              element.scrollTop = pos;
              return;
          }
          element.scrollTop = y;
          setTimeout(scrollIntoView, 40, element, pos);   
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
