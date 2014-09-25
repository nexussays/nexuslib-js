// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = HttpResponse;

class HttpResponse
{
   url: string;
   body: any;
   time: number;
   status: number;
   headers: any;
   isSuccess: boolean;
   //bytesLoaded: number;
   //bytesTotal: number;

   constructor()
   {
      this.headers = {};
      this.status = -1;
      //this.bytesLoaded = 0;
      //this.bytesTotal = 0;
   }
}