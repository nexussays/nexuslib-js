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

/**
 * 
 */
class HttpRequest
{
   // appended to URL if GET, send as body otherwise
   data: any;
   headers: any;
   url: string;
   private request: XMLHttpRequest;

   constructor(obj: HttpRequest.Arguments);
   constructor(url?: string, method?: HttpRequest.Method, data?: any, contentType?: HttpRequest.ContentType);
   constructor(info?: any, public method?: HttpRequest.Method, data?: any, contentType?: HttpRequest.ContentType)
   {
      this.headers = {
         //"Connection": "close",
         //"Cache-Control": "no-cache",
         //"Pragma": "no-cache"

      };

      if(type.of( info ) == type.string)
      {
         this.url = <string>info;
         this.data = data;
         this.method = method || HttpRequest.Method.GET;
         this.setContentType( contentType || HttpRequest.ContentType.Form );
      }
      else
      {
         this.url = (<HttpRequest.Arguments>info).url;
         this.data = (<HttpRequest.Arguments>info).data;
         this.method = (<HttpRequest.Arguments>info).method || HttpRequest.Method.GET;
         this.setContentType( (<HttpRequest.Arguments>info).type || HttpRequest.ContentType.Form );
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
      this.headers["Content-Type"] = type.mimeTypes;
   }

   cancel(): void
   {
      this.request.abort();
   }

   send(completeCallback: (response: HttpResponse) => void): void
   {
      if(this.method == HttpRequest.Method.GET)
      {
         var querystring = generateQueryString( this.data );
         this.url += (querystring.length > 0 ? "?" + querystring : "");
         this.data = null;
      }

      var requestStart = Date.now();

      this.request.open( HttpRequest.Method[this.method], this.url, true );
      this.request.onreadystatechange = () =>
      {
         var req = this.request;
         if(req.readyState == 4)
         {
            req.onreadystatechange = function()
            {
            };
            var response = new HttpResponse();
            response.url = this.url;
            response.time = Date.now() - requestStart;
            response.status = (req.status == 1223) ? 204 : req.status;
            response.isSuccess = /^2/.test( response.status + "" );
            req.getAllResponseHeaders().split( /\r?\n/ ).forEach( (line) =>
            {
               var colon = line.indexOf( ":" );
               response.headers[line.substring( 0, colon )] = line.substring( colon + 1 );
            } );
            var content = response.headers["Content-Type"];
            if(/\/xml$/.test( content ))
            {
               response.body = req.responseXML;
            }
            else if(/json|javascript/.test( content ))
            {
               response.body = JsonSerializer.deserialize( req.responseText );
            }
            else
            {
               response.body = req.responseText || null;
            }
            //console.log(req);
            completeCallback && completeCallback( response );
         }
      };

      for(var header in this.headers)
      {
         this.request.setRequestHeader( header, encodeURIComponent( this.headers[header] ) );
      }

      this.request.send( this.data );
   }

   static send(obj: HttpRequest.ArgumentsWithCallback): void
   {
      var request = new HttpRequest( obj );
      return request.send( obj.complete );
   }
}

module HttpRequest
{
   export enum Method
   {
      GET,
      POST,
      PUT,
      DELETE,
      HEAD,
      OPTIONS
   }

   export class ContentType
   {
      static Form = new ContentType( "application/x-www-form-urlencoded" );
      static Json = new ContentType( "application/json, text/javascript" );
      static Xml = new ContentType( "application/xml, text/xml" );
      static Text = new ContentType( "text/plain" );
      static Html = new ContentType( "text/html" );
      static Binary = new ContentType( "application/octet-stream" );

      constructor(public mimeTypes: string)
      {
      }
   }

   export interface Arguments
   {
      url: string;
      method?: HttpRequest.Method;
      data?: any;
      type?: HttpRequest.ContentType
   }

   export interface ArgumentsWithCallback extends Arguments
   {
      complete: (response: HttpResponse) => void;
   }
}