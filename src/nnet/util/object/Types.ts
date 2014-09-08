// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = Types;

enum Types
{
   // ReSharper disable InconsistentNaming
   "undefined",
   "null",
   "object",
   "array",
   // ReSharper disable once UsingOfReservedWord
   "boolean",
   "node",
   "window",
   "date",
   "string",
   "function",
   "number",
   "regexp"
   // ReSharper restore InconsistentNaming
}

/* alt
var TYPES = {
    'undefined'        : 'undefined',
    'number'           : 'number',
    'boolean'          : 'boolean',
    'string'           : 'string',
    '[object Function]': 'function',
    '[object RegExp]'  : 'regexp',
    '[object Array]'   : 'array',
    '[object Date]'    : 'date',
    '[object Error]'   : 'error'
},
TOSTRING = Object.prototype.toString;

function type(o) {
    return TYPES[typeof o] || TYPES[TOSTRING.call(o)] || (o ? 'object' : 'null');
};
*/