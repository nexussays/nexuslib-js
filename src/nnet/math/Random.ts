// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import IPRNG = require("./IPRNG");
///ts:import=NativeRandomGenerator
import NativeRandomGenerator = require('./NativeRandomGenerator'); ///ts:import:generated

export = Random;

/**
 * Given a random number generator, this class provides convenience methods for
 * random number generation and other random operations.
 */
class Random
{
   private static __random: Random = new Random( new NativeRandomGenerator() );

   static get instance(): Random
   {
      return Random.__random;
   }

   constructor(public generator: IPRNG)
   {
   }

   /**
    * Generates a random floating point in the range [min, max) which is [0, 1) if neither
    * argument is given.
    *
    * If max is NaN, Infinity, or -Infinity, a number in the range [min, 1) is returned
    * If min is NaN, Infinity, or -Infinity, a number in the range [0, max) is returned
    * @param	min		The lowest value to return, inclusive
    * @param	max		The highest value to return, exclusive
    * @return A number in the range [min, max)
    */
   float(min: number = 0, max: number = 1): number
   {
      min = isNaN( min ) || !isFinite( min ) ? 0 : min;
      max = isNaN( max ) || !isFinite( max ) ? 1 : max;
      var p: number = this.generator.next() / this.generator.period;
      return (p * (max - min)) + min;
   }

   /**
    * Generates a random integer in the range [min, max)
    * @param	min		The lowest value to return, inclusive
    * @param	max		The highest value to return, exclusive
    * @return An int in the range [min, max)
    */
   integer(min: number = 0, max: number = Number.MAX_VALUE): number
   {
      return this.generator.next() % (max - min) + min;
   }

   /**
    * Generates a random unsigned integer in the range [min, max)
    * @param	min		The lowest value to return, inclusive
    * @param	max		The highest value to return, exclusive
    * @return A number in the range [min, max)
    */
   unsignedInteger(min: number = 0, max: number = Number.MAX_VALUE): number
   {
      return this.generator.next() % (max - min) + min;
   }

   /**
    * Returns a random true/false value, with a 50% chance of either
    */
   boolean(): boolean
   {
      return (this.generator.next() / this.generator.period) < 0.5;
   }

   /**
    * Given a floating-point value, return either the value's floor or its ceiling
    * chosen randomly according to whether the value is closer to the floor or
    * the ceiling.
    * @example <code>randomRound(4.3)</code> should return 4 70% of the time
    * and 5 30% of the time.
    */
   weightedRound(value: number): number
   {
      var floor: number = Math.floor( value );
      return (this.generator.next() / this.generator.period) > (value - floor) ? floor : floor + 1;
   }

   /**
    * Returns one of the items passed in at random.
    * @param items A vararg list of objects to choose from. If a single argument is passed, it
    * is assumed to be a Vector or Array (or otherwise have a <code>length</code> property and
    * be able to be accessed with the index operators).
    */
   choice(...items): any
   {
      var choice: number;
      if(items.length == 1)
      {
         choice = this.integer( 0, items[0].length - 1 );
         return items[0][choice];
      }
      else
      {
         choice = this.integer( 0, items.length - 1 );
         return items[choice];
      }
   }

   toString(): string
   {
      return "[Random" + this.generator + "]";
   }
}