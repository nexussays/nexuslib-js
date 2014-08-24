// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import type = require("nnet/util/object/type");

export = t;
/**
 * Internal short-hand for obj.type(obj, true)
 * So we can get Type integer instead of string. Makes it quicker and easier for
 * TypeScript-only code.
 */
function t(obj: any): number
{
   return type(obj, true);
}