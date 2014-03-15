/**********************
BROWSER
**********************/
var NNet = {version : "0.10.0"};


function alertall()
{
   alert(Array.prototype.join.call(arguments, "\n"));
}

/**********************
OBJECT
**********************/
Object.keys = function(obj)
{
   var arr = [];
   for(var prop in obj)
   {
      arr.push(prop);
   }
   return arr;
};
Object.map = function(obj, keyFunc, valFunc)
{
   var newObj = {};
   for(var x in obj)
   {
      newObj[(keyFunc ? keyFunc(x) : x)] = (valFunc ? valFunc(obj[x]) : obj[x]);
   }
   return newObj;
};
Object.join = function(obj, join)
{
   var result = [];
   join = join || "";
   for(var x in obj)
   {
      result.push(x + join + obj[x]);
   }
   return result;
}
function objtype(obj)
{
   var type = typeof obj;
   if(type === "object")
   {
      return obj === null ? "null" :
         obj instanceof Array ? "array" :
         //this fails to capture the document node
         //obj instanceof HTMLElement ? "element" :
         "nodeType" in obj ? "node" :
         obj === window ? "window" :
         obj instanceof Date ? "date" :
         //highly unlikely that a string was created from the constructor, so it is last
         obj instanceof String ? "string" :
         type;
   }
   else if(type === "function" && obj instanceof RegExp)
   {
      return "regexp";
   }
   return type;
}
function nodetype(el)
{
   if(el != null && objtype(el) === "node")
   {
      //IE does not define window.Node, so use magic numbers instead
      switch(el.nodeType)
      {
         //Node.ELEMENT_NODE == 1
         case 1:
            return "element";
         //Node.ATTRIBUTE_NODE == 2
         //Node.TEXT_NODE == 3
         //does an extra check to see if the textnode contains any characters other than whitespace
         case 3:
            return /\S/.test(el.nodeValue) ? "text" : "whitespace";
         //Node.CDATA_SECTION_NODE == 4
         //Node.ENTITY_REFERENCE_NODE == 5
         //Node.ENTITY_NODE == 6
         //Node.PROCESSING_INSTRUCTION_NODE == 7
         //Node.COMMENT_NODE == 8
         case 8:
            return "comment";
         //Node.DOCUMENT_NODE == 9
         case 9:
            return "document";
         //Node.DOCUMENT_TYPE_NODE == 10
         //Node.DOCUMENT_FRAGMENT_NODE == 11
         //Node.NOTATION_NODE == 12
         default:
            return "other";
      }
   }
   //TODO: Need to determine an actual return type here
   return "null";
}
function parseBool(value)
{
   switch((value+"").toLowerCase())
   {
      case "true":
      case "t":
      case "1":
      case "yes":
      case "y":
         return true;
      default:
         return false;
   }
}
//TODO: This should actually be a parser, not just eval the string
function evalJSON(value)
{
   try
   {
      return eval("(" + value + ")");
   }
   catch(ex)
   {
      ex.name = "evalJSON() ERROR";
      throw ex;
   }
}
function toJSON(value)
{
   function recurse(x, isArray)
   {
      var ret = "", property, val, type, result;
      for(property in x)
      {
         val = x[property], type = objtype(val);
         if(type != "function" && isArray !== true)
         {
            ret += "\""+ property + "\":";
         }
         
         result = getValue(val, type);
         ret += result ? result + "," : "";
      }
      //remove that last comma
      return ret.replace(/,$/,"");
   }
   
   function getValue(val, type)
   {
      switch(type)
      {
         case "number":
         case "boolean":
         case "null":
         case "undefined":
            return val + "";
         case "object":
            return "{" + recurse(val) + "}";
         case "array":
            return "[" + recurse(val, true) + "]";
         case "function":
            return "";
         case "date":
            return "Date(" + val.getTime() + ")";
         default:
            val += "";
            //escape any escape characters, then escape any quotes
            return "\"" + val.replace(/\\/g,"\\\\").replace(/[\r\n]/g,"\\n").replace(/"/g,"\\\"") + "\"";
      }
   }
   
   return getValue(value, objtype(value));
}

/**********************
EXCEPTION HANDLING & ERRORS
**********************/
var ExceptionHelper =
{
   "isFunction": function(func)
   {
      if(typeof func !== "function")
      {
         throw new TypeError("\"" + func + "\" of type \"" + objtype(func) + "\" is not a valid function call");
      }
   }
};


/**********************
MUMERIC & MATH
**********************/
//generates a random integer between the high and low values, inclusive
//if no value is provided for the respective argument, the defaults of 0 (low) and 1 (high) are used
Math.randomInt = function(low, high)
{
   var L = parseInt(low, 10) || 0, H = parseInt(high, 10) || 1;
   return Math.floor( (Math.random() * (H - L + 1)) + L );
};
Math.mean = function()
{
   for(var mean = 0, ln = arguments.length, x = 0; x < ln; ++x)
   {
      mean += arguments[x];
   }
   return mean/ln;
};
Number.prototype.asUnsigned = function()
{
   //1. shift 0 in from right to set sign bit to 0
   //2. multiply by two to retain sign bit (left shift would undo the previous right shift)
   //3. restore the original 1's bit that was lost in the right shift
   return ((this >>> 1) * 2) + (this & 0x1);
};
Number.prototype.days = function()
{
   return this * (24).hours();
};
Number.prototype.hours = function()
{
   return this * (60).minutes();
};
Number.prototype.minutes = function()
{
   return this * (60).seconds();
};
Number.prototype.seconds = function()
{
   return this * 1000;
};
Date.prototype.increment = function(milliseconds)
{
   return this.setMilliseconds(this.getMilliseconds() + milliseconds);
};
Date.prototype.isLeapYear = function()
{
   return Date.isLeapYear(this.getFullYear());
};
Date.isLeapYear = function(year)
{
   return (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0));
};


