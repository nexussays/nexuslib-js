// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = IHttpResponse;

interface IHttpResponse
{
   text: string;
   json: any;
   xml: XMLDocument;
   time: number;
   status: number;
   isSuccess: boolean;
}