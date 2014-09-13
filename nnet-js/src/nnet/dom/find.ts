// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=type
import type = require('../type'); ///ts:import:generated
///ts:import=toArray
import toArray = require('../array/toArray'); ///ts:import:generated
///ts:import=flatten
import flatten = require('../array/flatten'); ///ts:import:generated
///ts:import=isArrayLike
import isArrayLike = require('../array/isArrayLike'); ///ts:import:generated
///ts:import=filterByNodeName
import filterByNodeName = require('./selector/filterByNodeName'); ///ts:import:generated
///ts:import=isAncestor
import isAncestor = require('./isAncestor'); ///ts:import:generated
///ts:import=enhanceHTMLElement
import enhanceHTMLElement = require('./enhanceHTMLElement'); ///ts:import:generated
///ts:import=EnhancedHTMLElement
import EnhancedHTMLElement = require('./EnhancedHTMLElement'); ///ts:import:generated
///ts:import=EnhancedHTMLElementCollection
import EnhancedHTMLElementCollection = require('./EnhancedHTMLElementCollection'); ///ts:import:generated

export = find;

function find(query: Node): EnhancedHTMLElementCollection;
function find(query: Element): EnhancedHTMLElementCollection;
function find(query: string): EnhancedHTMLElementCollection;
function find(query?: any): EnhancedHTMLElementCollection
{
   return new EnhancedHTMLElementCollection( find.native.call( this, query ).map( enhanceHTMLElement ) );
}

module find
{
   export function id(id: Node): EnhancedHTMLElement
   export function id(id: string): EnhancedHTMLElement
   export function id(id: any): EnhancedHTMLElement
   {
      return enhanceHTMLElement( native.id.call( this, id ) );
   }

   export function name(name: string, tag?: string): EnhancedHTMLElementCollection
   {
      return new EnhancedHTMLElementCollection( native.name.call( this, name, tag ).map( enhanceHTMLElement ) );
   }

   export function className(name: string, tag?: string): EnhancedHTMLElementCollection
   {
      return new EnhancedHTMLElementCollection( native.className.call( this, name, tag ).map( enhanceHTMLElement ) );
   }

   export function tagName(name: string): EnhancedHTMLElementCollection
   {
      return new EnhancedHTMLElementCollection( native.tagName.call( this, name ).map( enhanceHTMLElement ) );
   }

   export interface Interface
   {
      (query: Node): Array<Element>;
      (query: Element): Array<Element>;
      (query: string): Array<Element>;
      (query?: any): Array<Element>;

      id(id: Node): Element;
      id(id: string): Element;
      id(id: any): Element;

      name(name: string, tag?: string): Array<Element>;

      className(name: string, tag?: string): Array<Element>;

      tagName(name: string): Array<Element>;
   }

   export function native(query: Node): Array<Element>;
   export function native(query: Element): Array<Element>;
   export function native(query: string): Array<Element>;
   export function native(query?: any): Array<Element>
   {
      var useDocumentAsRoot = type.of( this ) != type.node;
      var root: Element = (useDocumentAsRoot ? document : this);

      if(!root || !query)
      {
         return [];
      }

      // if an element was provided, either just return it, or, if there's a different root we're searching from, make sure the root is an ancestors of it
      if(type.of( query ) === type.node)
      {
         return (useDocumentAsRoot || query.nodeType == Node.DOCUMENT_NODE || isAncestor( query, root ) ? [query] : []);
      }

      // if query is an array, run get for each element of the array and flatten the results
      if(isArrayLike( query ))
      {
         return flatten( flatten( query ).map( (value) =>
         {
            return native.call( this, value );
         } ) );
      }

      return toArray<Element>( root.querySelectorAll( query ) );
   }

   export module native
   {
      export function id(id: Node): Element
      export function id(id: string): Element
      export function id(id: any): Element
      {
         //if id is null or doesn't match either of the below, return null
         //if id is a string, return it from the DOM
         //if id has a property called "id" assume it is an element (eg - redundant call to get()) and return it
         var t = type.of( id );
         return id && (t == type.string ? document.getElementById( (<string>id)[0] == "#" ? (<string>id).substr( 1 ) : id ) : (t == type.node ? id : null));
      }

