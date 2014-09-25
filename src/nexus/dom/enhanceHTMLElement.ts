// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

///ts:import=EnhancedHTMLElement
import EnhancedHTMLElement = require('./EnhancedHTMLElement'); ///ts:import:generated
///ts:import=enhanceElement
/// No file or directory matched name "enhanceElement" ///ts:import:generated

export = enhanceHTMLElement;

// so we can use require in the method and break the circular dependency
declare var require;

function enhanceHTMLElement(element: HTMLElement, force?: boolean): EnhancedHTMLElement
{
   //enhanceElement(element, force);
   if(enhanceHTMLElement.enabled && (element && (force || element.nodeType == Node.ELEMENT_NODE)))
   {
      var E: typeof EnhancedHTMLElement = require('./EnhancedHTMLElement');
      Object.getOwnPropertyNames(E.Impl.prototype).forEach(funcName =>
      {
         element[funcName] = E.Impl.prototype[funcName];
      } );
   }
   return <EnhancedHTMLElement>element;
}

module enhanceHTMLElement
{
   export var enabled: boolean = true;
}