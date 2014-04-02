// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = wrapAngleRadians;
function wrapAngleRadians(angle: number): number
{
   while(angle <= -3.141593)
   {
      angle += 6.283185;
   }
   while(angle > 3.141593)
   {
      angle -= 6.283185;
   }
   return angle;
}