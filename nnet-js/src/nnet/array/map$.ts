// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = map$;

/**
 * Array#map which directly alters the array instead of returning a new array
 */
function map$<T>(source: Array<T>, mapFunc: (item: T, index: number, array: Array<T>) => any, scope?: Array<T>): void
{
   var ln = source.length;
   for(var x = 0; x < ln; ++x)
   {
      if(x in source)
      {
         source[x] = mapFunc.call( scope, source[x], x, source );
      }
   }
}