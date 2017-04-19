angular
  .module('nav')
    .component('navTab', {
      templateUrl:'files/nav/nav-tab.html',
      controllerAs:'tab',
      controller: function ( $attrs, navState, $location ) {
        this.$postLink = function() {
          this.pageName = $attrs.pageName;
          console.log($attrs.path);
          this.path = $attrs.path;  
        }
        this.changeView = function ( page ) {
          $location.path(page);
        }
      }
    })
    .factory('navState',function(){
      return [];
    })
    .controller('NavController', function() {
      this.tabs = [
        ['Portfolio',''],
        ['Blog', 'blog'],
        ['Snippets','snippets'],
        ['About me', 'aboutme']
      ]
    })

