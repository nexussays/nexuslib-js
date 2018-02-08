// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=join
import join = require('../../object/join'); ///ts:import:generated
///ts:import=map
import map = require('../../object/map'); ///ts:import:generated
///ts:import=generateQueryString
import generateQueryString = require('../../net/generateQueryString'); ///ts:import:generated

export = replaceQueryString;

function replaceQueryString(hash: Object): void
{
   window.location.search = generateQueryString( hash );
}
