
///ts:import=_nnet,nnet
import nnet = require('../src/_nnet'); ///ts:import:generated
///ts:import=find
import find = require('../src/nnet/dom/find'); ///ts:import:generated
///ts:import=BrowserUtils,Browser
import Browser = require('../src/nnet/browser/BrowserUtils'); ///ts:import:generated
///ts:import=HTML
import HTML = require('../src/nnet/dom/HTML'); ///ts:import:generated
///ts:import=type
import type = require('../src/nnet/type'); ///ts:import:generated
///ts:import=Types
import Types = require('../src/nnet/Types'); ///ts:import:generated
///ts:import=escapeRegExp
import escapeRegExp = require('../src/nnet/string/escapeRegExp'); ///ts:import:generated

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
               li.append( HTML.span( { "class": "dropdown" }, item[0] ), recurse( item[1] ) );
            }
            else if(item[1])
            {
               match = escapeRegExp( item[1].replace( /\.?\.\/ ?/, "" ).trim() );
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