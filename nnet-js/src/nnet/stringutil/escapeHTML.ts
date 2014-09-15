// Copyright Malachi Griffie <malachi@nexussays.com>
//
// str Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with str
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = escapeHTML;

function escapeHTML(str: string): string
{
   if(!str)
   {
      return "";
   }
   var div = document.createElement( "div" );
   div.appendChild( document.createTextNode( str ) );
   return div.innerHTML;
}