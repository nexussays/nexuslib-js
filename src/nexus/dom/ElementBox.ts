// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/// ts:import=BoundingBox
import BoundingBox = require('./BoundingBox'); ///ts:import:generated
///ts:import=EnhancedElement
import EnhancedElement = require('./EnhancedElement'); ///ts:import:generated

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
      public width: number,
      public height: number,
      public contentWidth: number,
      public contentHeight: number,
      public scrollbarWidth: number,
      public scrollbarHeight: number,
      public hitAreaWidth: number,
      public hitAreaHeight: number
   )
   {
   }

   static calculate(element: Element): ElementBox
   {
      var style = getComputedStyle( element );
      var padding = new BoundingBox(
         parseFloat( style.paddingTop ),
         parseFloat( style.paddingRight ),
         parseFloat( style.paddingBottom ),
         parseFloat( style.paddingLeft )
      );
      var margin = new BoundingBox(
         parseFloat( style.marginTop ),
         parseFloat( style.marginRight ),
         parseFloat( style.marginBottom ),
         parseFloat( style.marginLeft )
      );
      var border = new BoundingBox(
         parseFloat( style.borderTopWidth ),
         parseFloat( style.borderRightWidth ),
         parseFloat( style.borderBottomWidth ),
         parseFloat( style.borderLeftWidth )
      );
      var boundingRect = element.getBoundingClientRect();
      var height = parseFloat( style.height );
      var width = parseFloat( style.width );
      var scrollHeight = element.scrollHeight;
      var scrollWidth = element.scrollWidth;
      var offsetHeight = boundingRect.height;
      var offsetWidth = boundingRect.width;
      var clientWidth = element.clientWidth;
      var clientHeight = element.clientHeight;
      var barWidth = offsetWidth - clientWidth - border.horizontal;
      var barHeight = offsetHeight - clientHeight - border.vertical;
      return new ElementBox( margin, border, padding, width, height, scrollWidth, scrollHeight, barWidth, barHeight, offsetWidth, offsetHeight );
   }
}