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

function enhanceEvent(evt: Event, origin?: HTMLElement): EnhancedEvent
{
   var e = <EnhancedEvent>(evt || ((origin && origin.ownerDocument.parentWindow) || window).event);
   if(!e)
   {
      return null;
   }

   // make sure we're not recursively passing one of our Event instances to this constructor
   if((<any>e).isEnhanced === true)
   {
      return <EnhancedEvent>e;
   }

   (<any>e).isEnhanced = true;

   var button = (<any>e).button;
   var w3cButton = (typeof (<KeyboardEvent><any>e).which !== "undefined");
   var keycode = (<KeyboardEvent><any>e).charCode || (<KeyboardEvent><any>e).keyCode || null;
   var ucase = (keycode >= 65 && keycode <= 90);
   var lcase = (keycode >= 97 && keycode <= 122);

   // Mozilla uses the "which" property for button clicks in addition to the "button" property,
   // and they follow the W3C spec for the numbering scheme; so we use the existence
   // of the "which" property to determine if we are running Firefox and therefore
   // using the W3C model vs the Microsoft model
   e.mouseInfo =
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
   var isKeypress = e.type == "keypress";
   var isKeyUpOrDown = /keyup|keydown/.test( e.type );
   e.keyInfo =
   {
      code: keycode,
      char: (isKeypress || (isKeyUpOrDown && (keycode >= 48 && keycode <= 90))) ?
               String.fromCharCode( keycode ) :
               ((isKeyUpOrDown && (keycode >= 96 && keycode <= 105)) ?
                   String.fromCharCode( keycode - 48 ) : Key[keycode]),
      shift: ((<KeyboardEvent><any>e).shiftKey || keycode == Key.Shift),
      ctrl: ((<KeyboardEvent><any>e).ctrlKey || keycode == Key.Control),
      alt: ((<KeyboardEvent><any>e).altKey || keycode == Key.Alternate),
      meta: ((<KeyboardEvent><any>e).metaKey), // || keycode == ???),
      //If the key pressed is not an alpha character, then we cannot determine if caps lock is on so instead we set it to null.
      //If the key is uppercase without shift or lowercase with shift, then caps lock is on.
      capsLock: (!isKeypress || (!ucase && !lcase) ?
                    undefined :
                    ((ucase && !(<KeyboardEvent><any>e).shiftKey) || (lcase && (<KeyboardEvent><any>e).shiftKey) ?
                        true : false))
   };

   //The element the event originated from
   e.target = <HTMLElement>(typeof e.target == "undefined" ? e.srcElement : e.target);
   if(e.target && e.target.nodeType === Node.TEXT_NODE)
   {
      e.target = <HTMLElement>e.target.parentNode;
   }

   //the related target, ie if a mouseover it is the element the mouse came from and if a mouseout
   //it is the element the mouse has gone to
   e.relatedTarget = (typeof (<any>e).relatedTarget == "undefined") ?
                        (e.type == "mouseover" ? (<any>e).fromElement : (e.type == "mouseout" ? (<any>e).toElement : null)) :
                        (<any>e).relatedTarget;

   //pageX/Y are the values relative to the document itself
   //clientX/Y are the values relative to the viewport (browser window)
   //screenX/Y are the values relative to the entire screen (eg, if the browser window is positioned so 0,0 is at
   //the middle of a 1024x768 screen then screenX/Y will be 512/384)
   if(typeof (<any>e).pageX == "undefined" && typeof (<any>e).clientX !== "undefined")
   {
      //console.log(event.clientY, document.body.scrollTop, document.documentElement.scrollTop);
      //document.body for quirksmode, document.documentElement for strict mode
      e.pageX = (<any>e).clientX + document.body.scrollLeft +
         document.documentElement.scrollLeft;
      e.pageY = (<any>e).clientY + document.body.scrollTop +
         document.documentElement.scrollTop;
   }
   else
   {
      e.pageX = (<any>e).pageX;
      e.pageY = (<any>e).pageY;
   }

   e.clientX = (<any>e).clientX;
   e.clientY = (<any>e).clientY;
   e.screenX = (<any>e).screenX;
   e.screenY = (<any>e).screenY;

   e.isMouseEvent = function(): boolean
   {
      return /^mouse|^(?:show|contextmenu|DOMMouseScroll)$|click$/.test( this.type );
   };

   e.isKeyboardEvent = function(): boolean
   {
      return /^key/.test( this.type );
   };

   e.isTouchEvent = function(): boolean
   {
      return /^touch/.test( this.type );;
   };

   e.kill = function()
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

   return e;
}