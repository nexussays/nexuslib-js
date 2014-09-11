// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = isAncestor;

function isAncestor(node: Node, ancestor: Node): boolean
{
   return (node.compareDocumentPosition( ancestor ) & Node.DOCUMENT_POSITION_CONTAINED_BY) == Node.DOCUMENT_POSITION_CONTAINED_BY;
}