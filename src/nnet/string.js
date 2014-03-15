define([], function(){

//allows easy checking of string values and also helps in the case that a string is
//created with the String constructor (which returns typeof "object" instead of "string")
String.prototype.isString = true;
String.prototype.trim = function()
{
   if(arguments.length > 0)
   {
      var args = (Array.prototype.map.call(arguments,function(x){return x.escapeRegExp();})).join("|");
      return this.replace(new RegExp("^(?:" + args + ")+|(?:" + args + ")+$","g"), "");
   }
   return this.replace(/^\s+|\s+$/, "");
};
String.prototype.escapeRegExp = function()
{
   return this.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1");
};
String.prototype.escapeHTML = function()
{
   var div = document.createElement("div");
   div.appendChild(document.createTextNode(this));
   return div.innerHTML;
};
String.prototype.unescapeHTML = function()
{
   var div = document.createElement("div");
   div.innerHTML = this.stripTags();
   return div.childNodes[0] ? div.childNodes[0].nodeValue : '';
};
String.prototype.stripTags = function()
{
   return this.replace(/<\/?[^>]+>/gi, '');
};
String.prototype.contains = function(str, sep, i)
{
   //if case-insensitive, return a recurse of callee with lowercase arguments
   //otherwise find the passed string in this string, optionally bound by seperators
   return (
      i === true ?
      this.toLowerCase().contains(str.toLowerCase(), sep, false) :
      (
         (sep) ?
         (sep + this + sep).indexOf(sep + str + sep) > -1 :
         this.indexOf(str) > -1
      )
   );

   //this takes roughly twice as long when called by itself without the benefit of caching
   //the expression.
   //return (new RegExp("(?:^|\\s)" + str + "(?:\\s|$)", i ? "i" : "").test(str));
};
RegExp.escape = function(text)
{
   return text.escapeRegExp();
};

return ;

}); // define