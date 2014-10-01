// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = fieldChanged;

function fieldChanged(el: HTMLElement): boolean
{
   var name = el.nodeName.toLowerCase();
   if(name == "input" || name == "textarea")
   {
      if((<HTMLInputElement><any>el).defaultValue != (<HTMLInputElement><any>el).value)
      {
         return true;
      }
   }
   else if(name == "select")
   {
      for(var x = 0; x < (<HTMLSelectElement><any>el).options.length; ++x)
      {
         var option = (<HTMLSelectElement><any>el).options[x];
         if(option.defaultSelected != option.selected)
         {
            return true;
         }
      }
   }
   return false;
}