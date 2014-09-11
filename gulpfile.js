var gulp = require( 'gulp' );
var watch = require( 'gulp-watch' );
var tsc = require( 'gulp-tsc' );
var jshint = require( 'gulp-jshint' );
var clean = require( 'gulp-rimraf' );
var uglify = require( 'gulp-uglify' );
var rename = require( 'gulp-rename' );
var changed = require( 'gulp-changed' );
var seq = require( 'run-sequence' );

var config =
{
   paths:
   {
      src:
      {
         root: "nnet-js/src",
         ts: ["nnet-js/src/**/*.ts", "!nnet-js/src/**/*.d.ts"],
         js: "nnet-js/src/**/*.js"
      },
      dest:
      {
         root: "nnet-js/bin",
         compiled: "nnet-js/bin/compiled/src",
         bundled: "nnet-js/bin/bundled",
         minified: "nnet-js/bin/bundled"
      }
   }
};
config.typescript =
{
   emitError: false,
   module: 'amd',
   //module: 'commonjs',
   removeComments: true,
   target: 'ES5',
   sourcemap: true,
   declaration: true,
   outDir: config.paths.dest.compiled
};
config.package = require( './package.json' );
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
      },
      //*/
      /*
      // compile debug and benchmark utilities as well
      {
         out: config.paths.dest.bundled + "/debug.js",
         //mainConfigFile: "./src/nnet/debug/debug.js",
         name: "nnet/debug/debug"
      }
      //*/
   ]
};

gulp.task( "default", ["build"] );

gulp.task( "watch" /*, ["build"]*/, function()
{
   gulp.watch( config.paths.src.ts, [ /*"compile-ts", */"generate-module-index-ts"] );
} );

gulp.task( "build", function(done)
{
   seq( "compile-ts", "build-js", done );
} );

gulp.task( "optimize", function(done)
{
   seq( "generate-module-index-js", "aggregate-declarations", done );

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

   // signal that we're done
   //done();
} );

gulp.task( "compress", ["optimize"], function()
{
   return gulp.src( [config.paths.dest.bundled + "/**/*.js", "!" + config.paths.dest.bundled + "/**/*.min.js"] )
      .pipe( rename( { suffix: '.min' } ) )
      .pipe( changed( config.paths.dest.minified ) )
      .pipe( uglify() )
      .pipe( gulp.dest( config.paths.dest.minified ) );
} );

gulp.task( "aggregate-declarations", function(done)
{
   var dts = require( 'dts-bundle' );
   dts.bundle( {
      name: "nnet",
      out: "../../bundled/nnet.d.ts",
      indent: '   ',
      main: config.paths.dest.compiled + "/_nnet.d.ts"
   } );
   _fs.writeFileSync( config.paths.dest.bundled + "/nnet.d.ts", _fs.readFileSync( config.paths.dest.bundled + "/nnet.d.ts" ).toString().replace( /__nnet\//g, "" ), 'utf-8' );

   done();
   //return gulp.src( config.paths.dest.compiled + "/**/*.d.ts" )
   //   .pipe( changed( config.paths.dest.compiled + ".d" ) )
   //   .pipe( gulp.dest( config.paths.dest.compiled + ".d" ) );
} );


//TODO: implement package task
gulp.task( "package", function(done)
{
   seq( "clean", "build", "optimize", "compress", done );
} );

gulp.task( "clean", function()
{
   return gulp.src( [
         config.paths.dest.compiled,
         config.paths.dest.compiled + ".d",
         config.paths.dest.bundled,
         config.paths.dest.minified
      ], { read: false } )
      .pipe( clean() );
} );

gulp.task( "compile-ts", ["generate-module-index-ts"], function()
{
   // Compile TypeScript files
   return gulp.src( config.paths.src.ts )
      //.pipe(watch())
      .pipe( changed( config.typescript.outDir, { extension: '.js' } ) )
      .pipe( tsc( config.typescript ) )
      .pipe( gulp.dest( config.typescript.outDir ) );
} );

gulp.task( "generate-module-index-ts", function(done)
{
   generateModuleRoots(
      './build/module-index-ts.mustache',
      config.paths.src.root,
      (/\.ts$/),
      ".ts",
      [".ts", ".d"]
   );

   done();
} );

gulp.task( "generate-module-index-js" /*, ["compile-ts"]*/, function(done)
{
   generateModuleRoots(
      './build/module-index-js.mustache',
      config.paths.dest.compiled,
      (/\.js$/),
      ".js"
   );

   done();
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