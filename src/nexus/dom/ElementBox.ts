// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=BoundingBox
import BoundingBox = require('./BoundingBox'); ///ts:import:generated
///ts:import=EnhancedElement
import EnhancedElement = require('./EnhancedElement'); ///ts:import:generated
/// ts:import=parseNumber
import parseNumber = require('../util/parseNumber'); ///ts:import:generated

export = ElementBox;

/**
 * @see http://msdn.microsoft.com/en-us/library/hh781509%28VS.85%29.aspx
 * @see http://jsfiddle.net/y8Y32/45/
 */
class ElementBox
{
   constructor(
      public margin: BoundingBox,
      public border: BoundingBox,
      public padding: BoundingBox,
      public innerWidth: number,
      public innerHeight: number,
      //private contentWidth: number,
      //private contentHeight: number,
      public scrollbarWidth: number,
      public scrollbarHeight: number
      //private offsetWidth: number,
      //private offsetHeight: number
   )
   {
   }

   completeHeight(): number
   {
      return this.border.vertical + this.margin.vertical + this.padding.vertical + this.innerHeight;
   }

   completeWidth(): number
   {
      return this.border.horizontal + this.margin.horizontal + this.padding.horizontal + this.innerWidth;
   }

   static calculate(element: Element): ElementBox
   {
      var style = getComputedStyle( element );

      var padding = new BoundingBox(
         style.paddingTop,
         style.paddingRight,
         style.paddingBottom,
         style.paddingLeft
      );
      var margin = new BoundingBox(
         style.marginTop,
         style.marginRight,
         style.marginBottom,
         style.marginLeft
      );
      var border = new BoundingBox(
         style.borderTopWidth,
         style.borderRightWidth,
         style.borderBottomWidth,
         style.borderLeftWidth
      );

      // compute height and width of actual content and account for box model
      var height = parseNumber( style.height );
      var width = parseNumber( style.width );
      if(style.boxSizing == "border-box")
      {
         height -= border.vertical + padding.vertical;
         width -= border.horizontal + padding.horizontal;
      }
      else if(style.boxSizing == "padding-box")
      {
         height -= border.vertical;
         width -= border.horizontal;
      }

      var boundingRect = element.getBoundingClientRect();
      var offsetHeight = boundingRect.height;
      var offsetWidth = boundingRect.width;
      var clientWidth = element.clientWidth;
      var clientHeight = element.clientHeight;
      // scroll bars don't have subpixel precision, so round
      var barWidth = Math.abs( Math.round( offsetWidth - clientWidth - border.horizontal ) );
      var barHeight = Math.abs( Math.round( offsetHeight - clientHeight - border.vertical ) );

      return new ElementBox( margin, border, padding, width, height /*, element.scrollWidth, element.scrollHeight*/, barWidth, barHeight /*, offsetWidth, offsetHeight*/ );
   }
}
