define(
["nnet/dom/get", "nnet/BrowserUtils", "nnet/html/html"],
function (get, Browser, HTML) {

window.CreateMenu = function(id, buildFrom)
{
   if(buildFrom != null)
   {
      function recurse(menu)
      {
         var ul = HTML.ul();
         for(var x = 0; x < menu.length; ++x)
         {
            var item = menu[x], type = objtype(item[1]), li = HTML.li(), match;
            
            if(type == "array")
            {
               li.append(HTML.span({ "class": "dropdown" }, item[0]), recurse(item[1]));
            }
            else if(item[1])
            {
               match = item[1].replace(/\.?\.\/ ?/, "").trim().escapeRegExp();
               if(match && window.location.href.match(match))
               {
                  li.setAttribute("class", "selected");
                  li.innerHTML = item[0];
               }
               else
               {
                  li.appendChild(HTML.a({"href":item[1]}, item[0]));
               }
            }
            //no children, just something visible in the menu section
            else
            {
               li.appendChild(HTML.span({"class":"text"}, item[0]));
            }
            ul.appendChild(li);
         }
         return ul;
      }
      get.id(id).appendChild(recurse(buildFrom));
   }

   get("#" + id + " span.dropdown").forEach(function(x)
   {
      x.parentNode.addEvent("mouseover", CreateMenu.show);
      x.parentNode.addEvent("mouseout", CreateMenu.show);
   });
};
CreateMenu.show = function()
{
   this.toggleCssClass("hover");
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
               ["Editor", "/web/Javascript/editor.htm"],
               ["Event", "/web/Javascript/events.htm"],
               ["Information", "/web/Javascript/information.htm"],
               ["Regular Expressions", "/web/Javascript/regexp.htm"],
               ["Testing", "/web/Javascript/tests/index.htm"]
            ]
         ],
         ["[Browser in " + (Browser.strictMode ? "StrictMode" : Browser.quirksMode ? "QuirksMode" : "Unknown Rendering Mode") + "]"]
      ]
   }
};

}); // require