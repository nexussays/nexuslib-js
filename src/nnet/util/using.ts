// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

///ts:import=get
import get = require('../dom/get'); ///ts:import:generated
///ts:import=HTML
import HTML = require('../html/HTML'); ///ts:import:generated

export = using;

// this is nearly a decade old, so it's probably unecessary now
function using(scriptName)
{
   var addScript = (url, head) =>
   {
      get.tagName(head===true?"head":"body")[0].appendChild(HTML.script({
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
   var scriptTags = get.tagName("script");
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