// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = scaleToFit;

function scaleToFit(width: number, height: number, toWidth: number, toHeight: number = Infinity,
                    scaleUp: boolean = true): number
{
   width = Math.ceil( width );
   height = Math.ceil( height );

   var widthScale: number = (scaleUp || width > toWidth) ? toWidth / width : 1;
   var heightScale: number = (scaleUp || height > toHeight) ? toHeight / height : 1;

   //console.log("scaleToFit", widthScale, heightScale);

   return Math.min( heightScale, widthScale );
}
