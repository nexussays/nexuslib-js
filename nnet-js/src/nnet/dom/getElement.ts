// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=getElementRaw
import getElementRaw = require('./getElementRaw'); ///ts:import:generated
///ts:import=enhanceHTMLElement
import enhanceHTMLElement = require('./enhanceHTMLElement'); ///ts:import:generated
///ts:import=EnhancedHTMLElement
import EnhancedHTMLElement = require('./EnhancedHTMLElement'); ///ts:import:generated
///ts:import=EnhancedHTMLElementCollection
import EnhancedHTMLElementCollection = require('./EnhancedHTMLElementCollection'); ///ts:import:generated

export = getElement;

function getElement(query: Node): EnhancedHTMLElementCollection;
function getElement(query: Element): EnhancedHTMLElementCollection;
function getElement(query: string): EnhancedHTMLElementCollection;
function getElement(query?: any): EnhancedHTMLElementCollection
{
   return new EnhancedHTMLElementCollection( getElementRaw.call( this, query ).map( enhanceHTMLElement ) );
}

module getElement
{
   export function id(id: Node): EnhancedHTMLElement
   export function id(id: string): EnhancedHTMLElement
   export function id(id: any): EnhancedHTMLElement
   {
      return enhanceHTMLElement( getElementRaw.id.call( this, id ) );
   }

   export function name(name: string, tag?: string): EnhancedHTMLElementCollection
   {
      return new EnhancedHTMLElementCollection( getElementRaw.name.call( this, name, tag ).map( enhanceHTMLElement ) );
   }

   export function className(name: string, tag?: string): EnhancedHTMLElementCollection
   {
      return new EnhancedHTMLElementCollection( getElementRaw.className.call( this, name, tag ).map( enhanceHTMLElement ) );
   }

   export function tagName(name: string): EnhancedHTMLElementCollection
   {
      return new EnhancedHTMLElementCollection( getElementRaw.tagName.call( this, name ).map( enhanceHTMLElement ) );
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
}