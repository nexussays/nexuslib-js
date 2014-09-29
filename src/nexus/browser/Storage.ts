// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=JsonSerializer
import JsonSerializer = require('../serialization/JsonSerializer'); ///ts:import:generated

export = Storage;

/**
 * Provide easier access to localStorage
 */
module Storage
{
   var store = window.localStorage;

   export function get(key: string): any
   {
      var result = store.getItem( key );
      try
      {
         result = result && JsonSerializer.deserialize( result );
      }
      catch(ex)
      {
         //console.warn(ex);
      }
      return result;
   }

   export function set(key: string, data: any): void
   {
      if(data === undefined)
      {
         Storage.remove( key );
      }
      else
      {
         store.setItem( key, JsonSerializer.serialize( data ) );
      }
   }

   export function remove(key: string): void
   {
      store.removeItem( key );
   }

   export function clear(): void
   {
      store.clear();
   }

   export function forEach(func: (item: any, key: string, index: number) => void): void
   {
      for(var x = 0; x < store.length; ++x)
      {
         var key = store.key( x );
         func( Storage.get( key ), key, x );
      }
   }
}