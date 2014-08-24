module.exports = function(grunt)
{
   var main = {
      src: ["src/**/*.ts"],
      outDir: "bin/compiled",
      //watch: 'src',
      // Use to override the default options, http://gruntjs.com/configuring-tasks#options
      options: {
         target: 'es5',
         module: 'amd',
         sourceMap: true,
         declaration: true,
         removeComments: true
      },
   };
   var ts = {
      build: {},
      watch: {
         watch: "src"
      }
   };

   for(var task in ts)
   {
      for(var prop in main)
      {
         if(!(ts[task].hasOwnProperty( prop )))
         {
            ts[task][prop] = main[prop];
         }
      }
   }

   // load the task
   grunt.loadNpmTasks( "grunt-ts" );
   // Configure grunt here
   grunt.registerTask( "default", ["ts:build"] );
   grunt.initConfig( {
      ts: ts,
   } );
}