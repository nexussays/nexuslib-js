// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export  = map;
function map(obj, keyFunc: (string) => any, valFunc: (any) => any)
{
   var newObj = {};
   for(var x in obj)
   {
      newObj[(keyFunc ? keyFunc(x) : x)] = (valFunc ? valFunc(obj[x]) : obj[x]);
   }
   return newObj;
}