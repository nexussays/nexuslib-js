// Copyright Malachi Griffie <malachi@nexussays.com>
//
// str Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with str
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

///ts:import=escapeRegExp
import escapeRegExp = require('./escapeRegExp'); ///ts:import:generated

export = trimChars;
function trimChars(str: string, ...chars:string[]): string
{
   if(chars.length > 0)
   {
      var args = chars.map( x => escapeRegExp(x) ).join( "|" );
      return str.replace( new RegExp( "^(?:" + args + ")+|(?:" + args + ")+$", "g" ), "" );
   }
   return str;
}