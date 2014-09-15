// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=EnhancedElement
import EnhancedElement = require('./EnhancedElement'); ///ts:import:generated

export = enhanceElement;

// so we can use require in the method and break the circular dependency
declare var require;

function enhanceElement(element: Element, force?: boolean): EnhancedElement
{
   if(enhanceElement.enabled && (element && (force || element.nodeType == Node.ELEMENT_NODE)))
   {
      var E: typeof EnhancedElement = require('./EnhancedElement');
      Object.getOwnPropertyNames(E.Impl.prototype ).forEach( funcName =>
      {
         element[funcName] = E.Impl.prototype[funcName];
      } );
   }
   return <EnhancedElement>element;
}

module enhanceElement
{
   export var enabled: boolean = true;
}