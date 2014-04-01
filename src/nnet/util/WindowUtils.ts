// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import ObjectUtils = require("nnet/util/ObjectUtils");

export = WindowUtils;
class WindowUtils
{
   static jump(anchor)
   {
      //Debug.Alert(anchor);
      //var current = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search;
      if(anchor && anchor.isString)
      {
         window.location.assign(
            window.location.protocol + "//" +
            window.location.host +
            window.location.pathname +
            window.location.search +
            "#" + anchor);
         //alert("added");
      }
      //this is causing what I believe are page reload errors, for some reason I guess you can't clear the hash from the page.
      //I'm still looking into it
      /*else if(anchor === undefined)
      {
         window.location.assign(current + "");
         alert("cleared");
      }
      else
      {
         alert("no effect");
      }*/
   }

   //gets details on the size and location of the window and document
   static getSize()
   {
      var doc = document.documentElement;
      var body = document.body;
      return ({
         "viewportHeight": doc.clientHeight || body.clientHeight,
         "viewportWidth": doc.clientWidth || body.clientWidth,
         "contentHeight": doc.offsetHeight || doc.scrollHeight || body.offsetHeight || body.scrollHeight,//((BrowserUtils.isIE || BrowserUtils.quirksMode) ? doc.scrollHeight : doc.offsetHeight),
         "contentWidth": doc.offsetWidth || doc.scrollWidth || body.offsetWidth || body.scrollWidth,//((BrowserUtils.isIE || BrowserUtils.quirksMode) ? doc.scrollWidth : doc.offsetWidth),
         "scrollYOffset": window.pageYOffset || doc.scrollTop || body.scrollTop,
         "scrollXOffset": window.pageXOffset || doc.scrollLeft || body.scrollLeft
      });
   }

   static parseQueryString()
   {
      var dict = {};
      var search: any = window.location.search.substring(1);
      if(search != "")
      {
         search = search.split("&");
         for(var x = 0; x < search.length; ++x)
         {
            var entry = search[x].split("=");
            dict[decodeURIComponent(entry[0])] = decodeURIComponent(entry[1]);
         }
      }
      return dict;
   }

   static replaceQueryString(hash)
   {
      var querystring = ObjectUtils.join(ObjectUtils.map(hash, encodeURIComponent, encodeURIComponent), "=").join("&");
      window.location.search = (querystring == "" ? "" : "?" + querystring);
   }
}