// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = ObjectUtils;
class ObjectUtils
{
   static keys(obj)
   {
      var arr = [];
      for(var prop in obj)
      {
         arr.push(prop);
      }
      return arr;
   }

   static map(obj, keyFunc, valFunc)
   {
      var newObj = {};
      for(var x in obj)
      {
         newObj[(keyFunc ? keyFunc(x) : x)] = (valFunc ? valFunc(obj[x]) : obj[x]);
      }
      return newObj;
   }

   static join(obj, join)
   {
      var result = [];
      join = join || "";
      for(var x in obj)
      {
         result.push(x + join + obj[x]);
      }
      return result;
   }
}