// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = parseNumber;
/**
 * Parse a number and use the default value if the parse result is NaN
 */
function parseNumber(source: string, defaultValue: number = 0): number
{
   var result: number = parseFloat( source + "" );
   return isNaN( result ) ? defaultValue : result;
}

module parseNumber
{
   /**
    * Also uses default value if parsed value is Infinity
    */
   export function finite(source: string, defaultValue: number = 0): number
   {
      var result: number = parseNumber(source, defaultValue);
      return !isFinite(result) ? defaultValue : result;
   }
}
