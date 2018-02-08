// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = jump;

function jump(anchor)
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
         "#" + anchor );
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
