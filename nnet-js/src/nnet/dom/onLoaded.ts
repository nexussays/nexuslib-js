// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

///ts:import=enhanceEvent
import enhanceEvent = require('../event/enhanceEvent'); ///ts:import:generated
///ts:import=EnhancedEvent
import EnhancedEvent = require('../event/EnhancedEvent'); ///ts:import:generated

export = onLoaded;
function onLoaded(callback: (e?: EnhancedEvent) => void): void
{
   if(isContentLoaded)
   {
      setTimeout( callback, 1 );
   }
   else
   {
      callbacks.push( callback );
   }
}

var callbacks: Array<(e?: EnhancedEvent) => void> = [];
var isContentLoaded: Boolean = false;
// callback for window
var windowReadyHandler = (e?: Event) =>
{
   if(!isContentLoaded)
   {
      console.debug( "Window Ready: " + (e || document.readyState) );
      isContentLoaded = true;

      var evt = enhanceEvent( e );

      var callback: (e?: EnhancedEvent) => void;
      while(callback = callbacks.shift())
      {
         callback(evt);
      }
   }
};


// see if content is already available
if(document.readyState != "complete")
{
   if(typeof window.addEventListener == "function")
   {
      console.debug( "window.addEventListener" );
      window.addEventListener( "load", windowReadyHandler, false );
   }
   else if(typeof window.attachEvent == "function")
   {
      console.debug( "window.attachEvent" );
      window.attachEvent( "onload", windowReadyHandler );
   }

   // fallback to old-style window.onload
   var existingWindowLoad = window.onload;
   window.onload = (e: Event) =>
   {
      console.debug( "window.onload" );
      if(existingWindowLoad)
      {
         existingWindowLoad( e );
      }
      windowReadyHandler( e );
   };
}
else
{
   windowReadyHandler();
}