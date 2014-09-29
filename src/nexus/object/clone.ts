// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=map
import map = require('./map'); ///ts:import:generated

export = clone;

function clone<T>(obj: T): T;
function clone<T>(obj: T, into?: any): void;
function clone<T>(obj: T, into?: any): T
{
   if(!into)
   {
      return map( obj );
   }
   Object.getOwnPropertyNames( obj ).forEach( name => into[name] = obj[name] );
}