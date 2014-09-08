// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

///ts:import=type
import type = require('../util/object/type'); ///ts:import:generated
///ts:import=Types
import Types = require('../util/object/Types'); ///ts:import:generated
///ts:import=clamp
import clamp = require('../math/clamp'); ///ts:import:generated

export = Color;

class Color
{
   static LUM_R: number = 0.212671;
   static LUM_G: number = 0.715160;
   static LUM_B: number = 0.072169;

   constructor(public red: number = 0, public green: number = 0, public blue: number = 0, public alpha: number = 255)
   {
   }

   matches(other: Color): boolean
   {
      return this.red == other.red &&
         this.green == other.green &&
         this.blue == other.blue &&
         this.alpha == other.alpha;
   }

   setSaturation(n: number): Color
   {
      if(!isNaN( n ))
      {
         this.red = clamp( this.red * ((1 - n) * Color.LUM_R + n), 0, 255 );
         this.green = clamp( this.green * ((1 - n) * Color.LUM_G + n), 0, 255 );
         this.blue = clamp( this.blue * ((1 - n) * Color.LUM_B + n), 0, 255 );
      }
      return this;
   }

   /**
    * Returns a greyscale equivalent of this color using proper colorspace.
    */
   greyscale(): Color
   {
      //section c-9
      //http://www.faqs.org/faqs/graphics/colorspace-faq/
      var y: number = Color.LUM_R * this.red + Color.LUM_G * this.green + Color.LUM_B * this.blue;

      //return new color but retain alpha from pre-greyscale version
      return new Color( y, y, y, this.alpha );
   }

   toNumber(): number
   {
      return (((this.alpha & 0xff) << 24) | ((this.red & 0xff) << 16) | ((this.green & 0xff) << 8) | (this.blue & 0xff));
   }

   toString(): string
   {
      return "(r=" + this.red + ", g=" + this.green + ", b=" + this.blue + ", a=" + this.alpha + ")";
   }

   static fromHex(color: string): Color;
   static fromHex(color: number): Color;
   static fromHex(color: any): Color
   {
      if(type( color ) != Types.number)
      {
         color = parseInt( (color + "").replace( /^\#/, "" ), 16 );
      }
      return Color.fromArgb( color );
   }

   static fromArgb(color: number): Color
   {
      var a: number = ((color >> 24) & 0xFF);
      var r: number = ((color >> 16) & 0xFF);
      var g: number = ((color >> 8) & 0xFF);
      var b: number = (color & 0xFF);
      return new Color( r, g, b, a );
   }
}