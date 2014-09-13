// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=EnhancedEvent
import EnhancedEvent = require('./EnhancedEvent'); ///ts:import:generated
///ts:import=Key
import Key = require('../util/Key'); ///ts:import:generated

export = enhanceEvent;

function enhanceEvent(evt: Event): EnhancedEvent
{
   var event = <EnhancedEvent>(evt || window.event);
   if(!event)
   {
      return null;
   }

   // make sure we're not recursively passing one of our Event instances to this constructor
   if((<any>event).__enhanced === true)
   {
      return <EnhancedEvent>event;
   }

   (<any>event).__enhanced = true;

   var button = (<any>event).button;
   var w3cButton = (typeof (<KeyboardEvent><any>event).which !== "undefined");
   var keycode = (<KeyboardEvent><any>event).charCode || (<KeyboardEvent><any>event).keyCode || null;
   var ucase = (keycode >= 65 && keycode <= 90);
   var lcase = (keycode >= 97 && keycode <= 122);

   // Mozilla uses the "which" property for button clicks in addition to the "button" property,
   // and they follow the W3C spec for the numbering scheme; so we use the existence
   // of the "which" property to determine if we are running Firefox and therefore
   // using the W3C model vs the Microsoft model
   event.mouseInfo =
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
   var isKeypress = event.type == "keypress";
   var isKeyUpOrDown = /keyup|keydown/.test( event.type );
   event.keyInfo =
   {
      code: keycode,
      stringValue: (isKeypress || (isKeyUpOrDown && (keycode >= 48 && keycode <= 90))) ?
                String.fromCharCode( keycode ) :
                ((isKeyUpOrDown && (keycode - 96 >= 0 && keycode - 96 <= 9)) ?
                    String.fromCharCode( keycode - 48 ) : Key[keycode]),
      shift: ((<KeyboardEvent><any>event).shiftKey || keycode == Key.Shift),
      ctrl: ((<KeyboardEvent><any>event).ctrlKey || keycode == Key.Control),
      alt: ((<KeyboardEvent><any>event).altKey || keycode == Key.Alternate),
      meta: ((<KeyboardEvent><any>event).metaKey), // || keycode == ???),
      //If the key pressed is not an alpha character, then we cannot determine if caps lock is on so instead we set it to null.
      //If the key is uppercase without shift or lowercase with shift, then caps lock is on.
      capsLock: (!isKeypress || (!ucase && !lcase) ?
                    undefined :
                    ((ucase && !(<KeyboardEvent><any>event).shiftKey) || (lcase && (<KeyboardEvent><any>event).shiftKey) ?
                        true : false))
   };

   //The element the event originated from
   event.target = <HTMLElement>(typeof event.target == "undefined" ? event.srcElement : event.target);

   //the related target, ie if a mouseover it is the element the mouse came from and if a mouseout
   //it is the element the mouse has gone to
   event.relatedTarget = (typeof (<any>event).relatedTarget == "undefined") ?
                            (event.type == "mouseover" ? (<any>event).fromElement : (event.type == "mouseout" ? (<any>event).toElement : null)) :
                            (<any>event).relatedTarget;

   //pageX/Y are the values relative to the document itself
   //clientX/Y are the values relative to the viewport (browser window)
   //screenX/Y are the values relative to the entire screen (eg, if the browser window is positioned so 0,0 is at
   //the middle of a 1024x768 screen then screenX/Y will be 512/384)
   if(typeof (<any>event).pageX == "undefined" && typeof (<any>event).clientX !== "undefined")
   {
      //console.log(event.clientY, document.body.scrollTop, document.documentElement.scrollTop);
      //document.body for quirksmode, document.documentElement for strict mode
      event.pageX = (<any>event).clientX + document.body.scrollLeft +
         document.documentElement.scrollLeft;
      event.pageY = (<any>event).clientY + document.body.scrollTop +
         document.documentElement.scrollTop;
   }
   else
   {
      event.pageX = (<any>event).pageX;
      event.pageY = (<any>event).pageY;
   }

   event.clientX = (<any>event).clientX;
   event.clientY = (<any>event).clientY;
   event.screenX = (<any>event).screenX;
   event.screenY = (<any>event).screenY;

   event.isMouseEvent = function(): boolean
   {
      return /^mouse|^(?:show|contextmenu|DOMMouseScroll)$|click$/.test( this.type );
   };

   event.isKeyboardEvent = function(): boolean
   {
      return /^key/.test( this.type );
   };

   event.isTouchEvent = function(): boolean
   {
      return /^touch/.test( this.type );;
   };

   event.kill = function()
   {
      if("preventDefault" in this)
      {
         this.preventDefault();
      }
      else
      {
         this.returnValue = false;
      }

      if("stopPropagation" in this)
      {
         this.stopPropagation();
      }
      else
      {
         this.cancelBubble = true;
      }

      if("stopImmediatePropagation" in this)
      {
         this.stopImmediatePropagation();
      }
   };

   return event;
}