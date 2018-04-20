// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=HttpResponse
//import HttpResponse = require('./HttpResponse'); ///ts:import:generated
///ts:import=generateQueryString
//import generateQueryString = require('./generateQueryString'); ///ts:import:generated
///ts:import=JsonSerializer
//import JsonSerializer = require('../serialization/JsonSerializer'); ///ts:import:generated
///ts:import=type
//import type = require('../type'); ///ts:import:generated
///ts:import=forEach
//import forEach = require('../object/forEach'); ///ts:import:generated
///ts:import=clone
//import clone = require('../object/clone'); ///ts:import:generated

export class HttpRequest
{
   // appended to URL if GET, sent as body otherwise
   content: any;
   headers: any;
   url: string;
   method: HttpRequest.Method;

   private request: XMLHttpRequest;
   private response: HttpResponse;
   private contentType: HttpRequest.ContentType;
   private accept: HttpRequest.Accept;
   private contentSent: string;
   private completionCallbacks: Array<(response: HttpResponse, request: HttpRequest.RequestData) => void>;

   constructor(obj: HttpRequest.RequestArgsWithMethod);
   constructor(url?: string, method?: HttpRequest.Method, data?: any);
   constructor(info?: any, method?: HttpRequest.Method, data?: any)
   {
      this.headers = {
         "Connection": "close",
         //"Cache-Control": "no-cache",
         //"Pragma": "no-cache"
      };
      this.completionCallbacks = [];
      // default to GET if method is not provided
      this.method = HttpRequest.Method.GET;
      // default to requesting JSON
      this.setAcceptType( HttpRequest.Accept.Json );
      // default to sending key/value pairs as form data
      this.setContentType( HttpRequest.ContentType.Form );

      if(type.of( info ) == type.string)
      {
         this.url = <string>info;
         this.method = +method;
         this.content = data;
      }
      else
      {
         var args = (<HttpRequest.RequestArgsWithMethod>info);
         this.url = args.url;
         this.content = args.content;
         this.method = args.method;
         // if value is invalid, the default values will be set;
         this.setContentType( args.contentType );
         this.setAcceptType( args.accept );
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

   setContentType(type: HttpRequest.ContentType): void
   {
      var result: string;
      switch(type)
      {
         case HttpRequest.ContentType.Binary:
            result = "application/octet-stream";
            break;
         case HttpRequest.ContentType.Json:
            result = "application/json; charset=utf-8";
            break;
         case HttpRequest.ContentType.Text:
            result = "text/plain";
            break;
         case HttpRequest.ContentType.Xml:
            result = "text/xml";
            break;
         case HttpRequest.ContentType.Form:
         default:
            // set it in case an invalid value was passed
            type = HttpRequest.ContentType.Form;
            result = "application/x-www-form-urlencoded";
            break;
      }
      this.contentType = type;
      this.headers["Content-Type"] = result;
   }

   setAcceptType(type: HttpRequest.Accept): void
   {
      var result: string;
      switch(type)
      {
         case HttpRequest.Accept.Html:
            result = "text/html";
            break;
         case HttpRequest.Accept.Xml:
            result = "application/xml, text/xml";
            break;
         case HttpRequest.Accept.Text:
            result = "text/plain";
            break;
         case HttpRequest.Accept.Any:
            result = "*/*";
            break;
         case HttpRequest.Accept.Json:
         default:
            // set it in case an invalid value was passed
            type = HttpRequest.Accept.Any;
            result = "application/json, text/javascript";
            break;
      }
      this.accept = type;
      this.headers["Accept"] = result;
   }

   cancel(): void
   {
      this.request.abort();
   }

   complete(callback: (response: HttpResponse, request: HttpRequest.RequestData) => void): HttpRequest.Promise
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
      var headers = this.headers;
      var req = this.request;

      req.open( HttpRequest.Method[this.method], this.url, true );
      req.onreadystatechange = () =>
      {
         if(req.readyState == 4)
         {
            var time = Date.now() - requestStart;

            // set this handler to be a no-op
            req.onreadystatechange = function()
            {
            };

            var response = new HttpResponse(this.url,
               req.getAllResponseHeaders(),
               req.responseText,
               req.responseXML,
               time,
               // 1223 is a weird IE thing; but don't think it matters since we don't support < 9
               (req.status == 1223) ? 204 : req.status,
               req.statusText );

            this.response = response;
            this.runCallbacks();
         }
      };

      // set all headers
      for(var header in headers)
      {
         req.setRequestHeader( header, headers[header] );
      }

      // serialize content
      var content = this.content;
      if(content !== undefined)
      {
         if(this.contentType === HttpRequest.ContentType.Json)
         {
            content = JsonSerializer.serialize( content );
         }
         else
         {
            content = generateQueryString( content );
            if(this.method == HttpRequest.Method.GET || this.method == HttpRequest.Method.HEAD)
            {
               this.url += (content.length > 0 ? "?" + content : "");
               content = null;
               //delete this.headers["Content-Type"];
            }
         }
         this.contentSent = content;
      }

      var requestStart = Date.now();
      req.send( content );

      return this;
   }

   private runCallbacks()
   {
      var all = this.completionCallbacks;
      if(all.length)
      {
         var data: HttpRequest.RequestData = {
            content: clone( this.content ),
            headers: clone( this.headers ),
            method: HttpRequest.Method[this.method],
            url: this.url
         };
         var sent = this.contentSent;
         if(sent !== null && sent !== undefined)
         {
            data.contentSent = sent;
         }
         while(all.length)
         {
            all.pop()( this.response, data );
         }
      }
   }
}

namespace HttpRequest
{
   export function get(obj: HttpRequest.RequestArgs): Promise;
   export function get(url: string): Promise;
   export function get(obj: any): Promise
   {
      return send( HttpRequest.Method.GET, obj );
   }

   export function put(obj: HttpRequest.RequestArgs): Promise;
   export function put(url: string, data?: any): Promise;
   export function put(obj: any, data?: any): Promise
   {
      return send( HttpRequest.Method.PUT, obj, data );
   }

   export function post(obj: HttpRequest.RequestArgs): Promise;
   export function post(url: string, data?: any): Promise;
   export function post(obj: any, data?: any): Promise
   {
      return send( HttpRequest.Method.POST, obj, data );
   }

   export function del(obj: HttpRequest.RequestArgs): Promise;
   export function del(url: string): Promise;
   export function del(obj: any): Promise
   {
      return send( HttpRequest.Method.DELETE, obj );
   }

   function send(method: HttpRequest.Method, obj: HttpRequest.RequestArgs): Promise;
   function send(method: HttpRequest.Method, url: string, data?: any): Promise;
   function send(method: HttpRequest.Method, obj: any, data?: any): Promise
   {
      var args: HttpRequest.RequestArgs;
      if(type.of( obj ) == type.string)
      {
         args = { url: obj, content: (data !== undefined ? data : undefined) };
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

   export enum Accept
   {
      Text,
      Json,
      Html,
      Xml,
      Any
   }

   export enum ContentType
   {
      Form,
      Text,
      Json,
      Xml,
      Binary
   }

   export interface Promise
   {
      cancel(): void;
      complete(callback: (response: HttpResponse, request: RequestData) => void): Promise;
   }

   export interface RequestData
   {
      content: any;
      contentSent?: string;
      headers: any;
      url: string;
      method: string;
   }

   export interface RequestArgs
   {
      url: string;
      content?: any;
      contentType?: ContentType;
      accept?: Accept;
   }

   export interface RequestArgsWithMethod extends RequestArgs
   {
      method?: Method;
   }
}
