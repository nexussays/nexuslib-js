// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=_stringutil,stringutil
import stringutil = require('../_stringutil'); ///ts:import:generated
///ts:import=find
import find = require('./find'); ///ts:import:generated
///ts:import=ElementGroup
import ElementGroup = require('./ElementGroup'); ///ts:import:generated
///ts:import=isAncestor,_isAncestor
import _isAncestor = require('./isAncestor'); ///ts:import:generated
///ts:import=getOuterHTML,_getOuterHTML
import _getOuterHTML = require('./getOuterHTML'); ///ts:import:generated
///ts:import=isArrayLike
import isArrayLike = require('../array/isArrayLike'); ///ts:import:generated
///ts:import=type
import type = require('../type'); ///ts:import:generated
///ts:import=enhanceEvent
import enhanceEvent = require('../event/enhanceEvent'); ///ts:import:generated
///ts:import=EventHandler
import EventHandler = require('../event/EventHandler'); ///ts:import:generated
///ts:import=enhanceElement
import enhanceElement = require('./enhanceElement'); ///ts:import:generated

export = EnhancedElement;

// combines EnhancedElement.IHTMLElementEnhancements which has our enhanced methods with HTMLElement so we 
// can still access all the native element properties
interface EnhancedElement extends HTMLElement, EnhancedElement.Impl
{
}

module EnhancedElement
{
   export class Impl
   {
      private s_booleanAttribute: RegExp = /^(?:async|autofocus|checked|compact|declare|default|defer|disabled|hidden|irrelevant|ismap|multiple|noresize|noshade|nowrap|readonly|required|selected)$/;
      private s_enumBooleanAttribute: RegExp = /^(?:contenteditable|spellcheck)$/;

      getOuterHTML(includeChildren?: boolean, escapeHtml?: boolean): string
      {
         return _getOuterHTML( (<Element><any>this), includeChildren, escapeHtml );
      }

      append(...params: Array<Array<any>>): EnhancedElement;
      append(...params: Array<Node>): EnhancedElement;
      append(...params: Array<any>): EnhancedElement;
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

      bind(eventName: string, func: EventHandler): void
      {
         var eventHandler = function(e)
         {
            func.call( this, enhanceEvent( e, this ), this );
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

      unbind(event: string, func: EventHandler): void
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

      parent(): EnhancedElement
      {
         var parent = (<Element><any>this).parentNode;
         return parent == document ? enhanceElement(document.documentElement) : enhanceElement(<HTMLElement>parent);
      }

      isAncestor(ancestor: Node): boolean
      {
         return _isAncestor((<Element><any>this), ancestor);
      }

      ancestors(query: string): ElementGroup
      {
         return find( query ).filter$( item => _isAncestor( (<HTMLElement><any>this), item ) );
      }

      addClass(name: string, checkExistence: boolean= false): boolean
      {
         if(checkExistence === false || (!this.hasClass( name )))
         {
            (<HTMLElement><any>this).className += " " + name;
            //element.clasName = element.className.replace(/\s+$/gi, "") + " " + name;
            return true;
         }
         return false;
      }

      removeClass(name: string): boolean
      {
         //replace the name with an empty string
         if((<HTMLElement><any>this).className)
         {
            (<HTMLElement><any>this).className = (<HTMLElement><any>this).className.replace( new RegExp( "(^|\\s)" + name + "(\\s|$)", "i" ), " " );
            if((<HTMLElement><any>this).className == "")
            {
               (<HTMLElement><any>this).removeAttribute( "class" );
            }
         }
         return true;
      }

      toggleClass(name: string)
      {
         this.hasClass( name ) ? this.removeClass( name ) : this.addClass( name, true );
      }

      hasClass(name: string): boolean
      {
         //return (new RegExp("(?:^|\\s)" + name + "(?:\\s|$)", "i").test(element.className));
         return ((<HTMLElement><any>this).className && stringutil.contains( (<HTMLElement><any>this).className, name, " ", true ));
      }

      css(value: any): string
      {
         var style: string[] = [];
         for(var key in value)
         {
            var val = value[key];
            if(!val && val !== 0)
            {
               (<HTMLElement><any>this).style.removeProperty( stringutil.hyphenate( key ) );
            }
            else
            {
               if(type.of(val) == type.number && !/opacity|lineHeight|zIndex/.test(key))
               {
                  val += "px";
               }
               style.push( stringutil.hyphenate( key ) + ':' + val );
            }
         }
         (<HTMLElement><any>this).style.cssText += ";" + style.join( ";" );
         return (<HTMLElement><any>this).style.cssText;
      }

      find(query: string): ElementGroup
      {
         return find( query, (<HTMLElement><any>this) );
      }
   }
}

/**
 * Provide interfaces for all the HTMLElement subclasses and extend them off the base EnhancedElement so as to
 * not clutter up the entire nnet.dom module with type-only files and cause implementors to make a lot of imports
 */
module EnhancedElement
{
   export interface Anchor extends HTMLAnchorElement, Impl
   {
   }

