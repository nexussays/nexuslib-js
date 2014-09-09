// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = IEnhancedEvent;
interface IEnhancedEvent// extends Event
{
   button: number;
   type: string;
   w3cType: boolean;
   isKeypress: boolean;
   isKeyUpOrDown: boolean;
   isMouseover: boolean;
   isMouseout: boolean;
   keycode: number;
   ucase: boolean;
   lcase: boolean;
   mouse: { left: boolean; right: boolean; middle: boolean };
   key: { code: number; value: string; shift: boolean; ctrl: boolean; alt: boolean; capsLock: boolean; meta:boolean };
   originalEvent: Event;
   pageX: number;
   pageY: number;
   clientX: number;
   clientY: number;
   screenX: number;
   screenY: number;
   target: HTMLElement;
   relatedTarget: HTMLElement;
   stop(): void;
   preventDefault(): void;
   stopPropagation(): void;
   stopImmediatePropagation(): void;
}