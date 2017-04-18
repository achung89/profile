angular
  .module('pane')
    .component('projectsPane', {
      controllerAs: 'projPane',
      templateUrl:'client/components/pane/projects/projects.html',
      controller: function() {
        this.projects = [
          {
            name: 'PlanEats',
            link: [
              ['github','https://github.com/daftFunc/planEats'],
              ['website', 'http://www.planEats.xyz'],
            ],
            description: 'Meal planning application with a recipe book, automated grocerylist, and cooking instructions for your next meal',
            contributions:['Fast single page application interface (React, Webpack)', 
                       'Responsive web-design (media queries, Bootstrap)', 
                       'Authentication/authorization (Auth0 lock, React router 4)',
                       'Real time data/UI (PostgreSQL, Sequelize)',
                       'Robust back-end testing environment (Mocha, Chai)',
                       'Google Calendar integration',
                       'Efficient deployment setup (Docker)'
            ]
          },
          {
            name:'SPAR component',
            link:[
              ['github', 'https://github.com/achung89/spar-component'],
            ],
            description:'Declarative SPA custom elements made with WebComponents technology',
            contributions:['Non-blocking synchronous content loading and caching of routes',
                        'Rigorous testing environment (WCT, Mocha, Chai)'
                        ]
          },
          {
            name:'Dino Task',
            link:[
              ['github','https://github.com/Keep-Fit/hrr20-dino'],
              ['website','']
            ],
            description:'Online to-do list application',
            contributions:['Authentication/authorization (bcrypt-node, express-sessions, react router)',
                        'Sleek login page design',
                        'Drag and drop feature for individual routines']
          },
          {
            name: 'KeepFit',
            link:[
              ['github','https://github.com/Keep-Fit/Keep-Fit'],
              ['website','keep-fit-app.herokuapp.com']
            ],
            description:'Fitness logging application'
          }
        ]
      }
    })
    .component('project',{
      require: {
        parent:'^projectsPane'
      },
      template: `<div>
                  <div class="project-header">
                    <div class="project-name">{{project.name}}</div>
                    <div class="project-links" ng-repeat="link in project.link"><a href="{{link[1]}}">{{link[0]}}</a></div>
                  </div>
                  <div class="project-description">{{project.description}}</div>
                  <ol class="project-contributions" >
                    <li ng-repeat="contrib in project.contributions">{{contrib}}</li>
                  </ol>
                </div>`,
      controllerAs:'project',
      controller: function($attrs) {
        this.$postLink = function() {
          console.log(this.parent.projects)
          console.log($attrs.id, this.parent.projects[$attrs.id]);
          ['name','link','description','contributions'].forEach( ( key ) => {
          
            this[key] = this.parent.projects[+$attrs.id][key];
          })
        }  
      }
    })