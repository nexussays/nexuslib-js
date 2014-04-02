// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/**
 * not in a global range() function because Javascript has no "yield" or other means
 * to defer execution, so we actually have to generate the entire range. I think
 * a window.range() function would introduce confusion about the implementation.
 */
export function makeRange(from, to, step)
{
   step = step || 1;
   var arr = [];
   while(from <= to)
   {
      arr.push(from);
      from += step;
   }
   return arr;
}

/**
 * Convert an Array-like object to an Array
 */
export function toArray<T>(collection):Array<T>
{
   if(collection instanceof Array)
   {
      return collection;
   }

   for(var x = 0, ln = collection.length, arr = []; x < ln; ++x)
   {
      arr[x] = collection[x];
   }
   return arr;
}

/**
 * Array#map which directly alters the array instead of returning a new array
 */
export function map$(func, scope)
{
   var ln = scope.length;
   for(var x = 0; x < ln; ++x)
   {
      if(x in scope)
      {
         scope[x] = func.call(scope, scope[x], x, scope);
      }
   }
}

/**
 * Randomizes the values of the provided Array
 */
export function shuffle(source)
{
   var i = source.length, j, temp;
   while(i)
   {
      --i;
      j = Math.floor(Math.random() * (i + 1));
      temp = source[i];
      source[i] = source[j];
      source[j] = temp;
   }
   return source;
}

/**
 * Flattens an array of arrays into a single array.
 * @example
 * [0,1,2,3,4,["a","b","c"],5,[["x","y","z"],[1,2,3]]]
 * becomes [0,1,2,3,4,"a","b","c",5,"x","y","z",1,2,3]
 */
export function flatten(source)
{
   var x = 0, ln = source.length, arr = [];
   for(; x < ln; ++x)
   {
      if(x in source)
      {
         var value = source[x];
         arr = arr.concat(value instanceof Array ? value.flatten() : value);
      }
   }
   return arr;
}