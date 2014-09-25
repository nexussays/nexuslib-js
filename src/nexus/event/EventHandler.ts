﻿// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=EnhancedEvent
import EnhancedEvent = require('./EnhancedEvent'); ///ts:import:generated
///ts:import=EnhancedHTMLElement
import EnhancedHTMLElement = require('../dom/EnhancedHTMLElement'); ///ts:import:generated

export = EventHandler;

interface EventHandler
{
   (e: EnhancedEvent, context: EnhancedHTMLElement): void;
}