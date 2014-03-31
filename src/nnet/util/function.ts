import Event = require("nnet/event");
import ArrayUtils = require("nnet/util/array_utils");

//
// Function utilities and helpers
//

export function applyAll(funcs, scope, params)
{
   for(var x in funcs)
   {
      if(typeof funcs[x] == "function")
      {
         funcs[x].apply(scope, params);
      }
   }
}

export function applyAllWrapEvent(funcs, scope, params)
{
   var args = ArrayUtils.toArray(params);
   args[0] = new Event(args[0]);
   applyAll(funcs, scope, args);
   /*
   funcs.forEach(function(func)
   {
      if(typeof func == "function")
      {
         func.apply(scope, args);
      }
   });
   //*/
}