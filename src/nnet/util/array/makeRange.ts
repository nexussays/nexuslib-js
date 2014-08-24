// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = makeRange;

/**
 * not in a global range() function because Javascript has no "yield" or other means
 * to defer execution, so we actually have to generate the entire range. I think
 * a window.range() function would introduce confusion about the implementation.
 */
function makeRange(from, to, step)
{
   step = step || 1;
   var arr = [];
   while(from <= to)
   {
      arr.push( from );
      from += step;
   }
   return arr;
}