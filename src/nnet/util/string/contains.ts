// Copyright Malachi Griffie <malachi@nexussays.com>
//
// str Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with str
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = contains;
function contains(str: string, val: string, sep, i):boolean
{
   //if case-insensitive, return a recurse of callee with lowercase arguments
   //otherwise find the passed string in str string, optionally bound by seperators
   return (
      i === true ?
      contains(str.toLowerCase(), val.toLowerCase(), sep, false) :
      (
      (sep) ?
      (sep + str + sep).indexOf(sep + val + sep) > -1 :
      str.indexOf(val) > -1
      )
      );

   //str takes roughly twice as long when called by itself without the benefit of caching
   //the expression.
   //return (new RegExp("(?:^|\\s)" + val + "(?:\\s|$)", i ? "i" : "").test(val));
}
