// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=forEach
import forEach = require('./forEach'); ///ts:import:generated

export = filter;

function filter<T>(obj: T, callback: (value: any, key: any, obj: T) => boolean, thisArg?: any): T
{
   var newObj = {};
   forEach( obj, (val, key) =>
   {
      if(callback.call( thisArg, val, key, obj ))
      {
         newObj[key] = val;
      }
   } );
   return <T>newObj;
}
