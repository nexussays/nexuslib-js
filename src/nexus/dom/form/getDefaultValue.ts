// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = getDefaultValue;

function getDefaultValue(el: HTMLElement): string
{
   var name = el.nodeName.toLowerCase();
   if(name == "input" || name == "textarea")
   {
      return (<HTMLInputElement><any>el).defaultValue;
   }
   else if(name == "select")
   {
      var defaults = [],
            options = (<HTMLSelectElement><any>el).options;
      for(var x = 0; x < options.length; ++x)
      {
         var option = options[x];
         if(option.defaultSelected)
         {
            defaults.push( option.value );
         }
      }
      return defaults.join( "," );
   }
   return null;
}
