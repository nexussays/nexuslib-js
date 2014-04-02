
function parseBool(value)
{
   switch((value+"").toLowerCase())
   {
      case "true":
      case "t":
      case "1":
      case "yes":
      case "y":
         return true;
      default:
         return false;
   }
}

/**********************
MUMERIC & MATH
**********************/
//generates a random integer between the high and low values, inclusive
//if no value is provided for the respective argument, the defaults of 0 (low) and 1 (high) are used
Math.randomInt = function(low, high)
{
   var L = parseInt(low, 10) || 0, H = parseInt(high, 10) || 1;
   return Math.floor( (Math.random() * (H - L + 1)) + L );
};
Math.mean = function()
{
   for(var mean = 0, ln = arguments.length, x = 0; x < ln; ++x)
   {
      mean += arguments[x];
   }
   return mean/ln;
};
Number.prototype.asUnsigned = function()
{
   //1. shift 0 in from right to set sign bit to 0
   //2. multiply by two to retain sign bit (left shift would undo the previous right shift)
   //3. restore the original 1's bit that was lost in the right shift
   return ((this >>> 1) * 2) + (this & 0x1);
};
Number.prototype.days = function()
{
   return this * (24).hours();
};
Number.prototype.hours = function()
{
   return this * (60).minutes();
};
Number.prototype.minutes = function()
{
   return this * (60).seconds();
};
Number.prototype.seconds = function()
{
   return this * 1000;
};
Date.prototype.increment = function(milliseconds)
{
   return this.setMilliseconds(this.getMilliseconds() + milliseconds);
};
Date.prototype.isLeapYear = function()
{
   return Date.isLeapYear(this.getFullYear());
};
Date.isLeapYear = function(year)
{
   return (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0));
};