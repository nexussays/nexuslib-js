// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import _t = require("nnet/util/object/t");
import Types = require("nnet/util/object/Types");
import JsonParser = require("nnet/serialization/json/JsonParser");

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
      // Cookie will, by default, expire in 30 days
      //this.expiresOn = new Date(Date.now() + (30 * 24 * 60 * 60 * 1000));
      if(expiration)
      {
         if(_t(expiration) == Types.date)
         {
            this.expiresOn = expiration;
         }
         else
         {
            this.expireIn(expiration);
         }
      }
   }

   expireIn(seconds: number): Cookie
   {
      // TODO: determine support for Date.now()
      //expires = new Date();
      //expires.setTime(expires.getTime() + expiration);
      this.expiresOn = new Date(Date.now() + seconds);
      return this;
   }

   expire(): Cookie
   {
      // set to expire a year ago
      return this.expireIn(-(365 * 24 * 60 * 60 * 1000));
   }

   save(): void
   {
      var cookie = this.toString();

      if(!(this.key in Cookie.__store))
      {
         Cookie.__store[this.key] = this;
      }

      document.cookie = cookie;
   }

   /**
    * Refresh the data of this cookie from the browser, overwriting any differences
    * in this instance's data. If this cookie has not yet been saved, it will not
    * be modified.
    */
   refreshData(): Cookie
   {
      var update = Cookie.retrieve(this.key, true);
      if(update != null)
      {
         this.data = update.data;
      }
      return this;
   }

   toString(): string
   {
      var key = encodeURIComponent(this.key + "");
      var value = encodeURIComponent(JsonParser.encode(this.data));
      return key + "=" + value +
         (this.expiresOn ? ";expires=" + this.expiresOn.toUTCString() : "") +
         (this.path ? ";path=" + this.path : "") +
         (this.domain ? ";domain=" + this.domain : "") +
         (this.isSecure === true ? ";secure" : "");
   }

   private static __store: { [s: string]: Cookie; } = {};

   static retrieveOrCreate(key, reload: boolean = false): Cookie
   {
      return Cookie.retrieve(key, reload) || new Cookie(key, {});
   }

   static retrieve(key, reload: boolean = false): Cookie
   {
      if(reload || !(key in Cookie.__store))
      {
         var allCookies = document.cookie.split(";");
         for(var x = 0; x < allCookies.length; ++x)
         {
            var cookie = allCookies[x].trim();
            var index = cookie.indexOf("=");
            var dk = decodeURIComponent(cookie.substring(0, index));
            if(dk === key)
            {
               var dv = decodeURIComponent(cookie.substring(index + 1));
               var value: any;
               try
               {
                  value = dv && JsonParser.decode(dv);
               }
               catch(ex)
               {
                  console.error(ex);
                  value = null;
               }
               Cookie.__store[key] = new Cookie(key, value);
               break;
            }
         }
      }
      return (key in Cookie.__store ? Cookie.__store[key] : null);
   }

   static write(key: string, value: any, expiration?: number, path?: string, domain?: string, secure?: boolean): Cookie;
   static write(key: string, value: any, expiration?: Date, path?: string, domain?: string, secure?: boolean): Cookie;
   static write(key: string, value: any, expiration?: any, path?: string, domain?: string, secure?: boolean): Cookie
   {
      var cookie = new Cookie(key, value, expiration, path, domain, secure);
      cookie.save();
      return cookie;
   }
}