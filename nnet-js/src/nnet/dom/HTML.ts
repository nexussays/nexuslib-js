// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=enhanceHTMLElement
import enhanceHTMLElement = require('./enhanceHTMLElement'); ///ts:import:generated
///ts:import=EnhancedHTMLElement
import EnhancedHTMLElement = require('./EnhancedHTMLElement'); ///ts:import:generated

declare var exports;

export declare function text(...params: any[]): Node;

export declare function a(...params: any[]): EnhancedHTMLElement.Anchor;

export declare function abbr(...params: any[]): EnhancedHTMLElement;

export declare function acronym(...params: any[]): EnhancedHTMLElement;

export declare function address(...params: any[]): EnhancedHTMLElement;

export declare function audio(...params: any[]): EnhancedHTMLElement.Audio;

export declare function base(...params: any[]): EnhancedHTMLElement.Base;

export declare function blockquote(...params: any[]): EnhancedHTMLElement.Block;

export declare function br(...params: any[]): EnhancedHTMLElement.BR;

export declare function button(...params: any[]): EnhancedHTMLElement.Button;

export declare function canvas(...params: any[]): EnhancedHTMLElement.Canvas;

export declare function caption(...params: any[]): EnhancedHTMLElement.TableCaption;

export declare function cite(...params: any[]): EnhancedHTMLElement;

export declare function code(...params: any[]): EnhancedHTMLElement;

export declare function col(...params: any[]): EnhancedHTMLElement.TableCol;

export declare function colgroup(...params: any[]): EnhancedHTMLElement;

export declare function dd(...params: any[]): EnhancedHTMLElement.DD;

export declare function del(...params: any[]): EnhancedHTMLElement;

export declare function details(...params: any[]): EnhancedHTMLElement;

export declare function dfn(...params: any[]): EnhancedHTMLElement;

export declare function div(...params: any[]): EnhancedHTMLElement.Div;

export declare function dl(...params: any[]): EnhancedHTMLElement.DList;

export declare function dt(...params: any[]): EnhancedHTMLElement.DT;

export declare function em(...params: any[]): EnhancedHTMLElement;

export declare function embed(...params: any[]): EnhancedHTMLElement.Embed;

export declare function fieldset(...params: any[]): EnhancedHTMLElement.FieldSet;

export declare function figure(...params: any[]): EnhancedHTMLElement;

export declare function form(...params: any[]): EnhancedHTMLElement.Form;

export declare function h1(...params: any[]): EnhancedHTMLElement.Heading;

export declare function h2(...params: any[]): EnhancedHTMLElement.Heading;

export declare function h3(...params: any[]): EnhancedHTMLElement.Heading;

export declare function h4(...params: any[]): EnhancedHTMLElement.Heading;

export declare function h5(...params: any[]): EnhancedHTMLElement.Heading;

export declare function h6(...params: any[]): EnhancedHTMLElement.Heading;

export declare function hr(...params: any[]): EnhancedHTMLElement.HR;

export declare function iframe(...params: any[]): EnhancedHTMLElement.IFrame;

export declare function img(...params: any[]): EnhancedHTMLElement.Image;

export declare function input(...params: any[]): EnhancedHTMLElement.Input;

export declare function ins(...params: any[]): EnhancedHTMLElement;

export declare function kbd(...params: any[]): EnhancedHTMLElement;

export declare function label(...params: any[]): EnhancedHTMLElement.Label;

export declare function legend(...params: any[]): EnhancedHTMLElement.Legend;

export declare function li(...params: any[]): EnhancedHTMLElement.LI;

export declare function link(...params: any[]): EnhancedHTMLElement.Link;

export declare function math(...params: any[]): EnhancedHTMLElement;

export declare function object(...params: any[]): EnhancedHTMLElement.Object;

export declare function ol(...params: any[]): EnhancedHTMLElement.OList;

export declare function optgroup(...params: any[]): EnhancedHTMLElement.OptGroup;

export declare function option(...params: any[]): EnhancedHTMLElement.Option;

export declare function p(...params: any[]): EnhancedHTMLElement.Paragraph;

export declare function param(...params: any[]): EnhancedHTMLElement.Param;

export declare function pre(...params: any[]): EnhancedHTMLElement.Pre;

export declare function progress(...params: any[]): EnhancedHTMLElement.Progress;

export declare function q(...params: any[]): EnhancedHTMLElement.Quote;

export declare function s(...params: any[]): EnhancedHTMLElement;

export declare function samp(...params: any[]): EnhancedHTMLElement;

export declare function script(...params: any[]): EnhancedHTMLElement.Script;

export declare function select(...params: any[]): EnhancedHTMLElement.Select;

export declare function source(...params: any[]): EnhancedHTMLElement.Source;

export declare function span(...params: any[]): EnhancedHTMLElement.Span;

export declare function strong(...params: any[]): EnhancedHTMLElement;

export declare function sub(...params: any[]): EnhancedHTMLElement;

export declare function summary(...params: any[]): EnhancedHTMLElement;

export declare function sup(...params: any[]): EnhancedHTMLElement;

export declare function svg(...params: any[]): EnhancedHTMLElement;

export declare function table(...params: any[]): EnhancedHTMLElement.Table;

export declare function tbody(...params: any[]): EnhancedHTMLElement.TableSection;

export declare function td(...params: any[]): EnhancedHTMLElement.TableDataCell;

export declare function textarea(...params: any[]): EnhancedHTMLElement.TextArea;

export declare function tfoot(...params: any[]): EnhancedHTMLElement.TableSection;

export declare function th(...params: any[]): EnhancedHTMLElement.TableHeaderCell;

export declare function thead(...params: any[]): EnhancedHTMLElement.TableSection;

export declare function time(...params: any[]): EnhancedHTMLElement;

export declare function title(...params: any[]): EnhancedHTMLElement.Title;

export declare function tr(...params: any[]): EnhancedHTMLElement.TableRow;

export declare function track(...params: any[]): EnhancedHTMLElement.Track;

export declare function u(...params: any[]): EnhancedHTMLElement;

export declare function ul(...params: any[]): EnhancedHTMLElement.UList;

export declare function var$(...params: any[]): EnhancedHTMLElement;

export declare function video(...params: any[]): EnhancedHTMLElement.Video;

// create a method in the HTML object that will create an element of the same
// name as the function
function defineTag(tag)
{
   // using $ as an escape for "var" above since it's a TypeScript keyword
   exports[tag.toLowerCase()] = () => create.apply( tag.replace( "$", "" ), arguments );
}

function create(): any
{
   var element: EnhancedHTMLElement;

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