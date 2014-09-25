// Copyright Malachi Griffie <malachi@nexussays.com>
//
// str Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with str
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = hyphenate;

/**
 * Converts a camelCasedString to a hyphenated-string
 */
function hyphenate(str: string): string
{
   return str.replace( /::/g, "/" )
      .replace( /([A-Z]+)([A-Z][a-z])/g, "$1-$2" )
      .replace( /([a-z\d])([A-Z])/g, "$1-$2" )
      .replace( /_/g, "-" )
      .toLowerCase();
}