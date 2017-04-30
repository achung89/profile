angular
  .module('pane')
    .component('blogsPane', {
      controllerAs: 'blogs',
      templateUrl:'pane/blog/blogs.html',
      controller: function ( $http, BlogPosts, Years, ModalFact ) {
        ModalFact.content = null;
        this.blogPosts = BlogPosts;
        this.years = Years;
        this.description = "Andrew Chung's stories on medium";
        !this.blogPosts.length &&
          $http.get('api/medium').then( ( feed ) => { 
            ({data:{items}} = feed);
            
            var yearsSet = new Set();
            items.forEach ( (blog) => {
              let {created, url, title} = blog;
              let timestamp = new Date(created);
              let year = timestamp.getFullYear();
              let month = timestamp.getMonth();
              let date = timestamp.getDate();

              created = {month,date,year};  
              yearsSet.add(year);
              this.blogPosts.push({created, url, title}); 
            });
            this.years.push(...yearsSet);
        });
      }
    })
    .factory('BlogPosts', function() {
      return []
    })
    .factory('Years', function() {
      return [];
    })
    .directive('loading',   ['$http' ,function ($http) {
      return {
        restrict: 'A',
        link: function ( scope, element, attrs ) {
          scope.isLoading = function () {
            return $http.pendingRequests.length === 0;
          };

          scope.$watch(scope.isLoading, function ( loaded ) {
            if ( loaded ) {
              element[0].setAttribute('style','display:none;');
            } 
          });
        }
      };
    }]);
