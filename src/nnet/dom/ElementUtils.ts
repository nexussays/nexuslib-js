// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = ElementUtils;

///ts:import=get
import get = require('./get'); ///ts:import:generated
///ts:import=NNetEvent
import NNetEvent = require('../event/NNetEvent'); ///ts:import:generated
///ts:import=escapeHTML
import escapeHTML = require('../util/string/escapeHTML'); ///ts:import:generated
///ts:import=t
import t = require('../util/object/t'); ///ts:import:generated
///ts:import=Types
import Types = require('../util/object/Types'); ///ts:import:generated
///ts:import=forEach
import forEach = require('../util/object/forEach'); ///ts:import:generated
///ts:import=contains
import contains = require('../util/string/contains'); ///ts:import:generated
///ts:import=flatten
import flatten = require('../util/array/flatten'); ///ts:import:generated

/**
 * Utility methods for HTML elements.
 * Call Element.applyElementPrototypes() to extend HTMLElement.prototype
 */
module ElementUtils
{
   export function getAncestor(element: HTMLElement, tagName: string): Node
   {
      var tag = tagName.toLowerCase(),
          iter: Node = element;
      while(iter.parentNode)
      {
         //if the element is the one we are looking for, return the entire element
         if(iter.parentNode.nodeName.toLowerCase() == tag)
         {
            return iter.parentNode;
         }
         iter = iter.parentNode;
      }
      return null;
   }

   export function isAncestor(element: HTMLElement, ancestor: Node): boolean
   {
      // instead of checking for it each time, just have IE<8 fall through to the catch block
      try
      {
         return (element.compareDocumentPosition( ancestor ) & Node.DOCUMENT_POSITION_CONTAINED_BY) == Node.DOCUMENT_POSITION_CONTAINED_BY;
      }
      catch(e)
      {
         return (<any>element == document || <any>element == window ? document.documentElement.contains( <HTMLElement>ancestor ) : false);
      }
   }

   export function getOuterHTML(element: HTMLElement, escapeHtml: boolean = false): string
   {
      var div = document.createElement( "div" );
      div.appendChild( element.cloneNode( true ) );
      return escapeHtml ? escapeHTML( div.innerHTML ) : div.innerHTML;
   }

   export function addClass(element: HTMLElement, name: string, checkExistence: boolean= false): boolean
   {
      if(checkExistence === false || (!hasClass( element, name )))
      {
         element.className += " " + name;
         //element.clasName = element.className.replace(/\s+$/gi, "") + " " + name;
         return true;
      }
      return false;
   }

   export function removeClass(element: HTMLElement, name: string): boolean
   {
      //replace the name with an empty string
      if(element.className)
      {
         element.className = element.className.replace( new RegExp( "(^|\\s)" + name + "(\\s|$)", "i" ), " " );
         if(element.className == "")
         {
            element.removeAttribute( "class" );
         }
      }
      return true;
   }

   export function toggleClass(element: HTMLElement, name: string)
   {
      hasClass( element, name ) ? removeClass( element, name ) : addClass( element, name, true );
   }

   export function hasClass(element: HTMLElement, name: string)
   {
      //return (new RegExp("(?:^|\\s)" + name + "(?:\\s|$)", "i").test(element.className));
      return (element.className && contains( element.className, name, " ", true ));
   }

   export function append(element: HTMLElement, ...params: Array<any>): HTMLElement
   {
      if(params != null)
      {
         for(var x = 0,
                 ln = params.length; x < ln; ++x)
         {
            try
            {
               var arg = params[x];
               switch(t( arg ))
               {
                  case Types.array:
                     append.apply( element, arg );
                     break;
                  case Types.node:
                     element.appendChild( arg );
                     break;
                  case Types.object:
                     for(var prop in arg)
                     {
                        //account for event handlers
                        if(/^on/.test( prop ))
                        {
                           bind( element, prop.substring( 2 ), arg[prop] );
                        }
                        else
                        {
                           //TODO: handle style attribute
                           element.setAttribute( prop, arg[prop] );
                        }
                     }
                     break;
                  default:
                     element.appendChild( document.createTextNode( arg + "" ) );
                     break;
               }
            }
            catch(e)
            {
               console.error( "append()", element, e );
            }
         }
      }
      return element;
   }

   export function bind(element: any, eventName: string, func: (e: NNetEvent) => void)
   {
      var eventHandler = (e) =>
      {
         func.call( element, new NNetEvent( e ) );
      };

      if(t( element.addEventListener ) == Types.function)
      {
         element.addEventListener( eventName, eventHandler, false );
      }
      else
      {
         element.attachEvent( "on" + eventName, eventHandler );
      }

      // store the handler on the element itself so we can look it up to remove it
      element.events = element.events || {};
      var events = (element.events[eventName] = element.events[eventName] || {});
      events[func] = eventHandler;
   }

   export function unbind(element: any, event: string, func: (e: NNetEvent) => void)
   {
      element.events = element.events || {};
      var events = (element.events[event] = element.events[event] || {});

      if(t( element.removeEventListener ) == Types.function)
      {
         element.removeEventListener( event, events[func], false );
      }
      else
      {
         element.detachEvent( "on" + event, events[func] );
      }

      // remove the function from the dict on the element
      delete events[func];
   }

   export function dispatchEvent(el: HTMLElement, type)
   {
   }

   export function wrapElement(element: HTMLElement, force ?: boolean): void
   {
      if(element && (force || element.nodeType == Node.ELEMENT_NODE))
      {
         forEach( ElementUtils, function(funcName, func)
         {
            element[funcName] = function(...params: any[])
            {
               params.unshift( this );
               //console.log( funcName, this, params );
               func.apply( this, params );
            };
         } );
      }
   }

   export function applyElementPrototypes()
   {
      ElementUtils.wrapElement( HTMLElement.prototype, true );
   }
}