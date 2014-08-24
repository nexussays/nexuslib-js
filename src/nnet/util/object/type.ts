// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import Types = require("nnet/util/object/Types");

export = type;

function type(obj: any, useInt: boolean= false): any //string|number
{
   var objtype = typeof obj;
   var result = Types[objtype];
   if(objtype === "object")
   {
      result = obj === null ? Types.null :
                  obj instanceof Array ? Types.array :
                     //this fails to capture the document node
                     //obj instanceof HTMLElement ? "element" :
                     "nodeType" in obj ? Types.node :
                        obj === window ? Types.window :
                           obj instanceof Date ? Types.date :
                              //highly unlikely that a string was created from the constructor, so it is last
                              obj instanceof String ? Types.string :
                                 result;
   }
   else if(objtype === "function" && obj instanceof RegExp)
   {
      result = Types.regexp;
   }
   return useInt ? result : Types[result];
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