// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=JsonSerializer
import JsonSerializer = require('../serialization/JsonSerializer'); ///ts:import:generated

var store = window.localStorage;

export function retrieve<T>(key: string, defaultValue?: T): T
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

export function modify<T>(key: string, func: (T) => T): void
{
   save( key, func( retrieve( key ) ) );
}

export function forEach(func: (item: any, key: string, index: number) => void): void
{
   for(var x = 0; x < store.length; ++x)
   {
      var key = store.key( x );
      func( retrieve( key ), key, x );
   }
}

export function remove(key: string): void
{
   store.removeItem(key);
}

export function clear(): void
{
   store.clear();
}