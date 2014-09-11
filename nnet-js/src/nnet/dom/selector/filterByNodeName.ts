// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = filterByNodeName;

function filterByNodeName(elements, name)
{
   name = name.toLowerCase();
   var result = [];
   for(var x = 0,
           ln = elements.length; x < ln; ++x)
   {
      var el = elements[x];
      if(name == "*" || name == el.nodeName.toLowerCase())
      {
         result.push( el );
      }
   }
   return result;
}