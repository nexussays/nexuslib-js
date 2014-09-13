// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

///ts:import=EnhancedEvent
import EnhancedEvent = require('../event/EnhancedEvent'); ///ts:import:generated
///ts:import=enhanceEvent
import enhanceEvent = require('../event/enhanceEvent'); ///ts:import:generated

export = onInteractive;

var callbacks: Array<(e?: EnhancedEvent) => void> = [];
var domLoadIntervalToken;
var isDomReady: Boolean = /loaded|complete|interactive/.test(document.readyState);
// callback for document
var domReadyHandler = (e?: Event) =>
{
   if(!isDomReady && /loaded|complete|interactive/.test(document.readyState))
   {
      console.debug("DOM Ready: " + (e || document.readyState));
      isDomReady = true;

      var evt = enhanceEvent(e);

      var callback: (e?: EnhancedEvent) => void;
      while(callback = callbacks.shift())
      {
         callback(evt);
      }

      if(domLoadIntervalToken)
      {
         clearInterval( domLoadIntervalToken );
         domLoadIntervalToken = null;
      }
   }
};

// see if content is already available
if(!isDomReady)
{
   if(typeof document.addEventListener == "function")
   {
      console.debug("document.DOMContentLoaded");
      document.addEventListener("DOMContentLoaded", domReadyHandler, false);
   }
   else if(typeof document.attachEvent == "function")
   {
      console.debug( "document.onreadystatechange" );
      document.attachEvent( "onreadystatechange", domReadyHandler );
   }
   else
   {
      // fallback to polling
      domLoadIntervalToken = setInterval(domReadyHandler, 10);
   }
}
else
{
   domReadyHandler();
}

function onInteractive(callback: (e?: EnhancedEvent) => void): void
{
   if(isDomReady)
   {
      setTimeout( callback, 1 );
   }
   else
   {
      callbacks.push( callback );
   }
}