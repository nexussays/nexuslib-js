/**********************
BROWSER
**********************/
var NNet = {version : "0.10.0"};
var Browser =
{
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

function alertall()
{
   alert(Array.prototype.join.call(arguments, "\n"));
}


/**********************
GET
**********************/
/// Usage:      get(args)
/// Parameters: 0 - many; space-seperated strings of element identifiers
/// Returns:    An array containing the results of the query (an empty array if no results were found).
///             If one argument is passed containing a single id identifier, then the resulting element
///             or null is returned directly (not as the zero index of an array).
function get()
{
   var self = (this == window || !("nodeType" in this)) ? document : this;
   var elements = [], result, query, match, match_tag, argument, arglength = arguments.length, x = 0, i = 0, returnSingle = false, tempArray, queryItem;
      
   //if "x.get()" was called, return all the elements contained in "x"
   if(arglength === 0)
   {
      elements = get.byTag("*");
   }
   else
   {
      //for each argument passed:
      //1) get each argument and split it on any spaces
      //2) go through each resulting word, find it in the DOM, then continue on to its descendants (if any)
      //3) concatenate the results to an array which contains all the results for all arguments
      for(; x < arglength; ++x)
      {
         argument = arguments[x];
         //if the argument is null, undefined, an empty string, etc then skip it
         if(!argument)
         {
            continue;
         }
         //otherwise if it is not null and is a string, search for it
         else if(argument.isString)
         {
            //split the current argument by commas
            //if there is more than one result, then get each individually
            //var parts = argument.split(",");
            //for(i = 0; i < parts.length; ++i)
            //{
               //query = parts[i].trim();
               query = argument.trim();
               //if there is whitespace after trimming, we are getting multiple elements
               if(/ /.test(query))
               {
                  //we will be using the example "ul li"
                  query = query.split(/\s+/);
                  //get the first item and then remove it and work on the next ones from here on out, null is passed as a second parameter to prevent single #id calls from returning an element instead of an array
                  //eg - we now have all uls in the page
                  result = get.call(self, query.shift(), null);
                  //loop through each of the parameters given
                  //eg - "li"
                  while(query.length !== 0)
                  {
                     //if the current level returned an array of results, we need to loop through them
                     //eg - once we have all the uls on the page, we will need to loop through them and, for each one, get all the lis underneath it
                     // * create a temporary array to store these items
                     // * remove the current item from the array                     
                     // * loop through all the items and get all the items that match the current parameter
                     //eg - loop through all the uls and get all lis
                     for(i = 0, tempArray = [], queryItem = query.shift(); i < result.length; ++i)
                     {
                        //we are concatenating the array so all our results are combined
                        tempArray = tempArray.concat(get.call(result[i], queryItem, null));
                     }
                     //then set result equal to this and continue on to the next item in split
                     result = tempArray;
                  }
               }
               else
               {
                  match = get.__tagid.exec(query);
                  match_tag = match[1] || "*";
                  //if there is an id passed, get that right away
                  if(match[2])
                  {
                     //if there is only one argument passed and it matched an ID selector,
                     //return the single result at the end instead of an array
                     returnSingle = (arglength == 1);
                     //call document.getElementById instead of get.id because we don't need
                     //the error checking done by that method and it takes half the time
                     //(though admittedly, that half is fractions of a millisecond)
                     result = document.getElementById(match[2]);
                     //if an element was specified and the element retrieved with the id is not
                     //of the specified type, then return null
                     if(match_tag != "*" && result != null && result.nodeName.toLowerCase() != match_tag.toLowerCase())
                     {
                        result = null;
                     }
                     result = [result];
                  }
                  //if there was no id selector, get all the tags of the type specified
                  else
                  {
                     //result = get.byTag.call(self, match_tag);
                     //calling getElementsByTagName instead of get.byTag for the same reaosn we're calling
                     //getElementById instead of get.id above: we don't need the additional error checking
                     //and it is a few fractions of a millisecond faster
                     result = self.getElementsByTagName(match_tag);
                  }

                  //console.log(query, result.length, result);

                  if(result && result[0] != null)
                  {
                     match = get.__multiples.exec(query);
                     if(match)
                     {
                        do
                        {
                           var classMatch = match[1];
                           result = Filter.byAttribute(result,
                              (classMatch ? "class" : match[2]),
                              (classMatch ? classMatch : match[5]),
                              (classMatch ? "~" : match[3])
                           );
                        } while(match = get.__multiples.exec(query));
                     }
                     else
                     {
                        result = Array.toArray(result);
                     }
                  }
               } //else / /.test(query)
               
               //if result is valid, append it to all the elements found so far for each argument
               if(result && result[0] != null)
               {
                  elements = elements.concat(result);
               }
               result = null;
            //}
         }
         //check for __get to prevent redundant calls to get() from failing
         //and allow for passing in of elements for the same reasons
         else if(argument.__get || "nodeType" in argument)
         {
            elements = elements.concat(argument);
            //if there is only one argument and it is an element, return the single element
            returnSingle = (arglength == 1 && "nodeType" in argument);
         }
      }//for(; x < arglength; ++x)
   }//else arglength !== 0
   
   //return the elements that we've found. If returnSingle is true, then return the
   //first argument of the array instead of returning a single item wrapped in an array
   //and causing confusion (also check if a result exists othwerise return null)
   return (returnSingle ? (elements[0] ? elements[0] : null) : elements);
}

//not used at the moment
//get.__matchAll = /^(\w*|\*)?(?:#([\w-]+))?(?:\.([\w-]+))*(?:\[(\w+)(?:([~^$*|]?)=(["'])?((?:\\\6|[^\]])*?)\6)?\])*$/i;

//[1] -- the class matched, if any
//[2] -- the name of the attribute to match, if any
//[3] -- the type of attribute comparator, if any
//[4] -- *ignore* the type of containing quotes in the attribute
//[5] -- the attribute value matched, if any
//see: <http://blog.stevenlevithan.com/regular-expressions/match-quoted-string>
get.__multiples = /(?:\.([\w-]+))|(?:\[(\w+)(?:([~^$*|]?)=(["'])?((?:\\\4|[^\]])*?)\4)?\])/ig;

//[1] -- the element tag matched, if any
//[2] -- the id matched, if any
get.__tagid = /^(\*|\w*)?(?:#([\w-]+))?/i;

//I would like to not allow tag, but since tag#id is valid CSS selector syntax, I guess we can't ignore that usage
get.id = function(id)//, tag)
{
   ///<summary>Gets an element in the DOM with the specified id attribute</summary>
   ///<param name="id" optional="false" type="String">The id of the element</param>
   ///<returns domElement="true" mayBeNull="true" />
   //return document.getElementById(id.replace(/^#/,''));

   //if id is null or doesn't match either of the below, return null
   //if id is a string, return it from the DOM
   //if id has a property called "id" assume it is an element (eg - redundant call to get()) and return it
   return (id != null ? (id.isString ? document.getElementById(id.replace(/^#/, "")) : ("id" in id ? id : null)) : null);
};
get.byName = function(name, tag)
{
   var result = ((this === get) ? document : this).getElementsByName(name);
   result = Filter.byNodeName(result, tag || "*");
   result.__get = true;
   return result;
};
get.byTag = function(tag)
{
   var result = Array.toArray((this === get ? document : this).getElementsByTagName(tag || "*"));
   result.__get = true;
   return result;
};
get.byClass = function(name, tag)
{
   return get.byAttribute.call(this, "class", name.replace(/^\./, ''), tag, "~");
};
get.byAttribute = function(attr, val, tag, type)
{
   ///<summary>Gets an array of elements in the DOM with the specified attribute values</summary>
   ///<param name="attr" optional="false" type="String">The name of the attribute to get</param>
   ///<param name="val" optional="true" type="String">The value of the attribute (must be regular expression escaped)</param>
   ///<param name="tag" optional="true" type="String">The name of an element to restrict the search to. If this is not given it will search the entire DOM</param>
   ///<param name="type" optional="true" type="String">The type of search to perform ("~", "^", "$", "*"), if absent an exact search is performed</param>
   ///<returns elementDomElement="true" mayBeNull="true" />
   var allElements = (this === get ? document : this).getElementsByTagName(tag || "*");
   var result = Filter.byAttribute(allElements, attr, val, type);
   result.__get = true;
   return result;
};
//get function which wraps each result and adds the element methods to it
//this is pretty much here solely because of Prototype, et al implementing this
//functionality with their $() methods. Everything should already be extended for us.
function getw()
{
   var result = get.apply(this, arguments);
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
}


/**********************
FILTERING METHODS
**********************/
var Filter = new (function()
{
   var regexCache = {};
   this.byAttribute = function(elements, attr, val, type)
   {
      var result = [], regex = regexCache[val] && regexCache[val][type];
      if(regex == null)
      {
         var value = "(?:" + (val ? val.escapeRegExp() : ".*") + ")";
         switch(type)
         {
            //match string or end-line delimited   
            case "~": regex = new RegExp("(?:^|\\s)" + value + "(?:\\s|$)", 'i'); break;
            //match beginning with   
            case "^": regex = new RegExp("^" + value, 'i'); break;
            //match ending with   
            case "$": regex = new RegExp(value + "$", 'i'); break;
            //match anywhere   
            case "*": regex = new RegExp(value, 'i'); break;
            //exactly, or begins with followed by (U+002D)   
            case "|": regex = new RegExp("^" + value + "-?", 'i'); break;
            //match exactly   
            default: regex = new RegExp("^" + value + "$", 'i'); break;
         }
         regexCache[val] = regexCache[val] || {};
         regexCache[val][type] = regex;
      }

      for(var x = 0, ln = elements.length; x < ln; ++x)
      {
         var element = elements[x];
         //second parameter to getAttribute is an IE custom thing, see:
         //http://msdn.microsoft.com/en-us/library/ms536429.aspx
         var temp = (attr == "class" ? element.className : element.getAttribute(attr, 2));
         if(temp && regex.test(temp))
         {
            result.push(element);
         }
      }

      return result;
   };

   this.byNodeName = function(elements, name)
   {
      name = name.toLowerCase();
      var result = [];
      for(var x = 0, ln = elements.length; x < ln; ++x)
      {
         var el = elements[x];
         if(name == "*" || name == el.nodeName.toLowerCase())
         {
            result.push(el);
         }
      }
      return result;
   };
})();

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
EVENT
**********************/
NNet.Event = function(evt)
{
   var e = evt || window.event;
   //don't redo everything on redundant calls
   if(e && e.__extended !== true)
   {
      e.__extended = true;

      var button = e.button,
         w3cType = (typeof e.which !== "undefined"),
         isKeypress = (e.type == "keypress"),
         isKeyUpOrDown = (e.type == "keyup" || e.type == "keydown"),
         isMouseover = (e.type == "mouseover"),
         isMouseout = (e.type == "mouseout"),
         keycode = e.charCode || e.keyCode || null,
         ucase = (keycode >= 65 && keycode <= 90),
         lcase = (keycode >= 97 && keycode <= 122);

      // Mozilla uses the "which" property for button clicks in addition to the "button" property,
      // and they follow the W3C spec for the numbering scheme; so we use the existence
      // of the "which" property to determine if we are running Firefox and therefore
      // using the W3C model vs the Microsoft model
      e.mouse =
      {
         //W3C.button: 0; Microsoft.button: 1; Gecko.which: 1
         left: ((w3cType && button === 0) || (!w3cType && (button & 1) === 1)),
         //W3C.button: 2; Microsoft.button: 2; Gecko.which: 3
         right: ((w3cType && button === 2) || (!w3cType && (button & 2) === 2)),
         //W3C.button: 1; Microsoft.button: 4; Gecko.which: 2
         middle: ((w3cType && button === 1) || (!w3cType && (button & 4) === 4))
      };

      //Space: 32 | Enter: 13 | Tab: 9 | Backspace: 8 | Shift: 16 | Control: 17 | Alt: 18 | Esc: 27 | Delete: 46
      //up arrow: 38 | down arrow: 40 | left arrow: 37 | right arrow: 39
      //For more information, see: <http://unixpapa.com/js/key.html>
      e.key =
      {
         code: keycode,
         value: (isKeypress || (isKeyUpOrDown && (keycode >= 48 && keycode <= 90))) ?
            String.fromCharCode(keycode) :
            ((isKeyUpOrDown && (keycode - 96 >= 0 && keycode - 96 <= 9)) ?
               String.fromCharCode(keycode - 48) : null),
         shift: (e.shiftKey || keycode == 16),
         ctrl: (e.ctrlKey || keycode == 17),
         alt: (e.altKey || keycode == 18),
         //If the key pressed is not an alpha character, then we cannot determine if caps lock is on so instead we set it to null.
         //If the key is uppercase without shift or lowercase with shift, then caps lock is on.
         capsLock: (!isKeypress || (!ucase && !lcase) ? null : ((ucase && !e.shiftKey) || (lcase && e.shiftKey) ? true : false))
      };

      //The element the event originated from
      if(typeof e.target == "undefined")
      {
         e.target = e.srcElement;
      }
      //the related target, ie if a mouseover it is the element the mouse came from and if a mouseout
      //it is the element the mouse has gone to
      if(typeof e.relatedTarget == "undefined")
      {
         e.relatedTarget = (isMouseover ? e.fromElement : ( isMouseout ? e.toElement : null ));
      }

      //pageX/Y are the values relative to the document itself
      //clientX/Y are the values relative to the viewport (browser window)
      //screenX/Y are the values relative to the entire screen (eg, if the browser window is positioned so 0,0 is at
      //the middle of a 1024x768 screen then screenX/Y will be 512/384)
      if(typeof e.pageX == "undefined" && typeof e.clientX !== "undefined")
      {
         //console.log(e.clientY, document.body.scrollTop, document.documentElement.scrollTop);
         //document.body for quirksmode, document.documentElement for strict mode
         e.pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
         e.pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }

      if(!("preventDefault" in e))
      {
         e.preventDefault = function()
         {
            this.returnValue = false;
         };
      }

      if(!("stopPropagation" in e))
      {
         e.stopPropagation = function()
         {
            this.cancelBubble = true;
         };
      }

      e.stop = function()
      {
         this.preventDefault();
         this.stopPropagation();
      };

      //Keep this in? or remove it from relase code?
      e.stopPropogation = function()
      {
         throw new SyntaxError("SPELLING MISTAKE: 'stopPropogation' should be 'stopPropagation' (note: 'a' vs 'o')");
      };
   }
   return e;
};
NNet.Event.keys = 
{
   "BACKSPACE" : 8,
   "TAB" : 9,
   "ENTER" : 13,
   "SHIFT" : 16,
   "CTRL" : 17,
   "ALT" : 18,
   "ESC" : 27,
   "SPACE" : 32,
   "DELETE" : 46
};


/**********************
EXCEPTION HANDLING & ERRORS
**********************/
function NNetError(message)
{
   this.name = arguments.callee.name || "NNetError";
   this.message = this.description = message || "An unhandled Exception has occured in NNet";
   this.toString = function()
   {
      return this.message;
   };
}
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
STRINGS & REGEXP
**********************/
//allows easy checking of string values and also helps in the case that a string is
//created with the String constructor (which returns typeof "object" instead of "string")
String.prototype.isString = true;
String.prototype.trim = function()
{
   if(arguments.length > 0)
   {
      var args = (Array.prototype.map.call(arguments,function(x){return x.escapeRegExp();})).join("|");
      return this.replace(new RegExp("^(?:" + args + ")+|(?:" + args + ")+$","g"), "");
   }
   return this.replace(/^\s+|\s+$/, "");
};
String.prototype.escapeRegExp = function()
{
   return this.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1");
};
String.prototype.escapeHTML = function()
{
   var div = document.createElement("div");
   div.appendChild(document.createTextNode(this));
   return div.innerHTML;
};
String.prototype.unescapeHTML = function()
{
   var div = document.createElement("div");
   div.innerHTML = this.stripTags();
   return div.childNodes[0] ? div.childNodes[0].nodeValue : '';
};
//modified from Prototype
String.prototype.stripTags = function()
{
   return this.replace(/<\/?[^>]+>/gi, '');
};
String.prototype.contains = function(str, sep, i)
{
   //if case-insensitive, return a recurse of callee with lowercase arguments
   //otherwise find the passed string in this string, optionally bound by seperators
   return (i === true ? this.toLowerCase().contains(str.toLowerCase(), sep, false) : ((sep) ? (sep + this + sep).indexOf(sep + str + sep) > -1 : this.indexOf(str) > -1));

   //this takes roughly twice as long when called by itself without the benefit of caching
   //the expression.
   //return (new RegExp("(?:^|\\s)" + str + "(?:\\s|$)", i ? "i" : "").test(str));
};
RegExp.escape = function(text)
{
   return text.escapeRegExp();
};


/**********************
ARRAY & COLLECTION
**********************/
//map the results of a function to each respective index of an array
//format is: arrayVariable.map(function(valueAtIndex, index, entireArray){/*CODE*/});
Array.prototype.map = Array.prototype.map || function(func, scope)
{
   //ExceptionHelper.isFunction(func);
   var x = 0, ln = this.length, self = scope || this, arr = [];
   for(; x < ln; ++x)
   {
      if(x in this)
      {
         arr[x] = func.call(self, this[x], x, this);
      }
   }
   return arr;
};
//map which directly alters the array instead of returning a new array with the modified results
Array.prototype.map$ = function(func, scope)
{
   var x = 0, ln = this.length, self = scope || this;
   for(; x < ln; ++x)
   {
      if(x in this)
      {
         this[x] = func.call(self, this[x], x, this);
      }
   }
};
//execute a function over each item in an array
//format is: arrayVariable.forEach(function(valueAtIndex, index, entireArray){/*CODE*/});
Array.prototype.forEach = Array.prototype.forEach || function(func, scope)
{
   //ExceptionHelper.isFunction(func);
   var x = 0, ln = this.length, self = scope || this;
   for(; x < ln; ++x)
   {
      if(x in this)
      {
         func.call(self, this[x], x, this);
      }
   }
};
//Creates a new array with all elements that pass the test implemented by the provided function.
Array.prototype.filter = function(func, scope)
{
   //ExceptionHelper.isFunction(func);
   var x = 0, ln = this.length, self = scope || this, arr = [];
   for(; x < ln; ++x)
   {
      if(x in this)
      {
         var value = this[x];
         if(func.call(self, this[x], x, this))
         {
            arr.push(value);
         }
      }
   }
};
//returns the index of the given object or -1 if not found
Array.prototype.indexOf = Array.prototype.indexOf ||function(item /*, from*/)
{
   var ln = this.length, from = (+arguments[1]) || 0;
   from = (from < 0) ? Math.ceil(from) + len : Math.floor(from);

   for(; from < ln; ++from)
   {
      if(from in this && this[from] === item)
      {
         return from;
      }
   }
   return -1;
};
//returns a new array with the same values but in a random order
Array.prototype.shuffle = function()
{
   var i = this.length, j, temp;
   while(i)
   {
      --i;
      j = Math.floor(Math.random() * (i + 1));
      temp = this[i];
      this[i] = this[j];
      this[j] = temp;
   }
   return this;
};
//flattens an array of arrays into a single array.
//eg: [0,1,2,3,4,["a","b","c"],5,[["x","y","z"],[1,2,3]]]
//becomes [0,1,2,3,4,"a","b","c",5,"x","y","z",1,2,3]
Array.prototype.flatten = function()
{
   var x = 0, ln = this.length, arr = [];
   for(; x < ln; ++x)
   {
      if(x in this)
      {
         var value = this[x];
         arr = arr.concat(value instanceof Array ? value.flatten() : value);
      }
   }
   return arr;
};
// not in a global range() function because Javascript has no "yield" or other means
// to defer execution, so we actually have to generate the entire range. I think
// a window.range() function would introduce confusion about the implementation.
Array.makeRange = function(from, to, step)
{
   step = step || 1;
   var arr = [];
   while(from <= to)
   {
      arr.push(from);
      from += step;
   }
   return arr;
};
//convert an Array-like object to an Array
Array.toArray = function(collection)
{
   if(collection instanceof Array)
   {
      return collection;
   }
   for(var x = 0, ln = collection.length, arr = []; x < ln; ++x)
   {
      arr[x] = collection[x];
   }
   return arr;
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
      NNet.Function.applyAll(funcs, scope, args);
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
COOKIES
**********************/
var Cookie = new (function()
{
   var cookiesStore = {};

   this.getString = function(name)
   {
      if(typeof cookiesStore[name] == "undefined")
      {
         var cookies = document.cookie.split(";");
         for(var x = 0; x < cookies.length; ++x)
         {
            var cookie = cookies[x].trim();
            var index = cookie.indexOf("=");
            var key = decodeURIComponent(cookie.substring(0, index));
            var value = decodeURIComponent(cookie.substring(index + 1));
            cookiesStore[key] = value;
         }
      }
      return cookiesStore[name] || null;
   };

   this.getJSON = function(name)
   {
      var value = Cookie.getString(name), result;
      try
      {
         result = value && evalJSON(value);
      }
      catch(ex)
      {
         console.error(ex);
         result = null;
      }
      finally
      {
         return result;
      }
   };

   this.writeString = function(name, value, expiration, pathValue, secure)
   {
      var cookie, expires,
         key = encodeURIComponent(name + ""),
         val = encodeURIComponent(value + ""),
         path = (typeof pathValue === "undefined") ? "/" : pathValue;

      if(expiration)
      {
         expires = new Date();
         //if expiration is negative (ie, expire the cookie) then set it to an hour prior to ensure expiration
         expires.setTime(expires.getTime() + (expiration > 0 ? expiration : -3600000));
      }

      cookie = key + "=" + val +
         (expires ? "; expires=" + expires.toUTCString() : "") +
         ("; path=" + path) +
         (secure === true ? "; secure" : "");

      if(expiration > 0)
      {
         cookiesStore[name] = value;
      }
      else
      {
         delete cookiesStore[name];
      }
      document.cookie = cookie;
   };

   this.writeJSON = function(name, object, expiration, pathValue, secure)
   {
      return Cookie.writeString(name, toJSON(object), expiration, pathValue, secure);
   };

   this.expire = function(name)
   {
      Cookie.writeString(name, "", -1);
   };
})();

/**********************
COLOR
**********************/
var Color = new (function()
{
   //TODO: this is fuuuuggggllyyyy

   var getValues = function(a, r, g, b)
   {
      //if the value passed to one of the functions is a split value
      if(typeof arguments[0] == "object" && "r" in arguments[0])
      {
         var aVal = arguments[0].a;
         var rVal = arguments[0].r;
         var gVal = arguments[0].g;
         var bVal = arguments[0].b;
      }
      else if(typeof arguments[1] == "object" && "r" in arguments[1])
      {
         var aVal = arguments[1].a;
         var rVal = arguments[1].r;
         var gVal = arguments[1].g;
         var bVal = arguments[1].b;
      }
      else
      {
         var aVal = a;
         var rVal = r;
         var gVal = g;
         var bVal = b;
      }
      return { "a": aVal, "r": rVal, "g": gVal, "b": bVal };
   }

   this.hexToRgb = function(hex)
   {
      return Color.hexToArgb(Color.rgbToArgb(hex, 255));
   };

   this.hexToArgb = function(hex)
   {
      if(typeof hex != "number")
      {
         hex = parseInt((hex + "").replace(/^\#/, ""), 16);
      }
      return { "a": ((hex >> 24) & 0xFF), "r": ((hex >> 16) & 0xFF), "g": ((hex >> 8) & 0xFF), "b": (hex & 0xFF) };
   };

   this.rgbToInt = function(r, g, b)
   {
      var rgb = getValues(0, r, g, b);
      return this.argbToInt(0, rgb.r, rgb.g, rgb.b);
   };

   this.argbToInt = function(a, r, g, b)
   {
      var rgb = getValues(a, r, g, b);
      return (((rgb.a & 0xff) << 24) | ((rgb.r & 0xff) << 16) | ((rgb.g & 0xff) << 8) | (rgb.b & 0xff)).asUnsigned();
   };

   this.rgbToArgb = function(hex, alpha)
   {
      //remove any alpha from the current value
      return (alpha << 24 | (hex & 0xffffff)).asUnsigned();
   };

})();


/**********************
SORT
**********************/
var SortBy =
{
   "default": function(a, b)
   {
      ///<summary>
      ///Returns the same results as sort() called with no arguments.
      ///So capital letters come before lowercase letters and numbers are sorted as alpha
      ///(eg - 1243 is before 21 is before 320 is before 46, etc)
      ///</summary>
      return SortBy.alphanum(a + "", b + "");
   },
   //this doesn't appear to work very well
   random: function(a, b)
   {
      return Math.randomInt(-1, 1);
   },
   alphanum: function(a, b)
   {
      ///<summary>
      ///This is the default sort to use, alpha and numerics are sorted appropriately.
      ///NOTE: Sorting a list containing both characters and numbers will produce unexpected results
      ///</summary>
      return a < b ? -1 : (a > b ? 1 : 0);
   },
   alphanum_i: function(a, b)
   {
      ///<summary>Sort alphabetically, case-insensitive</summary>
      return SortBy.alphanum(((typeof a.toLowerCase == "function") ? a.toLowerCase() : a), ((typeof b.toLowerCase == "function") ? b.toLowerCase() : b));
   },
   length: function(a, b)
   {
      ///<summary>
      ///Sort on the length property of each item. Items without a length property will be compared as equal.
      ///</summary>
      return SortBy.property("length")(a, b);
   },
   property: function(prop, sortFunc)
   {
      ///<summary>Returns a new function which sorts on the given property</summary>
      ///<param name="prop" optional="false" type="String">The name of the property to compare</param>
      ///<param name="sortFunc" optional="true" type="Function">The sorting function to compare with. Default is SortBy.alphanum</param>
      sortFunc = (typeof sort == "function" ? sortFunc : SortBy.alphanum);
      return (function(a, b)
      {
         if(typeof a[prop] !== "undefined" && typeof b[prop] !== "undefined")
         {
            return sortFunc(a[prop], b[prop]);
         }
         return 0;
      });
   },
   multi: function()
   {
      ///<summary>
      ///Pass in multiple sorting functions and perform a multi-depth sort.
      ///eg: ["bbb","c","cc","aa","z"].sort(SortBy.multi(SortBy.length,SortBy.alphanum_i)) => ["c","z","aa","CC","bbb"]
      ///</summary>
      var items = Array.toArray(arguments);
      return (function(a, b)
      {
         var result = 0;
         for(var x = 0, ln = items.length; x < ln && result == 0; ++x)
         {
            result = items[x](a, b);
         }
         return result;
      });
   }
};


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