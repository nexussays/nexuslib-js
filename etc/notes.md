1. Class structure should emulate other languages. Ignore the fact that this is Javascript and have a file for every class or group of functions
2. Use require.js to package the JS into a singular file, which also means using it to require other files in the package
3. Everything should be namespaced with options to move it to make it accessible globally, so I do NNet.get.id() but I can call like import(NNet.get) and then do get.id(). This is especailly important for things that modify prototypes
4. Implement some unit testing even if we have to write the framework ourselves
5. Use Rake for build scripts until I spend some time getting familiar with gulp
6. Version info should be in an external file like with nexuslib-as3