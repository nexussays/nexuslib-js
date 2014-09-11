﻿// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=EnhancedElement
import EnhancedElement = require('./EnhancedElement'); ///ts:import:generated

export = enhanceElement;

function enhanceElement(element: Element, force?: boolean): EnhancedElement
{
   var E: typeof EnhancedElement = require('./EnhancedElement');
   if(enhanceElement.enabled && (element && (force || element.nodeType == Node.ELEMENT_NODE)))
   {
      Object.getOwnPropertyNames(E.IEnhancedElementImpl.prototype ).forEach( funcName =>
      {
         element[funcName] = E.IEnhancedElementImpl.prototype[funcName];
      } );
   }
   return <EnhancedElement>element;
}

module enhanceElement
{
   export var enabled: boolean = true;
}