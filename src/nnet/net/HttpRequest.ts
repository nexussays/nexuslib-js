// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import NNetError = require("nnet/error/NNetError");
import IHttpResponse = require("nnet/net/IHttpResponse");

export = HttpRequest;

/**
 * 
 */
class HttpRequest
{
   request: XMLHttpRequest = null;
   params: any;
   body: any = null;
   headers: any = {};
   url: string;
   response: IHttpResponse = {
      text: null,
      xml: null,
      time: 0,
      status: 0
   };
   onComplete = (...args) =>
   {
   };

   constructor(url, params)
   {
      this.params = params || {};
      this.url = url || "";

      //create object
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
         throw new NNetError( "HttpRequest is not supported in this browser" );
      }
   }

   sendGet(async: boolean): boolean
   {
      return this.send( HttpRequest.Method.GET, async );
   }

   sendPost(async: boolean): boolean
   {
      return this.send( HttpRequest.Method.POST, async );
   }

   sendPut(async: boolean): boolean
   {
      return this.send( HttpRequest.Method.PUT, async );
   }

   sendDelete(async: boolean): boolean
   {
      return this.send( HttpRequest.Method.DELETE, async );
   }

   sendHead(async: boolean): boolean
   {
      return this.send( HttpRequest.Method.HEAD, async );
   }

   send(method: HttpRequest.Method, asynchronous: boolean): boolean
   {
      var async = (asynchronous === false ? false : true);
      var querystring: any = [];

      //if we are sending an entity body, ignore the query string
      if(this.body == null)
      {
         for(var x in this.params)
         {
            querystring.push( encodeURIComponent( x ) + "=" + encodeURIComponent( this.params[x] ) );
         }
         querystring = querystring.join( "&" );
      }

      switch(method)
      {
         case HttpRequest.Method.GET:
            this.url += (querystring.length > 0 ? "?" + querystring : "");
            querystring = null;
            break;
         case HttpRequest.Method.POST:
         case HttpRequest.Method.PUT:
         case HttpRequest.Method.DELETE:
            if(querystring.length > 0)
            {
               this.headers["Content-Type"] = "application/x-www-form-urlencoded";
            }
            else
            {
               //TODO: Need to determine how we're getting content-type here
               this.headers["Content-Type"] = "application/xml";
               querystring = null;
            }
            break;
         case HttpRequest.Method.HEAD:
            throw new NNetError( "HttpRequest.sendHead() is not yet implemented" );
            break;
         default:
            throw new NNetError( "Improper value \"" + method + "\" passed to HttpRequest.send() method. Valid values are \"GET, POST, PUT, DELETE, HEAD\"" );
      }

      this.request.open( HttpRequest.Method[method], this.url, async );
      this.request.onreadystatechange = () =>
      {
         this.stateChange();
      };

      this.headers["Connection"] = "close";
      //Cache-Control: no-cache
      //Pragma: no-cache

      for(var header in this.headers)
      {
         this.request.setRequestHeader( encodeURIComponent( header ), encodeURIComponent( this.headers[header] ) );
      }

      this.response.time = (new Date()).getTime();
      this.request.send( this.body || querystring );

      return true;
   }

   private stateChange()
   {
      switch(this.request.readyState)
      {
         case 0:
            break;
         case 1:
            break;
         case 2:
            //try{this.response.status = this.request.status;}catch(e){}
            break;
         case 3:
            //this.response = {"text":this.request.responseText,"xml":this.request.responseXML};
            break;
         case 4:
            this.response.status = this.request.status;
            this.response.time = ((new Date()).getTime() - this.response.time);
            this.response.text = this.request.responseText || null;
            this.response.xml = this.request.responseXML || null;
            //Debug.Object(this.request, true);
            this.onComplete( this.response );
            break;
         default:
            throw new NNetError( "INVALID readyState \"" + this.request.readyState + "\" in HTTPRequest" );
      }
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
      HEAD
   }
}