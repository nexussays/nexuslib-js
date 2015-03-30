// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=type
import type = require('../type'); ///ts:import:generated
///ts:import=JsonSerializer
import JsonSerializer = require('../serialization/JsonSerializer'); ///ts:import:generated
///ts:import=ms
import ms = require('../util/ms'); ///ts:import:generated

export = Cookie;

/**
 * Provide easier access to browser cookies
 */
class Cookie
{
   expiresOn: Date;

   constructor(key: string, data: any, expiration?: Date, path?: string, domain?: string, isSecure?: boolean);
   constructor(key: string, data: any, expiration?: number, path?: string, domain?: string, isSecure?: boolean);
   constructor(public key: string, public data: any, expiration?: any, public path: string = "/", public domain?: string, public isSecure: boolean = false)
   {
      //path = path || "/";
      if(expiration)
      {
         if(type.of( expiration ) == type.date)
         {
            this.expiresOn = expiration;
         }
         else
         {
            this.expiresOn = new Date( Date.now() + expiration );
         }
      }
   }

   expireIn(milliseconds: number): Cookie
   {
      // TODO: determine support for Date.now()
      //expires = new Date();
      //expires.setTime(expires.getTime() + expiration);
      this.expiresOn = new Date(Date.now() + milliseconds);
      Cookie.save(this);
      return this;
   }

   remove(): Cookie
   {
      // set expiration to the past
      return this.expireIn( -(ms.days( 127 )) );
   }

   save(): void
   {
      Cookie.save( this );
   }

   /**
    * Refresh the data of this cookie from the browser, overwriting any differences
    * in this instance's data. If this cookie has not yet been saved, it will not
    * be modified.
    */
   reloadData(): Cookie
   {
      var update = Cookie.retrieve( this.key, true );
      if(update != null)
      {
         this.data = update.data;
      }
      return this;
   }

   toString(): string
   {
      var key = encodeURIComponent( this.key + "" );
      var value = encodeURIComponent( JsonSerializer.serialize( this.data ) );
      return key + "=" + value +
      (this.expiresOn ? ";expires=" + this.expiresOn.toUTCString() : "") +
      (this.path ? ";path=" + this.path : "") +
      (this.domain ? ";domain=" + this.domain : "") +
      (this.isSecure === true ? ";secure" : "");
   }
}

module Cookie
{
   var cookieCache: { [name: string]: Cookie } = {};
   var allLoaded: boolean = false;
   export function all(reload: boolean = false): { [name: string]: Cookie }
   {
      if(reload || !allLoaded)
      {
         allLoaded = true;
         var allCookies = document.cookie.split( ";" );
         for(var x = 0; x < allCookies.length; ++x)
         {
            var cookie = allCookies[x].trim();
            var delimeter = cookie.indexOf( "=" );
            var key = decodeURIComponent( cookie.substring( 0, delimeter ) );
            var encodedValue = decodeURIComponent( cookie.substring( delimeter + 1 ) );
            var value: any;
            try
            {
               value = encodedValue && JsonSerializer.deserialize( encodedValue );
            }
            catch(ex)
            {
               //console.warn( "Error parsing cookie \"" + key + "\"" + ex.message );
               value = encodedValue;
            }
            cookieCache[key] = new Cookie( key, value );
         }
      }
      return cookieCache;
   }

   export function retrieveOrCreate(key: string, reload: boolean = false): Cookie
   {
      return Cookie.retrieve(key, reload) || new Cookie(key, {});
   }

   export function retrieve(key: string, reload: boolean = false): Cookie
   {
      if(reload || !(key in cookieCache))
      {
         var value = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key)/*.replace(/[\-\.\+\*]/g, "\\$&")*/ + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
         if(value != null)
         {
            try
            {
               value = JsonSerializer.deserialize( value );
            }
            catch(ex)
            {
               console.warn( "Error parsing cookie \"" + key + "\"" + ex.message );
            }
         }
         cookieCache[key] = new Cookie(key, value);
      }
      return (key in cookieCache ? cookieCache[key] : null);
   }

   export function save(cookie: Cookie): void
   {
      var cookieVal = cookie.toString();

      if(!(cookie.key in cookieCache))
      {
         cookieCache[cookie.key] = cookie;
      }

      document.cookie = cookieVal;
   }

   export function remove(key: string): void
   {
      var cookie = retrieve(key);
      if(cookie != null)
      {
         cookie.remove();
      }
   }
} 