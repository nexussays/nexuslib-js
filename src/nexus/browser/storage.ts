// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=JsonSerializer
import JsonSerializer = require('../serialization/JsonSerializer'); ///ts:import:generated
///ts:import=clone
import clone = require('../object/clone'); ///ts:import:generated

var store = window.localStorage;

export function retrieve(key: string, defaultValue?: any): any
{
   var result = store.getItem( key );
   if(result)
   {
      try
      {
         result = JsonSerializer.deserialize( result );
      }
      catch(ex)
      {
         //console.warn(ex);
         result = defaultValue;
      }
   }
   else
   {
      result = defaultValue;
   }
   return result;
}

export function retrieveInto<T>(key: string, object:T): T
{
   var result = retrieve(key);
   if(result != null)
   {
      clone( result, object );
   }
   return object;
}

export function save(key: string, data: any): void
{
   if(data === undefined)
   {
      remove( key );
   }
   else
   {
      store.setItem( key, JsonSerializer.serialize( data ) );
   }
}

export function modify(key: string, func: (value: any) => any): void
{
   save( key, func( retrieve( key ) ) );
}

export function forEach(func: (item: any, key: string, index: number) => void): void
{
   var tuples = [];
   for(var x = 0; x < store.length; ++x)
   {
      var key = store.key(x);
      tuples.push([retrieve(key), key, x]);
   }
   tuples.forEach( tuple => func( tuple[0], tuple[1], tuple[2] ) );
}

export function remove(key: string): void
{
   store.removeItem(key);
}

export function clear(): void
{
   store.clear();
}
