﻿// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

///ts:import=contains
import contains = require('../string/contains'); ///ts:import:generated
///ts:import=EnhancedElement
import EnhancedElement = require('./EnhancedElement'); ///ts:import:generated

export = EnhancedHTMLElement;

class EnhancedHTMLElement extends EnhancedElement implements EnhancedHTMLElement.IInternal
{
   private asHTMLElement(): HTMLElement
   {
      // this class should never be instantiated by itself, we just copy its prototype
      // to objects or to other element protoypes
      return (<HTMLElement>(<any>this));
   }

   addClass(name: string, checkExistence: boolean= false): boolean
   {
      if(checkExistence === false || (!this.hasClass( name )))
      {
         this.asHTMLElement().className += " " + name;
         //element.clasName = element.className.replace(/\s+$/gi, "") + " " + name;
         return true;
      }
      return false;
   }

   removeClass(name: string): boolean
   {
      //replace the name with an empty string
      if(this.asHTMLElement().className)
      {
         this.asHTMLElement().className = this.asHTMLElement().className.replace( new RegExp( "(^|\\s)" + name + "(\\s|$)", "i" ), " " );
         if(this.asHTMLElement().className == "")
         {
            this.asHTMLElement().removeAttribute( "class" );
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
      return (this.asHTMLElement().className && contains( this.asHTMLElement().className, name, " ", true ));
   }
}

module EnhancedHTMLElement
{
   export interface IInternal extends EnhancedElement.IInternal
   {
      addClass(name: string, checkExistence?: boolean): boolean;
      removeClass(name: string): boolean;
      toggleClass(name: string);
      hasClass(name: string): boolean;
   }
}