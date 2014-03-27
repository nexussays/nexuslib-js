define(["nnet/element"], function(Element){

//
// Allows easy creation of HTML elements
//
return new (function()
{
   var self = this;

   // create a method in the HTML object that will create an element of the same
   // name as the function
   this.defineTag = function(tag)
   {
      self[tag.toLowerCase()] = function()
      {
         return create.apply(tag, arguments);
      }
   };

   var create = function()
   {
      var element, prop;

      // special case for text nodes
      if(this == "text")
      {
         element = document.createTextNode(Array.prototype.join.call(arguments, "") || "");
      }
      else
      {
         // create element and apply element methods to it if they aren't already there
         element = document.createElement(this);
         Element.__applyElementPrototypes(element);
         
         // append nodes
         if(arguments.length > 0)
         {
            element.append.apply(element, arguments);
         }
      }

      return element;
   };

   // init
   (["text", "a", "abbr", "acronym", "address", "blockquote", "br", "button", "caption",
      "cite", "code", "col", "colgroup", "dd", "del", "dfn", "div", "dl", "dt", "em",
      "fieldset", "form", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "iframe", "img", "input",
      "ins", "kbd", "label", "legend", "li", "object", "ol", "optgroup", "option", "p",
      "param", "pre", "q", "samp", "script", "select", "span", "strong", "sub", "sup",
      "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "title", "tr", "tt",
      "ul", "var"]).forEach(self.defineTag);
});

}); // define