// Copyright Malachi Griffie <malachi@nexussays.com>
//
// str Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with str
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = contains;
function contains(source: string, value: string, separator?: string, caseInsensitive: boolean=false): boolean
{
   //if case-insensitive, return a recurse of callee with lowercase arguments
   //otherwise find the passed string in str string, optionally bound by seperators
   return (
      caseInsensitive === true ?
         contains( source.toLowerCase(), value.toLowerCase(), separator, false ) :
         (
            (separator) ?
               (separator + source + separator).indexOf( separator + value + separator ) > -1 :
               source.indexOf( value ) > -1
         )
   );
   //this takes roughly twice as long when called by itself without the benefit of caching
   //the expression.
   //return (new RegExp("(?:^|\\s)" + val + "(?:\\s|$)", i ? "i" : "").test(val));
}