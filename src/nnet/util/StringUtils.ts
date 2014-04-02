// Copyright Malachi Griffie <malachi@nexussays.com>
//
// str Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with str
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/**
 * allows easy checking of string values and also helps in the case that a string is
 * created with the String constructor (which returns typeof "object" instead of "string")
 */
String.prototype["isString"] = true;

export function trim(str: string): string
{
   if(arguments.length > 0)
   {
      var args = (Array.prototype.map.call(arguments, x => x.escapeRegExp())).join("|");
      return str.replace(new RegExp("^(?:" + args + ")+|(?:" + args + ")+$", "g"), "");
   }
   return str.replace(/^\s+|\s+$/, "");
}

export function escapeRegExp(str: string): string
{
   return str.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1");
}

export function escapeHTML(str: string): string
{
   var div = document.createElement("div");
   div.appendChild(document.createTextNode(str));
   return div.innerHTML;
}

export function unescapeHTML(str: string): string
{
   var div = document.createElement("div");
   div.innerHTML = stripTags(str);
   return div.childNodes[0] ? div.childNodes[0].nodeValue : '';
}

export function stripTags(str: string): string
{
   return str.replace(/<\/?[^>]+>/gi, '');
}

export function contains(str: string, val: string, sep, i):boolean
{
   //if case-insensitive, return a recurse of callee with lowercase arguments
   //otherwise find the passed string in str string, optionally bound by seperators
   return (
      i === true ?
      contains(str.toLowerCase(), val.toLowerCase(), sep, false) :
      (
      (sep) ?
      (sep + str + sep).indexOf(sep + val + sep) > -1 :
      str.indexOf(val) > -1
      )
      );

   //str takes roughly twice as long when called by itself without the benefit of caching
   //the expression.
   //return (new RegExp("(?:^|\\s)" + val + "(?:\\s|$)", i ? "i" : "").test(val));
}
