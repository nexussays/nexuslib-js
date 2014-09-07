// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

///ts:import=ElementUtils
import ElementUtils = require('./ElementUtils'); ///ts:import:generated

declare var exports;

export declare function text(...params: any[]);

export declare function a(...params: any[]);

export declare function abbr(...params: any[]);

export declare function acronym(...params: any[]);

export declare function address(...params: any[]);

export declare function blockquote(...params: any[]);

export declare function br(...params: any[]);

export declare function button(...params: any[]);

export declare function caption(...params: any[]);

export declare function cite(...params: any[]);

export declare function code(...params: any[]);

export declare function col(...params: any[]);

export declare function colgroup(...params: any[]);

export declare function dd(...params: any[]);

export declare function del(...params: any[]);

export declare function dfn(...params: any[]);

export declare function div(...params: any[]);

export declare function dl(...params: any[]);

export declare function dt(...params: any[]);

export declare function em(...params: any[]);

export declare function fieldset(...params: any[]);

export declare function form(...params: any[]);

export declare function h1(...params: any[]);

export declare function h2(...params: any[]);

export declare function h3(...params: any[]);

export declare function h4(...params: any[]);

export declare function h5(...params: any[]);

export declare function h6(...params: any[]);

export declare function hr(...params: any[]);

export declare function iframe(...params: any[]);

export declare function img(...params: any[]);

export declare function input(...params: any[]);

export declare function ins(...params: any[]);

export declare function kbd(...params: any[]);

export declare function label(...params: any[]);

export declare function legend(...params: any[]);

export declare function li(...params: any[]);

export declare function object(...params: any[]);

export declare function ol(...params: any[]);

export declare function optgroup(...params: any[]);

export declare function option(...params: any[]);

export declare function p(...params: any[]);

export declare function param(...params: any[]);

export declare function pre(...params: any[]);

export declare function q(...params: any[]);

export declare function samp(...params: any[]);

export declare function script(...params: any[]);

export declare function select(...params: any[]);

export declare function span(...params: any[]);

export declare function strong(...params: any[]);

export declare function sub(...params: any[]);

export declare function sup(...params: any[]);

export declare function table(...params: any[]);

export declare function tbody(...params: any[]);

export declare function td(...params: any[]);

export declare function textarea(...params: any[]);

export declare function tfoot(...params: any[]);

export declare function th(...params: any[]);

export declare function thead(...params: any[]);

export declare function title(...params: any[]);

export declare function tr(...params: any[]);

export declare function tt(...params: any[]);

export declare function ul(...params: any[]);

// create a method in the HTML object that will create an element of the same
// name as the function
function defineTag(tag)
{
   exports[tag.toLowerCase()] = () => create.apply( tag, arguments );
}

export function create()
{
   var element;

   // special case for text nodes
   if(this == "text")
   {
      element = document.createTextNode( Array.prototype.join.call( arguments, "" ) || "" );
   }
   else
   {
      // create element and apply element methods to it if they aren't already there
      element = document.createElement( this );
      ElementUtils.wrapElement( element );

      // append nodes
      if(arguments.length > 0)
      {
         ElementUtils.append( element, arguments );
      }
   }

   return element;
}

// init
([
   "text", "a", "abbr", "acronym", "address", "blockquote", "br", "button", "caption",
   "cite", "code", "col", "colgroup", "dd", "del", "dfn", "div", "dl", "dt", "em",
   "fieldset", "form", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "iframe", "img", "input",
   "ins", "kbd", "label", "legend", "li", "object", "ol", "optgroup", "option", "p",
   "param", "pre", "q", "samp", "script", "select", "span", "strong", "sub", "sup",
   "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "title", "tr", "tt",
   "ul", "var"
]).forEach( defineTag );