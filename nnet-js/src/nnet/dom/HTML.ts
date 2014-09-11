// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=enhanceHTMLElement
import enhanceHTMLElement = require('./enhanceHTMLElement'); ///ts:import:generated
///ts:import=IEnhancedHTMLElement
import IEnhancedHTMLElement = require('./IEnhancedHTMLElement'); ///ts:import:generated
///ts:import=EnhancedHTMLElement
import EnhancedHTMLElement = require('./EnhancedHTMLElement'); ///ts:import:generated

declare var exports;

export declare function text(...params: any[]): Node;

export declare function a(...params: any[]): IEnhancedHTMLAnchorElement;

export interface IEnhancedHTMLAnchorElement extends HTMLAnchorElement, EnhancedHTMLElement
{
}

export declare function abbr(...params: any[]): IEnhancedHTMLElement;

export declare function acronym(...params: any[]): IEnhancedHTMLElement;

export declare function address(...params: any[]): IEnhancedHTMLElement;

export declare function audio(...params: any[]): IEnhancedHTMLAudioElement;

export interface IEnhancedHTMLAudioElement extends HTMLAudioElement, EnhancedHTMLElement
{
}

export declare function base(...params: any[]): IEnhancedHTMLBaseElement;

export interface IEnhancedHTMLBaseElement extends HTMLBaseElement, EnhancedHTMLElement
{
}

export declare function blockquote(...params: any[]): IEnhancedHTMLBlockElement;

export interface IEnhancedHTMLBlockElement extends HTMLBlockElement, EnhancedHTMLElement
{
}

export declare function br(...params: any[]): IEnhancedHTMLBRElement;

export interface IEnhancedHTMLBRElement extends HTMLBRElement, EnhancedHTMLElement
{
}

export declare function button(...params: any[]): IEnhancedHTMLButtonElement;

export interface IEnhancedHTMLButtonElement extends HTMLButtonElement, EnhancedHTMLElement
{
}

export declare function canvas(...params: any[]): IEnhancedHTMLCanvasElement;

export interface IEnhancedHTMLCanvasElement extends HTMLCanvasElement, EnhancedHTMLElement
{
}

export declare function caption(...params: any[]): IEnhancedHTMLTableCaptionElement;

export interface IEnhancedHTMLTableCaptionElement extends HTMLTableCaptionElement, EnhancedHTMLElement
{
}

export declare function cite(...params: any[]): IEnhancedHTMLElement;

export declare function code(...params: any[]): IEnhancedHTMLElement;

export declare function col(...params: any[]): IEnhancedHTMLTableColElement;

export interface IEnhancedHTMLTableColElement extends HTMLTableColElement, EnhancedHTMLElement
{
}

export declare function colgroup(...params: any[]): IEnhancedHTMLElement;

export declare function dd(...params: any[]): IEnhancedHTMLDDElement;

export interface IEnhancedHTMLDDElement extends HTMLDDElement, EnhancedHTMLElement
{
}

export declare function del(...params: any[]): IEnhancedHTMLElement;

export declare function details(...params: any[]): IEnhancedHTMLElement;

export declare function dfn(...params: any[]): IEnhancedHTMLElement;

export declare function div(...params: any[]): IEnhancedHTMLDivElement;

export interface IEnhancedHTMLDivElement extends HTMLDivElement, EnhancedHTMLElement
{
}

export declare function dl(...params: any[]): IEnhancedHTMLDListElement;

export interface IEnhancedHTMLDListElement extends HTMLDListElement, EnhancedHTMLElement
{
}

export declare function dt(...params: any[]): IEnhancedHTMLDTElement;

export interface IEnhancedHTMLDTElement extends HTMLDTElement, EnhancedHTMLElement
{
}

export declare function em(...params: any[]): IEnhancedHTMLElement;

export declare function embed(...params: any[]): IEnhancedHTMLEmbedElement;

export interface IEnhancedHTMLEmbedElement extends HTMLEmbedElement, EnhancedHTMLElement
{
}

export declare function fieldset(...params: any[]): IEnhancedHTMLFieldSetElement;

export interface IEnhancedHTMLFieldSetElement extends HTMLFieldSetElement, EnhancedHTMLElement
{
}

export declare function figure(...params: any[]): IEnhancedHTMLElement;

