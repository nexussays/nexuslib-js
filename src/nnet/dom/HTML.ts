// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

///ts:import=enhanceHTMLElement
import enhanceHTMLElement = require('./enhanceHTMLElement'); ///ts:import:generated
///ts:import=IEnhancedHTMLElement
import IEnhancedHTMLElement = require('./IEnhancedHTMLElement'); ///ts:import:generated

declare var exports;

export declare function text(...params: any[]): Node;

export declare function a(...params: any[]): HTMLAnchorElement;

export declare function abbr(...params: any[]): HTMLElement;

export declare function acronym(...params: any[]): HTMLElement;

export declare function address(...params: any[]): HTMLElement;

export declare function audio(...params: any[]): HTMLAudioElement;

export declare function base(...params: any[]): HTMLBaseElement;

export declare function blockquote(...params: any[]): HTMLBlockElement;

export declare function br(...params: any[]): HTMLBRElement;

export declare function button(...params: any[]): HTMLButtonElement;

export declare function canvas(...params: any[]): HTMLCanvasElement;

export declare function caption(...params: any[]): HTMLTableCaptionElement;

export declare function cite(...params: any[]): HTMLElement;

export declare function code(...params: any[]): HTMLElement;

export declare function col(...params: any[]): HTMLTableColElement;

export declare function colgroup(...params: any[]): HTMLElement;

export declare function dd(...params: any[]): HTMLDDElement;

export declare function del(...params: any[]): HTMLElement;

export declare function details(...params: any[]): HTMLElement;

export declare function dfn(...params: any[]): HTMLElement;

export declare function div(...params: any[]): HTMLDivElement;

export declare function dl(...params: any[]): HTMLDListElement;

export declare function dt(...params: any[]): HTMLDTElement;

export declare function em(...params: any[]): HTMLElement;

export declare function embed(...params: any[]): HTMLEmbedElement;

export declare function fieldset(...params: any[]): HTMLFieldSetElement;

export declare function figure(...params: any[]): HTMLElement;

export declare function form(...params: any[]): HTMLFormElement;

export declare function h1(...params: any[]): HTMLHeadingElement;

export declare function h2(...params: any[]): HTMLHeadingElement;

export declare function h3(...params: any[]): HTMLHeadingElement;

export declare function h4(...params: any[]): HTMLHeadingElement;

export declare function h5(...params: any[]): HTMLHeadingElement;

export declare function h6(...params: any[]): HTMLHeadingElement;

export declare function hr(...params: any[]): HTMLHRElement;

export declare function iframe(...params: any[]): HTMLIFrameElement;

export declare function img(...params: any[]): HTMLImageElement;

export declare function input(...params: any[]): HTMLInputElement;

export declare function ins(...params: any[]): HTMLElement;

export declare function kbd(...params: any[]): HTMLElement;

export declare function label(...params: any[]): HTMLLabelElement;

export declare function legend(...params: any[]): HTMLLegendElement;

export declare function li(...params: any[]): HTMLLIElement;

export declare function link(...params: any[]): HTMLLinkElement;

export declare function math(...params: any[]): HTMLElement;

export declare function object(...params: any[]): HTMLObjectElement;

export declare function ol(...params: any[]): HTMLOListElement;

export declare function optgroup(...params: any[]): HTMLOptGroupElement;

export declare function option(...params: any[]): HTMLOptionElement;

export declare function p(...params: any[]): HTMLParagraphElement;

export declare function param(...params: any[]): HTMLParamElement;

export declare function pre(...params: any[]): HTMLPreElement;

export declare function progress(...params: any[]): HTMLProgressElement;

export declare function q(...params: any[]): HTMLQuoteElement;

export declare function s(...params: any[]): HTMLElement;

export declare function samp(...params: any[]): HTMLElement;

export declare function script(...params: any[]): HTMLScriptElement;

export declare function select(...params: any[]): HTMLSelectElement;

export declare function source(...params: any[]): HTMLSourceElement;

export declare function span(...params: any[]): HTMLSpanElement;

export declare function strong(...params: any[]): HTMLElement;

export declare function sub(...params: any[]): HTMLElement;

export declare function summary(...params: any[]): HTMLElement;

export declare function sup(...params: any[]): HTMLElement;

export declare function svg(...params: any[]): HTMLElement;

export declare function table(...params: any[]): HTMLTableAlignment;

export declare function tbody(...params: any[]): HTMLTableSectionElement;

export declare function td(...params: any[]): HTMLTableDataCellElement;

export declare function textarea(...params: any[]): HTMLTextAreaElement;

export declare function tfoot(...params: any[]): HTMLTableAlignment;

export declare function th(...params: any[]): HTMLTableHeaderCellElement;

export declare function thead(...params: any[]): HTMLTableSectionElement;

export declare function time(...params: any[]): HTMLElement;

export declare function title(...params: any[]): HTMLTitleElement;

export declare function tr(...params: any[]): HTMLTableRowElement;

export declare function track(...params: any[]): HTMLTrackElement;

export declare function u(...params: any[]): HTMLElement;

export declare function ul(...params: any[]): HTMLUListElement;

export declare function var$(...params: any[]): HTMLElement;

export declare function video(...params: any[]): HTMLVideoElement;

// create a method in the HTML object that will create an element of the same
// name as the function
function defineTag(tag)
{
   // using $ as an escape for "var" above since it's a TypeScript keyword
   exports[tag.toLowerCase()] = () => create.apply( tag.replace( "$", "" ), arguments );
}

function create():any
{
   var element: IEnhancedHTMLElement;

   // special case for text nodes
   if(this == "text")
   {
      // this is actually an invalid cast, Text is 
      return document.createTextNode( Array.prototype.join.call( arguments, "" ) || "" );
   }
   else
   {
      // create element and apply element methods to it if they aren't already there
      element = enhanceHTMLElement( document.createElement( this ) );

      // append nodes
      if(arguments.length > 0)
      {
         element.append( arguments );
      }
   }

   return element;
}

// init
([
   "a", "abbr", "acronym", "address", "audio", "base", "blockquote", "br", "button", "canvas",
   "caption", "cite", "cite", "code", "col", "colgroup", "dd", "del", "details", "dfn", "div",
   "dl", "dt", "em", "embed", "fieldset", "figure", "form", "h1", "h2", "h3", "h4", "h5", "h6",
   "hr", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "math",
   "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "q", "s",
   "samp", "script", "select", "source", "span", "strong", "sub", "summary", "sup", "svg",
   "table", "tbody", "td", "text", "textarea", "tfoot", "th", "thead", "time", "title", "tr",
   "track", "u", "ul", "var", "var$", "video"
]).forEach( defineTag );