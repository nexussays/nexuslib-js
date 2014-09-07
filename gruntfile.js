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
      },
      imports: {
         //watch:"src",
         options:
         {
            compile: false
         }
      }
   };

   for(var taskName in ts)
   {
      for(var prop in main)
      {
         if(!(ts[taskName].hasOwnProperty( prop )))
         {
            ts[taskName][prop] = main[prop];
         }
         else if(prop == "options")
         {
            var options = main[prop];
            for(var opt in options)
            {
               ts[taskName][prop][opt] = options[opt];
            }
         }
      }
   }

   grunt.loadNpmTasks( "grunt-browserify" );
   grunt.loadNpmTasks( "grunt-ts" );
   // Configure grunt here
   grunt.registerTask( "default", ["ts:build"] );
   grunt.initConfig( {
      ts: ts,
      browserify: {
         dist: {
            src: ["bin/compiled/**/*.js"],
            dest: "bin/bundled/nnet-browserify.js",
            options: {
               transform: ['deamdify'],
               standalone: "nnet"
            }
         }
      }
   } );
}