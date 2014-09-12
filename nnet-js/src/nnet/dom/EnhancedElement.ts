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
///ts:import=isArrayLike
import isArrayLike = require('../array/isArrayLike'); ///ts:import:generated
///ts:import=isAncestor
import isAncestor = require('./isAncestor'); ///ts:import:generated

export = EnhancedElement;

interface EnhancedElement extends Element, EnhancedElement.IEnhancedElementImpl
{
}

module EnhancedElement
{
   export class IEnhancedElementImpl
   {
      private asElement(): Element
      {
         // this class should never be instantiated by itself, we just copy its prototype
         // to objects or to other element protoypes
         return (<Element>(<any>this));
      }

      private s_booleanAttribute: RegExp = /^(?:async|autofocus|checked|compact|declare|default|defer|disabled|hidden|irrelevant|ismap|multiple|noresize|noshade|nowrap|readonly|required|selected)$/;
      private s_enumBooleanAttribute: RegExp = /^(?:contenteditable|spellcheck)$/;

      isAncestor(ancestor: Node): boolean
      {
         return isAncestor( this.asElement(), ancestor );
      }

      getOuterHTML(escapeHtml: boolean = false): string
      {
         var div = document.createElement( "div" );
         div.appendChild( this.asElement().cloneNode( true ) );
         return escapeHtml ? escapeHTML( div.innerHTML ) : div.innerHTML;
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
                  switch(type( arg ))
                  {
                     case Types.node:
                        this.asElement().appendChild( <Node>arg );
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
                              this.asElement().setAttribute( prop, arg[prop] );
                           }
                        }
                        break;
                     default:
                        this.asElement().appendChild( document.createTextNode( arg + "" ) );
                        break;
                  }
               }
            }
         }
         return <EnhancedElement>this.asElement();
      }

      getBooleanAttribute(name: string): boolean
      {
         name = name.toLowerCase();
         var val = this.asElement().getAttribute( name );
         return val === "" || val === name || (this.s_enumBooleanAttribute.test(name) && val === "true");
      }

      setBooleanAttribute(name: string, value: boolean): void
      {
         name = name.toLowerCase();
         if(this.s_booleanAttribute.test( name ))
         {
            if(value)
            {
               this.asElement().setAttribute(name, "");
            }
            else
            {
               this.asElement().removeAttribute( name );
            }
         }
         // contenteditable and spellcheck have true,false,inherit states
         else if(this.s_enumBooleanAttribute.test(name))
         {
            this.asElement().setAttribute(name, value ? "true" : "false");
         }
      }

      bind(eventName: string, func: (e: IEnhancedEvent) => void): void
      {
         var eventHandler = function(e)
         {
            func.call( this, new EnhancedEvent( e ) );
         };

         if(type( this.asElement().addEventListener ) == Types.function)
         {
            this.asElement().addEventListener( eventName, eventHandler, false );
         }
         else
         {
            (<HTMLElement>this.asElement()).attachEvent( "on" + eventName, eventHandler );
         }

         // store the handler on the element itself so we can look it up to remove it
         var anyEl = (<any>this.asElement());
         anyEl.events = anyEl.events || {};
         var events = (anyEl.events[eventName] = anyEl.events[eventName] || {});

         events[func] = eventHandler;
      }

      unbind(event: string, func: (e: IEnhancedEvent) => void): void
      {
         var anyEl = (<any>this.asElement());
         anyEl.events = anyEl.events || {};
         var events = (anyEl.events[event] = anyEl.events[event] || {});

         if(type( this.asElement().removeEventListener ) == Types.function)
         {
            this.asElement().removeEventListener( event, events[func], false );
         }
         else
         {
            (<HTMLElement>this.asElement()).detachEvent( "on" + event, events[func] );
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
         var el = this.asElement();
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