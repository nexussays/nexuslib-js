module.exports = function(grunt)
{
   grunt.loadNpmTasks( "grunt-browserify" );
   grunt.loadNpmTasks( "grunt-ts" );
   grunt.loadNpmTasks( 'grunt-contrib-uglify' );
   grunt.loadNpmTasks( 'grunt-contrib-copy' );

   var config =
   {
      paths:
      {
         src:
         {
            main: "nnet-js/src",
            test: "nnet-js/test",
            ts: ["<%= paths.src.main %>/**/*.ts", "!<%= paths.src.main %>/**/*.d.ts"],
            js: "<%= paths.src.main %>/**/*.js"
         },
         dest:
         {
            root: "nnet-js/bin",
            compiled: "<%= paths.dest.root %>/compiled",
            compiledMain: "<%= paths.dest.compiled %>/src",
            compiledTest: "<%= paths.dest.compiled %>/test",
            bundled: "<%= paths.dest.root %>/bundled",
            minified: "<%= paths.dest.root %>/bundled"
         }
      },
      package: grunt.file.readJSON( './package.json' )
   };

   config.ts = {
      options: {
         target: 'es5',
         module: 'amd',
         sourceMap: true,
         declaration: true,
         removeComments: true
      },
      default: {
         src: ["<%= paths.src.main %>/**/*.ts", "<%= paths.src.test %>/*.ts"],
         outDir: config.paths.dest.compiled
      },
      watch: {
         watch: "src"
      },
      imports: {
         options:
         {
            compile: false
         }
      },
      "main-only": {
         src: ["<%= paths.src.main %>/**/*.ts"],
         outDir: config.paths.dest.compiledMain,
      },
      "test-only": {
         src: ["<%= paths.src.test %>/*.ts"],
         outDir: config.paths.dest.compiledTest,
         options: {
            sourceMap: false,
            declaration: false,
            removeComments: false
         }
      }
   };

   config.browserify = {
      dist: {
         src: ["<%= paths.dest.compiled %>/src/**/*.js"],
         dest: "<%= paths.dest.bundled %>/nnet-browserify.js",
         options: {
            transform: ['deamdify'],
            standalone: "nnet"
         }
      }
   };

   config.uglify = {
      /*
         return gulp.src( [config.paths.dest.bundled + "/** /*.js", "!" + config.paths.dest.bundled + "/** /*.min.js"] )
      .pipe( rename( { suffix: '.min' } ) )
      .pipe( changed( config.paths.dest.minified ) )
      .pipe( uglify() )
      .pipe( gulp.dest( config.paths.dest.minified ) );
   */
      options: {
         banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
         src: 'src/<%= pkg.name %>.js',
         dest: 'build/<%= pkg.name %>.min.js'
      }
   };

   config.copy = {
      definitions: {
         cwd: config.paths.src.main, // set working folder / root to copy
         src: "**/*.d.ts", // copy all files and subfolders
         dest: config.paths.dest.compiledMain, // destination folder
         expand: true // required when using cwd
      },
      //definitions: {
      //   cwd: config.paths.dest.compiled, // set working folder / root to copy
      //   src: "**/*.d.ts", // copy all files and subfolders
      //   dest: "<%= paths.dest.compiled %>.d", // destination folder
      //   expand: true // required when using cwd
      //}
   };

   config.gen =
   {
      "ts-index": {
         template: './build/module-index-ts.mustache',
         root: config.paths.src.main,
         regex: (/\.ts$/),
         ext: ".ts",
         extArr: [".ts", ".d"]
      },
      "js-index": {
         template: './build/module-index-js.mustache',
         root: config.paths.dest.compiledMain,
         regex: (/\.js$/),
         ext: ".js"
      }
   };

   // define after setting config initially so we can use existing config values
   config.requirejs =
   {
      out: console.out,
      err: console.err,
      //r.js.cmd -o build.js optimize=none
      main:
      {
         out: config.paths.dest.bundled + "/nnet-amd.js",
         //appDir: config.paths.dest.compiled,
         baseUrl: config.paths.dest.compiled,
         //dir: "./bin",
         //exclude: [],
         //mainConfigFile: config.paths.dest.compiled + "/nnet_.js",
         name: "_nnet",
         generateSourceMaps: false,
         optimize: "none"
      },
      builds:
      [
         // just use default config above
         {},
         //r.js.cmd -o build.js optimize=none paths.requireLib=../node_modules/requirejs/require include=requireLib
         {
            out: config.paths.dest.bundled + "/nnet-amd-with-almond.js",
            include: ["../../../lib/almond"],
            //TODO: turn this back on once everything is properly wrapped
            //wrap: true
         },
         //*
         {
            out: config.paths.dest.bundled + "/nnet-amd-with-require.js",
            paths:
            {
               "requireLib": "../../../../node_modules/requirejs/require"
            },
            include: ["requireLib"]
         }
      ]
   };

   config.def = {
      nnet:
      {
         name: "nnet",
         out: "../../bundled/nnet.d.ts",
         indent: '   ',
         main: config.paths.dest.compiledMain + "/_nnet.d.ts"
      }
   };

   // copy settings from main to all other tasks unless their override
   for(var targetName in config.ts)
   {
      var target = config.ts[targetName];
      for(var prop in config.ts.default)
      {
         if(!target.hasOwnProperty( prop ))
         {
            target[prop] = config.ts.default[prop];
         }
         /* else if(prop == "options")
         {
            var options = config.ts.default[prop];
            for(var optProp in options)
            {
               if(target.options.hasOwnProperty( optProp ))
               {
                  target.options[optProp] = options[optProp];
               }
            }
         }*/
      }
   }

   grunt.initConfig( config );

   grunt.registerTask( "default", ["ts:default"] );

   grunt.registerMultiTask( "gen", function()
   {
      generateModuleRoots(
         this.data.template,
         this.data.root,
         this.data.regex,
         this.data.ext,
         this.data.extArr
      );
   } );

   grunt.registerMultiTask( "def", function()
   {
      var dts = require( 'dts-bundle' );
      dts.bundle( this.data );
      var path = require( "path" );
      var file = path.resolve( this.data.main, "../", this.data.out );
      _fs.writeFileSync( file, _fs.readFileSync( file ).toString().replace( /__nnet\//g, "" ), 'utf-8' );
   } );

   grunt.registerTask( "rjs", function()
   {
      var r = require( "requirejs" );

      function requirejsOptimize(resultingConfig)
      {
         resultingConfig = resultingConfig || {};

         for(var prop in config.requirejs.main)
         {
            if(!(resultingConfig.hasOwnProperty( prop )))
            {
               resultingConfig[prop] = config.requirejs.main[prop];
            }
         }

         // now run the optimizer
         r.optimize( resultingConfig, config.requirejs.out, config.requirejs.err );
      }

      config.requirejs.builds.forEach( requirejsOptimize );
   } );

   //
   // Utility functions
   //

   var _fs = require( 'fs' );
   var _path = require( 'path' );
   var _mustache = require( 'mustache' );

   function generateModuleRoots(template, root, fileFilter, ext, basename)
   {
      basename = basename || ext;

      var template = _fs.readFileSync( template ).toString();
      _mustache.parse( template );

      var src = getDirs( root, "nnet" );
      src.forEach( function(item)
      {
         var dir = _path.join( root, item );
         var files = getFiles( root, item, fileFilter );
         //get parent directory and create js file with name of the current dir
         var newFileName = "_" + _path.basename( item ) + ext;
         var newFile = _path.join( _path.resolve( dir, ".." ), newFileName );
         if(files.length > 0)
         {
            files = files.map( function(name)
            {
               // to account for .d.ts files when generating TypeScript code
               if(Array.isArray( basename ))
               {
                  for(var x = 0; x < basename.length; ++x)
                  {
                     name = _path.basename( name, basename[x] );
                  }
               }
               else
               {
                  name = _path.basename( name, basename );
               }
               return { "name": name.replace( /^_|_$/g, "" ), "file": name };
            } );

            //console.log(newFile);
            //console.log(files);

            var model = { "path": "./" + item.split( "/" ).last(), "files": files };
            if(newFileName == config.package.main)
            {
               model["version"] = config.package.version;
            }

            var renderedFile = _mustache.render( template, model );

            //console.log(renderedFile + "");
            _fs.writeFileSync( newFile, renderedFile, 'utf-8' );
         }
      } );
   }

   function getDirs(baseExclude, baseInclude)
   {
      var result = [baseInclude];
      var dirs = [baseInclude];
      while(dirs.length > 0)
      {
         var dir = dirs.pop();
         var contents = _fs.readdirSync( _path.normalize( _path.join( baseExclude, dir ) ) );
         for(var x = 0; x < contents.length; ++x)
         {
            var name = contents[x];
            var file = dir + "/" + name; //path.join uses \ on Windows
            var stats = _fs.statSync( _path.join( baseExclude, file ) );
            if(name[0] != "." && stats.isDirectory())
            {
               dirs.push( file );
               result.push( file );
            }
         }
      }
      // reverse sort so higher depths are first
      return result.sort().reverse();
   }

   function getFiles(baseExclude, dir, allowed)
   {
      var contents = _fs.readdirSync( _path.normalize( _path.join( baseExclude, dir ) ) );
      for(var x = contents.length - 1; x >= 0; --x)
      {
         var name = contents[x];
         var file = _path.join( dir, name );
         var filePath = _path.join( baseExclude, file );
         var stats = _fs.statSync( filePath );
         if(!stats.isFile() || !allowed.test( file ))
         {
            contents.splice( x, 1 );
         }
      }
      return contents.sort();
   }

   Array.prototype.last = function last()
   {
      return this.length > 0 ? this[this.length - 1] : null;
   };
}