// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=contains
import contains = require('../string/contains'); ///ts:import:generated
///ts:import=EnhancedElement
import EnhancedElement = require('./EnhancedElement'); ///ts:import:generated
///ts:import=find
import find = require('./find'); ///ts:import:generated
///ts:import=EnhancedHTMLElementCollection
import EnhancedHTMLElementCollection = require('./EnhancedHTMLElementCollection'); ///ts:import:generated
///ts:import=isAncestor
import isAncestor = require('./isAncestor'); ///ts:import:generated


export = EnhancedHTMLElement;

// combines EnhancedHTMLElement.IHTMLElementEnhancements which has our enhanced methods with HTMLElement so we 
// can still access all the native element properties
interface EnhancedHTMLElement extends HTMLElement, EnhancedHTMLElement.IEnhancedHTMLElementImpl
{
}

module EnhancedHTMLElement
{
   export class IEnhancedHTMLElementImpl extends EnhancedElement.IEnhancedElementImpl
   {
      private asHTMLElement(): HTMLElement
      {
         // this class should never be instantiated by itself, we just copy its prototype
         // to objects or to other element protoypes
         return (<HTMLElement>(<any>this));
      }

      getAncestors(query: string): EnhancedHTMLElementCollection
      {
         return find( query ).filter$( item => isAncestor( this.asHTMLElement(), item ) );
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

      find(query: string): EnhancedHTMLElementCollection
      {
         return find.call( this, query );
      }
   }
}