﻿// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = isArrayLike;

function isArrayLike(source: any): boolean
{
   return source && (source instanceof Array || (typeof source === 'object' && isFinite( source.length )));
}
