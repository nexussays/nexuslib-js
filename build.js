//r.js.cmd -o build.js optimize=none
({
   baseUrl: "src",
   out: "./bin/nnet.js",
   //appDir: "./src",
   //dir: "./bin",
   exclude: [],
   mainConfigFile: "./src/main.js",
   name: "main",
   generateSourceMaps: true
})