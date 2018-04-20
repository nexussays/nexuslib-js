// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/**
 * Convert (case-insensitive) "true", "t", "1", "yes", "y" to true; else false
 */
export default function parseBool( value: any ): boolean
{
   if( value == null || value === "" )
   {
      return false;
   }
   switch( ( value + "" ).toLowerCase().trim() )
   {
      case "true":
      case "t":
      case "1":
      case "yes":
      case "y":
         return true;
      default:
         return false;
   }
}
