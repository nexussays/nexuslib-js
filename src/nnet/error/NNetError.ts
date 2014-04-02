// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/**
 * Base class for errors thrown by nnet-js
 */
export = NNetError;
class NNetError
{
   name: string;
   message: string;
   description: string;

   constructor(message)
   {
      this.name = arguments.callee["name"] || "NNetError";
      this.message = message || "An unhandled Exception has occured in nnet-js";
      this.description = this.message;
   }

   toString()
   {
      return this.message;
   }
}