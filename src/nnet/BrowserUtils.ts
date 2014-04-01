// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// <reference path="../../lib/modernizr.d.ts"/>

/**
 * Should probably be using modernizr instead; this code is nearly a decade old.
 */
export = BrowserUtils;
module BrowserUtils
{
   declare class HTMLElement
   {
      testPrototype: Boolean;
   }

   export var isIE = /*@cc_on!@*/false;

   export var version = Math.floor(
      /*@if(@_jscript_version)(@_jscript_version - 5)@else@*/0
      /*@end@*/* 10);

   export var strictMode = (document.compatMode == "CSS1Compat");

   export var quirksMode = (document.compatMode == "BackCompat" || typeof document.compatMode == "undefined");

   export var supportsElementPrototype = (() =>
   {
      try
      {
         HTMLElement.prototype.testPrototype = true;
         return true;
      }
      catch(no) { }
      return false;
   })();

   export var supportsDomDelete = (() =>
   {
      try
      {
         delete HTMLElement.prototype.testPrototype;
         return true;
      }
      catch(no) { }
      return false;
   })();

   //added to document.preload below
   export var supportsCanvas = null;
   export var supportsElementOpacity = null;
};