// Copyright M Griffie <nexus@nexussays.com>
//
// str Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with str
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = charTimes;

/**
 * Returns the given character the given number of times
 */
function charTimes(char: string, times:number):string
{
   if(char == null || char == "" || times == null)
   {
      return "";
   }

   var result = "";
   for(var x = 0; x < times; ++x)
   {
      result += char;
   }
   return result;
} 
