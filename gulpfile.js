var gulp   =  require('gulp');
var watch  =  require('gulp-watch');
var tsc    =  require('gulp-tsc');
var jshint =  require('gulp-jshint');
var clean  =  require('gulp-clean');
var uglify =  require('gulp-uglify');
var rename =  require('gulp-rename');
var changed = require('gulp-changed');

var config =
{
   paths:
   {
      src:
      {
         root: "src",
         ts: "src/**/*.ts",
         js: "src/**/*.js"
      },
      dest:
      {
         root: "bin",
         compiled: "bin/js",
         bundled: "bin/js-bundle",
         minified: "bin/js-min"
      }
   }
};
// define after setting config initially so we can use existing config values
config["requirejs"] = 
{
   out: console.out,
   err: console.err,
   //r.js.cmd -o build.js optimize=none
   main:
   {
      baseUrl: config.paths.dest.compiled,
      out: config.paths.dest.bundled + "/nnet.js",
      //appDir: "./src",
      //dir: "./bin",
      exclude: [],
      //mainConfigFile: "./src/main.js",
      name: "main",
      generateSourceMaps: true,
      optimize: "none"
   },
   builds:
   [
      // just use default config above
      {},
      //r.js.cmd -o build.js optimize=none paths.requireLib=../node_modules/requirejs/require include=requireLib
      {
         out: config.paths.dest.bundled + "/nnet-with-require.js",
         paths:
         {
            "requireLib": "../../node_modules/requirejs/require"
         },
         include: ["requireLib"]
      },
      // compile debug and benchmark utilities as well
      {
         out: config.paths.dest.bundled + "/debug.js",
         //mainConfigFile: "./src/nnet/debug/debug.js",
         name: "nnet/debug/debug"
      }
   ]
};

gulp.task("default", ["compile"]);

gulp.task("build", ["compress"]);

gulp.task("compile-ts", function()
{
   // Compile TypeScript files
   return gulp.src(config.paths.src.ts)
      //.pipe(watch())
      .pipe(changed(config.paths.src.root, { extension: '.js' }))
      .pipe(tsc())
      .pipe(gulp.dest(config.paths.src.root));
});

gulp.task("compile", ["compile-ts"], function()
{
   // just straight copy js files
   return gulp.src(config.paths.src.js)
      //.pipe(jshint())
      //.pipe(jshint.reporter("jshint-stylish"))
      .pipe(changed(config.paths.dest.compiled))
      .pipe(gulp.dest(config.paths.dest.compiled));
});

gulp.task("bundle", ["compile"], function(done)
{
   var r = require("requirejs");

   function requirejsOptimize(resultingConfig)
   {
      resultingConfig = resultingConfig || {};

      for(var prop in config.requirejs.main)
      {
         if(!(resultingConfig.hasOwnProperty(prop)))
         {
            resultingConfig[prop] = config.requirejs.main[prop];
         }
      }

      // now run the optimizer
      r.optimize(resultingConfig, config.requirejs.out, config.requirejs.err);
   }

   config.requirejs.builds.forEach(requirejsOptimize);

   // signal that we're done
   done();
});

gulp.task("compress", ["bundle"], function()
{
   return gulp.src(config.paths.dest.bundled + "/**/*.js")
      .pipe(rename({suffix: '.min'}))
      .pipe(changed(config.paths.dest.minified))
      .pipe(uglify())
      .pipe(gulp.dest(config.paths.dest.minified));
});

gulp.task("clean", function()
{
   return gulp.src(config.paths.dest.root, {read: false})
      .pipe(clean());
});