// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import Element = require("nnet/dom/Element");
import get = require("nnet/dom/get");

class RadioCollection
{
   value = null;
   items = [];
   length = 0;
   selectedIndex = null;

   constructor(name)
   {
      var i = get.name(name);
      if(i)
      {
         for(var x = 0; x < i.length; ++x)
         {
            if(i[x].type == "radio")
            {
               this.items.push(i[x]);
               if(i[x].checked)
               {
                  //index is not set to x since x is all items with this name and we are only counting about radios
                  this.__set(i[x].value, this.items.length - 1);
               }
            }
         }
         this.length = this.items.length;
      }
   }

   private __set(val?, index?)
   {
      this.value = (typeof val !== "undefined") ? val : null;
      this.selectedIndex = (typeof index !== "undefined") ? index : null;
   }

   uncheckAll()
   {
      /*for(var x = 0; x < self.items.length; ++x)
      {
         self.items[x].checked = false;
      }*/
      //should be able to just uncheck the currently selected item since the browser should not allow more than
      //one item to be checked. The loop can be re-implemented if this turns out to not work as expected
      if(this.selectedIndex != null)
      {
         this.items[this.selectedIndex].checked = false;
      }
      this.__set();
   }

   checkValue(value, executeOnclickFunc)
   {
      for(var x = 0; x < this.items.length; ++x)
      {
         var item = this.items[x];
         if(item.value == value)
         {
            item.checked = true;
            this.__set(value, x);
            if(executeOnclickFunc === true && typeof item.onclick == "function")
            {
               item.onclick();
            }
            //only one valid selection in a radio collection, so return
            return;
         }
      }
   }

   refresh()
   {
      for(var x = 0; x < this.items.length; ++x)
      {
         var item = this.items[x];
         if(item.checked)
         {
            //if the item is checked set the values accordingly
            this.__set(item.value, x);
            //there can be only one valid selection in a radio collection, so return
            return;
         }
      }
      this.__set();
   }
}