      export function name(name: string, tag?: string): Array<Element>
      {
         var result = (type.of( this ) != type.node ? document : this).getElementsByName( name );
         if(tag)
         {
            result = filterByNodeName( result, tag );
         }
         return toArray<Element>( result );
      }

      export function className(name: string, tag?: string): Array<Element>
      {
         var result = (type.of( this ) != type.node ? document : this).getElementsByClassName( name[0] == "." ? name.substr( 1 ) : name );
         if(tag)
         {
            result = filterByNodeName( result, tag );
         }
         return toArray<Element>( result );
      }

      /**
       * Gets an array of elements in the DOM with the specified attribute values
       * @param attr The name of the attribute to get
       * @param val The value of the attribute
       * @param tag The name of an element to restrict the search to.
       * If this is not given it will search the entire DOM
       * @param type The type of search to perform ("~", "^", "$", "*"), if absent an exact search is performed
       * /
      export function attribute(attr: string, val?: string, tag?: string, type?: string): Array<Node>
      {
         var allElements = (this === Selector ? document : this).getElementsByTagName(tag || "*");
         var result = Filter.byAttribute(allElements, attr, val, type);
         result["__get"] = true;
         return result;
      }
      //*/

      /*
      export function tagName(name: "a"): Array<HTMLAnchorElement>;
      export function tagName(name: "abbr"): Array<HTMLElement>;
      export function tagName(name: "address"): Array<HTMLElement>;
      export function tagName(name: "area"): Array<HTMLAreaElement>;
      export function tagName(name: "article"): Array<HTMLElement>;
      export function tagName(name: "aside"): Array<HTMLElement>;
      export function tagName(name: "audio"): Array<HTMLAudioElement>;
      export function tagName(name: "b"): Array<HTMLElement>;
      export function tagName(name: "base"): Array<HTMLBaseElement>;
      export function tagName(name: "bdi"): Array<HTMLElement>;
      export function tagName(name: "bdo"): Array<HTMLElement>;
      export function tagName(name: "blockquote"): Array<HTMLQuoteElement>;
      export function tagName(name: "body"): Array<HTMLBodyElement>;
      export function tagName(name: "br"): Array<HTMLBRElement>;
      export function tagName(name: "button"): Array<HTMLButtonElement>;
      export function tagName(name: "canvas"): Array<HTMLCanvasElement>;
      export function tagName(name: "caption"): Array<HTMLTableCaptionElement>;
      export function tagName(name: "cite"): Array<HTMLElement>;
      export function tagName(name: "code"): Array<HTMLElement>;
      export function tagName(name: "col"): Array<HTMLTableColElement>;
      export function tagName(name: "colgroup"): Array<HTMLTableColElement>;
      export function tagName(name: "datalist"): Array<HTMLDataListElement>;
      export function tagName(name: "dd"): Array<HTMLElement>;
      export function tagName(name: "del"): Array<HTMLModElement>;
      export function tagName(name: "dfn"): Array<HTMLElement>;
      export function tagName(name: "div"): Array<HTMLDivElement>;
      export function tagName(name: "dl"): Array<HTMLDListElement>;
      export function tagName(name: "dt"): Array<HTMLElement>;
      export function tagName(name: "em"): Array<HTMLElement>;
      export function tagName(name: "embed"): Array<HTMLEmbedElement>;
      export function tagName(name: "fieldset"): Array<HTMLFieldSetElement>;
      export function tagName(name: "figcaption"): Array<HTMLElement>;
      export function tagName(name: "figure"): Array<HTMLElement>;
      export function tagName(name: "footer"): Array<HTMLElement>;
      export function tagName(name: "form"): Array<HTMLFormElement>;
      export function tagName(name: "h1"): Array<HTMLHeadingElement>;
      export function tagName(name: "h2"): Array<HTMLHeadingElement>;
      export function tagName(name: "h3"): Array<HTMLHeadingElement>;
      export function tagName(name: "h4"): Array<HTMLHeadingElement>;
      export function tagName(name: "h5"): Array<HTMLHeadingElement>;
      export function tagName(name: "h6"): Array<HTMLHeadingElement>;
      export function tagName(name: "head"): Array<HTMLHeadElement>;
      export function tagName(name: "header"): Array<HTMLElement>;
      export function tagName(name: "hgroup"): Array<HTMLElement>;
      export function tagName(name: "hr"): Array<HTMLHRElement>;
      export function tagName(name: "html"): Array<HTMLHtmlElement>;
      export function tagName(name: "i"): Array<HTMLElement>;
      export function tagName(name: "iframe"): Array<HTMLIFrameElement>;
      export function tagName(name: "img"): Array<HTMLImageElement>;
      export function tagName(name: "input"): Array<HTMLInputElement>;
      export function tagName(name: "ins"): Array<HTMLModElement>;
      export function tagName(name: "kbd"): Array<HTMLElement>;
      export function tagName(name: "label"): Array<HTMLLabelElement>;
      export function tagName(name: "legend"): Array<HTMLLegendElement>;
      export function tagName(name: "li"): Array<HTMLLIElement>;
      export function tagName(name: "link"): Array<HTMLLinkElement>;
      export function tagName(name: "main"): Array<HTMLElement>;
      export function tagName(name: "map"): Array<HTMLMapElement>;
      export function tagName(name: "mark"): Array<HTMLElement>;
      export function tagName(name: "menu"): Array<HTMLMenuElement>;
      export function tagName(name: "meta"): Array<HTMLMetaElement>;
      export function tagName(name: "nav"): Array<HTMLElement>;
      export function tagName(name: "noscript"): Array<HTMLElement>;
      export function tagName(name: "object"): Array<HTMLObjectElement>;
      export function tagName(name: "ol"): Array<HTMLOListElement>;
      export function tagName(name: "optgroup"): Array<HTMLOptGroupElement>;
      export function tagName(name: "option"): Array<HTMLOptionElement>;
      export function tagName(name: "p"): Array<HTMLParagraphElement>;
      export function tagName(name: "param"): Array<HTMLParamElement>;
      export function tagName(name: "pre"): Array<HTMLPreElement>;
      export function tagName(name: "progress"): Array<HTMLProgressElement>;
      export function tagName(name: "q"): Array<HTMLQuoteElement>;
      export function tagName(name: "rp"): Array<HTMLElement>;
      export function tagName(name: "rt"): Array<HTMLElement>;
      export function tagName(name: "ruby"): Array<HTMLElement>;
      export function tagName(name: "s"): Array<HTMLElement>;
      export function tagName(name: "samp"): Array<HTMLElement>;
      export function tagName(name: "script"): Array<HTMLScriptElement>;
      export function tagName(name: "section"): Array<HTMLElement>;
      export function tagName(name: "select"): Array<HTMLSelectElement>;
      export function tagName(name: "small"): Array<HTMLElement>;
      export function tagName(name: "source"): Array<HTMLSourceElement>;
      export function tagName(name: "span"): Array<HTMLSpanElement>;
      export function tagName(name: "strong"): Array<HTMLElement>;
      export function tagName(name: "style"): Array<HTMLStyleElement>;
      export function tagName(name: "sub"): Array<HTMLElement>;
      export function tagName(name: "summary"): Array<HTMLElement>;
      export function tagName(name: "sup"): Array<HTMLElement>;
      export function tagName(name: "table"): Array<HTMLTableElement>;
      export function tagName(name: "tbody"): Array<HTMLTableSectionElement>;
      export function tagName(name: "td"): Array<HTMLTableDataCellElement>;
      export function tagName(name: "textarea"): Array<HTMLTextAreaElement>;
      export function tagName(name: "tfoot"): Array<HTMLTableSectionElement>;
      export function tagName(name: "th"): Array<HTMLTableHeaderCellElement>;
      export function tagName(name: "thead"): Array<HTMLTableSectionElement>;
      export function tagName(name: "title"): Array<HTMLTitleElement>;
      export function tagName(name: "tr"): Array<HTMLTableRowElement>;
      export function tagName(name: "track"): Array<HTMLTrackElement>;
      export function tagName(name: "u"): Array<HTMLElement>;
      export function tagName(name: "ul"): Array<HTMLUListElement>;
      export function tagName(name: "var"): Array<HTMLElement>;
      export function tagName(name: "video"): Array<HTMLVideoElement>;
      export function tagName(name: "wbr"): Array<HTMLElement>;
      //*/
      export function tagName(name: string): Array<Element>
      {
         return toArray<Element>( (type.of( this ) != type.node ? document : this).getElementsByTagName( name || "*" ) );
      }
   }
}