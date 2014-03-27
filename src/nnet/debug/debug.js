define(['nnet/debug/benchmark'], function(){

return new (function()
{
   var self = this;
   //shows the members of the object that is debugged
   this.showAllMembers = true;

   //property changed, watch it for now
   this.showMembers;
   //this.watch("showMembers", function(){throw new NNetError("INVALID PROPERTY: " + arguments[0]);});

   //allows multiple entries to the output field
   //if this is false, each Debug call will overwrite the output text
   this.allowMultiple = false;
   //the element to output the debug information to
   this.outputSource = null;

   this.clear = function()
   {
      ___assignOut("", true);
   };
   this.write = function(text, escapeHTML)
   {
      //ensure that the "text" exists and has this function before calling it
      if(text != null && escapeHTML !== false)
      {
         text = ___escapeHTML(text);
      }
      ___assignOut(text);
   };

   this.Event = function(obj, properties)
   {
      return __debug(obj, "event", properties);
   };
   this.Element = function(obj, properties)
   {
      return __debug(obj, "element", properties);
   };
   this.Error = function(obj, properties)
   {
      return __debug(obj, "error", properties);
   };
   this.Object = function(obj, properties)
   {
      return __debug(obj, "object", properties);
   };
   this.Simple = function(obj, properties)
   {
      return __debug(obj, "simple", properties);
   };

   //copied from core.js so Debug can run w/o it
   var ___gettype = function(obj)
   {
      var type = typeof obj;
      if(type === "object")
      {
         return obj === null ? "null" :
         obj instanceof Array ? "array" :
         "nodeType" in obj ? "node" :
         obj === window ? "window" :
         obj instanceof Date ? "date" :
         obj instanceof String ? "string" :
         type;
      }
      else if(type === "function" && obj instanceof RegExp)
      {
         return "regexp";
      }
      return type;
   };
   //copied from core.js so Debug can run w/o it
   var ___nodetype = function(el)
   {
      if(el != null && "nodeType" in el)
      {
         switch(el.nodeType)
         {
            case 1:
               return "element";
            case 3:
               return /\S/.test(el.nodeValue) ? "text" : "whitespace";
            case 8:
               return "comment";
            case 9:
               return "document";
            default:
               return "other";
         }
      }
      return "null";
   };
   //copied from core.js so Debug can run w/o it
   var ___escapeHTML = function(text)
   {
      var div = document.createElement("div");
      div.appendChild(document.createTextNode(text));
      return div.innerHTML;
   };
   //copied from core.js so Debug can run w/o it
   var ___getOuterHTML = function(el)
   {
      var div = document.createElement("div");
      div.appendChild(el.cloneNode(false));
      return div.innerHTML;
   };

   var ___assignOut = function(text, clear)
   {
      //first ensure that self.outputSource is valid
      if(self.outputSource !== null)
      {
         //do not allow non-elements at the moment
         if((typeof self.outputSource !== "object") || !("innerHTML" in self.outputSource))
         {
            throw new TypeError("Debug.outputSource: '" + self.outputSource + "' of type '" + ___gettype(self.outputSource) + "' is not a valid element.");
         }

         //used to allow for innerHTML or value depending, but now just innerHTML is used
         var property = "innerHTML";

         //"convert to string" and add a newline so we can still check for empty
         text += "\n";

         //determine if we are clearing
         if(clear === true)
         {
            self.outputSource[property] = "";
         }
         else
         {
            //if we are allowing multiple debug outputs and there is currently content in the output, then add an hr
            if(self.outputSource[property] !== "" && self.allowMultiple)
            {
               self.outputSource[property] += "<hr class=\"NNet_JSCore_DEBUG\" />" + text;
            }
            else
            {
               self.outputSource[property] = text;
            }
         }
      }
   };

   var __debug = function(x, type, properties)
   {
      var stringVal = function(obj)
      {
         var result = "";
         if(___gettype(obj) == "node" && ___nodetype(obj) == "element")
         {
            result = ___getOuterHTML(obj);
         }
         else
         {
            result = (obj != null && typeof obj.toString == "function" ? obj.toString() : obj + "");
         }
         return result;
      };
      //formatting items
      var params = "", tests = [], resultSet, html, item, objToString = stringVal(x), selectedMembers = false;
      var tryIt = function(code)
      {
         var result;
         try
         {
            result = (typeof code == "function" ? code() : eval(code));
         }
         catch(e)
         {
            result = e;
         }
         finally
         {
            return ___escapeHTML(stringVal(result));
         }
      };

      //selectedMembers is either true, to show all members of the object, or it is an array specifying which members to show
      //if no parameter is passed, get the boolean value from the global setting
      //if a parameter is passed, ignore the global setting entirely -- true will show all, arrays will show what is specified
      if(properties == null)
      {
         selectedMembers = self.showAllMembers;
      }
      else if(properties === true)
      {
         selectedMembers = true;
      }
      else if(___gettype(properties) == "array")
      {
         selectedMembers = properties;
      }

      if(type == "simple")
      {
         html =
          {
             startList: "<ul class=\"tests\">\n",
             startHead: "\t<li>\n\t\t<p>",
             endHead: "</p>\n",
             startBody: "\t\t<div style=\"white-space:pre\">",
             endBody: "</div>\n\t</li>\n",
             endList: "</ul>\n"
          };
      }
      else
      {
         html =
          {
             startList: "<dl class=\"members\">\n",
             startHead: "\t<dt>",
             endHead: "</dt>\n",
             startBody: "\t<dd>",
             endBody: "</dd>\n",
             endList: "</dl>\n"
          };
      }

      if(selectedMembers === true || selectedMembers.length > 0)
      {
         params = html.startList;
         var xType = ___gettype(x);
         for(var property in x)
         {
            //getting random "Permission denied to create wrapper for object of class UnnamedClass"
            //error in Firefox 3
            try
            {
               item = x[property];

               //if we are not only displaying a selected subset of the object's members
               //or we ARE displaying a selected subset and the current member is one of them
               if(selectedMembers === true || selectedMembers.indexOf(property) != -1)
               {
                  //special handling for strings so we don't enumerate over every single character in it
                  if(xType == "string" && (property >= 0 && property < x.length))
                  {
                     continue;
                  }

                  params += html.startHead + property;

                  //add type information
                  params += " <span class=\"type\">[" + ___gettype(item);
                  params += (___gettype(item) == "node" ? ": " + ___nodetype(item) : "");
                  params += "]</span>";

                  params += html.endHead + html.startBody;
                  try
                  {
                     //debug one level deep when using "simple", but don't recurse on window
                     if(___gettype(item) == "object" && item !== window)
                     {
                        //set temp variable j to the current object, and k is our tempArray
                        var j = x[property], k = [];
                        for(var l in j)
                        {
                           k.push(l + ":" + ___escapeHTML(stringVal(j[l])));
                        }
                        params += k.join(type == "simple" ? " | " : "<br />");
                     }
                     else
                     {
                        params += ___escapeHTML(stringVal(item));
                     }
                  }
                  catch(ex)
                  {
                     params += "[DEBUG() ERROR] Error.name=\"" + ex.name + "\" Error.message=\"" + ex.message + "\"";
                  }
                  params += html.endBody;
               }
            }
            catch(ex)
            {
               //throw ex;
            }
         }
         params += html.endList;
      }

      //get all members
      switch(type)
      {
         case "element":
            tests = [
            //[".nodeName / .id / .className", "x.nodeName + ' / ' + x.id + ' / ' + x.className"],
               [".nodeType / nodetype()", "x.nodeType + ' / ' + ___nodetype(x)"],
               [".constructor", "x.constructor"],
               [".childNodes.length", "x.childNodes.length"]
            ];
            try
            {
               objToString = getOuterHTML(x, true);
            }
            catch(e) { };
            break;
         case "error":
            tests = [
               [".name", "x.name"],
               [".lineNumber / .number", "x.lineNumber + ' / ' + x.number"],
               [".message / .description", "x.message  + ' / ' + x.description"]
            ];
            break;
         case "event":
            tests = [
               [".type", "x.type"],
               [".target / .srcElement", "x.target + ' / ' + x.srcElement"],
               [".keyCode / .charCode / .which", function()
               {
                  var result = x.keyCode +
                       (typeof x.keyCode !== "undefined" ? ' (' + String.fromCharCode(x.keyCode) + ')' : "");
                  result += " / ";
                  result += x.charCode +
                       (typeof x.charCode !== "undefined" ? ' (' + String.fromCharCode(x.charCode) + ')' : "");
                  result += " / ";
                  result += x.which +
                       (typeof x.which !== "undefined" ? ' (' + String.fromCharCode(x.which) + ')' : "");
                  return result;
               } ],
               [".button", "x.button"],
               [".ctrlKey/.shiftKey/.altKey/.metaKey", "x.ctrlKey+'/'+x.shiftKey+'/'+x.altKey+'/'+x.metaKey"]
            ];
            break;
         //special case, handled above                       
         case "simple":
            tests = [];
            break;
         //case "object":                       
         default:
            tests = [
               ["typeof / ___gettype()", "typeof x + ' / ' + ___gettype(x)"],
               [".constructor", "x.constructor"],
               [".length", "x.length"]
            ];
            break;
      }

      if(tests.length > 0)
      {
         //run the tests
         tests.map$(function(z) { return [z[0], tryIt(z[1])]; });
         //join the inner arrays
         tests.map$(function(z) { return "\t\t<p>" + z.join("</p>\n\t\t<div>") + "</div>"; });
         //setup the html
         tests = "<ul class=\"tests\">\n" +
                 "\t<li>\n" + tests.join("\n</li>\n\t<li>\n") + "\n\t</li>\n" +
                 "</ul>\n";
      }

      resultSet = "<div class=\"NNet_JSCore_DEBUG\">\n";
      resultSet += "<p>" + objToString + "</p>\n";
      resultSet += tests + params + "</div>";

      ___assignOut(resultSet);
      //return the results also
      return resultSet;
   };
});

}); //define