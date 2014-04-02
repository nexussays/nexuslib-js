// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import Browser = require("nnet/browser/BrowserUtils");
import FunctionUtils = require("nnet/util/FunctionUtils");
import Element = require("nnet/dom/Element");
import NNetEvent = require("nnet/event/NNetEvent");

class _Init
{
   /**
    * preload should only be used for NNet library functions
    */
   documentPreload: Array<(e?: NNetEvent) => void> = [];
   documentLoad: Array<(e?: NNetEvent) => void> = [];
   windowLoad: Array<(e?: NNetEvent) => void> = [];
   windowUnload: Array<(e?: NNetEvent) => void> = [];
   private __documentOnloadCheck;
   private __windowReadyRun: boolean = false;
   private __domReadyRun: boolean = false;

   dom(func: (e?: NNetEvent) => void): void
   {
      if(!this.__domReadyRun)
      {
         this.documentLoad.push(func);
      }
      else
      {
         func();
      }
   }

   window(func: (e?: NNetEvent) => void): void
   {
      if(!this.__windowReadyRun)
      {
         this.windowLoad.push(func);
      }
      else
      {
         func();
      }
   }

   constructor()
   {
      // callback for window
      var windowReadyHandler = (e?: Event) =>
      {
         console.log("windowReadyHandler", this.__windowReadyRun);
         if(!this.__windowReadyRun)
         {
            // fallback for dom ready just in case other methods fail
            domReadyHandler(e);

            console.debug("Window Ready: " + e);
            this.__windowReadyRun = true;

            var evt: NNetEvent = null;
            if(e)
            {
               evt = new NNetEvent(e);
            }

            this.windowLoad.forEach((func) =>
            {
               func(evt);
            });

            this.windowLoad = [];
         }
      };

      // callback for document
      var domReadyHandler = (e?: Event) =>
      {
         if(!this.__domReadyRun)
         {
            if(e != null && (e.type == "onreadystatechange" || e.type == "readystatechange"))
            {
               var state = "readyState" in document ? document.readyState : null;
               if(state != "loaded" && state != "interactive" && state != "complete")
               {
                  return;
               }
            }

            console.debug("DOM Ready: " + e);
            this.__domReadyRun = true;

            var evt: NNetEvent = null;
            if(e)
            {
               evt = new NNetEvent(e);
            }

            this.documentPreload.forEach((func) =>
            {
               func(evt);
            });
            this.documentLoad.forEach((func) =>
            {
               func(evt);
            });

            clearInterval(this.__documentOnloadCheck);

            this.documentLoad = [];
            this.documentPreload = [];
            this.__documentOnloadCheck = null;
         }
      };

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
      this.__documentOnloadCheck = setInterval(domReadyHandler, 10);

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
}

export = Init;
var Init: _Init = (new _Init());