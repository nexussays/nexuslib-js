import getElement = require("../src/nnet/dom/getElement");
import Browser = require("../src/nnet/browser/BrowserUtils");
import HTML = require("../src/nnet/dom/HTML");
import type = require("../src/nnet/type");
import Types = require("../src/nnet/Types");
import escapeRegExp = require("../src/nnet/string/escapeRegExp");

export function createMenu(id, buildFrom)
{
   if(buildFrom != null)
   {
      function recurse(menu)
      {
         var ul = HTML.ul();
         for(var x = 0; x < menu.length; ++x)
         {
            var item = menu[x],
                li = HTML.li(),
                match;

            if(type( item[1] ) == Types.array)
            {
               (<any>li).append( HTML.span( { "class": "dropdown" }, item[0] ), recurse( item[1] ) );
            }
            else if(item[1])
            {
               match = escapeRegExp( item[1].replace( /\.?\.\/ ?/, "" ).trim() );
               if(match && window.location.href.match( match ))
               {
                  li.setAttribute( "class", "selected" );
                  li.innerHTML = item[0];
               }
               else
               {
                  (<any>li).append( HTML.a( { "href": item[1] }, item[0] ) );
               }
            }
            //no children, just something visible in the menu section
            else
            {
               (<any>li).append( HTML.span( { "class": "text" }, item[0] ) );
            }
            (<any>ul).append( li );
         }
         return ul;
      }

      getElement.id( id ).append( recurse( buildFrom ) );
   }

   getElement( "#" + id + " span.dropdown" ).forEach( function(x)
   {
      (<any>x.parentNode).bind( "mouseover", createMenu.show );
      (<any>x.parentNode).bind( "mouseout", createMenu.show );
   } );
}

export module createMenu
{
   export function show()
   {
      this.toggleClass( "hover" );
   };
}

export var sections =
{
   Javascript:
   {
      Menu:
      [
         ["..up", "./"],
         [
            "Javascript",
            [
               ["Editor", "./editor.htm"],
               ["Event", "./events.htm"],
               ["Information", "./information.htm"],
               ["Regular Expressions", "./regexp.htm"],
               ["Testing", "./tests/index.htm"]
            ]
         ],
         ["[Browser in " + (Browser.strictMode ? "StrictMode" : Browser.quirksMode ? "QuirksMode" : "Unknown Rendering Mode") + "]"]
      ]
   }
};