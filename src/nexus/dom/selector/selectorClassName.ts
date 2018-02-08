// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.


///ts:import=type
import type = require('../../type'); ///ts:import:generated
///ts:import=filterByAttribute
import filterByAttribute = require('./filterByAttribute'); ///ts:import:generated

export = selectorClassName;

function selectorClassName(name: string, tag?: string): Array<Node>
{
   var allElements = (type.of( this ) != type.node ? document : this).getElementsByTagName( tag || "*" );
   var result = filterByAttribute( allElements, "class", name.replace( /^\./, '' ), "~" );
   return result;
}
