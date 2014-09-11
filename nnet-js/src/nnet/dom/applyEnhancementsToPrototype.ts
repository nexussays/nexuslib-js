// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=enhanceElement
import enhanceElement = require('./enhanceElement'); ///ts:import:generated
/// ts:import=enhanceHTMLElement
import enhanceHTMLElement = require('./enhanceHTMLElement'); ///ts:import:generated

export = applyEnhancementsToPrototype;

function applyEnhancementsToPrototype()
{
   if(enhanceElement.enabled)
   {
      enhanceElement( Element.prototype, true );
      enhanceElement.enabled = false;

      enhanceHTMLElement( HTMLElement.prototype, true );
      enhanceHTMLElement.enabled = false;
   }
}