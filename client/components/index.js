angular.module('profilePage', ['nav','pane','banner'])
// debugging tool, returns any changes to parameters
  .factory('varDiff', function varDiff() {
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

angular.module('nav',[]);
angular.module('pane',[]);
angular.module('banner',[]);




window.addEventListener('resize', function() {
  //resize scroll window
  var frameContent = document.getElementsByClassName('parent-content')[0];
  var frameDimens = document.getElementById('svg-inner-frame').getBoundingClientRect();
  frameContent.style.height = frameDimens.height - 100 + "px";
  frameContent.style.width = frameDimens.width - 70 + "px";
    
})