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
   constructor(url?: string, method?: HttpRequest.Method, data?: any);
   constructor(info?: any, public method?: HttpRequest.Method, data?: any)
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
      }
      else
      {
         this.url = (<HttpRequest.Arguments>info).url;
         this.data = (<HttpRequest.Arguments>info).data;
         this.method = (<HttpRequest.Arguments>info).method || HttpRequest.Method.GET;
         if((<HttpRequest.Arguments>info).dataType)
         {
            this.setContentType( (<HttpRequest.Arguments>info).dataType );
         }
         if((<HttpRequest.Arguments>info).accept)
         {
            this.setAcceptType( (<HttpRequest.Arguments>info).accept );
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

   send(completeCallback: (response: HttpResponse) => void): void
   {
      if(this.method == HttpRequest.Method.GET)
      {
         var querystring = generateQueryString( this.data );
         this.url += (querystring.length > 0 ? "?" + querystring : "");
         this.data = null;
         delete this.headers["Content-Type"];
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

      if(!this.headers["Accept"])
      {
         this.setAcceptType( HttpRequest.MimeType.Any );
      }

      for(var header in this.headers)
      {
         this.request.setRequestHeader( header, this.headers[header] );
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

   export interface Arguments
   {
      url: string;
      method?: HttpRequest.Method;
      data?: any;
      dataType?: HttpRequest.MimeType;
      accept?: HttpRequest.MimeType;
   }

   export interface ArgumentsWithCallback extends Arguments
   {
      complete: (response: HttpResponse) => void;
   }
}