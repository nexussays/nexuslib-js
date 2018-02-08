// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

///ts:import=EnhancedElement
import EnhancedElement = require('./EnhancedElement'); ///ts:import:generated

declare var exports;

export declare function text(...params: any[]): Text;

export declare function a(...params: any[]): EnhancedElement.Anchor;

export declare function abbr(...params: any[]): EnhancedElement;

export declare function acronym(...params: any[]): EnhancedElement;

export declare function address(...params: any[]): EnhancedElement;

export declare function audio(...params: any[]): EnhancedElement.Audio;

export declare function base(...params: any[]): EnhancedElement.Base;

export declare function blockquote(...params: any[]): EnhancedElement.Block;

export declare function br(...params: any[]): EnhancedElement.BR;

export declare function button(...params: any[]): EnhancedElement.Button;

export declare function canvas(...params: any[]): EnhancedElement.Canvas;

export declare function caption(...params: any[]): EnhancedElement.TableCaption;

export declare function cite(...params: any[]): EnhancedElement;

export declare function code(...params: any[]): EnhancedElement;

export declare function col(...params: any[]): EnhancedElement.TableCol;

export declare function colgroup(...params: any[]): EnhancedElement;

export declare function dd(...params: any[]): EnhancedElement.DD;

export declare function del(...params: any[]): EnhancedElement;

export declare function details(...params: any[]): EnhancedElement;

export declare function dfn(...params: any[]): EnhancedElement;

export declare function div(...params: any[]): EnhancedElement.Div;

export declare function dl(...params: any[]): EnhancedElement.DList;

export declare function dt(...params: any[]): EnhancedElement.DT;

export declare function em(...params: any[]): EnhancedElement;

export declare function embed(...params: any[]): EnhancedElement.Embed;

export declare function fieldset(...params: any[]): EnhancedElement.FieldSet;

export declare function figure(...params: any[]): EnhancedElement;

export declare function form(...params: any[]): EnhancedElement.Form;

export declare function h1(...params: any[]): EnhancedElement.Heading;

export declare function h2(...params: any[]): EnhancedElement.Heading;

export declare function h3(...params: any[]): EnhancedElement.Heading;

export declare function h4(...params: any[]): EnhancedElement.Heading;

export declare function h5(...params: any[]): EnhancedElement.Heading;

export declare function h6(...params: any[]): EnhancedElement.Heading;

export declare function hr(...params: any[]): EnhancedElement.HR;

export declare function iframe(...params: any[]): EnhancedElement.IFrame;

export declare function img(...params: any[]): EnhancedElement.Image;

export declare function input(...params: any[]): EnhancedElement.Input;

export declare function ins(...params: any[]): EnhancedElement;

export declare function kbd(...params: any[]): EnhancedElement;

export declare function label(...params: any[]): EnhancedElement.Label;

export declare function legend(...params: any[]): EnhancedElement.Legend;

export declare function li(...params: any[]): EnhancedElement.LI;

export declare function link(...params: any[]): EnhancedElement.Link;

export declare function math(...params: any[]): EnhancedElement;

export declare function object(...params: any[]): EnhancedElement.Object;

export declare function ol(...params: any[]): EnhancedElement.OList;

export declare function optgroup(...params: any[]): EnhancedElement.OptGroup;

export declare function option(...params: any[]): EnhancedElement.Option;

export declare function p(...params: any[]): EnhancedElement.Paragraph;

export declare function param(...params: any[]): EnhancedElement.Param;

export declare function pre(...params: any[]): EnhancedElement.Pre;

export declare function progress(...params: any[]): EnhancedElement.Progress;

export declare function q(...params: any[]): EnhancedElement.Quote;

export declare function s(...params: any[]): EnhancedElement;

export declare function samp(...params: any[]): EnhancedElement;

export declare function script(...params: any[]): EnhancedElement.Script;

export declare function select(...params: any[]): EnhancedElement.Select;

export declare function source(...params: any[]): EnhancedElement.Source;

export declare function span(...params: any[]): EnhancedElement.Span;

export declare function strong(...params: any[]): EnhancedElement;

export declare function sub(...params: any[]): EnhancedElement;

export declare function summary(...params: any[]): EnhancedElement;

export declare function sup(...params: any[]): EnhancedElement;

export declare function svg(...params: any[]): EnhancedElement;

export declare function table(...params: any[]): EnhancedElement.Table;

export declare function tbody(...params: any[]): EnhancedElement.TableSection;

export declare function td(...params: any[]): EnhancedElement.TableDataCell;

export declare function textarea(...params: any[]): EnhancedElement.TextArea;

export declare function tfoot(...params: any[]): EnhancedElement.TableSection;

export declare function th(...params: any[]): EnhancedElement.TableHeaderCell;

export declare function thead(...params: any[]): EnhancedElement.TableSection;

export declare function time(...params: any[]): EnhancedElement;

export declare function title(...params: any[]): EnhancedElement.Title;

export declare function tr(...params: any[]): EnhancedElement.TableRow;

export declare function track(...params: any[]): EnhancedElement.Track;

export declare function u(...params: any[]): EnhancedElement;

export declare function ul(...params: any[]): EnhancedElement.UList;

export declare function var$(...params: any[]): EnhancedElement;

export declare function video(...params: any[]): EnhancedElement.Video;

// create a method in the HTML object that will create an element of the same
// name as the function
function defineTag(tag)
{
   // using $ as an escape for "var" above since it's a TypeScript keyword
   exports[tag.toLowerCase()] = () => create.apply( tag.replace( "$", "" ), arguments );
}

function create(): any
{
   var element: EnhancedElement;

   // special case for text nodes
   if(this == "text")
   {
      return document.createTextNode( Array.prototype.join.call( arguments, "" ) || "" );
   }
   else
   {
      // create element and apply element methods to it if they aren't already there
      element = EnhancedElement.enhance( document.createElement( this ) );

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
