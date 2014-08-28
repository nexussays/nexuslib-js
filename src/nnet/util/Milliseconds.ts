// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.


export function days(num: number): number
{
   return num * hours( 24 );
}

export function hours(num: number): number
{
   return num * minutes( 60 );
}

export function minutes(num: number): number
{
   return num * seconds( 60 );
}

export function seconds(num: number): number
{
   return num * 1000;
}