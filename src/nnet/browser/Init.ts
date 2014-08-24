// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import Element = require("nnet/dom/ElementUtils");
import NNetEvent = require("nnet/event/NNetEvent");

export function dom(func: (e?: NNetEvent) => void): void
{
   if(!isDomLoaded)
   {
      this.documentLoad.push(func);
   }
   else
   {
      setTimeout(func, 1);
   }
}

export function content(func: (e?: NNetEvent) => void): void
{
   if(!isContentLoaded)
   {
      windowLoad.push(func);
   }
   else
   {
      setTimeout(func, 1);
   }
}

/**
 * preload should only be used for NNet library functions
 */
//var documentPreload: Array<(e?: NNetEvent) => void> = [];
var documentLoad: Array<(e?: NNetEvent) => void> = [];
var windowLoad: Array<(e?: NNetEvent) => void> = [];
//export var windowUnload: Array<(e?: NNetEvent) => void> = [];
var domLoadCheck;
var isContentLoaded: boolean = false;
var isDomLoaded: boolean = false;

// callback for window
var windowReadyHandler = (e?: Event) =>
{
   if(!isContentLoaded)
   {
      // fallback for dom ready just in case other methods fail
      domReadyHandler(e);

      console.debug("Window Ready: " + (e || document.readyState));
      isContentLoaded = true;

      var evt: NNetEvent = null;
      if(e)
      {
         evt = new NNetEvent(e);
      }

      windowLoad.forEach((func) =>
      {
         func(evt);
      });

      windowLoad = [];
   }
};

// callback for document
var domReadyHandler = (e?: Event) =>
{
   if(!isDomLoaded)
   {
      var state = "readyState" in document ? document.readyState : null;
      if(e != null &&
         (e.type == "onreadystatechange" || e.type == "readystatechange") &&
         state != "loaded" && state != "interactive" && state != "complete")
      {
         return;
      }

      console.debug("DOM Ready: " + (e || state));
      isDomLoaded = true;

      var evt: NNetEvent = null;
      if(e)
      {
         evt = new NNetEvent(e);
      }

      //documentPreload.forEach((func) =>
      //{
      //   func(evt);
      //});
      documentLoad.forEach((func) =>
      {
         func(evt);
      });

      clearInterval(domLoadCheck);

      documentLoad = [];
      //documentPreload = [];
      domLoadCheck = null;

      //if(state == "complete")
      //{
         //windowReadyHandler(e);
      //}
   }
};


// see if content is already available
if("readyState" in document && document.readyState == "complete")
{
   domReadyHandler();
   windowReadyHandler();
}
else
{
   //
   // window
   //

   if(typeof window.addEventListener == "function")
   {
      console.debug("window.addEventListener");
      window.addEventListener("load", windowReadyHandler, false);
   }
   else if(typeof window.attachEvent == "function")
   {
      console.debug("window.attachEvent");
      window.attachEvent("onload", windowReadyHandler);
   }

   // fallback to old-style window.onload
   var existingWindowLoad = window.onload;
   window.onload = (e: Event) =>
   {
      console.debug("window.onload");
      if(existingWindowLoad)
      {
         existingWindowLoad(e);
      }
      windowReadyHandler(e);
   }

   //
   // document
   //

   if(typeof document.addEventListener == "function")
   {
      console.debug("document.DOMContentLoaded");
      document.addEventListener("DOMContentLoaded", domReadyHandler, false);
   }
   else if(typeof document.attachEvent == "function")
   {
      console.debug("document.onreadystatechange");
      document.attachEvent("onreadystatechange", domReadyHandler);
   }

   // fallback to interval check for readyState
   domLoadCheck = setInterval(domReadyHandler, 10);

   /*
   else if("readyState" in document && Browser.isIE)
   {
      //alertall("ie path");
      document.write("<script type=\"text/javascript\" " +
         "defer=\"defer\" " +
         "src=\"" + ((window.location.protocol == "https:") ? "://0" : "javascript:void(0)") + "\" " +
         "onreadystatechange=\"if(this.readyState == 'complete') document.onload();\">" +
         "</script>");
   }
   //*/
}