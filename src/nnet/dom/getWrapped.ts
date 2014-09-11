// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

///ts:import=getElementRaw
import getElementRaw = require('./getElementRaw'); ///ts:import:generated
///ts:import=ElementUtils
import ElementUtils = require('./ElementUtils'); ///ts:import:generated
///ts:import=IEnhancedElement
import IEnhancedElement = require('./IEnhancedElement'); ///ts:import:generated

export = getElement;

function getElement(query: Node): Array<IEnhancedElement>;
function getElement(query: Element): Array<IEnhancedElement>;
function getElement(query: string): Array<IEnhancedElement>;
function getElement(query?: any): Array<IEnhancedElement>
{
   return getElementRaw.call( this, query ).map( ElementUtils.wrapElement );
}

module getElement
{
   export function id(id: Node): IEnhancedElement
   export function id(id: string): IEnhancedElement
   export function id(id: any): IEnhancedElement
   {
      return ElementUtils.wrapElement(getElementRaw.id.call( this, id ) );
   }

   export function name(name: string, tag?: string): Array<IEnhancedElement>
   {
      return getElementRaw.name.call( this, name, tag ).map( ElementUtils.wrapElement );
   }

   export function className(name: string, tag?: string): Array<IEnhancedElement>
   {
      return getElementRaw.className.call( this, name, tag ).map( ElementUtils.wrapElement );
   }

   export function tagName(name: string): Array<IEnhancedElement>
   {
      return getElementRaw.tagName.call( this, name ).map( ElementUtils.wrapElement );
   }
}