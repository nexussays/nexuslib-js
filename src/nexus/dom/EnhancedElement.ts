// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=_stringutil,stringutil
import stringutil = require('../_stringutil'); ///ts:import:generated
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
///ts:import=clone
import clone = require('../object/clone'); ///ts:import:generated
///ts:import=ElementBox
import ElementBox = require('./ElementBox'); ///ts:import:generated
///ts:import=BoundingBox
import BoundingBox = require('./BoundingBox'); ///ts:import:generated
///ts:import=find,_find
import _find = require('./find'); ///ts:import:generated
// so we can break the circular dependency on the find method
declare var require;

export = EnhancedElement;

interface EnhancedElement extends HTMLElement, EnhancedElement.Enhancements
{
}

// private internal implementation which is used to extend other elements or prototypes in EnhancedElement.enhance() method below
class Implementation implements EnhancedElement.Enhancements
{
   private static s_booleanAttribute: RegExp = /^(?:async|autofocus|checked|compact|declare|default|defer|disabled|hidden|irrelevant|ismap|multiple|noresize|noshade|nowrap|readonly|required|selected)$/;
   private static s_enumBooleanAttribute: RegExp = /^(?:contenteditable|spellcheck)$/;

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
      return val === "" || val === name || (Implementation.s_enumBooleanAttribute.test( name ) && val === "true");
   }

   setBooleanAttribute(name: string, value: boolean): void
   {
      name = name.toLowerCase();
      if(Implementation.s_booleanAttribute.test( name ))
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
      else if(Implementation.s_enumBooleanAttribute.test( name ))
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
         event = document.createEvent( "HTMLEvents" );
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
         el.fireEvent( "on" + eventName, event );
      }
      else if(type.of( el[eventName] ) == type.function)
      {
         el[eventName]( event );
      }
      else if(type.of( el["on" + eventName] ) == type.function)
      {
         el["on" + eventName]( event );
      }
   }

   parent(): EnhancedElement
   {
      var parent = (<Element><any>this).parentNode;
      return parent == document ? EnhancedElement.enhance( document.documentElement ) : EnhancedElement.enhance( <HTMLElement>parent );
   }

   isAncestor(ancestor: Node): boolean
   {
      return _isAncestor( (<Element><any>this), ancestor );
   }

   ancestors(query: string): ElementGroup
   {
      var f: typeof _find = require( './find' );
      return f( query ).filter$( item => _isAncestor( (<HTMLElement><any>this), item ) );
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

   toggleClass(name: string): void
   {
      this.hasClass( name ) ? this.removeClass( name ) : this.addClass( name, true );
   }

   hasClass(name: string): boolean
   {
      //return (new RegExp("(?:^|\\s)" + name + "(?:\\s|$)", "i").test(element.className));
      return ((<HTMLElement><any>this).className && stringutil.contains( (<HTMLElement><any>this).className, name, " ", true ));
   }

   css(): CSSStyleDeclaration;
   css(value: any): CSSStyleDeclaration;
   css(value?: any): CSSStyleDeclaration
   {
      if(value !== undefined)
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
               if(type.of( val ) == type.number && !/opacity|lineHeight|zIndex/.test( key ))
               {
                  val += "px";
               }
               style.push( stringutil.hyphenate( key ) + ':' + val );
            }
         }
         (<HTMLElement><any>this).style.cssText += ";" + style.join( ";" );
      }
      return getComputedStyle( <HTMLElement><any>this );
   }

   bounds(): ElementBox
   {
      return ElementBox.calculate( <Element><any>this );
   }

   find(query: string): ElementGroup
   {
      var f: typeof _find = require( './find' );
      return f( query, (<HTMLElement><any>this) );
   }
}

/**
 * Provide interfaces for all the HTMLElement subclasses and extend them off the base EnhancedElement so as to
 * not clutter up the entire nnet.dom module with type-only files and cause implementors to make a lot of imports
 */
module EnhancedElement
{
   var isPrototypeEnhanced: boolean;

   export function enhance(element: HTMLElement): EnhancedElement
   {
      if(!isPrototypeEnhanced && element && (element === HTMLElement.prototype || element.nodeType === Node.ELEMENT_NODE))
      {
         clone( Implementation.prototype, element );
         if(element === HTMLElement.prototype)
         {
            isPrototypeEnhanced = true;
         }
      }
      return <EnhancedElement>element;
   }

   export interface Enhancements
   {
      getOuterHTML(includeChildren?: boolean, escapeHtml?: boolean): string;

      append(...params: any[][]): EnhancedElement;
      append(...params: Node[]): EnhancedElement;
      append(...params: any[]): EnhancedElement;

