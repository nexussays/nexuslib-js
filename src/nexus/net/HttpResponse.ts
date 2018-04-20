// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export class HttpResponse
{
   body: any;
   headers: any;
   private jsonBody: any;

   //bytesLoaded: number;
   //bytesTotal: number;

   constructor(public url: string, headers: string, responseText: string, responseXml: XMLDocument,
               public time: number, public status: number, public statusText: string)
   {
      this.headers = {};
      headers.split( /\r?\n/ ).forEach( (line) =>
      {
         var delim = line.indexOf( ":" );
         this.headers[line.substring( 0, delim ).trim()] = line.substring( delim + 1 ).trim();
      } );

      // set actual return values for alternate body type methods
      this.bodyAsXml = () => responseXml;
      this.bodyAsText = () => responseText;

      var responseType = this.headers["Content-Type"];
      if(/\/xml/.test( responseType ))
      {
         this.body = this.bodyAsXml();
      }
      else if(/\/(?:json|javascript)/.test( responseType ))
      {
         try
         {
            this.body = this.bodyAsJson();
         }
         catch(e)
         {
            //console.debug( e );
            this.body = undefined;
         }
      }
      else
      {
         this.body = responseText;
      }

      //this.bytesLoaded = 0;
      //this.bytesTotal = 0;
   }

   isSuccess(): boolean
   {
      return (this.status + "")[0] == "2";
   }

   bodyAsJson(): any
   {
      // serialize each time instead of caching to
      // 1. ensure that any exceptions are thrown
      // 2. create a new object so a prior reference can't be accidentally mutated
      return JsonSerializer.deserialize( this.bodyAsText() );
   }

   bodyAsXml(): XMLDocument
   {
      // set in ctor
      return undefined;
   }

   bodyAsText(): string
   {
      // set in ctor
      return undefined;
   }
}
