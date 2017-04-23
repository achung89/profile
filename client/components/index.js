angular.module('profilePage', ['nav','pane','banner']);


angular.module('nav',[]);
angular.module('pane',[]);
angular.module('banner',[]);




window.addEventListener('resize', function() {
  //svgs text don't respond to window resize
  var mainContent = document.getElementsByClassName('cls-3-frame')[0];
  var svg = document.getElementsByClassName('svg-frame')[0];
  //resize scroll window
  var frameContent = document.getElementsByClassName('parent-content')[0];
  var frameDimens = document.getElementById('svg-inner-frame').getBoundingClientRect();
  frameContent.style.height = frameDimens.height - 100 + "px";
  frameContent.style.width = frameDimens.width - 70 + "px";
    
})