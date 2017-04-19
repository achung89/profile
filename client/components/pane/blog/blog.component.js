angular
  .module('pane')
    .component('blogsPane', {
      controllerAs: 'blogs',
      templateUrl:'files/pane/blog/blogs.html',
      controller: function($http) {
        this.blogPosts = [];
        $http.get('api/medium').then( ( feed ) => { 
          console.log(feed);
          ({data:
            {payload:
              {references:
                {Post
                }}}} = feed);
          
          for ( let key in Post ) {
            let {createdAt, content:{subtitle:preview}, title} = Post[key]
            this.blogPosts.push({createdAt, preview, title});
          }
        })
      }
    })
    // .component('blog', {
    //   controllerAs: 'blog',
    // })