// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import Element = require("nnet/dom/ElementUtils");
import get = require("nnet/dom/get");

export = fieldChanged;
function fieldChanged(elem): boolean
{
   var el = <any>get(elem);
   if(el && "nodeName" in el)
   {
      var type = el.nodeName.toLowerCase();
      if(type == "input" || type == "textarea")
      {
         if(el.defaultValue != el.value)
         {
            return true;
         }
      }
      else if(type == "select")
      {
         for(var x = 0; x < el.options.length; ++x)
         {
            var option = el.options[x];
            if(option.defaultSelected != option.selected)
            {
               return true;
            }
         }
      }
   }
   return false;
}