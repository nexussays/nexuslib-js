// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=ElementGroup
import ElementGroup = require('../ElementGroup'); ///ts:import:generated
///ts:import=EnhancedElement
import EnhancedElement = require('../EnhancedElement'); ///ts:import:generated

export = RadioCollection;

class RadioCollection
{
   private items: EnhancedElement.Input[];
   private selectedIndex: number;
   private m_name: string;

   constructor(elements: ElementGroup)
   {
      this.selectedIndex = null;
      this.items = [];
      elements.forEach( (el: EnhancedElement.Input, index) =>
      {
         if(el.type.toLowerCase() === "radio" && (this.m_name === null || this.m_name == el.name))
         {
            this.m_name = el.name;
            this.items.push( el );
            if(el.checked)
            {
               this.selectedIndex = this.items.length - 1;
            }
         }
      } );
   }

   public get value(): string
   {
      return this.selectedIndex !== null ? this.items[this.selectedIndex].value : null;
   }

   public get name(): string
   {
      return this.m_name;
   }

   public uncheckAll()
   {
      if(this.selectedIndex != null)
      {
         this.items[this.selectedIndex].checked = false;
      }
      this.selectedIndex = null;
   }

   public check(index: number, triggerClick: boolean): boolean;
   public check(value: string, triggerClick: boolean): boolean;
   public check(value: any, triggerClick: boolean): boolean
   {
      for(var x = 0; x < this.items.length; ++x)
      {
         var item = this.items[x];
         // any reason to do a type check here?
         if(item.value === value || x === value)
         {
            item.checked = true;
            this.selectedIndex = x;
            if(triggerClick)
            {
               setTimeout( () => item.trigger( "click" ), 1 );
            }
            //only one valid selection in a radio collection, so return
            return true;
         }
      }
      return false;
   }

   public refresh()
   {
      this.selectedIndex = null;
      for(var x = 0; x < this.items.length; ++x)
      {
         var item = this.items[x];
         if(item.checked)
         {
            this.selectedIndex = x;
            return;
         }
      }
   }
}