// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import Event = require("nnet/event/NNetEvent");
import _toArray = require("nnet/util/array/toArray");

//
// Function utilities and helpers
//

export function applyAll(funcs, scope, params)
{
   for(var x in funcs)
   {
      if(typeof funcs[x] == "function")
      {
         funcs[x].apply(scope, params);
      }
   }
}

export function applyAllWrapEvent(funcs, scope, params)
{
   var args =_toArray(params);
   args[0] = new Event(args[0]);
   applyAll(funcs, scope, args);
   /*
   funcs.forEach(function(func)
   {
      if(typeof func == "function")
      {
         func.apply(scope, args);
      }
   });
   //*/
}