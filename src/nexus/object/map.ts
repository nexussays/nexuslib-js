// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = map;

function map<T>(obj: T, keyFunc?: (any) => any, valFunc?: (any) => any): T
{
   var newObj = {};
   for(var x in obj)
   {
      if(obj.hasOwnProperty( x ))
      {
         newObj[(keyFunc ? keyFunc( x ) : x)] = (valFunc ? valFunc( obj[x] ) : obj[x]);
      }
   }
   return <T>newObj;
}