/**********************
FUNCTION
**********************/
NNet.Function =
{
   "applyAll": function(funcs, scope, params)
   {
      for(var x in funcs)
      {
         if(typeof funcs[x] == "function")
         {
            funcs[x].apply(scope, params);
         }
      }
   },
   "applyAllWrapEvent": function(funcs, scope, params)
   {
      var args = Array.toArray(params);
      args[0] = NNet.Event(args[0]);
      //NNet.Function.applyAll(funcs, scope, args);
      funcs.forEach(function(func)
      {
         if(typeof func == "function")
         {
            func.apply(scope, args);
         }
      });
   }
};


/**********************
WINDOW
**********************/
window.load = {};
window.unload = {};
window.onload = function()
{
   NNet.Function.applyAllWrapEvent(window.load, this, arguments);
   try
   {
      delete window.load;
   }
   catch(ex)
   {
      window.load = null;
   }
};
window.onunload = function()
{
   NNet.Function.applyAllWrapEvent(window.unload, this, arguments);
   try
   {
      delete window.unload;
   }
   catch(ex)
   {
      window.unload = null;
   }
};
window.location.jump = function(anchor)
{
   //Debug.Alert(anchor);
   //var current = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search;
   if(anchor && anchor.isString)
   {
      window.location.assign(
         window.location.protocol + "//" +
         window.location.host +
         window.location.pathname +
         window.location.search + 
         "#" + anchor);
      //alert("added");
   }
   //this is causing what I believe are page reload errors, for some reason I guess you can't clear the hash from the page.
   //I'm still looking into it
   /*else if(anchor === undefined)
   {
      window.location.assign(current + "");
      alert("cleared");
   }
   else
   {
      alert("no effect");
   }*/
};
window.location.parseQueryString = function()
{
   var x = 0, dict = {}, search = window.location.search.substring(1);
   if(search != "")
   {
      search = search.split("&");
      for(; x < search.length; ++x)
      {
         var entry = search[x].split("=");
         dict[decodeURIComponent(entry[0])] = decodeURIComponent(entry[1]);
      }
   }
   return dict;
};
window.location.replaceQueryString = function(hash)
{
   var querystring = Object.join(Object.map(hash, encodeURIComponent, encodeURIComponent), "=").join("&");
   window.location.search = (querystring == "" ? "" : "?" + querystring);
};
//gets details on the size and location of the window and document
window.getSize = function()
{
   var doc = Browser.strictMode ? document.documentElement : document.body;
   return ({
      "viewportHeight": doc.clientHeight,
      "viewportWidth": doc.clientWidth,
      "contentHeight": ((Browser.isIE || Browser.quirksMode) ? doc.scrollHeight : doc.offsetHeight),
      "contentWidth": ((Browser.isIE || Browser.quirksMode) ? doc.scrollWidth : doc.offsetWidth),
      "scrollYOffset": window.pageYOffset || doc.scrollTop,
      "scrollXOffset": window.pageXOffset || doc.scrollLeft
   });
}


/**********************
DOCUMENT LOAD
**********************/
//preload should only be used for NNet library functions
document.preload = {};
document.load = {};
document.onload = function()
{
   NNet.Function.applyAllWrapEvent(document.preload, this, arguments);
   NNet.Function.applyAllWrapEvent(document.load, this, arguments);

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
ADD SCRIPT
**********************/
NNet.addScript = function(url, head)
{
   get.byTag(head===true?"head":"body")[0].appendChild(HTML.script({
      "type": "text/javascript",
      "language": "Javascript",
      "src": url
   }));
};
//import library scripts
function using(scriptName)
{
   if(!/\.js$/.test(scriptName))
   {
      scriptName += ".js";
   }
   //find core.js include and use the same path
   var scriptTags = get.byTag("script");
   for(var i = 0; i < scriptTags.length; ++i)
   {
      if(scriptTags[i].src && /core\.js$/.test(scriptTags[i].src))
      {
         //get the path to the javascript file
         var path = scriptTags[i].src.replace(/core\.js$/,'');
         
         NNet.addScript(path + scriptName, true);
         break;
      }
   }
}
// comment out and put into this singular one file so that it is easier to fix bugs in IE
// using("get.js");
// using("sort.js");
// using("debug.js");


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
/**********************
SETUP & DOCUMENT PRELOAD
**********************/
//apply the methods to the element prototype if the browser supports it, and negate the __applyElementPrototypes function
if(Browser.supportsElementPrototype)
{
   Element.__applyElementPrototypes(HTMLElement.prototype, true);
   Element.__applyElementPrototypes = function() { };
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