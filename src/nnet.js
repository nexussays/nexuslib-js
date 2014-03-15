
//
// Use to package everything together with r.js
//

define(['./core', './extras', './form', './html', './http'], function() {

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