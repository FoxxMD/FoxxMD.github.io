module.exports = function(grunt)
{
    grunt.initConfig({
       uncss:{
           dist:{
               options:{
                   stylesheets:['assets/css/bootstrap.min.css','assets/css/font-awesome.min.css'],
                   ignore:[':hover','.fade.in', '.fade', /tooltip/]
               },
               files:{
                   'assets/css/tidyB.css':['index.html','app/templates/home.html','app/templates/photos.html','app/templates/projects.html','app/templates/work.html']
               }
           }
       },
        cssmin:{
            combine:{
                files:{
                    'assets/css/combinedCss.css':['assets/css/tidyB.css','assets/css/angular.css','assets/css/app.css']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['uncss','cssmin']);
};

