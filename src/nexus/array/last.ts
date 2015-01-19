// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

///ts:import=type
import type = require('../type'); ///ts:import:generated

export = last;

/**
 * Returns the last value of the array. Useful if you don't want to declare an additional variable, eg, when using .split()
 */
function last<T>(source: Array<T>, searchFunc?: (item: T, index: number, array: Array<T>) => boolean, defaultValue?: T): T
{
   if(source == null || source.length <= 0)
   {
      return defaultValue;
   }

   var index = source.length - 1;
   if(searchFunc != null && type.of(searchFunc) == type.function)
   {
      index = -1;
      for(var x = source.length - 1; x >= 0; --x)
      {
         if(searchFunc(source[x], x, source))
         {
            index = x;
            break;
         }
      }
   }
   return index != -1 ? source[index] : defaultValue;
}