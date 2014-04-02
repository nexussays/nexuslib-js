// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export function type(obj:any, useInt:boolean=false):any
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
export function t(obj: any): number
{
   return type(obj, true);
}

// ReSharper disable InconsistentNaming
export enum Types
{
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
}
// ReSharper restore InconsistentNaming

export function keys(obj: any)
{
   var arr = [];
   for(var prop in obj)
   {
      arr.push(prop);
   }
   return arr;
}

export function map(obj, keyFunc: (string) => any, valFunc: (any) => any)
{
   var newObj = {};
   for(var x in obj)
   {
      newObj[(keyFunc ? keyFunc(x) : x)] = (valFunc ? valFunc(obj[x]) : obj[x]);
   }
   return newObj;
}

export function forEach(obj, func: (key: any, value: any, obj?) => any): void
{
   for(var x in obj)
   {
      func.call(obj, x, obj[x], obj);
   }
}

export function join(obj: any, join)
{
   var result = [];
   join = join || "";
   for(var x in obj)
   {
      result.push(x + join + obj[x]);
   }
   return result;
}
