module.exports = function(grunt)
{
   grunt.loadNpmTasks( "grunt-browserify" );
   grunt.loadNpmTasks( "grunt-ts" );
   grunt.loadNpmTasks( 'grunt-contrib-uglify' );
   grunt.loadNpmTasks( 'grunt-contrib-copy' );

   grunt.registerTask( "default", ["build"] );

   // build
   grunt.registerTask( "build", ["gen-index:ts", "build-amd", "build-commonjs"] );
   grunt.registerTask( "build-amd", ["ts:build-amd", "gen-index:js-amd"] );
   grunt.registerTask( "build-commonjs", ["ts:build-commonjs", "gen-index:js-commonjs"] );

   // merge individual files and minify
   grunt.registerTask( "optimize", ["def", "requirejs", "browserify"] );

   // do all of the above and then minify
   grunt.registerTask( "complete", ["build", "optimize", "uglify:all"] );

   // generate index files
   grunt.registerMultiTask( "gen-index", function()
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

   grunt.registerMultiTask( "requirejs", function()
   {
      var r = require( "requirejs" );
      //console.log("Running require.js for " + this.target);
      r.optimize( this.data, console.out, console.err );
   } );

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
            compiledCommonJS: "<%= paths.dest.root %>/compiled-commonjs",
            compiledCommonJSMain: "<%= paths.dest.compiledCommonJS %>/src",
            compiledCommonJSTest: "<%= paths.dest.compiledCommonJS %>/test",
            compiledAMD: "<%= paths.dest.root %>/compiled-amd",
            compiledAMDMain: "<%= paths.dest.compiledAMD %>/src",
            compiledAMDTest: "<%= paths.dest.compiledAMD %>/test",
            bundledMain: "<%= paths.dest.root %>/dist",
            bundledTest: "<%= paths.dest.root %>/test",
            minified: "<%= paths.dest.root %>/dist"
         }
      },
      package: grunt.file.readJSON( './package.json' ),
      copyDefaults: function()
      {
         for(var taskName in config)
         {
            copyDefaults( config[taskName] );
         }
      }
   };

   config.ts = {
      options: {
         target: "es5",
         module: "amd",
         sourceMap: false,
         declaration: true,
         removeComments: true,
         default: {
            src: ["<%= paths.src.main %>/**/*.ts", "<%= paths.src.test %>/*.ts"],
            outDir: config.paths.dest.compiledAMD
         }
      },
      "build-amd": {},
      "build-commonjs": {
         //src: ["<%= paths.src.main %>/**/*.ts", "<%= paths.src.test %>/*.ts", "!<%= paths.src.test %>/*-amd.ts"],
         outDir: config.paths.dest.compiledCommonJS,
         options: {
            module: "commonjs"
         }
      },
      watch: {
         watch: config.paths.src.main
      },
      imports: {
         options:
         {
            compile: false
         }
      },
      "main-amd": {
         src: ["<%= paths.src.main %>/**/*.ts"],
         outDir: config.paths.dest.compiledAMDMain,
      },
      "test-amd": {
         src: ["<%= paths.src.test %>/*.ts"],
         outDir: config.paths.dest.compiledAMDTest,
         options: {
            sourceMap: false,
            declaration: false,
            removeComments: false
         }
      }
   };

   config.browserify = {
      dist: {
         src: ["<%= paths.dest.compiledCommonJSMain %>/**/*.js"],
         dest: "<%= paths.dest.bundledMain %>/nnet-browserify.js",
         options: {
            standalone: "nnet"
         }
      },
      test: {
         src: ["<%= paths.dest.compiledCommonJSTest %>/**/*.js", "!<%= paths.dest.compiledCommonJSTest %>/**/*-amd.js"],
         dest: "<%= paths.dest.bundledTest %>/test.js",
         options: {
            standalone: "nnet"
         }
      }
   };

   config.uglify = {
      options: {
         banner: "/** Copyright Malachi Griffie <malachi@nexussays.com> " +
            "This Source Code Form is subject to the terms of the Mozilla Public License, " +
            "v. 2.0. If a copy of the MPL was not distributed with this file, " +
            "You can obtain one at http://mozilla.org/MPL/2.0/. **/",
         mangle: true,
         compress: false,
         beautify: false,
         preserveComments: false,
         default: {
            files: [
               {
                  expand: true,
                  cwd: config.paths.dest.bundledMain,
                  src: ["*.js", "!*.min.js"],
                  dest: config.paths.dest.minified,
                  rename: function( path, name )
                  {
                     return require('path').join(path, name.replace( '.js', '.min.js' ));
                  }
               }
            ]
         }
         //can still remove define calls for interfaces after uglifying
         //define\("(?:[A-Z0-9_/]+)",\s?\[\s?"require",\s?"exports"\s?],\s?function\(\)\s?\{\s?\}\),?\s?
      },
      pretty: {
         options: {
            mangle: false,
            compress: true,
            beautify: true
         }
      },
      zip: {
         options: {
            report: "gzip"
         }
      },
      all: {

      }
   };

   config.copy = {
      definitions: {
         cwd: config.paths.src.main, // set working folder / root to copy
         src: "**/*.d.ts", // copy all files and subfolders
         dest: config.paths.dest.compiledAMDMain, // destination folder
         expand: true // required when using cwd
      },
      //definitions: {
      //   cwd: config.paths.dest.compiledAMD, // set working folder / root to copy
      //   src: "**/*.d.ts", // copy all files and subfolders
      //   dest: "<%= paths.dest.compiledAMD %>.d", // destination folder
      //   expand: true // required when using cwd
      //}
   };

   config["gen-index"] =
   {
      "ts": {
         template: './build/module-index-ts.mustache',
         root: config.paths.src.main,
         regex: (/\.ts$/),
         ext: ".ts",
         extArr: [".ts", ".d"]
      },
      "js-amd": {
         template: './build/module-index-js-amd.mustache',
         root: config.paths.dest.compiledAMDMain,
         regex: (/\.js$/),
         ext: ".js"
      },
      "js-commonjs": {
         template: './build/module-index-js-commonjs.mustache',
         root: config.paths.dest.compiledCommonJSMain,
         regex: ( /\.js$/ ),
         ext: ".js"
      }
   };

   // define after setting config initially so we can use existing config values
   config.requirejs =
   {
      options:
      {
         //r.js.cmd -o build.js optimize=none
         default:
         {
            out: config.paths.dest.bundledMain + "/nnet-amd.js",
            //appDir: config.paths.dest.compiledAMDMain,
            baseUrl: config.paths.dest.compiledAMDMain,
            //dir: "./bin",
            //exclude: [],
            //mainConfigFile: config.paths.dest.compiledAMDMain + "/nnet_.js",
            name: "_nnet",
            generateSourceMaps: false,
            optimize: "none"
         }
      },
      // just use default config above
      main: {},
      //r.js.cmd -o build.js optimize=none paths.requireLib=../node_modules/requirejs/require include=requireLib
      almond:
      {
         out: config.paths.dest.bundledMain + "/nnet-amd-embedded-almond.js",
         include: ["../../../lib/almond"],
         wrap: true
      },
      /*
      require:
      {
         out: config.paths.dest.bundledMain + "/nnet-amd-embedded-require.js",
         paths:
         {
            "requireLib": "../../../../node_modules/requirejs/require"
         },
         include: ["requireLib"]
      }
      */
   };

   config.def = {
      nnet:
      {
         name: "nnet",
         out: "../../dist/nnet.d.ts",
         indent: '   ',
         main: config.paths.dest.compiledAMDMain + "/_nnet.d.ts"
      }
   };

   function copyDefaults(taskObj)
   {
      if(taskObj && taskObj.options && taskObj.options.default)
      {
         // copy settings from main to all other tasks unless their override
         for(var targetName in taskObj)
         {
            if(targetName == "options")
            {
               continue;
            }
            var target = taskObj[targetName];
            if(target)
            {
               for(var prop in taskObj.options.default)
               {
                  if(!target.hasOwnProperty( prop ))
                  {
                     target[prop] = taskObj.options.default[prop];
                  }
                  /*
                  else if(prop == "options")
                  {
                     var options = task.default[prop];
                     for(var optProp in options)
                     {
                        if(target.options.hasOwnProperty( optProp ))
                        {
                           target.options[optProp] = options[optProp];
                        }
                     }
                  }
                  //*/
               }
            }
         }
      }
   }

   config.copyDefaults();
   grunt.initConfig( config );

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