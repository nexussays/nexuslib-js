// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=forEach
import forEach = require('./forEach'); ///ts:import:generated
///ts:import=type
import type = require('../type'); ///ts:import:generated

export = clone;

function clone(obj: any): any;
function clone(obj: any, into?: any): void;
function clone(obj: any, into?: any): any
{
   switch(type.of( obj ))
   {
      case type.array:
         into = into || []; // fallthrough
      case type.object:
         into = into || {};
         forEach( obj, (val, key) => into[key] = val );
         break;
      case type.date:
         var ms = (<Date>obj).getTime();
         into = into || new Date();
         (<Date>into).setTime( ms );
         break;
      case type.node:
         into = (<Node>obj).cloneNode( true );
         break;
      default:
         into = obj;
         break;
   }
   return into;
}
