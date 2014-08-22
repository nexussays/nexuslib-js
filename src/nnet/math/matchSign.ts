// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = matchSign;
/**
 * Compares the sign value of source to compareTo and returns source or -source as appropriate
 * @param   source      The value to check the sign of and return
 * @param   compareTo   The value to compare against
 */
function matchSign(source: number, compareTo: number): number
{
   return compareTo < 0 ? (source <= 0 ? source : -source) : (source >= 0 ? source : -source);
}