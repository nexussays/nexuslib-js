// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/**
 * Returns the same results as sort() called with no arguments.
 * So capital letters come before lowercase letters and numbers are sorted as alpha
 * (eg - 1243 is before 21 is before 320 is before 46, etc)
 */
export function defaultSort( a: any, b: any ): number
{
   return alphanum( a + "", b + "" );
}

/**
 * This is the default sort to use, alpha and numerics are sorted appropriately.
 * Sorting a list containing both characters and numbers will produce unexpected results
 */
export function alphanum( a: any, b: any ): number
{
   return a < b ? -1 : ( a > b ? 1 : 0 );
}

/**
 * Sort alphabetically, case-insensitive
 */
export function alphanumCaseInsensitive( a: any, b: any ): number
{
   return alphanum(
      ( ( typeof a.toLowerCase === "function" ) ? a.toLowerCase() : a ),
      ( ( typeof b.toLowerCase === "function" ) ? b.toLowerCase() : b )
   );
}

/**
 * Sort on the length property of each item. Items without a length property will be compared as equal.
 */
export function length( a: any, b: any ): number
{
   return property( "length" )( a, b );
}

/**
 * Returns a new function which sorts on the given property
 * @param prop The name of the property to compare
 * @param sortFunc The sorting function to compare with. Default is SortBy.alphanum
 */
export function property( prop: string, sortFunc?: ( a: any, b: any ) => number ): ( a: any, b: any ) => number
{
   const func = ( typeof sortFunc == "function" ? sortFunc : alphanum );
   return ( ( a, b ) =>
   {
      if( typeof a[prop] !== "undefined" && typeof b[prop] !== "undefined" )
      {
         return func( a[prop], b[prop] );
      }
      return 0;
   } );
}

/**
 * Pass in multiple sorting functions and perform a multi-depth sort.
 * @example ["bbb","c","cc","aa","z"].sort(Sort.multi(Sort.length,Sort.alphanum_i)) results in -> ["c","z","aa","CC","bbb"]
 */
export function multi( ...items: any[] ): ( a: any, b: any ) => number
{
   //var items = Array.toArray(args);
   return ( ( a, b ) =>
   {
      var result = 0;
      for( var x = 0,
         ln = items.length; x < ln && result == 0; ++x )
      {
         result = items[x]( a, b );
      }
      return result;
   } );
}
