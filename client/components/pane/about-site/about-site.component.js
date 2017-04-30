angular.module('pane')
  .component('aboutSite', {
    templateUrl:'/pane/about-site/about-site.html',
    controller: function(ModalFact) {
      ModalFact.content="/pane/about-site/stack-logo.png";
    }
  })