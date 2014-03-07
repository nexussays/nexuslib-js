///<reference path="./core.js" />
/**********************
STRINGS & REGEXP
**********************/
String.prototype.toPascalCase = function()
{
    return this.replace(/([a-zA-Z0-9])([a-zA-Z0-9]*)(?:[\s_-]+|$)/g,function(){return arguments[1].toUpperCase()+arguments[2].toLowerCase();});
};
String.prototype.toCamelCase = function()
{
    return this.replace(/([\s_-]*)([a-zA-Z0-9])([a-zA-Z0-9]*)/g,function(){return (arguments[1] == "" ? arguments[2].toLowerCase() : arguments[2].toUpperCase())+arguments[3].toLowerCase();});
};


/**********************
STRING<->NUMBER : PARSING AND FORMATTING
**********************/
function parsePercent(value)
{
    var div = 1;
   try
   {
      var val = value.toString();
      //remove a trailing percent sign if it exists
      if(/%$/.test(val))
      {
          val = val.replace(/%$/,"");
          div = 100.0;
      }
      return parseFloat(val)/div;
   }
   //just do a blanket catch and return NaN instead of checking values
   catch(e)
   {
      return NaN;
   }
}
function formatPercent(value)
{
    if(value != parsePercent(value))
    {
        return value;
    }
   var val = parseFloat(value);
   val *= 100;
   return val +"%";
}
function parseCurrency(value)
{
   try
   {
      var val = value.toString();
      //remove all commas
      val = val.replace(/,/g,"");
      //remove a starting dollar sign if it exists
      val = val.replace(/^(\()?\$/,"$1");
      //replace parentheses with a negative sign
      val = val.replace(/^\((.*)\)$/,"-$1");
      return parseFloat(val);
   }
   //just do a blanket catch and return NaN instead of checking values
   catch(e)
   {
      return NaN;
   }
}
function formatCurrency(val)
{
   //if it is a string from, eg, an input box, try to parse it
   /*
   if(typeof val != "number")
   {
      parseVal = parseFloat(val);
      //if it does not evaluate to a number, assume it is already formatted (ie - redundant call) and return it
      if(isNaN(parseVal))
      {
         return val;
      }
      val = parseVal;
   }*/
   var stringVal;
   stringVal = Math.abs(val).toString();
   var significand = (stringVal.split(".")[0]);
   //if there are mroe than 3 digits, add commas
   if(significand.length > 3)
   {
      var extra = significand.length%3;
      //if there is an extra bit and the number is not perfectly split into threes (eg 1,000,000; 43,000) then put a comma where it needs to go in that spot. (this is because the regexp was causing problems with that scenario)
      if(extra)
      {
         stringVal = stringVal.substr(0, extra) + "," + stringVal.substr(extra);
      }
      stringVal = stringVal.replace(/(\d{1,3})(?=\d{3})/g,"$1,");
   }
   //if the value is less than zero, display it in parentheses
   return (val < 0) ? ("(" + stringVal + ")") : stringVal;
}