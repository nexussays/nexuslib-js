// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

///ts:import=IEnhancedEvent
import IEnhancedEvent = require('../event/IEnhancedEvent'); ///ts:import:generated

export = IEnhancedElement;

interface IEnhancedElement extends HTMLElement
{
   getAncestor(tagName: string): Node;
   isAncestor(ancestor: Node): boolean;
   getOuterHTML(escapeHtml: boolean): string;
   addClass(name: string, checkExistence: boolean): boolean;
   removeClass(name: string): boolean;
   toggleClass(name: string);
   hasClass(name: string): boolean;
   append(...params: Array<Array<any>>): IEnhancedElement;
   append(...params: Array<Node>): IEnhancedElement;
   append(...params: Array<Object>): IEnhancedElement;
   append(...params: Array<any>): IEnhancedElement;
   bind(eventName: string, func: (e: IEnhancedEvent) => void);
   unbind(event: string, func: (e: IEnhancedEvent) => void);
}