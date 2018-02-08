// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = type;

enum type
{
   "undefined",
   "object",
   "array",
   "boolean",
   "node",
   "date",
   "string",
   "function",
   "number",
   "regexp"
}

module type
{
   export function of(obj: any): type
   {
      if(obj === null || obj === undefined)
      {
         return type.undefined;
      }
      var objtype = typeof obj;
      var result: type = type[objtype];
      if(objtype === "object")
      {
         result = obj instanceof Array ? type.array :
                     obj instanceof RegExp ? type.regexp :
                        "nodeType" in obj ? type.node :
                           obj instanceof Date ? type.date :
                              //highly unlikely that a string was created from the constructor, but just in case
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
