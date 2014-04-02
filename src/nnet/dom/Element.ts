// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import get = require("nnet/dom/get");
import Event = require("nnet/event");
import obj = require("nnet/util/ObjectUtils");
import str = require("nnet/util/StringUtils");

export = Element;
/**
 * Utility methods for HTML elements.
 * Call Element.applyElementPrototypes() to extend HTMLElement.prototype
 */
class Element
{
   // declare all the methods on ElementInternal
   // TODO: See if there's a way to generate these dynamically
   static getAncestor: (tagName: string) => HTMLElement;
   static getOuterHTML: (escapeHtml?: boolean) => string;
   static addCssClass: (className: string, checkExistence: boolean) => void;
   static removeCssClass: (className: string) => void;
   static toggleCssClass: (className: string) => boolean;
   static hasCssClass: (className: string) => boolean;
   static append: () => void;
   static addEvent: () => void;
   static removeEvent: () => void;

   static wrapElement(element: HTMLElement, override?: boolean): void
   {
      // if the browser *does* support element prototyping, this function is changed below
      if(override || (element && element.nodeType == 1))
      {
         obj.forEach(ElementInternal, (key, value) =>
         {
            element[key] = function()
            {
               return value.apply(this, arguments);
            }
         });
      }
   }
}

/**
 * Element wraps these methods, so all functions are guaranteed to have a valid
 * HTML element as the "this" variable
 */
module ElementInternal
{
   export function getAncestor(tagName)
   {
      var tag = tagName.toLowerCase(), iter = this, result = null;
      while(iter.parentNode)
      {
         //if the element is the one we are looking for, return the entire element
         if(iter.parentNode.nodeName.toLowerCase() == tag)
         {
            result = iter.parentNode;
            break;
         }
         iter = iter.parentNode;
      }
      return result;
   }

   export function getOuterHTML(escapeHtml)
   {
      var div = document.createElement("div");
      div.appendChild(this.cloneNode(true));
      return escapeHtml ? str.escapeHTML(div.innerHTML) : div.innerHTML;
   }

   export function addCssClass(name, checkExistence)
   {
      if(checkExistence === false || (!ElementInternal.hasCssClass.call(this, name)))
      {
         this.className += " " + name;
      }
      return true;
   }

   export function removeCssClass(name)
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
   }

   export function toggleCssClass(name)
   {
      ElementInternal.hasCssClass.call(this, name) ? ElementInternal.removeCssClass.call(this, name) : ElementInternal.addCssClass.call(this, name, true);
   }

   export function hasCssClass(name)
   {
      //return (new RegExp("(?:^|\\s)" + name + "(?:\\s|$)", "i").test(this.className));
      return (this.className && this.className.contains(name, " ", true));
   }

   export function append()
   {
      for(var x = 0, ln = arguments.length; x < ln; ++x)
      {
         try
         {
            var el = arguments[x];
            switch(obj.type(el))
            {
               case "array":
                  this.append.apply(this, el);
                  break;
               case "node":
                  this.appendChild(el);
                  break;
               case "object":
                  for(var prop in el)
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
         catch(e)
         {
            console.error("__append", e);
         }
      }
      return this;
   }

   export function addEvent(type, func)
   {
      this.events = this.events || {};
      var events = (this.events[type] = this.events[type] || {});
      var self = this;
      events[func] = () =>
      {
         func.call(self, new Event(arguments[0]));
      };
      if(obj.type(this.addEventListener) == "function")
      {
         this.addEventListener(type, events[func], false);
      }
      else
      {
         this.attachEvent("on" + type, events[func]);
      }
   }

   export function removeEvent(type, func)
   {
      this.events = this.events || {};
      var events = (this.events[type] = this.events[type] || {});
      if(obj.type(this.removeEventListener) == "function")
      {
         this.removeEventListener(type, events[func], false);
      }
      else
      {
         this.detachEvent("on" + type, events[func]);
      }
   }

   /*
   export function dispatchEvent(type)
   {

   }
   //*/

   function __wrapper()
   {
      // first argument is the element in question
      var el = get(Array.prototype.shift.call(arguments));
      // TODO: Allow element arrays to be passed
      if("nodeType" in el)
      {
         // remaining arguments are passed to the function being called
         return ElementInternal[this].apply(el, arguments);
      }
      else
      {
         throw new TypeError("\"" + el + "\" (typeof \"" + obj.type(el) + "\") is not, or does not resolve to, a valid HTML Element");
      }
   }

   //Now add all these methods to Element
   (() =>
   {
      // function call to create closure on funcName
      function apply(funcName)
      {
         Element[funcName] = () =>
         {
            return __wrapper.apply(funcName, arguments);
         };
      }

      for(var name in ElementInternal)
      {
         apply(name);
      }
   })();
}