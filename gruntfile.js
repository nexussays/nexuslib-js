module.exports = function(grunt)
{
   var main = {
      src: ["nnet-js/src/**/*.ts", "nnet-js/test/*.ts"],
      outDir: "nnet-js/bin/compiled",
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
         options:
         {
            compile: false
         }
      },
      main: {
         src: ["nnet-js/src/**/*.ts"],
         outDir: "nnet-js/bin/compiled/src",
      },
      test: {
         src: ["nnet-js/test/*.ts"],
         outDir: "nnet-js/bin/compiled/test",
         options: {
            declaration: false,
            removeComments: false
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
   grunt.registerTask( "default", ["ts:build"] );
   grunt.initConfig( {
      ts: ts,
      browserify: {
         dist: {
            src: ["nnet-js/bin/compiled/src/**/*.js"],
            dest: "nnet-js/bin/bundled/nnet-browserify.js",
            options: {
               transform: ['deamdify'],
               standalone: "nnet"
            }
         }
      }
   } );
}