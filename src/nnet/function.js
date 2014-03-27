define(["nnet/event", "nnet/array"], function(wrapEvent){

//
// Function utilities and helpers
//

function applyAll(funcs, scope, params)
{
   for(var x in funcs)
   {
      if(typeof funcs[x] == "function")
      {
         funcs[x].apply(scope, params);
      }
   }
}

function applyAllWrapEvent(funcs, scope, params)
{
   var args = Array.toArray(params);
   args[0] = wrapEvent(args[0]);
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

return {
   "applyAll": applyAll,
   "applyAllWrapEvent": applyAllWrapEvent
}

}); // define