      getBooleanAttribute(name: string): boolean;

      setBooleanAttribute(name: string, value: boolean): void;

      bind(eventName: string, func: EventHandler): void;

      unbind(event: string, func: EventHandler): void;

      trigger(eventName: string): void;

      parent(): EnhancedElement;

      isAncestor(ancestor: Node): boolean;

      ancestors(query: string): ElementGroup;

      addClass(name: string, checkExistence?: boolean): boolean;

      removeClass(name: string): boolean;

      toggleClass(name: string): void;

      hasClass(name: string): boolean;

      css(): CSSStyleDeclaration;
      css(value: any): CSSStyleDeclaration;

      bounds(): ElementBox;

      find(query: string): ElementGroup;
   }

   export interface Anchor extends HTMLAnchorElement, Enhancements
   {
   }

   export interface Audio extends HTMLAudioElement, Enhancements
   {
   }

   export interface Base extends HTMLBaseElement, Enhancements
   {
   }

   export interface BR extends HTMLBRElement, Enhancements
   {
   }

   export interface Block extends HTMLBlockElement, Enhancements
   {
   }

   export interface Button extends HTMLButtonElement, Enhancements
   {
   }

   export interface Canvas extends HTMLCanvasElement, Enhancements
   {
   }

   export interface TableCaption extends HTMLTableCaptionElement, Enhancements
   {
   }

   export interface TableCol extends HTMLTableColElement, Enhancements
   {
   }

   export interface DD extends HTMLDDElement, Enhancements
   {
   }

   export interface Div extends HTMLDivElement, Enhancements
   {
   }

   export interface DList extends HTMLDListElement, Enhancements
   {
   }

   export interface DT extends HTMLDTElement, Enhancements
   {
   }

   export interface Embed extends HTMLEmbedElement, Enhancements
   {
   }

   export interface FieldSet extends HTMLFieldSetElement, Enhancements
   {
   }

   export interface Form extends HTMLFormElement, Enhancements
   {
   }

   export interface Heading extends HTMLHeadingElement, Enhancements
   {
   }

   export interface HR extends HTMLHRElement, Enhancements
   {
   }

   export interface IFrame extends HTMLIFrameElement, Enhancements
   {
   }

   export interface Image extends HTMLImageElement, Enhancements
   {
   }

   export interface Input extends HTMLInputElement, Enhancements
   {
   }

   export interface Label extends HTMLLabelElement, Enhancements
   {
   }

   export interface Legend extends HTMLLegendElement, Enhancements
   {
   }

   export interface LI extends HTMLLIElement, Enhancements
   {
   }

   export interface Link extends HTMLLinkElement, Enhancements
   {
   }

   export interface Object extends HTMLObjectElement, Enhancements
   {
   }

   export interface OList extends HTMLOListElement, Enhancements
   {
   }

   export interface OptGroup extends HTMLOptGroupElement, Enhancements
   {
   }

   export interface Paragraph extends HTMLParagraphElement, Enhancements
   {
   }

   export interface Param extends HTMLParamElement, Enhancements
   {
   }

   export interface Option extends HTMLOptionElement, Enhancements
   {
   }

   export interface Pre extends HTMLPreElement, Enhancements
   {
   }

   export interface Progress extends HTMLProgressElement, Enhancements
   {
   }

   export interface Quote extends HTMLQuoteElement, Enhancements
   {
   }

   export interface Script extends HTMLScriptElement, Enhancements
   {
   }

   export interface Select extends HTMLSelectElement, Enhancements
   {
   }

   export interface Source extends HTMLSourceElement, Enhancements
   {
   }

   export interface Span extends HTMLSpanElement, Enhancements
   {
   }

   export interface Table extends HTMLTableElement, Enhancements
   {
   }

   export interface TableSection extends HTMLTableSectionElement, Enhancements
   {
   }

   export interface TableDataCell extends HTMLTableDataCellElement, Enhancements
   {
   }

   export interface TextArea extends HTMLTextAreaElement, Enhancements
   {
   }

   export interface TableHeaderCell extends HTMLTableHeaderCellElement, Enhancements
   {
   }

   export interface TableSection extends HTMLTableSectionElement, Enhancements
   {
   }

   export interface Title extends HTMLTitleElement, Enhancements
   {
   }

   export interface TableRow extends HTMLTableRowElement, Enhancements
   {
   }

   export interface Track extends HTMLTrackElement, Enhancements
   {
   }

   export interface UList extends HTMLUListElement, Enhancements
   {
   }

   export interface Video extends HTMLVideoElement, Enhancements
   {
   }
}