// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=forEach
import forEach = require('./forEach'); ///ts:import:generated

export = map;

function map<T>(obj: T, keyFunc?: (any) => any, valFunc?: (any) => any, thisArg?: any): any
{
   var newObj = {};
   forEach( obj, (val, key) => newObj[(keyFunc ? keyFunc.call( thisArg, key ) : key)] = (valFunc ? valFunc.call( thisArg, val ) : val) );
   return newObj;
}
