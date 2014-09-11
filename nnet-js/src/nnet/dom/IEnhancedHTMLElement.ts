// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

///ts:import=EnhancedHTMLElement
import EnhancedHTMLElement = require('./EnhancedHTMLElement'); ///ts:import:generated

export = IEnhancedHTMLElement;

// combines EnhancedHTMLElement.IHTMLElementEnhancements which has our enhanced methods with HTMLElement so we 
// can still access all the native element properties
interface IEnhancedHTMLElement extends HTMLElement, EnhancedHTMLElement
{
   
}