﻿// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = extendPrototype;

function extendPrototype(derived: any, parents: any[])
{
   parents.forEach( parent =>
   {
      Object.getOwnPropertyNames( parent.prototype ).forEach( name => derived.prototype[name] = parent.prototype[name] );
   } );
}

//function inheritPrototype(sub:any, super:any)
//{
//   var foo = function(){};
//   foo.prototype = super.prototype;
//   var superCopy = new foo();
//   superCopy.constructor = sub;
//   sub.prototype = superCopy;
//}
