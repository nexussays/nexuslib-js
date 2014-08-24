// Copyright Malachi Griffie <malachi@nexussays.com>
//
// str Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with str
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = trim;

function trim(str: string): string
{
   if(arguments.length > 0)
   {
      var args = (Array.prototype.map.call( arguments, x => x.escapeRegExp() )).join( "|" );
      return str.replace( new RegExp( "^(?:" + args + ")+|(?:" + args + ")+$", "g" ), "" );
   }
   return str.replace( /^\s+|\s+$/, "" );
}