// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export function keys( obj: any ): Array<string>
{
   var arr: string[] = [];
   for( var prop in obj )
   {
      arr.push( prop );
   }
   return arr;
}

export function map<T>( obj: T, keyFunc?: ( any ) => any, valFunc?: ( any ) => any, thisArg?: any ): any
{
   var newObj = {};
   forEach( obj, ( val, key ) => newObj[( keyFunc ? keyFunc.call( thisArg, key ) : key )] = ( valFunc ? valFunc.call( thisArg, val ) : val ) );
   return newObj;
}

/**
* Join an object hash's key and value into a single item and return an array
*/
export function join<T>( obj: T, join: string = ": " ): Array<string>
{
   var result: string[] = [];
   forEach( obj, ( val, key ) => result.push( key + join + val ) );
   return result;
}

function forEach<T>( obj: T, func: ( value: any, key: any, obj: T ) => void, thisArg?: any ): void;
function forEach( obj: any[], func: ( value: any, key: any, obj: any[] ) => void, thisArg?: any ): void;
function forEach( obj: any, func: ( value: any, key: any, obj: any ) => void, thisArg?: any ): void
{
   if( obj instanceof Array )
   {
      ( <any[]>obj ).forEach( func, thisArg );
      return;
   }

   for( var x in obj )
   {
      if( obj.hasOwnProperty( x ) )
      {
         func.call( thisArg, obj[x], x, obj );
      }
   }
}

export function filter<T>( obj: T, callback: ( value: any, key: any, obj: T ) => boolean, thisArg?: any ): T
{
   var newObj: any = {};
   forEach( obj, ( val, key ) =>
   {
      if( callback.call( thisArg, val, key, obj ) )
      {
         newObj[key] = val;
      }
   } );
   return <T>newObj;
}

export function extendPrototype( derived: any, parents: any[] )
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

function clone(obj: any): any;
function clone(obj: any, into?: any): void;
function clone(obj: any, into?: any): any
{
   switch(type.of( obj ))
   {
      case type.array:
         into = into || []; // fallthrough
      case type.object:
         into = into || {};
         forEach( obj, (val, key) => into[key] = val );
         break;
      case type.date:
         var ms = (<Date>obj).getTime();
         into = into || new Date();
         (<Date>into).setTime( ms );
         break;
      case type.node:
         into = (<Node>obj).cloneNode( true );
         break;
      default:
         into = obj;
         break;
   }
   return into;
}
