define(["nnet/dom/get", "nnet/event"], function(get, wrapEvent){

//
// Extend HTML elements with additional functionality
//
var Element = new (function()
{
   // functions are guaranteed to have a valid HTML element as the "this" variable
   this.__internal =
   {
      getAncestor: function(tagName)
      {
         var tag = tagName.toLowerCase(), iter = this, result = null;
         while (iter.parentNode)
         {
            //if the element is the one we are looking for, return the entire element
            if (iter.parentNode.nodeName.toLowerCase() == tag)
            {
               result = iter.parentNode;
               break;
            }
            iter = iter.parentNode;
         }
         return result;
      },
      getOuterHTML: function(escapeHtml)
      {
         var div = document.createElement("div");
         div.appendChild(this.cloneNode(true));
         div = div.innerHTML;
         return escapeHtml ? div.escapeHTML() : div;
      },
      ////////////////MODIFY CSS CLASSES
      addCssClass: function(name, noExistenceCheck)
      {
         if (noExistenceCheck === true || (!Element.__internal.hasCssClass.call(this, name)))
         {
            this.className += " " + name;
         }
         return true;
      },
      removeCssClass: function(name)
      {
         //replace the name with an empty string
         if(this.className)
         {
            this.className = this.className.replace(new RegExp("(^|\\s)" + name + "(\\s|$)", "i"), "$1$2");
            if(this.className == "")
            {
               this.removeAttribute("class");
            }
         }
         return true;
      },
      toggleCssClass: function(name)
      {
         Element.__internal.hasCssClass.call(this, name) ? Element.__internal.removeCssClass.call(this, name) : Element.__internal.addCssClass.call(this, name, true);
      },
      hasCssClass: function(name)
      {
         //return (new RegExp("(?:^|\\s)" + name + "(?:\\s|$)", "i").test(this.className));
         return (this.className && this.className.contains(name, " ", true));
      },
      append: function()
      {
         for (var x = 0, ln = arguments.length; x < ln; ++x)
         {
            try
            {
               var el = arguments[x];
               switch (objtype(el))
               {
                  case "array":
                     this.append.apply(this, el);
                     break;
                  case "node":
                     this.appendChild(el);
                     break;
                  case "object":
                     for (prop in el)
                     {
                        //account for event handlers
                        if(/^on/.test(prop))
                        {
                           this.addEvent(prop.substring(2), el[prop]);
                        }
                        else
                        {
                           this.setAttribute(prop, el[prop]);
                        }
                        //TODO: handle style attribute
                     }
                     break;
                  default:
                     //this.innerHTML += el;
                     // 2014-03-07, feels like appending a text node is better than altering innerHTML
                     this.appendChild(document.createTextNode(el + ""));
                     break;
               }
            }
            catch (e)
            {
               console.error("__append", e);
            }
         }
         return this;
      },
      addEvent: function(type, func)
      {
         this.events = this.events || {};
         var events = (this.events[type] = this.events[type] || {});
         var self = this;
         events[func] = function()
         {
            func.call(self, wrapEvent(arguments[0]));
         };
         if(objtype(this.addEventListener) == "function")
         {
            this.addEventListener(type, events[func], false);
         }
         else
         {
            this.attachEvent("on" + type, events[func]);
         }
      },
      removeEvent: function(type, func)
      {
         this.events = this.events || {};
         var events = (this.events[type] = this.events[type] || {});
         if(objtype(this.removeEventListener) == "function")
         {
            this.removeEventListener(type, events[func], false);
         }
         else
         {
            this.detachEvent("on" + type, events[func]);
         }
      } /*,
      dispatchEvent: function(type)
      {

      }*/
   };

   this.Special = {};

   this.__applyElementPrototypes = function(element, override)
   {
      //if the browser *does* support element prototyping, this function is changed below
      if (override || (element && element.nodeType == 1))
      {
         // any reason this isn't "element.get = get"?
         element.get = function() { return get.apply(this, arguments); };
         Object.keys(Element.__internal).forEach(function(x)
         {
            element[x] = function()
            {
               return Element.__internal[x].apply(this, arguments);
            }
         });
      }
   };

   this.__wrapper = function()
   {
      // first argument is the element in question
      var el = get(Array.prototype.shift.call(arguments));
      var result;
      //we do not allow element arrays to be passed
      if ("nodeType" in el)
      {
         // remaining arguments are args for the function being called
         result = Element.__internal[this].apply(el, arguments);
      }
      else
      {
         throw new TypeError("\"" + el + "\" (typeof \"" + objtype(el) + "\") is not, or does not resolve to, a valid HTML Element");
         result = null;
      }
      return result;
   };
})();

//wrap all the internal Element functions and expose them
(function()
{
   // function call to create closure on function name
   function apply(funcName)
   {
      Element[funcName] = function()
      {
         return Element.__wrapper.apply(funcName, arguments);
      };
   }

   for(var name in Element.__internal)
   {
      apply(name);
   }

   delete name;
   delete apply;
})();

return Element;

}); // define