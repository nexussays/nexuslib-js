/**********************
ELEMENT METHODS
**********************/
//functions are guaranteed to have a valid HTML element as the "this" variable
var Element = new (function()
{
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
            func.call(self, NNet.Event(arguments[0]));
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

/**********************
ELEMENT CREATION METHODS
**********************/
var HTML = new (function()
{
   var self = this;

   //create a method in the HTML object that will create an element of the same name as the function
   this.defineTag = function(tag)
   {
      self[tag.toLowerCase()] = function()
      {
         return create.apply(tag, arguments);
      }
   };

   var create = function()
   {
      var element, prop;

      //special case for text nodes
      if(this == "text")
      {
         element = document.createTextNode(Array.prototype.join.call(arguments, "") || "");
      }
      else
      {
         //create element and apply element methods to it if they aren't already there
         element = document.createElement(this);
         Element.__applyElementPrototypes(element);
         
         //append nodes
         if(arguments.length > 0)
         {
            element.append.apply(element, arguments);
         }
      }

      return element;
   };

   //init
   (["text", "a", "abbr", "acronym", "address", "blockquote", "br", "button", "caption",
      "cite", "code", "col", "colgroup", "dd", "del", "dfn", "div", "dl", "dt", "em",
      "fieldset", "form", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "iframe", "img", "input",
      "ins", "kbd", "label", "legend", "li", "object", "ol", "optgroup", "option", "p",
      "param", "pre", "q", "samp", "script", "select", "span", "strong", "sub", "sup",
      "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "title", "tr", "tt",
      "ul", "var"]).forEach(self.defineTag);
});


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
      //call the wrapping version of get on all elements
      getw();
      //now make sure the getw function can't re-apply everything
      getw = function()
      {
         return get.apply(this, arguments);
      };
   };
}