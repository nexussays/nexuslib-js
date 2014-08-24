// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import Element = require("nnet/dom/ElementUtils");
import get = require("nnet/dom/get");

export = getDefaultValue;
function getDefaultValue(elem: HTMLElement): string
{
   var el = <HTMLElement>get(elem);
   if(el && "nodeName" in el)
   {
      var type = el.nodeName.toLowerCase();
      if(type == "input" || type == "textarea")
      {
         return (<HTMLInputElement>el).defaultValue;
      }
      else if(type == "select")
      {
         var defaults = [], options = (<HTMLSelectElement>el).options;
         for(var x = 0; x < options.length; ++x)
         {
            var option = options[x];
            if(option.defaultSelected)
            {
               defaults.push(option.value);
            }
         }
         return defaults.join(",");
      }
   }
   return null;
}