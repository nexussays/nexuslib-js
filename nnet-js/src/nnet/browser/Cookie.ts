// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

///ts:import=type
import type = require('../type'); ///ts:import:generated
///ts:import=Types
import Types = require('../Types'); ///ts:import:generated
///ts:import=JsonParser
import JsonParser = require('../serialization/JsonParser'); ///ts:import:generated
///ts:import=Milliseconds
import Milliseconds = require('../util/Milliseconds'); ///ts:import:generated

export = Cookie;

/**
 * Provide easier access to browser cookies
 */
class Cookie
{
   expiresOn: Date;

   constructor(key: string, data: Object, expiration?: Date, path?: string, domain?: string, isSecure?: boolean);
   constructor(key: string, data: Object, expiration?: number, path?: string, domain?: string, isSecure?: boolean);
   constructor(public key: string, public data: Object, expiration?: any, public path: string = "/", public domain?: string, public isSecure: boolean = false)
   {
      //path = path || "/";
      if(expiration)
      {
         if(type( expiration ) == Types.date)
         {
            this.expiresOn = expiration;
         }
         else
         {
            this.expireIn( expiration );
         }
      }
   }

   expireIn(milliseconds: number): Cookie
   {
      // TODO: determine support for Date.now()
      //expires = new Date();
      //expires.setTime(expires.getTime() + expiration);
      this.expiresOn = new Date( Date.now() + milliseconds );
      return this;
   }

   expire(): Cookie
   {
      // set expiration to the past
      return this.expireIn( -(Milliseconds.days( 365 )) );
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
   refreshData(): Cookie
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
      var value = encodeURIComponent( JsonParser.encode( this.data ) );
      return key + "=" + value +
      (this.expiresOn ? ";expires=" + this.expiresOn.toUTCString() : "") +
      (this.path ? ";path=" + this.path : "") +
      (this.domain ? ";domain=" + this.domain : "") +
      (this.isSecure === true ? ";secure" : "");
   }
}

module Cookie
{
   var cookieCache: { [s: string]: Cookie; } = { };

   export function retrieveOrCreate(key, reload: boolean = false): Cookie
   {
      return Cookie.retrieve( key, reload ) || new Cookie( key, {} );
   }

   export function retrieve(key, reload: boolean = false): Cookie
   {
      if(reload || !(key in cookieCache))
      {
         var allCookies = document.cookie.split( ";" );
         for(var x = 0; x < allCookies.length; ++x)
         {
            var cookie = allCookies[x].trim();
            var delimeter = cookie.indexOf( "=" );
            if(decodeURIComponent(cookie.substring(0, delimeter)) === key)
            {
               var encodedValue = decodeURIComponent( cookie.substring( delimeter + 1 ) );
               var value: any;
               try
               {
                  value = encodedValue && JsonParser.decode( encodedValue );
               }
               catch(ex)
               {
                  console.warn( ex );
                  value = encodedValue;
               }
               cookieCache[key] = new Cookie( key, value );
               break;
            }
         }
      }
      return (key in cookieCache ? cookieCache[key] : null);
   }

   export function save(cookie:Cookie):void
   {
      var cookieVal = cookie.toString();

      if(!(cookie.key in cookieCache))
      {
         cookieCache[cookie.key] = cookie;
      }

      document.cookie = cookieVal;
   }

   export function write(key: string, value: any, expiration?: number, path?: string, domain?: string, secure?: boolean): Cookie;
   export function write(key: string, value: any, expiration?: Date, path?: string, domain?: string, secure?: boolean): Cookie;
   export function write(key: string, value: any, expiration?: any, path?: string, domain?: string, secure?: boolean): Cookie
   {
      var cookie = new Cookie( key, value, expiration, path, domain, secure );
      cookie.save();
      return cookie;
   }
}