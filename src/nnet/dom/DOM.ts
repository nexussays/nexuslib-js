// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import _t = require("nnet/util/object/t");
import Types = require("nnet/util/object/Types");

export function type(el)
{
   if(el != null && _t( el ) === Types.node)
   {
      //IE does not define window.Node, so use magic numbers instead
      switch(el.nodeType)
      {
         //Node.ELEMENT_NODE == 1
         case 1:
            return "element";
         //Node.ATTRIBUTE_NODE == 2
         //Node.TEXT_NODE == 3
         //does an extra check to see if the textnode contains any characters other than whitespace
         case 3:
            return /\S/.test( el.nodeValue ) ? "text" : "whitespace";
         //Node.CDATA_SECTION_NODE == 4
         //Node.ENTITY_REFERENCE_NODE == 5
         //Node.ENTITY_NODE == 6
         //Node.PROCESSING_INSTRUCTION_NODE == 7
         //Node.COMMENT_NODE == 8
         case 8:
            return "comment";
         //Node.DOCUMENT_NODE == 9
         case 9:
            return "document";
         //Node.DOCUMENT_TYPE_NODE == 10
         //Node.DOCUMENT_FRAGMENT_NODE == 11
         //Node.NOTATION_NODE == 12
         default:
            return "other";
      }
   }
   //TODO: Need to determine an actual return type here
   return "null";
}