// Copyright M Griffie <nexus@nexussays.com>
//
// str Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with str
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = escapeRegExp;

function escapeRegExp(str: string): string
{
   return str.replace( /(?:[.*+?^${}()|[\]\/\\])/g, "\\$1" );
}
