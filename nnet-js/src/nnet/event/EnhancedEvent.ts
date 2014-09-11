// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=IEnhancedEvent
import IEnhancedEvent = require('./IEnhancedEvent'); ///ts:import:generated
///ts:import=Keyboard
import Keyboard = require('../util/Keyboard'); ///ts:import:generated

export = EnhancedEvent;

class EnhancedEvent implements IEnhancedEvent
{
   type: string = "unknown";
   mouse: { left: boolean; right: boolean; middle: boolean } = { left: undefined, right: undefined, middle: undefined };
   key: { code: Keyboard; value: string; shift: boolean; ctrl: boolean; alt: boolean; capsLock: boolean; meta: boolean } = { code: undefined, value: undefined, shift: undefined, ctrl: undefined, alt: undefined, capsLock: undefined, meta: undefined };
   originalEvent: Event;
   pageX: number = NaN;
   pageY: number = NaN;
   clientX: number = NaN;
   clientY: number = NaN;
   screenX: number = NaN;
   screenY: number = NaN;
   target: HTMLElement;
   relatedTarget: HTMLElement;

   private m_isMouseEvent: boolean;
   private m_isKeyboardEvent: boolean;
   private m_isTouchEvent: boolean;

   constructor(evt: Event)
   {
      var event = (evt || window.event);
      if(!event)
      {
         return;
      }

      // make sure we're not recursively passing one of our Event instances to this constructor
      //if(event.__extended === true)
      //{
      //   this = event;
      //   return;
      //}
      //this.__extended = true;

      this.originalEvent = event;
      this.type = event.type;

      var button = (<any>event).button;
      var w3cButton = (typeof (<KeyboardEvent>event).which !== "undefined");
      var keycode = (<KeyboardEvent>event).charCode || (<KeyboardEvent>event).keyCode || null;
      var ucase = (keycode >= 65 && keycode <= 90);
      var lcase = (keycode >= 97 && keycode <= 122);

      this.m_isMouseEvent = /^mouse|^(?:show|contextmenu|DOMMouseScroll)$|click$/.test(this.type);
      this.m_isKeyboardEvent = /^key/.test(this.type);
      this.m_isTouchEvent = /^touch/.test(this.type);

      // Mozilla uses the "which" property for button clicks in addition to the "button" property,
      // and they follow the W3C spec for the numbering scheme; so we use the existence
      // of the "which" property to determine if we are running Firefox and therefore
      // using the W3C model vs the Microsoft model
      this.mouse =
      {
         //W3C.button: 0; Microsoft.button: 1; Gecko.which: 1
         left: ((w3cButton && button === 0) || (!w3cButton && (button & 1) === 1)),
         //W3C.button: 2; Microsoft.button: 2; Gecko.which: 3
         right: ((w3cButton && button === 2) || (!w3cButton && (button & 2) === 2)),
         //W3C.button: 1; Microsoft.button: 4; Gecko.which: 2
         middle: ((w3cButton && button === 1) || (!w3cButton && (button & 4) === 4))
      };

      //up arrow: 38 | down arrow: 40 | left arrow: 37 | right arrow: 39
      //For more information, see: <http://unixpapa.com/js/key.html>
      var isKeypress = this.type == "keypress";
      var isKeyUpOrDown = /keyup|keydown/.test(this.type);
      this.key =
      {
         code: keycode,
         value: (isKeypress || (isKeyUpOrDown && (keycode >= 48 && keycode <= 90))) ?
                   String.fromCharCode( keycode ) :
                   ((isKeyUpOrDown && (keycode - 96 >= 0 && keycode - 96 <= 9)) ?
                       String.fromCharCode( keycode - 48 ) : null),
         shift: ((<KeyboardEvent>event).shiftKey || keycode == Keyboard.Shift),
         ctrl: ((<KeyboardEvent>event).ctrlKey || keycode == Keyboard.Control),
         alt: ((<KeyboardEvent>event).altKey || keycode == Keyboard.Alternate),
         meta: ((<KeyboardEvent>event).metaKey), // || keycode == ???),
         //If the key pressed is not an alpha character, then we cannot determine if caps lock is on so instead we set it to null.
         //If the key is uppercase without shift or lowercase with shift, then caps lock is on.
         capsLock: (!isKeypress || (!ucase && !lcase) ?
                       undefined :
                       ((ucase && !(<KeyboardEvent>event).shiftKey) || (lcase && (<KeyboardEvent>event).shiftKey) ?
                           true : false))
      };

      //The element the event originated from
      this.target = <HTMLElement>(typeof event.target == "undefined" ? event.srcElement : event.target);

      //the related target, ie if a mouseover it is the element the mouse came from and if a mouseout
      //it is the element the mouse has gone to
      this.relatedTarget = (typeof (<any>event).relatedTarget == "undefined") ?
                              (this.type == "mouseover" ? (<any>event).fromElement : (this.type == "mouseout" ? (<any>event).toElement : null)) :
                              (<any>event).relatedTarget;

      //pageX/Y are the values relative to the document itself
      //clientX/Y are the values relative to the viewport (browser window)
      //screenX/Y are the values relative to the entire screen (eg, if the browser window is positioned so 0,0 is at
      //the middle of a 1024x768 screen then screenX/Y will be 512/384)
      if(typeof (<any>event).pageX == "undefined" && typeof (<any>event).clientX !== "undefined")
      {
         //console.log(event.clientY, document.body.scrollTop, document.documentElement.scrollTop);
         //document.body for quirksmode, document.documentElement for strict mode
         this.pageX = (<any>event).clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
         this.pageY = (<any>event).clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
      }
      else
      {
         this.pageX = (<any>event).pageX;
         this.pageY = (<any>event).pageY;
      }
      this.clientX = (<any>event).clientX;
      this.clientY = (<any>event).clientY;
      this.screenX = (<any>event).screenX;
      this.screenY = (<any>event).screenY;
   }

   isMouseEvent(): boolean
   {
      return this.m_isMouseEvent;
   }

   isKeyboardEvent(): boolean
   {
      return this.m_isKeyboardEvent;
   }

   isTouchEvent(): boolean
   {
      return this.m_isTouchEvent;
   }

   kill(): void
   {
      this.preventDefault();
      this.stopImmediatePropagation();
      this.stopPropagation();
   }

   preventDefault(): void
   {
      if("preventDefault" in this.originalEvent)
      {
         this.originalEvent.preventDefault();
      }
      else
      {
         (<any>this.originalEvent).returnValue = false;
      }
   }

   stopPropagation(): void
   {
      if("stopPropagation" in this.originalEvent)
      {
         this.originalEvent.stopPropagation();
      }
      else
      {
         this.originalEvent.cancelBubble = true;
      }
   }

   stopImmediatePropagation(): void
   {
      if("stopImmediatePropagation" in this.originalEvent)
      {
         this.originalEvent.stopImmediatePropagation();
      }
      else
      {
         this.stopPropagation();
      }
   }
}