
/**
 * Wraps native events and provides additional information
 */
export = Event;
class Event
{
   mouse = {};
   key = {};
   type : string = "unknown";
   e : any;
   pageX : number = NaN;
   pageY : number = NaN;
   clientX : number = NaN;
   clientY : number = NaN;
   screenX : number = NaN;
   screenY : number = NaN;
   target : HTMLElement;
   relatedTarget : HTMLElement;

   //private __extended;

   constructor(evt)
   {
      this.e = evt || window.event;
      if(!this.e)
      {
         return;
      }

      // make sure we're not recursively passing one of our Event instances to this constructor
      //if(this.e.__extended === true)
      //{
      //   this = this.e;
      //   return;
      //}

      //this.__extended = true;

      this.type = this.e.type;

      var button = this.e.button,
         w3cType = (typeof this.e.which !== "undefined"),
         isKeypress = (this.type == "keypress"),
         isKeyUpOrDown = (this.type == "keyup" || this.type == "keydown"),
         isMouseover = (this.type == "mouseover"),
         isMouseout = (this.type == "mouseout"),
         keycode = this.e.charCode || this.e.keyCode || null,
         ucase = (keycode >= 65 && keycode <= 90),
         lcase = (keycode >= 97 && keycode <= 122);

      // Mozilla uses the "which" property for button clicks in addition to the "button" property,
      // and they follow the W3C spec for the numbering scheme; so we use the existence
      // of the "which" property to determine if we are running Firefox and therefore
      // using the W3C model vs the Microsoft model
      this.mouse =
      {
         //W3C.button: 0; Microsoft.button: 1; Gecko.which: 1
         left: ((w3cType && button === 0) || (!w3cType && (button & 1) === 1)),
         //W3C.button: 2; Microsoft.button: 2; Gecko.which: 3
         right: ((w3cType && button === 2) || (!w3cType && (button & 2) === 2)),
         //W3C.button: 1; Microsoft.button: 4; Gecko.which: 2
         middle: ((w3cType && button === 1) || (!w3cType && (button & 4) === 4))
      };

      //up arrow: 38 | down arrow: 40 | left arrow: 37 | right arrow: 39
      //For more information, see: <http://unixpapa.com/js/key.html>
      this.key =
      {
         code: keycode,
         value: (isKeypress || (isKeyUpOrDown && (keycode >= 48 && keycode <= 90))) ?
            String.fromCharCode(keycode) :
            ((isKeyUpOrDown && (keycode - 96 >= 0 && keycode - 96 <= 9)) ?
               String.fromCharCode(keycode - 48) : null),
         shift: (this.e.shiftKey || keycode == 16),
         ctrl: (this.e.ctrlKey || keycode == 17),
         alt: (this.e.altKey || keycode == 18),
         //If the key pressed is not an alpha character, then we cannot determine if caps lock is on so instead we set it to null.
         //If the key is uppercase without shift or lowercase with shift, then caps lock is on.
         capsLock: (!isKeypress || (!ucase && !lcase) ?
            null :
            ((ucase && !this.e.shiftKey) || (lcase && this.e.shiftKey) ?
               true : false))
      };

      //The element the event originated from
      this.target = typeof this.e.target == "undefined" ? this.e.srcElement : this.e.target;

      //the related target, ie if a mouseover it is the element the mouse came from and if a mouseout
      //it is the element the mouse has gone to
      this.relatedTarget = (typeof this.e.relatedTarget == "undefined") ?
         (isMouseover ? this.e.fromElement : ( isMouseout ? this.e.toElement : null )) :
         this.e.relatedTarget;

      //pageX/Y are the values relative to the document itself
      //clientX/Y are the values relative to the viewport (browser window)
      //screenX/Y are the values relative to the entire screen (eg, if the browser window is positioned so 0,0 is at
      //the middle of a 1024x768 screen then screenX/Y will be 512/384)
      if(typeof this.e.pageX == "undefined" && typeof this.e.clientX !== "undefined")
      {
         //console.log(this.e.clientY, document.body.scrollTop, document.documentElement.scrollTop);
         //document.body for quirksmode, document.documentElement for strict mode
         this.pageX = this.e.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
         this.pageY = this.e.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
      }
      else
      {
         this.pageX = this.e.pageX;
         this.pageY = this.e.pageY;
      }
      this.clientX = this.e.clientX;
      this.clientY = this.e.clientY;
      this.screenX = this.e.screenX;
      this.screenY = this.e.screenY;
   }

   stop()
   {
      this.preventDefault();
      this.stopPropagation();
   }

   preventDefault()
   {
      if("preventDefault" in this.e)
      {
         this.e.preventDefault();
      }
      else
      {
         this.e.returnValue = false;
      }
   }

   stopPropagation()
   {
      if("stopPropagation" in this.e)
      {
         this.e.stopPropagation();
      }
      else
      {
         this.e.cancelBubble = true;
      }
   }
}
module Event 
{
   //Space: 32 | Enter: 13 | Tab: 9 | Backspace: 8 | Shift: 16 | Control: 17 | Alt: 18 | Esc: 27 | Delete: 46
   export enum Keys
   {
      "Backspace" = 8,
      "Tab" = 9,
      "Enter" = 13,
      "Shift" = 16,
      "Control" = 17,
      "Alt" = 18,
      "Escape" = 27,
      "Space" = 32,
      "Delete" = 46
   }
}