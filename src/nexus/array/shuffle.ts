// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = shuffle;

/**
 * Randomizes the values of the provided Array
 */
function shuffle(source)
{
   var i = source.length,
       j,
       temp;
   while(i)
   {
      --i;
      j = Math.floor( Math.random() * (i + 1) );
      temp = source[i];
      source[i] = source[j];
      source[j] = temp;
   }
   return source;
}