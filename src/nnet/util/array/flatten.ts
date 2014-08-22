// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import arrayLike = require("nnet/util/array/arrayLike");

export = flatten;
/**
 * Flattens an array of arrays into a single array.
 * @example
 * [0,1,2,3,4,["a","b","c"],5,[["x","y","z"],[1,2,3]]]
 * becomes [0,1,2,3,4,"a","b","c",5,"x","y","z",1,2,3]
 */
function flatten(source)
{
   var x = 0,
       ln = source.length,
       arr = [];
   for(; x < ln; ++x)
   {
      if(x in source)
      {
         var value = source[x];
         arr = arr.concat( arrayLike(value) ? flatten(value) : value );
      }
   }
   return arr;
}