// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=IEnhancedEvent
import IEnhancedEvent = require('./IEnhancedEvent'); ///ts:import:generated

export = EnhancedEvent;

class EnhancedEvent implements IEnhancedEvent
{
   button: number;
   type: string = "unknown";
   w3cType: boolean;
   isKeypress: boolean;
   isKeyUpOrDown: boolean;
   isMouseover: boolean;
   isMouseout: boolean;
   keycode: number;
   ucase: boolean;
   lcase: boolean;
   mouse: { left: boolean; right: boolean; middle: boolean };
   key: { code: number; value: string; shift: boolean; ctrl: boolean; alt: boolean; capsLock: boolean; meta: boolean };
   originalEvent: Event;
   pageX: number = NaN;
   pageY: number = NaN;
   clientX: number = NaN;
   clientY: number = NaN;
   screenX: number = NaN;
   screenY: number = NaN;
   target: HTMLElement;
   relatedTarget: HTMLElement;

   constructor(evt: Event)
   {
      var event = (evt || window.event);
      if(!event)
      {
         return null;
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
      this.button = (<any>event).button;
      this.w3cType = (typeof (<KeyboardEvent>event).which !== "undefined");
      this.isKeypress = (this.type == "keypress");
      this.isKeyUpOrDown = /keyup|keydown/.test( this.type );
      this.isMouseover = this.type == "mouseover";
      this.isMouseout = this.type == "mouseout";
      this.keycode = (<any>event).charCode || (<any>event).keyCode || null;
      this.ucase = (this.keycode >= 65 && this.keycode <= 90);
      this.lcase = (this.keycode >= 97 && this.keycode <= 122);

      // Mozilla uses the "which" property for button clicks in addition to the "button" property,
      // and they follow the W3C spec for the numbering scheme; so we use the existence
      // of the "which" property to determine if we are running Firefox and therefore
      // using the W3C model vs the Microsoft model
      this.mouse =
      {
         //W3C.button: 0; Microsoft.button: 1; Gecko.which: 1
         left: ((this.w3cType && this.button === 0) || (!this.w3cType && (this.button & 1) === 1)),
         //W3C.button: 2; Microsoft.button: 2; Gecko.which: 3
         right: ((this.w3cType && this.button === 2) || (!this.w3cType && (this.button & 2) === 2)),
         //W3C.button: 1; Microsoft.button: 4; Gecko.which: 2
         middle: ((this.w3cType && this.button === 1) || (!this.w3cType && (this.button & 4) === 4))
      };

      //up arrow: 38 | down arrow: 40 | left arrow: 37 | right arrow: 39
      //For more information, see: <http://unixpapa.com/js/key.html>
      this.key =
      {
         code: this.keycode,
         value: (this.isKeypress || (this.isKeyUpOrDown && (this.keycode >= 48 && this.keycode <= 90))) ?
                   String.fromCharCode( this.keycode ) :
                   ((this.isKeyUpOrDown && (this.keycode - 96 >= 0 && this.keycode - 96 <= 9)) ?
                       String.fromCharCode( this.keycode - 48 ) : null),
         shift: ((<KeyboardEvent>event).shiftKey || this.keycode == 16),
         ctrl: ((<KeyboardEvent>event).ctrlKey || this.keycode == 17),
         alt: ((<KeyboardEvent>event).altKey || this.keycode == 18),
         meta: ((<KeyboardEvent>event).metaKey), // || this.keycode == ???),
         //If the key pressed is not an alpha character, then we cannot determine if caps lock is on so instead we set it to null.
         //If the key is uppercase without shift or lowercase with shift, then caps lock is on.
         capsLock: (!this.isKeypress || (!this.ucase && !this.lcase) ?
                       null :
                       ((this.ucase && !(<KeyboardEvent>event).shiftKey) || (this.lcase && (<KeyboardEvent>event).shiftKey) ?
                           true : false))
      };

      //The element the event originated from
      this.target = <HTMLElement>(typeof event.target == "undefined" ? event.srcElement : event.target);

      //the related target, ie if a mouseover it is the element the mouse came from and if a mouseout
      //it is the element the mouse has gone to
      this.relatedTarget = (typeof (<any>event).relatedTarget == "undefined") ?
                              (this.isMouseover ? (<any>event).fromElement : (this.isMouseout ? (<any>event).toElement : null)) :
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

   stop(): void
   {
      this.preventDefault();
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