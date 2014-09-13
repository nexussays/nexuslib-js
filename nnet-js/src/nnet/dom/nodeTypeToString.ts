// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=type
import type = require('../type'); ///ts:import:generated

export = nodeTypeToString;

function nodeTypeToString(el: Node): string
{
   if(el != null && type.of( el ) === type.node)
   {
      //IE does not define window.Node, so use magic numbers instead
      switch(el.nodeType)
      {
         //Node.ELEMENT_NODE == 1
         case Node.ELEMENT_NODE:
            return "element";
         //Node.ATTRIBUTE_NODE == 2
         case Node.ATTRIBUTE_NODE:
            return "attribute";
         //Node.TEXT_NODE == 3
         case Node.TEXT_NODE:
            return "text";
         //Node.CDATA_SECTION_NODE == 4
         case Node.CDATA_SECTION_NODE:
            return "cdata";
         //Node.ENTITY_REFERENCE_NODE == 5
         //Node.ENTITY_NODE == 6
         case Node.ENTITY_NODE:
            return "entity";
         //Node.PROCESSING_INSTRUCTION_NODE == 7
         //Node.COMMENT_NODE == 8
         case Node.COMMENT_NODE:
            return "comment";
         //Node.DOCUMENT_NODE == 9
         case Node.DOCUMENT_NODE:
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