// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = wrapAngleDegrees;

function wrapAngleDegrees(angle: number): number
{
   while(angle <= -180)
   {
      angle += 360;
   }
   while(angle > 180)
   {
      angle -= 360;
   }
   return angle;
}
