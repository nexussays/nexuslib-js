// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

///ts:import=EnhancedHTMLElement
/// No file or directory matched name "EnhancedHTMLElement" ///ts:import:generated
///ts:import=IEnhancedHTMLElement
import IEnhancedHTMLElement = require('./IEnhancedHTMLElement'); ///ts:import:generated
///ts:import=enhanceElement
import enhanceElement = require('./enhanceElement'); ///ts:import:generated

export = enhanceHTMLElement;

function enhanceHTMLElement(element: HTMLElement, force?: boolean): IEnhancedHTMLElement
{
   enhanceElement( element, force );
   if(enhanceHTMLElement.enabled && (element && (force || element.nodeType == Node.ELEMENT_NODE)))
   {
      Object.getOwnPropertyNames(EnhancedHTMLElement.prototype).forEach(funcName =>
      {
         element[funcName] = EnhancedHTMLElement.prototype[funcName];
      } );
   }
   return <IEnhancedHTMLElement>element;
}

module enhanceHTMLElement
{
   export var enabled: boolean = true;
}