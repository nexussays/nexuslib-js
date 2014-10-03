// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = HttpResponse;

class HttpResponse
{
   body: any;
   headers: any;
   //bytesLoaded: number;
   //bytesTotal: number;

   constructor(public url?: string, public time?: number, public status: number = -1)
   {
      this.headers = {};
      //this.bytesLoaded = 0;
      //this.bytesTotal = 0;
   }

   isSuccess(): boolean
   {
      return (this.status + "")[0] == "2";
   }
}