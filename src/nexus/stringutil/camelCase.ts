// Copyright M Griffie <nexus@nexussays.com>
//
// str Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with str
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = camelCase;

/**
 * Converts a hyphenated-string to a camelCasedString
 */
function camelCase(str: string): string
{
   return str.replace( /-+(.)?/g, (match, char) => char ? char.toUpperCase() : "" );
}
