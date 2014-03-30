var r = require('requirejs');

function build(resultingConfig)
{
   resultingConfig = resultingConfig || {};
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
build();

//r.js.cmd -o build.js optimize=none paths.requireLib=../node_modules/requirejs/require include=requireLib
build({
   out: "./bin/nnet-with-require.js",
   paths:
   {
      "requireLib": "../node_modules/requirejs/require"
   },
   include: ["requireLib"]
});

// build debug js
build({
   out: "./bin/debug.js",
   mainConfigFile: "./src/nnet/debug/debug.js",
   name: "nnet/debug/debug"
});