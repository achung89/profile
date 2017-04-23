angular
  .module('pane')
    .component('mainFrame', {
      transclude:true,
      controllerAs:'frame',
      templateUrl:'pane/frame/main.html',
      controller: function ( $element, scrollElement, scrollTimeout, varDiff ) {
        console.log($element);
        let timer = null,
            view = 0,
            polyline, 
            polyframe, 
            content = $element[0].querySelector('.parent-content'),
            contentChildren,
            offsetAdjust = 40;
        console.log(content);
        // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
        content.addEventListener("wheel", (e) => { 
            console.log('begin');
            clearTimeout(scrollTimeout.fn); 
            e.preventDefault();
            contentChildren = content.firstChild.firstChild;

            //scroll up
            if (e.wheelDelta >= 0) {
              console.log('up')
              clearTimeout(timer);
              polyline.stop();
              polyframe.stop();

              polyline.animate(150).move(0,21);
              
              view--;
              if ( view < 0 ) {
                view = 0; 
              } else {
                let offsetNext = contentChildren.children[view].offsetTop;
                console.log(content.scrollTop, view, offsetNext, varDiff('up', content.scrollTop, view, offsetNext));
                scrollElement(content,offsetNext - offsetAdjust);
              }
              
              
              console.log(view);

              //scroll down
            } else {
              console.log('down');
              clearTimeout(timer);
              polyline.stop();
              polyframe.stop();

              polyline.animate(150).move(0,5);
              // console.log(content.scrollTop + innerHeight, content.scrollHeight-250)

                console.log(content.scrollTop, view,contentChildren.children[view].offsetTop - offsetAdjust);
                view++;
                if ( view >= contentChildren.children.length ) {
                  view = contentChildren.children.length-1; 
                } else {
                  let offsetNext = contentChildren.children[view].offsetTop;
                  console.log(content.scrollTop, view, offsetNext, varDiff('down', content.scrollTop, view, offsetNext));
                  scrollElement(content, offsetNext - offsetAdjust);
                }
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
        this.$postLink = () => {
          // setTimeout(function() {
          //   var frameContent = document.getElementsByClassName('parent-content')[0];
          //   var frameDimens = document.getElementById('svg-inner-frame').getBoundingClientRect();
          //   frameContent.style.height = frameDimens.height - 100 + "px";
          //   frameContent.style.width = frameDimens.width -70 + "px";
          //   console.log('hihi')
          // },0);
        }
      }
    })
    // .factory('isBottom', function( varDiff ) {
      
    //   return function(content) {
    //     var innerHeight = parseInt(getComputedStyle(content).getPropertyValue('height'));
    //     console.log(content.scrollTop, innerHeight, content.scrollHeight,varDiff('bottomFn', content.scrollTop, innerHeight, content.scrollHeight));
    //     return content.scrollTop + innerHeight >= content.scrollHeight-50;
    //   }
    // })
    .factory('varDiff', function() {
      var obj = {};
      return function varDiff(label, ...args) {
        var diffObj = {};
        args.forEach( (val, index)=> {
          if ( obj[label] && obj[label][index] ) {
            if ( !(obj[label][index] === val) ) {
              diffObj[index] = {before: obj[label][index], after:val};
              obj[label][index] = val;
              diffObj['maaanaaaaame'] = label;
            }
          } else {
            obj[label] ? obj[label][index] = val : obj[label] = {};
          }
        })
        
        return ( Object.keys(obj).length === 0 ) ? ("nodiff:"+label) : diffObj;
      }
    })
    .factory("scrollTimeout", function() {
      return {'fn':null}; 
    })
    .factory("scrollElement", function(varDiff, scrollTimeout) {
      var count = 0; 
      return function scrollIntoView (element, position) {
          if( count > 25 ) {
            count = 0; 
            return;
          }
          var y = element.scrollTop;
          y += Math.round( ( position - y ) * 0.4 );
          if ( Math.abs(y-position) <= 5 ) {
              count = 0; 
              console.log(varDiff("scrollEnd", element.scrollTop));
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
