define([], function(){

//
// 
//
var Event = function(evt)
{
   var e = evt || window.event;
   //don't redo everything on redundant calls
   if(e && e.__extended !== true)
   {
      e.__extended = true;

      var button = e.button,
         w3cType = (typeof e.which !== "undefined"),
         isKeypress = (e.type == "keypress"),
         isKeyUpOrDown = (e.type == "keyup" || e.type == "keydown"),
         isMouseover = (e.type == "mouseover"),
         isMouseout = (e.type == "mouseout"),
         keycode = e.charCode || e.keyCode || null,
         ucase = (keycode >= 65 && keycode <= 90),
         lcase = (keycode >= 97 && keycode <= 122);

      // Mozilla uses the "which" property for button clicks in addition to the "button" property,
      // and they follow the W3C spec for the numbering scheme; so we use the existence
      // of the "which" property to determine if we are running Firefox and therefore
      // using the W3C model vs the Microsoft model
      e.mouse =
      {
         //W3C.button: 0; Microsoft.button: 1; Gecko.which: 1
         left: ((w3cType && button === 0) || (!w3cType && (button & 1) === 1)),
         //W3C.button: 2; Microsoft.button: 2; Gecko.which: 3
         right: ((w3cType && button === 2) || (!w3cType && (button & 2) === 2)),
         //W3C.button: 1; Microsoft.button: 4; Gecko.which: 2
         middle: ((w3cType && button === 1) || (!w3cType && (button & 4) === 4))
      };

      //Space: 32 | Enter: 13 | Tab: 9 | Backspace: 8 | Shift: 16 | Control: 17 | Alt: 18 | Esc: 27 | Delete: 46
      //up arrow: 38 | down arrow: 40 | left arrow: 37 | right arrow: 39
      //For more information, see: <http://unixpapa.com/js/key.html>
      e.key =
      {
         code: keycode,
         value: (isKeypress || (isKeyUpOrDown && (keycode >= 48 && keycode <= 90))) ?
            String.fromCharCode(keycode) :
            ((isKeyUpOrDown && (keycode - 96 >= 0 && keycode - 96 <= 9)) ?
               String.fromCharCode(keycode - 48) : null),
         shift: (e.shiftKey || keycode == 16),
         ctrl: (e.ctrlKey || keycode == 17),
         alt: (e.altKey || keycode == 18),
         //If the key pressed is not an alpha character, then we cannot determine if caps lock is on so instead we set it to null.
         //If the key is uppercase without shift or lowercase with shift, then caps lock is on.
         capsLock: (!isKeypress || (!ucase && !lcase) ? null : ((ucase && !e.shiftKey) || (lcase && e.shiftKey) ? true : false))
      };

      //The element the event originated from
      if(typeof e.target == "undefined")
      {
         e.target = e.srcElement;
      }
      //the related target, ie if a mouseover it is the element the mouse came from and if a mouseout
      //it is the element the mouse has gone to
      if(typeof e.relatedTarget == "undefined")
      {
         e.relatedTarget = (isMouseover ? e.fromElement : ( isMouseout ? e.toElement : null ));
      }

      //pageX/Y are the values relative to the document itself
      //clientX/Y are the values relative to the viewport (browser window)
      //screenX/Y are the values relative to the entire screen (eg, if the browser window is positioned so 0,0 is at
      //the middle of a 1024x768 screen then screenX/Y will be 512/384)
      if(typeof e.pageX == "undefined" && typeof e.clientX !== "undefined")
      {
         //console.log(e.clientY, document.body.scrollTop, document.documentElement.scrollTop);
         //document.body for quirksmode, document.documentElement for strict mode
         e.pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
         e.pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }

      if(!("preventDefault" in e))
      {
         e.preventDefault = function()
         {
            this.returnValue = false;
         };
      }

      if(!("stopPropagation" in e))
      {
         e.stopPropagation = function()
         {
            this.cancelBubble = true;
         };
      }

      e.stop = function()
      {
         this.preventDefault();
         this.stopPropagation();
      };
   }
   return e;
};

Event.keys = 
{
   "BACKSPACE" : 8,
   "TAB" : 9,
   "ENTER" : 13,
   "SHIFT" : 16,
   "CTRL" : 17,
   "ALT" : 18,
   "ESC" : 27,
   "SPACE" : 32,
   "DELETE" : 46
};

return Event;

}); // define