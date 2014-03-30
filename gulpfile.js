var gulp   =  require('gulp');
var watch  =  require('gulp-watch');
var tsc    =  require('gulp-tsc');
var jshint =  require('gulp-jshint');
var clean  =  require('gulp-clean');
var uglify =  require('gulp-uglify');
var rename =  require('gulp-rename');

var config = {
   paths: {
      src: {
         ts: "src/**/*.ts",
         js: "src/**/*.js"
      },
      dest: {
         root: "bin",
         compiled: "bin/js",
         bundled: "bin/js-bundle",
         minified: "bin/js-min"
      }
   }
};

gulp.task("default", ["compile"]);

gulp.task("build", ["compress"]);

gulp.task("compile", function()
{
   // just straight copy js files
   gulp.src(config.paths.src.js)
      .pipe(gulp.dest(config.paths.dest.compiled));
   
   // now do TypeScript files
   return gulp.src(config.paths.src.ts)
      //.pipe(watch())
      .pipe(tsc())
      .pipe(gulp.dest(config.paths.dest.compiled));
});

gulp.task("lint", ["compile"], function()
{
   return gulp.src(config.paths.dest.compiled)
      .pipe(jshint())
      .pipe(jshint.reporter("jshint-stylish"));
});

gulp.task("bundle", ["lint"], function()
{
   var r = require("requirejs");

   function requirejsOptimize(resultingConfig)
   {
      resultingConfig = resultingConfig || {};
      var defaultConfig = {
         baseUrl: config.paths.dest.compiled,
         out: config.paths.dest.bundled,// + "/nnet.js",
         //appDir: "./src",
         //dir: "./bin",
         exclude: [],
         //mainConfigFile: "./src/main.js",
         name: "main",
         generateSourceMaps: true,
         optimize: "none"
      };

      for(var prop in defaultConfig)
      {
         if(!(resultingConfig.hasOwnProperty(prop)))
         {
            resultingConfig[prop] = defaultConfig[prop];
         }
      }

      // now run the optimizer
      r.optimize(resultingConfig, console.log, console.err);
   }

   //r.js.cmd -o build.js optimize=none
   requirejsOptimize();

   //r.js.cmd -o build.js optimize=none paths.requireLib=../node_modules/requirejs/require include=requireLib
   requirejsOptimize({
      out: "./bin/nnet-with-require.js",
      paths:
      {
         "requireLib": "../node_modules/requirejs/require"
      },
      include: ["requireLib"]
   });

   // build debug js
   requirejsOptimize({
      out: "./bin/debug.js",
      //mainConfigFile: "./src/nnet/debug/debug.js",
      name: "nnet/debug/debug"
   });
});

gulp.task("compress", ["bundle"], function()
{
   return gulp.src(config.paths.dest.bundled)
      .pipe(uglify())
      .pipe(gulp.dest(config.paths.dest.minified))
});

gulp.task("clean", function()
{
   gulp.src(config.paths.dest.root, {read: false}).pipe(clean());
});