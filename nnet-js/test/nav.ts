/// <reference path="../typings/nnet.d.ts"/>
import nnet = require("nnet");
import type = nnet.type;
import HTML = nnet.dom.HTML;
import find = nnet.dom.find;

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

            if(type.of( item[1] ) == type.array)
            {
               li.append( HTML.span( { "class": "dropdown" }, item[0] ), recurse( item[1] ) );
            }
            else if(item[1])
            {
               match = nnet.stringutil.escapeRegExp( item[1].replace( /\.?\.\/ ?/, "" ).trim() );
               if(match && window.location.href.match( match ))
               {
                  li.addClass( "selected" );
                  li.innerHTML = item[0];
               }
               else
               {
                  li.append( HTML.a( { "href": item[1] }, item[0] ) );
               }
            }
            //no children, just something visible in the menu section
            else
            {
               li.append( HTML.span( { "class": "text" }, item[0] ) );
            }
            ul.append( li );
         }
         return ul;
      }

      find.id( id ).append( recurse( buildFrom ) );
   }

   find( "#" + id + " span.dropdown" ).forEach( function(x)
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
   [
      ["..up", "./"],
      ["Editor", "./editor.htm"],
      ["Event", "./events.htm"],
      [
         "Javascript",
         [
            ["Information", "#"],
            ["RegEx", "#"],
            ["Testing", "#"]
         ]
      ],
      //["[Browser in " + (Browser.strictMode ? "StrictMode" : Browser.quirksMode ? "QuirksMode" : "Unknown Rendering Mode") + "]"]
   ]
};