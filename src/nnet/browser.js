define([], function(){

//
// 
//
return {
   isIE: /*@cc_on!@*/false,
   version: Math.floor(/*@if(@_jscript_version)(@_jscript_version - 5)@else@*/0/*@end@*/ * 10),
   strictMode: (document.compatMode == "CSS1Compat"),
   quirksMode: (document.compatMode == "BackCompat" || typeof document.compatMode == "undefined"),
   supportsElementPrototype: (function()
   {
      try
      {
         HTMLElement.prototype.testPrototype = undefined;
         return true;
      }
      catch(no) { }
      return false;
   })(),
   supportsDomDelete: (function()
   {
      try
      {
         delete HTMLElement.prototype.testPrototype;
         return true;
      }
      catch(no) { }
      return false;
   })(),
   //added to document.preload below
   supportsCanvas: null,
   supportsElementOpacity: null
};

}); // define