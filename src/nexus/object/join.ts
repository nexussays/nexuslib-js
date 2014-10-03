// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=forEach
import forEach = require('./forEach'); ///ts:import:generated

export = join;

/**
 * Join an object hash's key and value into a single item and return an array
 */
function join<T>(obj: T, join: string=": "): Array<string>
{
   var result: string[] = [];
   forEach( obj, (val, key) => result.push( key + join + val ) );
   return result;
}