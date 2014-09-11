// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = mean;

function mean(...args: number[])
{
   for(var mean = 0,
           ln = args.length,
           x = 0; x < ln; ++x)
   {
      mean += args[x];
   }
   return mean / ln;
}