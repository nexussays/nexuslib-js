// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

///ts:import=IPRNG
import IPRNG = require('./IPRNG'); ///ts:import:generated

export = NativeRandomGenerator;

/**
 * Random number generator using the built-in Math.random() function
 */
class NativeRandomGenerator implements IPRNG
{
   private m_currentState: number;

   get period(): number
   {
      return 2147483647 /*int.MAX_VALUE*/;
   }

   get currentState(): number
   {
      return this.m_currentState;
   }

   next(): number
   {
      return this.m_currentState = Math.random() * 2147483647;
   }
}
