﻿// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=IEnhancedHTMLElement
import IEnhancedHTMLElement = require('./IEnhancedHTMLElement'); ///ts:import:generated
///ts:import=IEnhancedEvent
import IEnhancedEvent = require('../event/IEnhancedEvent'); ///ts:import:generated

export = EnhancedHTMLElementCollection;

class EnhancedHTMLElementCollection
{
   private m_array: Array<IEnhancedHTMLElement>;

   constructor(sourceArray: Array<IEnhancedHTMLElement>)
   {
      this.m_array = sourceArray;
   }

   get items(): Array<IEnhancedHTMLElement>
   {
      return this.m_array;
   }

   forEach(callbackfn: (value: IEnhancedHTMLElement, index: number, array: IEnhancedHTMLElement[]) => void): EnhancedHTMLElementCollection
   {
      this.m_array.forEach( callbackfn );
      return this;
   }

   some(callbackfn: (value: IEnhancedHTMLElement, index: number, array: IEnhancedHTMLElement[]) => boolean): boolean
   {
      return this.m_array.some( callbackfn );
   }

   every(callbackfn: (value: IEnhancedHTMLElement, index: number, array: IEnhancedHTMLElement[]) => boolean): boolean
   {
      return this.m_array.every( callbackfn );
   }

   filter(callbackfn: (value: IEnhancedHTMLElement, index: number, array: IEnhancedHTMLElement[]) => boolean): EnhancedHTMLElementCollection
   {
      this.m_array = this.m_array.filter( callbackfn );
      return this;
   }

   bind(eventName: string, func: (e: IEnhancedEvent) => void): EnhancedHTMLElementCollection
   {
      this.m_array.forEach( item => item.bind( eventName, func ) );
      return this;
   }

   unbind(eventName: string, func: (e: IEnhancedEvent) => void): EnhancedHTMLElementCollection
   {
      this.m_array.forEach( item => item.unbind( eventName, func ) );
      return this;
   }

   addClass(name: string, checkExistence?: boolean): EnhancedHTMLElementCollection
   {
      this.m_array.forEach( item => item.addClass( name, checkExistence ) );
      return this;
   }

   removeClass(name: string): EnhancedHTMLElementCollection
   {
      this.m_array.forEach( item => item.removeClass( name ) );
      return this;
   }

   toggleClass(name: string): EnhancedHTMLElementCollection
   {
      this.m_array.forEach( item => item.toggleClass( name ) );
      return this;
   }

   hasClass(name: string): boolean
   {
      return this.m_array.some( item => item.hasClass( name ) );
   }
}