// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=type
import type = require('../type'); ///ts:import:generated

export = first;

function first<T>(source: Array<T>, searchFunc?: (item: T, index: number, array: Array<T>) => boolean, defaultValue?: T): T
{
   if(source == null || source.length <= 0)
   {
      return defaultValue;
   }

   var index = 0;
   if(searchFunc != null && type.of( searchFunc ) == type.function)
   {
      index = -1;
      for(var x = 0; x < source.length; ++x)
      {
         if(searchFunc( source[x], x, source ))
         {
            index = x;
            break;
         }
      }
   }
   return index != -1 ? source[index] : defaultValue;
}
