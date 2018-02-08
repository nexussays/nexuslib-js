// Copyright M Griffie <nexus@nexussays.com>
//
// str Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with str
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

///ts:import=stripTags
import stripTags = require('./stripTags'); ///ts:import:generated

export = unescapeHTML;

function unescapeHTML(str: string): string
{
   var div = document.createElement( "div" );
   div.innerHTML = stripTags( str );
   return div.childNodes[0] ? div.childNodes[0].nodeValue : '';
}
