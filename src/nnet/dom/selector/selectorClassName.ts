// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.


import Types = require("nnet/util/object/Types");
import type = require("nnet/util/object/t");
import filterByAttribute = require("nnet/dom/selector/filterByAttribute");

export = selectorClassName;

function selectorClassName(name: string, tag?: string): Array<Node>
{
   var allElements = (type( this ) != Types.node ? document : this).getElementsByTagName( tag || "*" );
   var result = filterByAttribute( allElements, "class", name.replace( /^\./, '' ), "~" );
   return result;
}