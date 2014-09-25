﻿// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=EnhancedHTMLElement
import EnhancedHTMLElement = require('./EnhancedHTMLElement'); ///ts:import:generated
///ts:import=EventHandler
import EventHandler = require('../event/EventHandler'); ///ts:import:generated
///ts:import=first
import first = require('../array/first'); ///ts:import:generated
///ts:import=last
import last = require('../array/last'); ///ts:import:generated
///ts:import=find,_find
import _find = require('./find'); ///ts:import:generated
///ts:import=enhanceHTMLElement
import enhanceHTMLElement = require('./enhanceHTMLElement'); ///ts:import:generated

export = ElementGroup;

// so we can break the circular dependency on the find method
declare var require;

class ElementGroup
{
   private m_array: Array<EnhancedHTMLElement>;

   constructor(sourceArray: Array<EnhancedHTMLElement>)
   {
      this.m_array = sourceArray;
   }

   get items(): Array<EnhancedHTMLElement>
   {
      return this.m_array;
   }

   get length(): number
   {
      return this.m_array.length;
   }

   forEach(callbackfn: (value: EnhancedHTMLElement, index: number, array: EnhancedHTMLElement[]) => void): ElementGroup
   {
      this.m_array.forEach( callbackfn );
      return this;
   }

   some(callbackfn: (value: EnhancedHTMLElement, index: number, array: EnhancedHTMLElement[]) => boolean): boolean
   {
      return this.m_array.some( callbackfn );
   }

   every(callbackfn: (value: EnhancedHTMLElement, index: number, array: EnhancedHTMLElement[]) => boolean): boolean
   {
      return this.m_array.every( callbackfn );
   }

   filter$(callbackfn: (value: EnhancedHTMLElement, index: number, array: EnhancedHTMLElement[]) => boolean): ElementGroup
   {
      this.m_array = this.m_array.filter( callbackfn );
      return this;
   }

   bind(eventName: string, func: EventHandler): ElementGroup
   {
      this.m_array.forEach( item => item.bind( eventName, func ) );
      return this;
   }

   unbind(eventName: string, func: EventHandler): ElementGroup
   {
      this.m_array.forEach( item => item.unbind( eventName, func ) );
      return this;
   }

   addClass(name: string, checkExistence?: boolean): ElementGroup
   {
      this.m_array.forEach( item => item.addClass( name, checkExistence ) );
      return this;
   }

   removeClass(name: string): ElementGroup
   {
      this.m_array.forEach( item => item.removeClass( name ) );
      return this;
   }

   toggleClass(name: string): ElementGroup
   {
      this.m_array.forEach( item => item.toggleClass( name ) );
      return this;
   }

   hasClass(name: string): boolean
   {
      return this.m_array.some( item => item.hasClass( name ) );
   }

   find(query: string): ElementGroup
   {
      var f: typeof _find = require( './find' );
      var results: Array<EnhancedHTMLElement> = [];
      for(var x = 0; x < this.m_array.length; ++x)
      {
         results.push.apply( results, f.native( query, this.m_array[x] ).map( el => enhanceHTMLElement( el ) ) );
      }
      return new ElementGroup( results );
   }

   first(): EnhancedHTMLElement
   {
      return first( this.m_array );
   }

   last(): EnhancedHTMLElement
   {
      return last( this.m_array );
   }
}