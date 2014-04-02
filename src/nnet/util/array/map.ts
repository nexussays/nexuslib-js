// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = map$;
/**
 * Array#map which directly alters the array instead of returning a new array
 */
function map$(func, scope)
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