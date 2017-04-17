angular
  .module('nav')
    .component('navTab', {
      templateUrl:'client/components/nav/nav-tab.html',
      controllerAs:'tab',
      templateNamespace: 'svg',
      controller: function ( $attrs, navState, $element ) {
        this.pageName = $attrs.pageName;
        this.changeView = function ( page ) {
          // $element.('what');
          navState.push(page);
          console.log('hihi');
          // $attrs.pageName="whaaa";
        }
      }
    })
    .factory('navState',function(){
      return [];
    })

