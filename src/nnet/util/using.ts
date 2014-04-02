// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import get = require("nnet/dom/get");
import HTML = require("nnet/html/HTML");

/*
export = using;
// using("get.js");
// using("get");
// using("debug.js");
// this is nearly a decade old, so it's probably unecessary now
function using(scriptName)
{
   var addScript = (url, head) =>
   {
      get.tag(head===true?"head":"body")[0].appendChild(HTML.script({
         "type": "text/javascript",
         //"language": "Javascript",
         "src": url
      }));
   };

   if(!/\.js$/.test(scriptName))
   {
      scriptName += ".js";
   }
   //find core.js include and use the same path
   var scriptTags = get.tag("script");
   for(var i = 0; i < scriptTags.length; ++i)
   {
      var script = <HTMLScriptElement>scriptTags[i];
      if(script.src && /core\.js$/.test(script.src))
      {
         //get the path to the javascript file
         var path = script.src.replace(/core\.js$/,'');
         
         addScript(path + scriptName, true);
         break;
      }
   }
}
//*/