module.exports = function(grunt)
{
   // load the task
   grunt.loadNpmTasks( "grunt-ts" );
   // Configure grunt here
   grunt.registerTask( "default", ["ts:build"] );
   grunt.initConfig( {
      ts: {
         // A specific target
         build: {
            src: ["src/**/*.ts"],
            outDir: "bin/compiled",
            //watch: 'test',
            // Use to override the default options, http://gruntjs.com/configuring-tasks#options
            options: {
               target: 'es5',
               module: 'amd',
               sourceMap: true,
               declaration: true,
               removeComments: true
            },
         },
         // Another target
         dist: {
            src: ["test/work/**/*.ts"],
            // Override the main options for this target
            options: {
               sourceMap: false,
            }
         },
      },
   } );
}