export declare function form(...params: any[]): IEnhancedHTMLFormElement;

export interface IEnhancedHTMLFormElement extends HTMLFormElement, EnhancedHTMLElement
{
}

export declare function h1(...params: any[]): IEnhancedHTMLHeadingElement;

export declare function h2(...params: any[]): IEnhancedHTMLHeadingElement;

export declare function h3(...params: any[]): IEnhancedHTMLHeadingElement;

export declare function h4(...params: any[]): IEnhancedHTMLHeadingElement;

export declare function h5(...params: any[]): IEnhancedHTMLHeadingElement;

export declare function h6(...params: any[]): IEnhancedHTMLHeadingElement;

export interface IEnhancedHTMLHeadingElement extends HTMLHeadingElement, EnhancedHTMLElement
{
}

export declare function hr(...params: any[]): IEnhancedHTMLHRElement;

export interface IEnhancedHTMLHRElement extends HTMLHRElement, EnhancedHTMLElement
{
}

export declare function iframe(...params: any[]): IEnhancedHTMLIFrameElement;

export interface IEnhancedHTMLIFrameElement extends HTMLIFrameElement, EnhancedHTMLElement
{
}

export declare function img(...params: any[]): IEnhancedHTMLImageElement;

export interface IEnhancedHTMLImageElement extends HTMLImageElement, EnhancedHTMLElement
{
}

export declare function input(...params: any[]): IEnhancedHTMLInputElement;

export interface IEnhancedHTMLInputElement extends HTMLInputElement, EnhancedHTMLElement
{
}

export declare function ins(...params: any[]): IEnhancedHTMLElement;

export declare function kbd(...params: any[]): IEnhancedHTMLElement;

export declare function label(...params: any[]): IEnhancedHTMLLabelElement;

export interface IEnhancedHTMLLabelElement extends HTMLLabelElement, EnhancedHTMLElement
{
}

export declare function legend(...params: any[]): IEnhancedHTMLLegendElement;

export interface IEnhancedHTMLLegendElement extends HTMLLegendElement, EnhancedHTMLElement
{
}

export declare function li(...params: any[]): IEnhancedHTMLLIElement;

export interface IEnhancedHTMLLIElement extends HTMLLIElement, EnhancedHTMLElement
{
}

export declare function link(...params: any[]): IEnhancedHTMLLinkElement;

export interface IEnhancedHTMLLinkElement extends HTMLLinkElement, EnhancedHTMLElement
{
}

export declare function math(...params: any[]): IEnhancedHTMLElement;

export declare function object(...params: any[]): IEnhancedHTMLObjectElement;

export interface IEnhancedHTMLObjectElement extends HTMLObjectElement, EnhancedHTMLElement
{
}

export declare function ol(...params: any[]): IEnhancedHTMLOListElement;

export interface IEnhancedHTMLOListElement extends HTMLOListElement, EnhancedHTMLElement
{
}

export declare function optgroup(...params: any[]): IEnhancedHTMLOptGroupElement;

export interface IEnhancedHTMLOptGroupElement extends HTMLOptGroupElement, EnhancedHTMLElement
{
}

export declare function option(...params: any[]): IEnhancedHTMLOptionElement;

export interface IEnhancedHTMLOptionElement extends HTMLOptionElement, EnhancedHTMLElement
{
}

export declare function p(...params: any[]): IEnhancedHTMLParagraphElement;

export interface IEnhancedHTMLParagraphElement extends HTMLParagraphElement, EnhancedHTMLElement
{
}

export declare function param(...params: any[]): IEnhancedHTMLParamElement;

export interface IEnhancedHTMLParamElement extends HTMLParamElement, EnhancedHTMLElement
{
}

export declare function pre(...params: any[]): IEnhancedHTMLPreElement;

export interface IEnhancedHTMLPreElement extends HTMLPreElement, EnhancedHTMLElement
{
}

export declare function progress(...params: any[]): IEnhancedHTMLProgressElement;

export interface IEnhancedHTMLProgressElement extends HTMLProgressElement, EnhancedHTMLElement
{
}

export declare function q(...params: any[]): IEnhancedHTMLQuoteElement;

export interface IEnhancedHTMLQuoteElement extends HTMLQuoteElement, EnhancedHTMLElement
{
}

