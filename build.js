var requirejs = require('./node_modules/requirejs/bin/r.js');

var defaultConfig = {
   baseUrl: "src",
   out: "./bin/nnet.js",
   //appDir: "./src",
   //dir: "./bin",
   exclude: [],
   mainConfigFile: "./src/main.js",
   name: "main",
   generateSourceMaps: true,
   optimize: "none"
};

function extend(using)
{
   for(var prop in defaultConfig)
   {
      if(!(using.hasOwnProperty(prop)))
      {
         using[prop] = defaultConfig[prop];
      }
   }
   return using;
}

//r.js.cmd -o build.js optimize=none
requirejs.optimize(defaultConfig, console.log, console.err);

//r.js.cmd -o build.js optimize=none paths.requireLib=../node_modules/requirejs/require include=requireLib
requirejs.optimize(extend({
   out: "./bin/nnet-with-require.js",
   paths: {
      "requireLib": "../node_modules/requirejs/require"
   },
   include: ["requireLib"]
}), console.log, console.err);

// build debug js
requirejs.optimize(extend({
   out: "./bin/debug.js",
   mainConfigFile: "./src/nnet/debug/debug.js",
   name: "nnet/debug/debug"
}), console.log, console.err);