// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

///ts:import=get
import get = require('./get'); ///ts:import:generated
///ts:import=NNetEvent
import NNetEvent = require('../event/NNetEvent'); ///ts:import:generated
///ts:import=escapeHTML
import escapeHTML = require('../util/string/escapeHTML'); ///ts:import:generated
import obj = require('../util/object_');

export = ElementUtils;
/**
 * Utility methods for HTML elements.
 * Call Element.applyElementPrototypes() to extend HTMLElement.prototype
 */
class ElementUtils
{
   // declare all the methods on ElementInternal
   // TODO: See if there's a way to generate these dynamically
   static getAncestor: (tagName: string) => HTMLElement;
   static getOuterHTML: (escapeHtml?: boolean) => string;
   static addClass: (className: string, checkExistence: boolean) => void;
   static removeClass: (className: string) => void;
   static toggleClass: (className: string) => boolean;
   static hasClass: (className: string) => boolean;
   static append: () => void;
   static bind: () => void;
   static unbind: () => void;
   static isAncestor: (element: Node, container: any) => boolean;

   static wrapElement(element: HTMLElement, override?: boolean): void
   {
      // if the browser *does* support element prototyping, this function is changed below
      if(override || (element && element.nodeType == 1))
      {
         obj.forEach(elementInternal, (key, value) =>
         {
            element[key] = function()
            {
               return value.apply(this, arguments);
            }
         });
      }
   }

   static applyElementPrototypes()
   {
      /*
      if(!Browser.supportsElementPrototype())
      {
         //TODO: determine if I need to add an onunload function to destroy all this so there are no memory leaks (mostly in IE)
         documentPreload.applyElementPrototype = function()
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
      //*/
      ElementUtils.wrapElement( HTMLElement.prototype, true );
   }
}

/**
    * Element wraps these methods, so all functions are guaranteed to have a valid
    * HTML element as the "this" variable
    */
module elementInternal
{
   export function getAncestor(tagName)
   {
      var tag = tagName.toLowerCase(),
          iter = this,
          result = null;
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

   export function isAncestor(element: Node, container: Window): boolean
   export function isAncestor(element: Node, container: Element): boolean
   export function isAncestor(element: Node, container: Node): boolean
   export function isAncestor(element: Node, container: any): boolean
   {
      // instead of checking for it each time, just have IE<8 fall through to the catch block
      try
      {
         return (container.compareDocumentPosition( element ) & Node.DOCUMENT_POSITION_CONTAINED_BY) == Node.DOCUMENT_POSITION_CONTAINED_BY;
      }
      catch(e)
      {
         container = container == document || container == window ? document.documentElement : container;
         return container !== element && container.contains( element );
      }
   }

   export function getOuterHTML(escapeHtml)
   {
      var div = document.createElement( "div" );
      div.appendChild( this.cloneNode( true ) );
      return escapeHtml ? escapeHTML( div.innerHTML ) : div.innerHTML;
   }

   export function addClass(name: string, checkExistence)
   {
      if(checkExistence === false || (!elementInternal.hasClass.call( this, name )))
      {
         this.className += " " + name;
         //this.clasName = this.className.replace(/\s+$/gi, "") + " " + name;
      }
      return true;
   }

   export function removeClass(name)
   {
      //replace the name with an empty string
      if(this.className)
      {
         this.className = this.className.replace( new RegExp( "(^|\\s)" + name + "(\\s|$)", "i" ), "$1$2" );
         if(this.className == "")
         {
            this.removeAttribute( "class" );
         }
      }
      return true;
   }

   export function toggleClass(name)
   {
      elementInternal.hasClass.call( this, name ) ? elementInternal.removeClass.call( this, name ) : elementInternal.addClass.call( this, name, true );
   }

   export function hasClass(name)
   {
      //return (new RegExp("(?:^|\\s)" + name + "(?:\\s|$)", "i").test(this.className));
      return (this.className && this.className.contains( name, " ", true ));
   }

   export function append()
   {
      for(var x = 0,
              ln = arguments.length; x < ln; ++x)
      {
         try
         {
            var el = arguments[x];
            switch(obj.type( el ))
            {
               case "array":
                  this.append.apply( this, el );
                  break;
               case "node":
                  this.appendChild( el );
                  break;
               case "object":
                  for(var prop in el)
                  {
                     //account for event handlers
                     if(/^on/.test( prop ))
                     {
                        this.addEvent( prop.substring( 2 ), el[prop] );
                     }
                     else
                     {
                        this.setAttribute( prop, el[prop] );
                     }
                     //TODO: handle style attribute
                  }
                  break;
               default:
                  //this.innerHTML += el;
                  // 2014-03-07, feels like appending a text node is better than altering innerHTML
                  this.appendChild( document.createTextNode( el + "" ) );
                  break;
            }
         }
         catch(e)
         {
            console.error( "__append", e );
         }
      }
      return this;
   }

   export function bind(type, func)
   {
      this.events = this.events || {};
      var events = (this.events[type] = this.events[type] || {});
      events[func] = () =>
      {
         func.call( this, new NNetEvent( arguments[0] ) );
      };
      if(obj.type(this.addEventListener) == "function")
      {
         this.addEventListener( type, events[func], false );
      }
      else
      {
         this.attachEvent( "on" + type, events[func] );
      }
   }

   export function unbind(type, func)
   {
      this.events = this.events || {};
      var events = (this.events[type] = this.events[type] || {});
      delete events[func];

      if(obj.type( this.removeEventListener ) == "function")
      {
         this.removeEventListener( type, events[func], false );
      }
      else
      {
         this.detachEvent( "on" + type, events[func] );
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
         return elementInternal[this].apply( el, arguments );
      }
      else
      {
         throw new TypeError( "\"" + el + "\" (typeof \"" + obj.type( el ) + "\") is not, or does not resolve to, a valid HTML Element" );
      }
   }

   //Now add all these methods to Element
   (() =>
   {
      // function call to create closure on funcName
      function apply(funcName)
      {
         ElementUtils[funcName] = () =>
         {
            return __wrapper.apply( funcName, arguments );
         };
      }

      for(var name in elementInternal)
      {
         apply( name );
      }
   })();
}