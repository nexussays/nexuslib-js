define([], function(){

//
// Color manipulation
//
var Color = new (function()
{
   var self = this;
   
   //TODO: this is fuuuuggggllyyyy

   var getValues = function(a, r, g, b)
   {
      //if the value passed to one of the functions is a split value
      if(typeof arguments[0] == "object" && "r" in arguments[0])
      {
         var aVal = arguments[0].a;
         var rVal = arguments[0].r;
         var gVal = arguments[0].g;
         var bVal = arguments[0].b;
      }
      else if(typeof arguments[1] == "object" && "r" in arguments[1])
      {
         var aVal = arguments[1].a;
         var rVal = arguments[1].r;
         var gVal = arguments[1].g;
         var bVal = arguments[1].b;
      }
      else
      {
         var aVal = a;
         var rVal = r;
         var gVal = g;
         var bVal = b;
      }
      return { "a": aVal, "r": rVal, "g": gVal, "b": bVal };
   }

   this.hexToRgb = function(hex)
   {
      return self.hexToArgb(self.rgbToArgb(hex, 255));
   };

   this.hexToArgb = function(hex)
   {
      if(typeof hex != "number")
      {
         hex = parseInt((hex + "").replace(/^\#/, ""), 16);
      }
      return { "a": ((hex >> 24) & 0xFF), "r": ((hex >> 16) & 0xFF), "g": ((hex >> 8) & 0xFF), "b": (hex & 0xFF) };
   };

   this.rgbToInt = function(r, g, b)
   {
      var rgb = getValues(0, r, g, b);
      return this.argbToInt(0, rgb.r, rgb.g, rgb.b);
   };

   this.argbToInt = function(a, r, g, b)
   {
      var rgb = getValues(a, r, g, b);
      return (((rgb.a & 0xff) << 24) | ((rgb.r & 0xff) << 16) | ((rgb.g & 0xff) << 8) | (rgb.b & 0xff)).asUnsigned();
   };

   this.rgbToArgb = function(hex, alpha)
   {
      //remove any alpha from the current value
      return (alpha << 24 | (hex & 0xffffff)).asUnsigned();
   };

})();

return Color;

}); //define