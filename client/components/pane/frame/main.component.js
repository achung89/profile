angular
  .module('pane')
    .component('mainFrame', {
      transclude:true,
      template:'<div id="pane" ng-transclude></div>',
      controller: function() {
        console.log('hihi');
      }
    })