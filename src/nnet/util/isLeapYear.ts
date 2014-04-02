// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = isLeapYear;
function isLeapYear(year: number): boolean
{
   return (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0));
}