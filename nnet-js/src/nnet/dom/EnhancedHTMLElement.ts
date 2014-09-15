// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=contains
import contains = require('../stringutil/contains'); ///ts:import:generated
///ts:import=EnhancedElement
import EnhancedElement = require('./EnhancedElement'); ///ts:import:generated
///ts:import=find
import find = require('./find'); ///ts:import:generated
///ts:import=ElementGroup
import ElementGroup = require('./ElementGroup'); ///ts:import:generated
///ts:import=isAncestor
import isAncestor = require('./isAncestor'); ///ts:import:generated


export = EnhancedHTMLElement;

// combines EnhancedHTMLElement.IHTMLElementEnhancements which has our enhanced methods with HTMLElement so we 
// can still access all the native element properties
interface EnhancedHTMLElement extends HTMLElement, EnhancedHTMLElement.Impl
{
}

module EnhancedHTMLElement
{
   export class Impl extends EnhancedElement.Impl
   {
      getAncestors(query: string): ElementGroup
      {
         return find( query ).filter$( item => isAncestor( (<HTMLElement><any>this), item ) );
      }

      addClass(name: string, checkExistence: boolean= false): boolean
      {
         if(checkExistence === false || (!this.hasClass( name )))
         {
            (<HTMLElement><any>this).className += " " + name;
            //element.clasName = element.className.replace(/\s+$/gi, "") + " " + name;
            return true;
         }
         return false;
      }

      removeClass(name: string): boolean
      {
         //replace the name with an empty string
         if((<HTMLElement><any>this).className)
         {
            (<HTMLElement><any>this).className = (<HTMLElement><any>this).className.replace( new RegExp( "(^|\\s)" + name + "(\\s|$)", "i" ), " " );
            if((<HTMLElement><any>this).className == "")
            {
               (<HTMLElement><any>this).removeAttribute( "class" );
            }
         }
         return true;
      }

      toggleClass(name: string)
      {
         this.hasClass( name ) ? this.removeClass( name ) : this.addClass( name, true );
      }

      hasClass(name: string): boolean
      {
         //return (new RegExp("(?:^|\\s)" + name + "(?:\\s|$)", "i").test(element.className));
         return ((<HTMLElement><any>this).className && contains( (<HTMLElement><any>this).className, name, " ", true ));
      }

      find(query: string): ElementGroup
      {
         return find( query, (<HTMLElement><any>this) );
      }
   }
}