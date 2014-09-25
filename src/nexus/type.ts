// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = type;

enum type
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

module type
{
   export function of(obj: any): type
   {
      var objtype = typeof obj;
      var result = type[objtype];
      if(objtype === "object")
      {
         result = obj === null ? type.null :
                     obj instanceof Array ? type.array :
                        obj instanceof RegExp ? type.regexp :
                           //this fails to capture the document node
                           //obj instanceof HTMLElement ? "element" :
                           "nodeType" in obj ? type.node :
                              obj === window ? type.window :
                                 obj instanceof Date ? type.date :
                                    //highly unlikely that a string was created from the constructor, so it is last
                                    obj instanceof String ? type.string :
                                       result;
      }
      else if(objtype === "function" && obj instanceof RegExp)
      {
         result = type.regexp;
      }
      return result;
   }
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

function type.of(o) {
    return TYPES[typeof o] || TYPES[TOSTRING.call(o)] || (o ? 'object' : 'null');
};
*/