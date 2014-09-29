// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

///ts:import=EnhancedElement
import EnhancedElement = require('./EnhancedElement'); ///ts:import:generated
///ts:import=clone
import clone = require('../object/clone'); ///ts:import:generated

export = enhanceElement;

// so we can use require in the method and break the circular dependency
declare var require;

var isPrototypeEnhanced: boolean;

function enhanceElement(element: HTMLElement): EnhancedElement
{
   if(!isPrototypeEnhanced && element && (element === HTMLElement.prototype || element.nodeType === Node.ELEMENT_NODE))
   {
      var E: typeof EnhancedElement = require('./EnhancedElement');
      clone(E.Impl.prototype, element);
      if(element === HTMLElement.prototype)
      {
         isPrototypeEnhanced = true;
      }
   }
   return <EnhancedElement>element;
}