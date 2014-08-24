// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = toArray;
/**
 * Convert an Array-like object to an Array
 */
function toArray<T>(collection):Array<T>
{
   //if(collection instanceof Array)
   //{
   //   return collection;
   //}
   
   //return Array.prototype.slice.call( collection, 0 );
   for(var x = 0, ln = collection.length, arr : T[] = []; x < ln; ++x)
   {
      arr[x] = collection[x];
   }
   return arr;
}