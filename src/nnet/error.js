define([], function(){

//
// Base class for errors thrown by nnet-js
//
function NNetError(message)
{
   this.name = arguments.callee.name || "NNetError";
   this.message = this.description = message || "An unhandled Exception has occured in nnet-js";
   this.toString = function()
   {
      return this.message;
   };
}

return NNetError;

}); // define