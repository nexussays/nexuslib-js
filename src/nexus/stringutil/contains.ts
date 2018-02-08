// Copyright M Griffie <nexus@nexussays.com>
//
// str Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with str
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = contains;

/**
 * @param boundary Provide a word boundary if desired, else the provided character will be found anywhere in the source string, even in the middle of a word.
 */
function contains(source: string, value: string, boundary?: string, caseInsensitive: boolean=false): boolean
{
   //if case-insensitive, return a recurse of callee with lowercase arguments
   //otherwise find the passed string in str string, optionally bound by seperators
   return (
      caseInsensitive === true ?
         contains( source.toLowerCase(), value.toLowerCase(), boundary, false ) :
         (
            (boundary) ?
               (boundary + source + boundary).indexOf( boundary + value + boundary ) > -1 :
               source.indexOf( value ) > -1
         )
   );
   //this takes roughly twice as long when called by itself without the benefit of caching
   //the expression.
   //return (new RegExp("(?:^|\\s)" + val + "(?:\\s|$)", i ? "i" : "").test(val));
}
