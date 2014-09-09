define([
   "nnet/dom/get",
   "nnet/browser/BrowserUtils",
   "nnet/dom/html",
   "nnet/object/type",
   "nnet/object/Types",
   "nnet/_string"
], function (get, Browser, HTML, type, Types, _str) {

window.CreateMenu = function(id, buildFrom)
{
   if(buildFrom != null)
   {
      function recurse(menu)
      {
         var ul = HTML.ul();
         for(var x = 0; x < menu.length; ++x)
         {
            var item = menu[x], li = HTML.li(), match;
            
            if(type(item[1]) == Types.array)
            {
               li.append(HTML.span({ "class": "dropdown" }, item[0]), recurse(item[1]));
            }
            else if(item[1])
            {
               match = _str.escapeRegExp(item[1].replace(/\.?\.\/ ?/, "").trim());
               if(match && window.location.href.match(match))
               {
                  li.setAttribute("class", "selected");
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
      get.id( id ).append( recurse( buildFrom ) );
   }

   get("#" + id + " span.dropdown").forEach(function(x)
   {
      x.parentNode.bind("mouseover", CreateMenu.show);
      x.parentNode.bind("mouseout", CreateMenu.show);
   });
};
CreateMenu.show = function()
{
   this.toggleClass("hover");
};

window.Sections = 
{
   Javascript : 
   {
      Menu :
      [
         ["..up", "./"],
         ["Javascript",
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

}); // require