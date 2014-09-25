// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=first,_first
import _first = require('./first'); ///ts:import:generated
///ts:import=last,_last
import _last = require('./last'); ///ts:import:generated
///ts:import=flatten,_flatten
import _flatten = require('./flatten'); ///ts:import:generated
///ts:import=map$,_map$
import _map$ = require('./map$'); ///ts:import:generated

export = enhancePrototype;

function enhancePrototype()
{
   (<any>Array.prototype).first = function(defaultValue: any)
   {
      return _first( this, defaultValue );
   };

   (<any>Array.prototype).last = function(defaultValue: any)
   {
      return _last( this, defaultValue );
   };

   (<any>Array.prototype).flatten = function()
   {
      return _flatten( this );
   };

   (<any>Array.prototype).map$ = function<T>(mapFunc: (item: T, index: number, array: Array<T>) => any, scope: Array<T>): void
   {
      return (<any>_map$)( this, mapFunc, scope );
   };
}

module enhancePrototype
{
   export interface Array<T>
   {
      first(defaultValue?: any): T;
      last(defaultValue?: any): T;
      flatten(): Array<T>;
      map$(mapFunc: (item: T, index: number, array: Array<T>) => any, scope: Array<T>): void;
   }
}