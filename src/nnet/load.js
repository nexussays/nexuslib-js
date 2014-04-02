define(
[
   'nnet/BrowserUtils',
   'nnet/util/FunctionUtils',
   'nnet/dom/Element'
], function(Browser, FunctionUtils, Element)
{
/**********************
   DOCUMENT LOAD
   **********************/
   //preload should only be used for NNet library functions
   document.preload = {};
   document.load = {};
   document.onload = function()
   {
      FunctionUtils.applyAllWrapEvent(document.preload, this, arguments);
      FunctionUtils.applyAllWrapEvent(document.load, this, arguments);

      clearInterval(document.onloadTimerInterval);
      document.load = null;
      document.preload = null;
      document.onloadTimer = null;
      document.onloadTimerInterval = null;

      try
      {
         delete document.load;
         delete document.preload;
         delete document.onloadTimer;
         delete document.onloadTimerInterval;
      }
      catch(ex)
      {
      }
   };
   document.onloadTimer = function()
   {
      var state = document.readyState;
      if(state == 'loaded' || state == 'complete')
      {
         document.onload();
      }
   };
   //wire-up so that document.onload actually works
   if("readyState" in document)
   {
      if(Browser.isIE)
      {
         //alertall("ie path");
         document.write("<script type=\"text/javascript\" " +
            "defer=\"defer\" " +
            "src=\"" + ((window.location.protocol == "https:") ? "://0" : "javascript:void(0)") + "\" " +
            "onreadystatechange=\"if(this.readyState == 'complete') document.onload();\">" +
            "</script>");
      }
      else
      {
         //alertall("document.readystate timer path");
         document.onloadTimerInterval = setInterval(document.onloadTimer, 50);
      }
   }
   else
   {
      //try to use DOMContentLoaded, but just in case it isn't a valid event
      //use the default window.load method as a backup (document.load is deleted
      //when document.onload is run so any functions won't be executed twice)
      if(typeof document.addEventListener == "function")
      {
         //alertall("DOMContentLoaded path");
         document.addEventListener("DOMContentLoaded", document.onload, false);
      }
      window.load.onDOMLoaded = document.onload;
   }

   /**********************
   SETUP & DOCUMENT PRELOAD
   **********************/
   document.preload.opacitySupport = function()
   {
      Browser.supportsElementOpacity = ("opacity" in document.body.style);
   };
   document.preload.canvasSupport = function()
   {
      Browser.supportsCanvas = (function()
      {
         var canvas = document.createElement("canvas");
         if("getContext" in canvas)
         {
            return true;
         }
         return false;
      })();
   };
   //apply the methods to the element prototype if the browser supports it, and negate the __applyElementPrototypes function
   if(Browser.supportsElementPrototype)
   {
      Element.__applyElementPrototypes(HTMLElement.prototype, true);
      Element.__applyElementPrototypes = function()
      {
      };
   }
   else
   {
      //TODO: determine if I need to add an onunload function to destroy all this so there are no memory leaks (mostly in IE)
      document.preload.applyElementPrototype = function()
      {
         // get all elements and wrap them with element prototypes
         var result = get();
         var type = objtype(result);
         if(type == "node")
         {
            Element.__applyElementPrototypes(result);
         }
         else if(type == "array")
         {
            for(var x = 0; x < result.length; ++x)
            {
               Element.__applyElementPrototypes(result[x]);
            }
         }
         return result;
      };
   }

/**********************
WINDOW
**********************/
   window.load = {};
   window.unload = {};
   window.onload = function () {
      FunctionUtils.applyAllWrapEvent(window.load, this, arguments);
      try {
         delete window.load;
      }
      catch (ex) {
         window.load = null;
      }
   };
   window.onunload = function () {
      FunctionUtils.applyAllWrapEvent(window.unload, this, arguments);
      try {
         delete window.unload;
      }
      catch (ex) {
         window.unload = null;
      }
   };
});