export declare function s(...params: any[]): IEnhancedHTMLElement;

export declare function samp(...params: any[]): IEnhancedHTMLElement;

export declare function script(...params: any[]): IEnhancedHTMLScriptElement;

export interface IEnhancedHTMLScriptElement extends HTMLScriptElement, EnhancedHTMLElement
{
}

export declare function select(...params: any[]): IEnhancedHTMLSelectElement;

export interface IEnhancedHTMLSelectElement extends HTMLSelectElement, EnhancedHTMLElement
{
}

export declare function source(...params: any[]): IEnhancedHTMLSourceElement;

export interface IEnhancedHTMLSourceElement extends HTMLSourceElement, EnhancedHTMLElement
{
}

export declare function span(...params: any[]): IEnhancedHTMLSpanElement;

export interface IEnhancedHTMLSpanElement extends HTMLSpanElement, EnhancedHTMLElement
{
}

export declare function strong(...params: any[]): IEnhancedHTMLElement;

export declare function sub(...params: any[]): IEnhancedHTMLElement;

export declare function summary(...params: any[]): IEnhancedHTMLElement;

export declare function sup(...params: any[]): IEnhancedHTMLElement;

export declare function svg(...params: any[]): IEnhancedHTMLElement;

export declare function table(...params: any[]): IEnhancedHTMLTableAlignment;

export interface IEnhancedHTMLTableAlignment extends HTMLTableAlignment, EnhancedHTMLElement
{
}

export declare function tbody(...params: any[]): IEnhancedHTMLTableSectionElement;

export interface IEnhancedHTMLTableSectionElement extends HTMLTableSectionElement, EnhancedHTMLElement
{
}

export declare function td(...params: any[]): IEnhancedHTMLTableDataCellElement;

export interface IEnhancedHTMLTableDataCellElement extends HTMLTableDataCellElement, EnhancedHTMLElement
{
}

export declare function textarea(...params: any[]): IEnhancedHTMLTextAreaElement;

export interface IEnhancedHTMLTextAreaElement extends HTMLTextAreaElement, EnhancedHTMLElement
{
}

export declare function tfoot(...params: any[]): IEnhancedHTMLTableAlignment;

export interface IEnhancedHTMLTableAlignment extends HTMLTableAlignment, EnhancedHTMLElement
{
}

export declare function th(...params: any[]): IEnhancedHTMLTableHeaderCellElement;

export interface IEnhancedHTMLTableHeaderCellElement extends HTMLTableHeaderCellElement, EnhancedHTMLElement
{
}

export declare function thead(...params: any[]): IEnhancedHTMLTableSectionElement;

export interface IEnhancedHTMLTableSectionElement extends HTMLTableSectionElement, EnhancedHTMLElement
{
}

export declare function time(...params: any[]): IEnhancedHTMLElement;

export declare function title(...params: any[]): IEnhancedHTMLTitleElement;

export interface IEnhancedHTMLTitleElement extends HTMLTitleElement, EnhancedHTMLElement
{
}

export declare function tr(...params: any[]): IEnhancedHTMLTableRowElement;

export interface IEnhancedHTMLTableRowElement extends HTMLTableRowElement, EnhancedHTMLElement
{
}

export declare function track(...params: any[]): IEnhancedHTMLTrackElement;

export interface IEnhancedHTMLTrackElement extends HTMLTrackElement, EnhancedHTMLElement
{
}

export declare function u(...params: any[]): IEnhancedHTMLElement;

export declare function ul(...params: any[]): IEnhancedHTMLUListElement;

export interface IEnhancedHTMLUListElement extends HTMLUListElement, EnhancedHTMLElement
{
}

export declare function var$(...params: any[]): IEnhancedHTMLElement;

export declare function video(...params: any[]): IEnhancedHTMLVideoElement;

export interface IEnhancedHTMLVideoElement extends HTMLVideoElement, EnhancedHTMLElement
{
}

// create a method in the HTML object that will create an element of the same
// name as the function
function defineTag(tag)
{
   // using $ as an escape for "var" above since it's a TypeScript keyword
   exports[tag.toLowerCase()] = () => create.apply( tag.replace( "$", "" ), arguments );
}

function create(): any
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