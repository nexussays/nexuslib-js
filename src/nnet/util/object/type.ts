// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

///ts:import=Types
import Types = require('./Types'); ///ts:import:generated

export = type;

function type(obj: any): Types
{
   var objtype = typeof obj;
   var result = type[objtype];
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
   return result;
}