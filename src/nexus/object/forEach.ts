// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = forEach;

function forEach<T>(obj: T, func: (key: any, value: any, obj: T) => void): void
{
   for(var x in obj)
   {
      if(obj.hasOwnProperty( x ))
      {
         func.call( obj, x, obj[x], obj );
      }
   }
}