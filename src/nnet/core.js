/**********************
OBJECT
**********************/
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