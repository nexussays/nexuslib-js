// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=Keyboard
import Keyboard = require('../util/Keyboard'); ///ts:import:generated

export = IEnhancedEvent;

interface IEnhancedEvent // extends Event
{
   type: string;
   mouse: { left: boolean; right: boolean; middle: boolean };
   key: { code: Keyboard; value: string; shift: boolean; ctrl: boolean; alt: boolean; capsLock: boolean; meta: boolean };
   originalEvent: Event;
   pageX: number;
   pageY: number;
   clientX: number;
   clientY: number;
   screenX: number;
   screenY: number;
   target: HTMLElement;
   relatedTarget: HTMLElement;
   /**
    * Prevent default and stop propagation
    */
   kill(): void;
   preventDefault(): void;
   stopPropagation(): void;
   stopImmediatePropagation(): void;
   isMouseEvent(): boolean;
   isKeyboardEvent(): boolean;
   isTouchEvent(): boolean;
}