// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = clamp;

function clamp(value: number, min: number, max: number): number
{
   value = (value > max) ? max : value;
   value = (value < min) ? min : value;
   return value;
}