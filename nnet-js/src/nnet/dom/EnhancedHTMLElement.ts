// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=contains
import contains = require('../stringutil/contains'); ///ts:import:generated
///ts:import=EnhancedElement
import EnhancedElement = require('./EnhancedElement'); ///ts:import:generated
///ts:import=find
import find = require('./find'); ///ts:import:generated
///ts:import=ElementGroup
import ElementGroup = require('./ElementGroup'); ///ts:import:generated
///ts:import=isAncestor
import isAncestor = require('./isAncestor'); ///ts:import:generated


export = EnhancedHTMLElement;

// combines EnhancedHTMLElement.IHTMLElementEnhancements which has our enhanced methods with HTMLElement so we 
// can still access all the native element properties
interface EnhancedHTMLElement extends HTMLElement, EnhancedHTMLElement.Impl
{
}

/**
 * Provide interfaces for all the HTMLElement subclasses and extend them off the base EnhancedHTMLElement so as to
 * not clutter up the entire nnet.dom module with type-only files and cause implementors to make a lot of imports
 */
module EnhancedHTMLElement
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

module EnhancedHTMLElement
{
   export class Impl extends EnhancedElement.Impl
   {
      getAncestors(query: string): ElementGroup
      {
         return find( query ).filter$( item => isAncestor( (<HTMLElement><any>this), item ) );
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
         return ((<HTMLElement><any>this).className && contains( (<HTMLElement><any>this).className, name, " ", true ));
      }

      find(query: string): ElementGroup
      {
         return find( query, (<HTMLElement><any>this) );
      }
   }
}