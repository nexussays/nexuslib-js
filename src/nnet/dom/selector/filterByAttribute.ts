// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.


import escapeRegExp = require("nnet/util/string/escapeRegExp");

var regexCache = {};

export = filterByAttribute;
function filterByAttribute(elements, attr: string, val?: string, type?: string)
{
   var result = [],
       regex = regexCache[val] && regexCache[val][type];
   if(regex == null)
   {
      var value = "(?:" + (val ? escapeRegExp( val ) : ".*") + ")";
      switch(type)
      {
         //match string or end-line delimited   
         case "~":
            regex = new RegExp( "(?:^|\\s)" + value + "(?:\\s|$)", 'i' );
            break;
         //match beginning with   
         case "^":
            regex = new RegExp( "^" + value, 'i' );
            break;
         //match ending with   
         case "$":
            regex = new RegExp( value + "$", 'i' );
            break;
         //match anywhere   
         case "*":
            regex = new RegExp( value, 'i' );
            break;
         //exactly, or begins with followed by (U+002D)   
         case "|":
            regex = new RegExp( "^" + value + "-?", 'i' );
            break;
         //match exactly   
         default:
            regex = new RegExp( "^" + value + "$", 'i' );
            break;
      }
      regexCache[val] = regexCache[val] || {};
      regexCache[val][type] = regex;
   }

   for(var x = 0,
           ln = elements.length; x < ln; ++x)
   {
      var element = elements[x];
      //second parameter to getAttribute is an IE custom thing, see:
      //http://msdn.microsoft.com/en-us/library/ms536429.aspx
      var temp = (attr == "class" ? element.className : element.getAttribute( attr, 2 ));
      if(temp && regex.test( temp ))
      {
         result.push( element );
      }
   }

   return result;
}