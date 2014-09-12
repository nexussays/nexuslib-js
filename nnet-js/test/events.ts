/// <reference path="debug.d.ts" />

import nnet = require("../src/_nnet");
import applyEnhancementsToPrototype = require("../src/nnet/dom/applyEnhancementsToPrototype");
import onInteractive = require("../src/nnet/dom/onInteractive");
import find = require("../src/nnet/dom/find");

import Debug = require("debug");
import webtest = require('./webtest');
import benchmark = require("./benchmark");

//Hoist up some methods to window and set local vars for others
(<any>window).get = nnet.dom.find;

//window.HTML = nnet.html.HTML;
//Make sure HTMLElements are extended
applyEnhancementsToPrototype();

onInteractive( function()
{
   //create the dropdown menu
   webtest.createMenu( "nav", webtest.sections.Javascript.Menu );

   Debug.outputSource = find.id( "output" );
   Debug.allowMultiple = true;

   find( "input[type='checkbox']" ).forEach( function(x)
   {
      x.onclick = detectevent_click;
      (<HTMLInputElement>(<any>x)).checked = false;
      x.trigger( "click" );
   } );

   log.el = <HTMLInputElement>(<any>find.id( "log" ));
   log.clear();
   find.id( "log_clear" ).onclick = log.clear;

   var key = find.id( "keyevent" );
   key.bind( "keyup", stopEvent );
   key.bind( "keydown", stopEvent );
   key.bind( "keypress", stopEvent );

   var input = find.id( "inputevent" );
   input.bind( "click", stopEvent );
   input.bind( "mouseup", stopEvent );
   input.bind( "mousedown", stopEvent );
   input.bind( "contextmenu", stopEvent );
   input.bind( "mousemove", stopEvent );
   input.bind( "mouseout", stopEvent );
   input.bind( "mouseover", stopEvent );
   input.bind( "touchstart", stopEvent );
   input.bind( "touchend", stopEvent );
   input.bind( "touchcancel", stopEvent );
   input.bind( "touchleave", stopEvent );
   input.bind( "touchmove", stopEvent );
} );

function stopEvent(e)
{
   e.preventDefault();
}

function logEvent(e)
{
   Debug.clear();
   //output our custom information on the event
   Debug.Simple( e, ["type", "pageX", "pageY", "screenX", "screenY", "clientX", "clientY", "target", "relatedTarget", "mouse", "key", "isMouseEvent()", "isKeyboardEvent()", "isTouchEvent()"] );
   //output information on the entire event
   Debug.Event( e.originalEvent );
   //add to list of events and scroll the textbox
   log.write( e.type + " " + this + " (" + e.pageX + ", " + e.pageY + ")" );

   if("value" in this)
   {
      this.value = "";
   }
}

//aditional utility functions
function detectevent_click()
{
   var el;
   if(/^key/.test( this.id ))
   {
      el = find.id( "keyevent" );
   }
   else
   {
      el = find.id( "inputevent" );
   }

   log.write( this.id + (this.checked ? " ADDED" : " REMOVED") );
   el[this.checked ? "bind" : "unbind"]( this.id, logEvent );
}

module log
{
   export var el: HTMLInputElement;

   export function clear()
   {
      if(el)
      {
         el.value = "time   : e.type [this] (e.pageX, e.pageY)\r\n";
      }
   }

   export function write(val: any)
   {
      var time = new Date();
      if(el)
      {
         var tStr = time.getUTCMinutes() + "" + time.getUTCSeconds() + "" + time.getUTCMilliseconds();
         while(tStr.length < 7)
         {
            tStr += " ";
         }
         el.value += tStr + ": " + val + "\r\n";
         el.scrollTop = el.scrollHeight;
      }
   }
}