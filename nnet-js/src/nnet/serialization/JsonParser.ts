// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = JsonParser;
module JsonParser
{
   export var deserialize: (text: string, reviver?: (key: any, value: any) => any) => any = JSON.parse;

   export function serialize(value: any, replacer?: (key: string, value: any) => any, space?: any): string;
   export function serialize(value: any, replacer?: any[], space?: any):string;
   export function serialize(value: any, replacer?: any, space?: any): string
   {
      return JSON.stringify( value, replacer, space );
   }
}