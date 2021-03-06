angular
  .module('pane')
    .component('projectsPane', {
      controllerAs: 'projPane',
      templateUrl:'pane/projects/projects.html',
      controller: function( $scope, Projects, ModalFact, view ) {
        this.index = view.index;
        this.projects = Projects;
        // this.$watch('index', function(old, newVal) {
        //   console.log(old,newVal);
        // })
        this.$doCheck = function() {
          this.index = view.index;
          ModalFact.content = this.projects[this.index].image || null;
        }
      }
    })
    .component('project', {
      require: {
        parent:'^projectsPane'
      },
      controllerAs:'project',
      controller: function($attrs) {
        this.$postLink = function() {

          ['name','link','description','contributions'].forEach( ( key ) => {
            this[key] = this.parent.projects[+$attrs.id][key];
          })
        }  
      },
      template: `<div class="project">
                  <br>
                   <div class="project-header">
                     <h1 class="project-name">{{project.name}}</h1>
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     <div class="project-links" ng-repeat="link in project.link">
                       <a href="{{link[1]}}">{{link[0]}}</a>&nbsp;&nbsp;&nbsp;
                     </div>
                   </div>
                   <p>
                    <div class="project-description">{{project.description}}</div>
                    <br />
                    <ol class="project-contributions">
                      <li ng-repeat="contrib in project.contributions">{{contrib}}</li>
                    </ol>
                   </p>
                 </div>`
    })

    .factory('Projects', function(){
      return [
          {
            name: 'PlanEats',
            link: [
              ['github','https://github.com/daftFunc/planEats'],
              ['website', 'http://www.planeats.xyz'],
            ],
            description: 'Meal planning application with a recipe book, automated grocerylist, and cooking instructions for your next meal',
            contributions:[
                        'Fast single page application interface (React, Webpack)', 
                       'Responsive web-design (media queries, Bootstrap)', 
                       'Authentication/authorization (Auth0 lock, React router 4)',
                       'Back-end setup (PostgreSQL, Sequelize)',
                       'Database testing environment (Mocha, Chai)',
                       'Google Calendar integration',
                       'Deployment configuration (Docker)'
            ],
            image: 'pane/projects/modal/planeats.jpg'
          },
          {
            name:'SPAR component',
            link:[
              ['github', 'https://github.com/achung89/spar-component'],
            ],
            description:'Declarative SPA custom elements made with WebComponents technology',
            contributions: [
                        'Non-blocking synchronous content loading and caching of routes',
                        'Route-test environment (WCT, Mocha, Chai)'
            ],
          },
          {
            name:'Dino Task',
            link:[
              ['github','https://github.com/Keep-Fit/hrr20-dino'],
              ['website','']
            ],
            description:'Online to-do list application',
            contributions: [
                        'Authentication/authorization (bcrypt-node, express-sessions, react router)',
                        'Sleek login page design',
                        'Drag and drop feature for individual routines'
            ]
          },
          {
            name:'assignEs6Class',
            link:[
              ['github', 'https://github.com/achung89/assignEs6Class'],
              ['NPM', 'https://www.npmjs.com/package/assign-es6-class']
            ],
            description:'Library for shallow merging Es6 classes',
            contributions:['Bundling configuration (Rollup, Gulp)']
          },
          // {
          //   name: 'KeepFit',
          //   link:[
          //     ['github','https://github.com/Keep-Fit/Keep-Fit'],
          //     ['website','https://keep-fit-app.herokuapp.com']
          //   ],
          //   description:'Fitness logging application',
          //   image:'pane/projects/modal/keep-fit.jpg'
          // }
        ]
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