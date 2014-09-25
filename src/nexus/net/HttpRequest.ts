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

export = HttpRequest;

/**
 * 
 */
class HttpRequest
{
   // appended to URL if GET, send as body otherwise
   data: any;
   headers: any;
   private request: XMLHttpRequest;

   constructor(public url?: string, public method?: HttpRequest.Method, data?: any)
   {
      this.url = url || "";
      this.method = method || HttpRequest.Method.GET;
      this.headers = {
         "Content-Type": "application/x-www-form-urlencoded",
         //"Connection": "close",
         //"Cache-Control": "no-cache",
         //"Pragma": "no-cache"
      };

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

   cancel(): void
   {
      this.request.abort();
   }

   send(completeCallback: (response: HttpResponse) => void): boolean
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

      return true;
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
}