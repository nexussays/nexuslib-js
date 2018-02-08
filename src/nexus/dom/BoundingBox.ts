// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=parseNumber
import parseNumber = require('../util/parseNumber'); ///ts:import:generated

export = BoundingBox;

class BoundingBox
{
   public top: number;
   public right: number;
   public bottom: number;
   public left: number;

   constructor(top: string, right: string, bottom: string, left: string);
   constructor(top: number, right: number, bottom: number, left: number);
   constructor(top: any, right: any, bottom: any, left: any)
   {
      this.top = parseNumber( top );
      this.right = parseNumber( right );
      this.bottom = parseNumber( bottom );
      this.left = parseNumber( left );
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
