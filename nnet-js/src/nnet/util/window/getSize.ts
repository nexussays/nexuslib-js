// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.


export =getSize;

//gets details on the size and location of the window and document
function getSize()
{
   var doc = document.documentElement;
   var body = document.body;
   return ({
      "viewportHeight": doc.clientHeight || body.clientHeight,
      "viewportWidth": doc.clientWidth || body.clientWidth,
      "contentHeight": doc.offsetHeight || doc.scrollHeight || body.offsetHeight || body.scrollHeight, //((BrowserUtils.isIE || BrowserUtils.quirksMode) ? doc.scrollHeight : doc.offsetHeight),
      "contentWidth": doc.offsetWidth || doc.scrollWidth || body.offsetWidth || body.scrollWidth, //((BrowserUtils.isIE || BrowserUtils.quirksMode) ? doc.scrollWidth : doc.offsetWidth),
      "scrollYOffset": window.pageYOffset || doc.scrollTop || body.scrollTop,
      "scrollXOffset": window.pageXOffset || doc.scrollLeft || body.scrollLeft
   });
}