// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = BoundingBox;

class BoundingBox
{
   constructor(
      public top: number,
      public right: number,
      public bottom: number,
      public left: number
   )
   {
   }

   public get vertical(): number
   {
      return this.top + this.bottom;
   }

   public get horizontal(): number
   {
      return this.left + this.right;
   }
}