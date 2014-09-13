// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=EnhancedEvent
import EnhancedEvent = require('../event/EnhancedEvent'); ///ts:import:generated
///ts:import=enhanceEvent
import enhanceEvent = require('../event/enhanceEvent'); ///ts:import:generated
///ts:import=escapeHTML
import escapeHTML = require('../string/escapeHTML'); ///ts:import:generated
///ts:import=type
import type = require('../type'); ///ts:import:generated
///ts:import=isArrayLike
import isArrayLike = require('../array/isArrayLike'); ///ts:import:generated
///ts:import=isAncestor,_isAncestor
import _isAncestor = require('./isAncestor'); ///ts:import:generated
///ts:import=getOuterHTML,_getOuterHTML
import _getOuterHTML = require('./getOuterHTML'); ///ts:import:generated

export = EnhancedElement;

interface EnhancedElement extends Element, EnhancedElement.Impl
{
}

module EnhancedElement
{
   export class Impl
   {
      private s_booleanAttribute: RegExp = /^(?:async|autofocus|checked|compact|declare|default|defer|disabled|hidden|irrelevant|ismap|multiple|noresize|noshade|nowrap|readonly|required|selected)$/;
      private s_enumBooleanAttribute: RegExp = /^(?:contenteditable|spellcheck)$/;

      isAncestor(ancestor: Node): boolean
      {
         return _isAncestor( (<Element><any>this), ancestor );
      }

      getOuterHTML(includeChildren?: boolean, escapeHtml?: boolean): string
      {
         return _getOuterHTML( (<Element><any>this), includeChildren, escapeHtml );
      }

      append(...params: Array<Array<any>>): EnhancedElement;
      append(...params: Array<Node>): EnhancedElement;
      append(...params: Array<Object>): EnhancedElement;
      append(...params: Array<any>): EnhancedElement
      {
         if(params != null)
         {
            for(var x = 0,
                    ln = params.length; x < ln; ++x)
            {
               var arg = params[x];
               if(isArrayLike( arg ))
               {
                  Array.prototype.forEach.call( arg, item => this.append( item ), this );
               }
               else
               {
                  switch(type.of( arg ))
                  {
                     case type.node:
                        (<Element><any>this).appendChild( <Node>arg );
                        break;
                     case type.object:
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
                              (<Element><any>this).setAttribute( prop, arg[prop] );
                           }
                        }
                        break;
                     default:
                        (<Element><any>this).appendChild( document.createTextNode( arg + "" ) );
                        break;
                  }
               }
            }
         }
         return <EnhancedElement>(<Element><any>this);
      }

      getBooleanAttribute(name: string): boolean
      {
         name = name.toLowerCase();
         var val = (<Element><any>this).getAttribute( name );
         return val === "" || val === name || (this.s_enumBooleanAttribute.test( name ) && val === "true");
      }

      setBooleanAttribute(name: string, value: boolean): void
      {
         name = name.toLowerCase();
         if(this.s_booleanAttribute.test( name ))
         {
            if(value)
            {
               (<Element><any>this).setAttribute( name, "" );
            }
            else
            {
               (<Element><any>this).removeAttribute( name );
            }
         }
         // contenteditable and spellcheck have true,false,inherit states
         else if(this.s_enumBooleanAttribute.test( name ))
         {
            (<Element><any>this).setAttribute( name, value ? "true" : "false" );
         }
      }

      bind(eventName: string, func: (e: EnhancedEvent) => void): void
      {
         var eventHandler = function(e)
         {
            func.call(this, enhanceEvent( e, this ) );
         };

         if(type.of( (<Element><any>this).addEventListener ) == type.function)
         {
            (<Element><any>this).addEventListener( eventName, eventHandler, false );
         }
         else
         {
            (<HTMLElement>(<Element><any>this)).attachEvent( "on" + eventName, eventHandler );
         }

         // store the handler on the element itself so we can look it up to remove it
         var anyEl = (<any>(<Element><any>this));
         anyEl.events = anyEl.events || {};
         var events = (anyEl.events[eventName] = anyEl.events[eventName] || {});
         events[func] = eventHandler;
      }

      unbind(event: string, func: (e: EnhancedEvent) => void): void
      {
         var anyEl = (<any>(<Element><any>this));
         anyEl.events = anyEl.events || {};
         var events = (anyEl.events[event] = anyEl.events[event] || {});

         if(type.of( (<Element><any>this).removeEventListener ) == type.function)
         {
            (<Element><any>this).removeEventListener( event, events[func], false );
         }
         else
         {
            (<HTMLElement>(<Element><any>this)).detachEvent( "on" + event, events[func] );
         }

         // remove the function from the dict on the element
         delete events[func];
      }

      trigger(eventName: string): void
      {
         var event: Event;
         if((<any>window).initCustomEvent)
         {
            //console.log( "initCustomEvent" );
            event = (<any>window).initCustomEvent( eventName, true, true );
         }
         else if(document.createEvent)
         {
            //console.log("document.createEvent");
            event = document.createEvent( 'HTMLEvents' );
            event.initEvent( eventName, true, true );
         }
         else if(document.createEventObject)
         {
            //console.log("document.createEventObject");
            event = document.createEventObject();
            (<MSEventObj>event).type = eventName;
         }
         else
         {
            throw new Error( "Unable to create event \"" + eventName + "\"" );
         }

         //event.eventName = eventName;
         var el = (<Element><any>this);
         if(el.dispatchEvent)
         {
            el.dispatchEvent( event );
         }
         else if(el.fireEvent)
         {
            el.fireEvent( 'on' + eventName, event );
         }
         else if(el[eventName])
         {
            el[eventName]();
         }
         else if(el['on' + eventName])
         {
            el['on' + eventName]();
         }
      }
   }
}