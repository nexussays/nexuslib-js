
//
// Use to package everything together with r.js
//

require.config(
{
   baseUrl: ".",
   paths: { }
});

define(
[
   'core',
   'nnet/array',
   'nnet/browser',
   'nnet/color',
   'nnet/cookie',
   'nnet/element',
   'nnet/error',
   'nnet/event',
   'nnet/form',
   'nnet/get',
   'nnet/html',
   'nnet/http',
   'nnet/sort',
   'nnet/string'
], function()
{

});

//This needs to be removed after development (<3 Firebug)
//*
if (!("console" in window))
{
   var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
   "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];

   window.console = {};
   for (var i = 0; i < names.length; ++i)
   {
      window.console[names[i]] = function() {};
   }
}
//*/