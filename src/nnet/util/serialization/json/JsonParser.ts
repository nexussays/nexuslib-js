// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import _t = require("nnet/util/obj/t");
import Types = require("nnet/util/obj/Types");

/**
 * Signature => public static function encode(object:Object):String
 * @private
 */
export var encode: (object: any) => string;

/**
 * Signature => public static function decode(json:String):Object
 * @private
 */
export var decode: (json: string) => any;

// determine if we can use the native JSON parser
if(JSON && JSON.stringify && typeof JSON.stringify === "function")
{
   encode = JSON.stringify;
   decode = JSON.parse;
   console.log("Using native JSON");
}
else
{
   //TODO: This needs to not be doing eval, then again, it's only for IE < 8
   encode = (value: string) =>
   {
      try
      {
         return eval("(" + value + ")");
      }
      catch(ex)
      {
         ex.name = "evalJSON() ERROR";
         throw ex;
      }
   };
   decode = (value: any) =>
   {
      function recurse(x, isArray:boolean=false)
      {
         var ret = "",
            property,
            val,
            type,
            result;
         for(property in x)
         {
            val = x[property], type = _t(val);
            if(type != Types.function && isArray !== true)
            {
               ret += "\"" + property + "\":";
            }

            result = getValue(val, type);
            ret += result ? result + "," : "";
         }
         //remove that last comma
         return ret.replace(/,$/, "");
      }

      function getValue(val, type:number):string
      {
         switch(type)
         {
            case Types.number:
            case Types.boolean:
            case Types.null:
            case Types.undefined:
               return val + "";
            case Types.object:
               return "{" + recurse(val) + "}";
            case Types.array:
               return "[" + recurse(val, true) + "]";
            case Types.function:
               return "";
            case Types.date:
               return "Date(" + val.getTime() + ")";
            default:
               val += "";
               //escape any escape characters, then escape any quotes
               return "\"" + val.replace(/\\/g, "\\\\").replace(/[\r\n]/g, "\\n").replace(/"/g, "\\\"") + "\"";
         }
      }

      return getValue(value, _t(value));
   };
   console.log("Using NNet JSON");
}

//interface Date
//{
//   toJSON: (string) => any;
//}
/**
 * Override the toJSON method for Date to return the milliseconds since epoch
 */
//Date.prototype.toJSON = (key) =>
//{
//   return this.getTime();
//}