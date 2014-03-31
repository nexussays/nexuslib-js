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
         compiled: "bin/compiled",
         bundled: "bin/bundled",
         minified: "bin/bundled"
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
      out: config.paths.dest.bundled + "/nnet.js",
      //appDir: config.paths.dest.compiled,
      baseUrl: config.paths.dest.compiled,
      //dir: "./bin",
      //exclude: [],
      //mainConfigFile: "./src/main.js",
      name: "main",
      generateSourceMaps: false,
      optimize: "none"
   },
   builds:
   [
      // just use default config above
      {},
      //r.js.cmd -o build.js optimize=none paths.requireLib=../node_modules/requirejs/require include=requireLib
      {
         out: config.paths.dest.bundled + "/nnet-self_loading.js",
         include: ["../../lib/almond"],
         //TODO: turn this back on once everything is properly wrapped
         //wrap: true
      },
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

gulp.task("default", ["build"]);

gulp.task("watch", function()
{
   gulp.watch(config.paths.src.ts, ["compile-ts"]);
   gulp.watch(config.paths.src.js, ["copy-js"]);
});

gulp.task("build", ["compile-ts", "copy-js"], function(done)
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

gulp.task("compress", ["build"], function()
{
   return gulp.src([config.paths.dest.bundled + "/**/*.js", "!" + config.paths.dest.bundled + "/**/*.min.js"])
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

gulp.task("compile-ts", function()
{
   // Compile TypeScript files
   return gulp.src(config.paths.src.ts)
      //.pipe(watch())
      .pipe(changed(config.paths.dest.compiled, { extension: '.js' }))
      .pipe(tsc({
         emitError: false,
         module: 'amd',
         target: 'ES3',
         sourcemap: true,
         outDir: config.paths.dest.compiled
      }))
      .pipe(gulp.dest(config.paths.dest.compiled));
});

gulp.task("copy-js", function()
{
   // just straight copy any js files that have yet to be converted to TS
   return gulp.src(config.paths.src.js)
      .pipe(changed(config.paths.dest.compiled))
      .pipe(gulp.dest(config.paths.dest.compiled))
      //.pipe(jshint())
      //.pipe(jshint.reporter("jshint-stylish"));
});

// compile TypeScript using various compiler flags to more easily compare
// the generated output with the original source
gulp.task("ts-full", function()
{
   gulp.src(config.paths.src.ts)
      //.pipe(watch())
      .pipe(changed(config.paths.dest.root + "/ts/amd", { extension: '.js' }))
      .pipe(tsc({
         emitError: true,
         module: 'amd',
         target: 'ES3',
         sourcemap: true,
         outDir: config.paths.dest.root + "/ts/amd"
      }))
      .pipe(gulp.dest(config.paths.dest.root + "/ts/amd"));
   gulp.src(config.paths.src.ts)
      .pipe(changed(config.paths.dest.root + "/ts/commonjs", { extension: '.js' }))
      .pipe(tsc({
         emitError: true,
         //module: 'amd',
         target: 'ES3',
         sourcemap: true,
         outDir: config.paths.dest.root + "/ts/commonjs"
      }))
      .pipe(gulp.dest(config.paths.dest.root + "/ts/commonjs"));
});