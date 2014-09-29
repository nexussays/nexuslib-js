// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=HttpResponse
import HttpResponse = require('./HttpResponse'); ///ts:import:generated
///ts:import=generateQueryString
import generateQueryString = require('./generateQueryString'); ///ts:import:generated
///ts:import=JsonSerializer
import JsonSerializer = require('../serialization/JsonSerializer'); ///ts:import:generated
///ts:import=type
import type = require('../type'); ///ts:import:generated

export = HttpRequest;

class HttpRequest
{
   // appended to URL if GET, sent as body otherwise
   content: any;
   headers: any;
   url: string;
   method: HttpRequest.Method;
   private request: XMLHttpRequest;
   private response: HttpResponse;
   private completionCallbacks: Array<(response: HttpResponse) => void>;

   constructor(obj: HttpRequest.RequestArgsWithMethod);
   constructor(url?: string, method?: HttpRequest.Method, data?: any);
   constructor(info?: any, method?: HttpRequest.Method, data?: any)
   {
      this.headers = {
         //"Connection": "close",
         //"Cache-Control": "no-cache",
         //"Pragma": "no-cache"

      };
      this.completionCallbacks = [];

      if(type.of( info ) == type.string)
      {
         this.url = <string>info;
         this.content = data;
         this.method = method || HttpRequest.Method.GET;
      }
      else
      {
         this.url = (<HttpRequest.RequestArgsWithMethod>info).url;
         this.content = (<HttpRequest.RequestArgsWithMethod>info).content;
         this.method = (<HttpRequest.RequestArgsWithMethod>info).method || HttpRequest.Method.GET;
         if((<HttpRequest.RequestArgsWithMethod>info).contentType)
         {
            this.setContentType( (<HttpRequest.RequestArgsWithMethod>info).contentType );
         }
         if((<HttpRequest.RequestArgsWithMethod>info).accept)
         {
            this.setAcceptType( (<HttpRequest.RequestArgsWithMethod>info).accept );
         }
      }

      if(typeof XMLHttpRequest != "undefined")
      {
         this.request = new XMLHttpRequest();
      }
      //use one of IE's methods
      else if(typeof ActiveXObject != "undefined")
      {
         //this.request = new ActiveXObject("Msxml2.XMLHTTP");
         this.request = new ActiveXObject( "Microsoft.XMLHTTP" );
      }
      else
      {
         throw new Error( "HttpRequest is not supported in this browser" );
      }
   }

   setContentType(type: HttpRequest.MimeType): void
   {
      this.headers["Content-Type"] = type;
   }

   setAcceptType(type: HttpRequest.MimeType): void
   {
      this.headers["Accept"] = type;
   }

   cancel(): void
   {
      this.request.abort();
   }

   complete(callback: (response: HttpResponse) => void): HttpRequest.Promise
   {
      this.completionCallbacks.push( callback );
      if(this.response)
      {
         setTimeout( this.runCallbacks, 1 );
      }
      return this;
   }

   send(completeCallback?: (response: HttpResponse) => void): HttpRequest.Promise
   {
      if(this.response)
      {
         return this;
      }

      completeCallback && this.complete( completeCallback );

      if(this.method == HttpRequest.Method.GET)
      {
         var querystring = generateQueryString( this.content );
         this.url += (querystring.length > 0 ? "?" + querystring : "");
         this.content = null;
         delete this.headers["Content-Type"];
      }

      var requestStart = Date.now();
      var headers = this.headers;
      var req = this.request;
      req.open( HttpRequest.Method[this.method], this.url, true );
      req.onreadystatechange = () =>
      {
         if(req.readyState == 4)
         {
            // set this handler to be a no-op
            req.onreadystatechange = function()
            {
            };

            var response = new HttpResponse( /^2/.test( req.status + "" ),
               this.url,
               Date.now() - requestStart,
               // 1223 is a weird IE thing; but don't think it matters since we don't support < 9
               (req.status == 1223) ? 204 : req.status );

            req.getAllResponseHeaders().split( /\r?\n/ ).forEach( (line) =>
            {
               var delim = line.indexOf( ":" );
               response.headers[line.substring( 0, delim )] = line.substring( delim + 1 );
            } );

            var content = response.headers["Content-Type"];
            if(/\/xml$/.test( content ))
            {
               response.body = req.responseXML;
            }
            else if(/\/(?:json|javascript)$/.test( content ))
            {
               response.body = JsonSerializer.deserialize( req.responseText );
            }
            else
            {
               response.body = req.responseText || null;
            }

            this.response = response;
            this.runCallbacks();
         }
      };

      if(!headers["Accept"])
      {
         this.setAcceptType( HttpRequest.MimeType.Json );
      }

      for(var header in headers)
      {
         req.setRequestHeader( header, headers[header] );
      }

      req.send( this.content );

      return this;
   }

   private runCallbacks()
   {
      var all = this.completionCallbacks;
      while(all.length)
      {
         all.pop()( this.response );
      }
   }
}

module HttpRequest
{
   export function get(obj: HttpRequest.RequestArgs): Promise;
   export function get(url: string): Promise;
   export function get(obj: any): Promise
   {
      return send( HttpRequest.Method.GET, obj );
   }

   export function put(obj: HttpRequest.RequestArgs): Promise;
   export function put(url: string): Promise;
   export function put(obj: any): Promise
   {
      return send( HttpRequest.Method.PUT, obj );
   }

   export function post(obj: HttpRequest.RequestArgs): Promise;
   export function post(url: string): Promise;
   export function post(obj: any): Promise
   {
      return send( HttpRequest.Method.POST, obj );
   }

   export function del(obj: HttpRequest.RequestArgs): Promise;
   export function del(url: string): Promise;
   export function del(obj: any): Promise
   {
      return send( HttpRequest.Method.DELETE, obj );
   }

   function send(method: HttpRequest.Method, obj: HttpRequest.RequestArgs): Promise;
   function send(method: HttpRequest.Method, url: string): Promise;
   function send(method: HttpRequest.Method, obj: any): Promise
   {
      var args: HttpRequest.RequestArgs;
      if(type.of( obj ) == type.string)
      {
         args = { url: obj };
      }
      else
      {
         args = <HttpRequest.RequestArgs>obj;
      }

      var request = new HttpRequest( args );
      request.method = method;
      return request.send();
   }

   export enum Method
   {
      GET,
      POST,
      PUT,
      DELETE,
      HEAD,
      OPTIONS
   }

   export interface MimeType extends String
   {
   }

   export module MimeType
   {
      export var Form: MimeType = "application/x-www-form-urlencoded";
      export var Json: MimeType = "application/json, text/javascript";
      export var Xml: MimeType = "application/xml, text/xml";
      export var Text: MimeType = "text/plain";
      export var Html: MimeType = "text/html";
      export var Binary: MimeType = "application/octet-stream";
      export var Any: MimeType = "*/*";
   }

   export interface Promise
   {
      cancel(): void;
      complete(callback: (response: HttpResponse) => void): Promise;
   }

   export interface RequestArgs
   {
      url: string;
      content?: any;
      contentType?: HttpRequest.MimeType;
      accept?: HttpRequest.MimeType;
   }

   export interface RequestArgsWithMethod extends RequestArgs
   {
      method?: HttpRequest.Method;
   }
}