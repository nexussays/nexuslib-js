// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=escapeHTML
import escapeHTML = require('../stringutil/escapeHTML'); ///ts:import:generated

export = getOuterHTML;

function getOuterHTML(node: Node, includeChildren: boolean = true, escapeHtml: boolean = false): string
{
   var div = document.createElement( "div" );
   div.appendChild( node.cloneNode( includeChildren ) );
   return escapeHtml ? escapeHTML( div.innerHTML ) : div.innerHTML;
}
