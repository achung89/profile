angular
  .module('pane')
    .component('projectsPane', {
      templateUrl:'client/components/pane/projects/projects.html',
      controller: function() {
        console.log('hihi');
      }
    })
    .component('project',{
      templateUrl:'client/components/pane/projects/project.html',
      controller: function() {
        console.log('hoho');
      }
    })