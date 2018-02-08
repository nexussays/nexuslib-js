// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=Key
import Key = require('../util/Key'); ///ts:import:generated

export = EnhancedEvent;

interface EnhancedEvent extends Event, KeyboardEvent, MouseEvent
{
   type: string;
   isMouseEvent(): boolean;
   isKeyboardEvent(): boolean;
   isTouchEvent(): boolean;

   mouseInfo: { left: boolean; right: boolean; middle: boolean };
   keyInfo: { code: Key; char: string; shift: boolean; ctrl: boolean; alt: boolean; capsLock: boolean; meta: boolean };

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
}
