// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.


export = parseQueryString;

function parseQueryString()
{
   var dict = {};
   var search: any = window.location.search.substring( 1 );
   if(search != "")
   {
      search = search.split( "&" );
      for(var x = 0; x < search.length; ++x)
      {
         var entry = search[x].split( "=" );
         dict[decodeURIComponent( entry[0] )] = decodeURIComponent( entry[1] );
      }
   }
   return dict;
}