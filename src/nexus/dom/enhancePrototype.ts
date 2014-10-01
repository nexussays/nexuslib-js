// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=EnhancedElement
import EnhancedElement = require('./EnhancedElement'); ///ts:import:generated

export = enhancePrototype;

function enhancePrototype()
{
   EnhancedElement.enhance( HTMLElement.prototype );
}