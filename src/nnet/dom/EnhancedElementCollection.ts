// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=IEnhancedElement
import IEnhancedElement = require('./IEnhancedElement'); ///ts:import:generated

export = EnhancedElementCollection;

class EnhancedElementCollection// implements IEnhancedElement
{
   private m_array: Array<IEnhancedElement>;

   constructor(sourceArray: Array<IEnhancedElement>)
   {
      this.m_array = sourceArray;
   }

   get array(): Array<IEnhancedElement>
   {
      return this.m_array;
   }
}