// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export = origin;
function origin():string
{
   return (<any>window.location).origin || (window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : ""));
}