// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = last;

/**
 * Returns the last value of the array. Useful if you don't want to declare an additional variable, eg when using .split()
 */
function last(source)
{
   return source != null && source.length > 0 ? source[source.length - 1] : null;
}