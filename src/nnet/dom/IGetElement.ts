// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = IGetElement;

interface IGetElement
{
   (query: Node): Array<Element>;
   (query: Element): Array<Element>;
   (query: string): Array<Element>;
   (query?: any): Array<Element>;

   id(id: Node): Element;
   id(id: string): Element;
   id(id: any): Element;

   name(name: string, tag?: string): Array<Element>;

   className(name: string, tag?: string): Array<Element>;

   tagName(name: string): Array<Element>;
}