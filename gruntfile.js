module.exports = function(grunt)
{
   grunt.registerTask( "default", ["build"] );

   var config =
   {
      paths:
      {
         dest:
         {
            root: "nnet-js/bin",
            commonjs: "<%= paths.dest.root %>/compiled-commonjs",
            amd: "<%= paths.dest.root %>/compiled-amd"
         },
         editor:
         {
            srcDir: "nnet-js/test",
            srcFile: ["<%= paths.editor.srcDir %>/editor.ts", "<%= paths.editor.srcDir %>/events.ts"],
            srcBrowserify: "<%= paths.editor.dest.commonjs %>/editor.js",
            dest:
            {
               commonjs: "<%= paths.dest.commonjs %>/editor",
               bundled: "<%= paths.dest.root %>/editor",
            }
         },
         main:
         {
            srcDir: "nnet-js/src",
            srcFile: "<%= paths.main.srcDir %>/_nnet.ts",
            srcBrowserify: "<%= paths.main.dest.commonjs %>/_nnet.js",
            dest:
            {
               amd: "<%= paths.dest.amd %>/src",
               commonjs: "<%= paths.dest.commonjs %>/src",
               bundled: "<%= paths.dest.root %>/dist",
               minified: "<%= paths.dest.root %>/dist"
            }
         }
      },
      package: grunt.file.readJSON( './package.json' )
   };

   //
   // build
   //
   grunt.registerTask( "build", ["gen-index:ts", "ts:imports", "build:commonjs", "build:editor"] );
   grunt.registerTask( "build:commonjs", ["ts:commonjs", "gen-index:js-commonjs"] );
   grunt.registerTask( "build:editor", ["ts:editor"] );

   //
   // merge individual files and minify
   //
   grunt.registerTask( "optimize", ["dts", "requirejs", "browserify"] );

   //
   // do all of the above and then minify
   //
   grunt.registerTask( "complete", ["build", "build:amd", "optimize", "uglify:all"] );
   // amd build is only for distribution
   grunt.registerTask( "build:amd", ["ts:amd", "gen-index:js-amd"] );

   //
   // typescript build using external module
   //
   grunt.loadNpmTasks( "grunt-ts" );
   config.ts = {
      options: {
         target: "es5",
         module: "commonjs",
         sourceMap: false,
         declaration: true,
         removeComments: true,
         default: {
            src: config.paths.main.srcFile,
            outDir: config.paths.main.dest.commonjs,
            //reference: "<%= paths.main.srcDir %>/references.ts"
         }
      },
      amd: {
         outDir: config.paths.main.dest.amd,
         options: {
            module: "amd"
         }
      },
      commonjs: {

      },
      watch: {
         watch: [config.paths.main.srcDir, config.paths.editor.srcDir]
      },
      imports: {
         src: "<%= paths.main.srcDir %>/**/*.ts",
         options: {
            compile: false
         }
      },
      editor: {
         src: config.paths.editor.srcFile,
         outDir: config.paths.editor.dest.commonjs,
         options: {
            sourceMap: false,
            declaration: false,
            removeComments: false
         }
      }
   };

   //
   // browserify to bundle the commonjs versions
   //
   grunt.loadNpmTasks( "grunt-browserify" );
   config.browserify = {
      dist: {
         src: config.paths.main.srcBrowserify,
         dest: "<%= paths.main.dest.bundled %>/nnet-browserify.js",
         options: {
            browserifyOptions: {
               standalone: "nnet",
               //paths: ["./src/nnet"]
            },
            //aliasMappings: {
            //   cwd: "src",
            //   src: ["nnet/**/*.js"]
            //}
         }
      },
      editor: {
         src: config.paths.editor.srcBrowserify,
         dest: "<%= paths.editor.dest.bundled %>/editor.js",
         options: {
            transform: ["browserify-shim"],
            external: ["nnet"],
            shim: {
               nnet: {
                  path: "foo/bar/path/nnet-browserify.js"
               }
            }
            //alias: ["../src/nnet/**/*.js:nnet"]
         }
      }
   };

   //
   // generate index files
   //
   grunt.registerMultiTask( "gen-index", function()
   {
      try
      {
         generateModuleRoots(
            this.data.template,
            this.data.root,
            this.data.regex,
            this.data.ext,
            this.data.extArr
         );
      }
      catch(e)
      {
         console.log( e.message.red );
      }
   } );
   config["gen-index"] =
   {
      "ts": {
         template: './build/module-index-ts.mustache',
         root: config.paths.main.srcDir,
         regex: (/\.ts$/),
         ext: ".ts",
         extArr: [".ts", ".d"]
      },
      "js-amd": {
         template: './build/module-index-js-amd.mustache',
         root: config.paths.main.dest.amd,
         regex: (/\.js$/),
         ext: ".js"
      },
      "js-commonjs": {
         template: './build/module-index-js-commonjs.mustache',
         root: config.paths.main.dest.commonjs,
         regex: (/\.js$/),
         ext: ".js"
      }
   };


   //
   // merge .d.ts files into a single file
   //
   grunt.registerMultiTask( "dts", function()
   {
      var dts = require( 'dts-bundle' );
      dts.bundle( this.data );
      var path = require( "path" );
      var file = path.resolve( this.data.main, "../", this.data.out );
      _fs.writeFileSync( file, _fs.readFileSync( file ).toString().replace( /__nnet\//g, "" ), 'utf-8' );
   } );
   config.dts = {
      nnet:
      {
         name: "nnet",
         out: "../../dist/nnet.d.ts",
         indent: '   ',
         main: config.paths.main.dest.amd + "/_nnet.d.ts"
      }
   };

   //
   // minify the generated javascript
   //
   grunt.loadNpmTasks( 'grunt-contrib-uglify' );
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
                  cwd: config.paths.main.dest.bundled,
                  src: ["*.js", "!*.min.js"],
                  dest: config.paths.dest.minified,
                  rename: function(path, name)
                  {
                     return require( 'path' ).join( path, name.replace( '.js', '.min.js' ) );
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

   //
   // Copy any .d.ts files from src to dest
   //
   //grunt.loadNpmTasks( 'grunt-contrib-copy' );
   //config.copy = {
   //   definitions: {
   //      cwd: config.paths.main.srcDir, // set working folder / root to copy
   //      src: "**/*.d.ts", // copy all files and subfolders
   //      dest: config.paths.main.dest.commonjs, // destination folder
   //      expand: true // required when using cwd
   //   },
   //};

   //
   // clean
   //
   grunt.loadNpmTasks( 'grunt-contrib-clean' );
   config.clean = {
      options: {
         default: {
            src: [
               "./.tscache",
               "./**/.baseDir.ts",
               config.paths.dest.root,
               "<%= paths.main.srcDir %>/**/*.js.map",
               "<%= paths.main.srcDir %>/**/*.js",
               "<%= paths.main.srcDir %>/**/*.d.ts",
               "<%= paths.editor.srcDir %>/**/*.js.map",
               "<%= paths.editor.srcDir %>/**/*.js",
               "<%= paths.editor.srcDir %>/**/*.d.ts"
            ]
         }
      },
      build: {

      },
      // this isn't working
      //test: {
      //   options: {
      //      'no-write': true
      //   }
      //}
   };

   //
   // bundle amd generated js
   //
   grunt.registerMultiTask( "requirejs", function()
   {
      var r = require( "requirejs" );
      //console.log("Running require.js for " + this.target);
      r.optimize( this.data, console.out, console.err );
   } );
   config.requirejs =
   {
      options:
      {
         //r.js.cmd -o build.js optimize=none
         default:
         {
            out: config.paths.main.dest.bundled + "/nnet-amd.js",
            //appDir: config.paths.main.dest.amd,
            baseUrl: config.paths.main.dest.amd,
            //dir: "./bin",
            //exclude: [],
            //mainConfigFile: config.paths.main.dest.amd + "/nnet_.js",
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
         out: config.paths.main.dest.bundled + "/nnet-amd-embedded-almond.js",
         include: ["../../../lib/almond"],
         wrap: true
      },
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
               }
            }
         }
      }
   }

   // copy defaults to other tasks
   for(var taskName in config)
   {
      copyDefaults( config[taskName] );
   }

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