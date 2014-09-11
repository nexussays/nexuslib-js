// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=IEnhancedEvent
import IEnhancedEvent = require('../event/IEnhancedEvent'); ///ts:import:generated
///ts:import=EnhancedEvent
import EnhancedEvent = require('../event/EnhancedEvent'); ///ts:import:generated
///ts:import=escapeHTML
import escapeHTML = require('../string/escapeHTML'); ///ts:import:generated
///ts:import=Types
import Types = require('../Types'); ///ts:import:generated
///ts:import=type
import type = require('../type'); ///ts:import:generated
///ts:import=IEnhancedElement
import IEnhancedElement = require('./IEnhancedElement'); ///ts:import:generated
///ts:import=isArrayLike
import isArrayLike = require('../array/isArrayLike'); ///ts:import:generated

export = EnhancedElement;

class EnhancedElement implements EnhancedElement.IElementEnhancements
{
   private get asElement(): Element
   {
      // this class should never be instantiated by itself, we just copy its prototype
      // to objects or to other element protoypes
      return (<Element>(<any>this));
   }

   getAncestor(tagName: string): Node
   {
      var tag = tagName.toLowerCase(),
          iter: Node = this.asElement;
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

   isAncestor(ancestor: Node): boolean
   {
      // instead of checking for it each time, just have IE<8 fall through to the catch block
      try
      {
         return (this.asElement.compareDocumentPosition( ancestor ) & Node.DOCUMENT_POSITION_CONTAINED_BY) == Node.DOCUMENT_POSITION_CONTAINED_BY;
      }
      catch(e)
      {
         return (<any>this == document || <any>this == window ? document.documentElement.contains( <HTMLElement>ancestor ) : false);
      }
   }

   getOuterHTML(escapeHtml: boolean = false): string
   {
      var div = document.createElement( "div" );
      div.appendChild( this.asElement.cloneNode( true ) );
      return escapeHtml ? escapeHTML( div.innerHTML ) : div.innerHTML;
   }

   append(...params: Array<Array<any>>): IEnhancedElement;
   append(...params: Array<Node>): IEnhancedElement;
   append(...params: Array<Object>): IEnhancedElement;
   append(...params: Array<any>): IEnhancedElement
   {
      if(params != null)
      {
         for(var x = 0,
                 ln = params.length; x < ln; ++x)
         {
            var arg = params[x];
            if(isArrayLike( arg ))
            {
               [].forEach( this.append, arg );
            }
            else
            {
               switch(type( arg ))
               {
                  case Types.node:
                     this.asElement.appendChild( <Node>arg );
                     break;
                  case Types.object:
                     for(var prop in arg)
                     {
                        //account for event handlers
                        if(/^on/.test( prop ))
                        {
                           this.bind( prop.substring( 2 ), arg[prop] );
                        }
                        else
                        {
                           //TODO: handle style attribute
                           this.asElement.setAttribute( prop, arg[prop] );
                        }
                     }
                     break;
                  default:
                     this.asElement.appendChild( document.createTextNode( arg + "" ) );
                     break;
               }
            }
         }
      }
      return <IEnhancedElement>this.asElement;
   }

   bind(eventName: string, func: (e: IEnhancedEvent) => void)
   {
      var eventHandler = function(e)
      {
         func.call( this, new EnhancedEvent( e ) );
      };

      if(type( this.asElement.addEventListener ) == Types.function)
      {
         this.asElement.addEventListener( eventName, eventHandler, false );
      }
      else
      {
         (<HTMLElement>this.asElement).attachEvent( "on" + eventName, eventHandler );
      }

      // store the handler on the element itself so we can look it up to remove it
      var anyEl = (<any>this.asElement);
      anyEl.events = anyEl.events || {};
      var events = (anyEl.events[eventName] = anyEl.events[eventName] || {});

      events[func] = eventHandler;
   }

   unbind(event: string, func: (e: IEnhancedEvent) => void)
   {
      var anyEl = (<any>this.asElement);
      anyEl.events = anyEl.events || {};
      var events = (anyEl.events[event] = anyEl.events[event] || {});

      if(type( this.asElement.removeEventListener ) == Types.function)
      {
         this.asElement.removeEventListener( event, events[func], false );
      }
      else
      {
         (<HTMLElement>this.asElement).detachEvent( "on" + event, events[func] );
      }

      // remove the function from the dict on the element
      delete events[func];
   }

   dispatchEvent(el: Element, type)
   {
   }
}

module EnhancedElement
{
   export interface IElementEnhancements
   {
      getAncestor(tagName: string): Node;
      isAncestor(ancestor: Node): boolean;
      getOuterHTML(escapeHtml: boolean): string;
      append(...params: Array<Array<any>>): IEnhancedElement;
      append(...params: Array<Node>): IEnhancedElement;
      append(...params: Array<Object>): IEnhancedElement;
      append(...params: Array<any>): IEnhancedElement;
      bind(eventName: string, func: (e: IEnhancedEvent) => void);
      unbind(event: string, func: (e: IEnhancedEvent) => void);
   }
}