// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = forEach;

function forEach<T>(obj: T, func: (value: any, key: any, obj: T) => void, thisArg?: any): void;
function forEach(obj: any[], func: (value: any, key: any, obj: any[]) => void, thisArg?: any): void;
function forEach(obj: any, func: (value: any, key: any, obj: any) => void, thisArg?: any): void
{
   if(obj instanceof Array)
   {
      (<any[]>obj).forEach( func, thisArg );
      return;
   }

   for(var x in obj)
   {
      if(obj.hasOwnProperty( x ))
      {
         func.call( thisArg, obj[x], x, obj );
      }
   }
}