   export interface Audio extends HTMLAudioElement, Impl
   {
   }

   export interface Base extends HTMLBaseElement, Impl
   {
   }

   export interface BR extends HTMLBRElement, Impl
   {
   }

   export interface Block extends HTMLBlockElement, Impl
   {
   }

   export interface Button extends HTMLButtonElement, Impl
   {
   }

   export interface Canvas extends HTMLCanvasElement, Impl
   {
   }

   export interface TableCaption extends HTMLTableCaptionElement, Impl
   {
   }

   export interface TableCol extends HTMLTableColElement, Impl
   {
   }

   export interface DD extends HTMLDDElement, Impl
   {
   }

   export interface Div extends HTMLDivElement, Impl
   {
   }

   export interface DList extends HTMLDListElement, Impl
   {
   }

   export interface DT extends HTMLDTElement, Impl
   {
   }

   export interface Embed extends HTMLEmbedElement, Impl
   {
   }

   export interface FieldSet extends HTMLFieldSetElement, Impl
   {
   }

   export interface Form extends HTMLFormElement, Impl
   {
   }

   export interface Heading extends HTMLHeadingElement, Impl
   {
   }

   export interface HR extends HTMLHRElement, Impl
   {
   }

   export interface IFrame extends HTMLIFrameElement, Impl
   {
   }

   export interface Image extends HTMLImageElement, Impl
   {
   }

   export interface Input extends HTMLInputElement, Impl
   {
   }

   export interface Label extends HTMLLabelElement, Impl
   {
   }

   export interface Legend extends HTMLLegendElement, Impl
   {
   }

   export interface LI extends HTMLLIElement, Impl
   {
   }

   export interface Link extends HTMLLinkElement, Impl
   {
   }

   export interface Object extends HTMLObjectElement, Impl
   {
   }

   export interface OList extends HTMLOListElement, Impl
   {
   }

   export interface OptGroup extends HTMLOptGroupElement, Impl
   {
   }

   export interface Paragraph extends HTMLParagraphElement, Impl
   {
   }

   export interface Param extends HTMLParamElement, Impl
   {
   }

   export interface Option extends HTMLOptionElement, Impl
   {
   }

   export interface Pre extends HTMLPreElement, Impl
   {
   }

   export interface Progress extends HTMLProgressElement, Impl
   {
   }

   export interface Quote extends HTMLQuoteElement, Impl
   {
   }

   export interface Script extends HTMLScriptElement, Impl
   {
   }

   export interface Select extends HTMLSelectElement, Impl
   {
   }

   export interface Source extends HTMLSourceElement, Impl
   {
   }

   export interface Span extends HTMLSpanElement, Impl
   {
   }

   export interface Table extends HTMLTableElement, Impl
   {
   }

   export interface TableSection extends HTMLTableSectionElement, Impl
   {
   }

   export interface TableDataCell extends HTMLTableDataCellElement, Impl
   {
   }

   export interface TextArea extends HTMLTextAreaElement, Impl
   {
   }

   export interface TableHeaderCell extends HTMLTableHeaderCellElement, Impl
   {
   }

   export interface TableSection extends HTMLTableSectionElement, Impl
   {
   }

   export interface Title extends HTMLTitleElement, Impl
   {
   }

   export interface TableRow extends HTMLTableRowElement, Impl
   {
   }

   export interface Track extends HTMLTrackElement, Impl
   {
   }

   export interface UList extends HTMLUListElement, Impl
   {
   }

   export interface Video extends HTMLVideoElement, Impl
   {
   }
}