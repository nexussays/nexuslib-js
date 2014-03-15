define([], function(){

//
// 
//
var SortBy =
{
   "default": function(a, b)
   {
      ///<summary>
      ///Returns the same results as sort() called with no arguments.
      ///So capital letters come before lowercase letters and numbers are sorted as alpha
      ///(eg - 1243 is before 21 is before 320 is before 46, etc)
      ///</summary>
      return SortBy.alphanum(a + "", b + "");
   },
   //this doesn't appear to work very well
   random: function(a, b)
   {
      return Math.randomInt(-1, 1);
   },
   alphanum: function(a, b)
   {
      ///<summary>
      ///This is the default sort to use, alpha and numerics are sorted appropriately.
      ///NOTE: Sorting a list containing both characters and numbers will produce unexpected results
      ///</summary>
      return a < b ? -1 : (a > b ? 1 : 0);
   },
   alphanum_i: function(a, b)
   {
      ///<summary>Sort alphabetically, case-insensitive</summary>
      return SortBy.alphanum(((typeof a.toLowerCase == "function") ? a.toLowerCase() : a), ((typeof b.toLowerCase == "function") ? b.toLowerCase() : b));
   },
   length: function(a, b)
   {
      ///<summary>
      ///Sort on the length property of each item. Items without a length property will be compared as equal.
      ///</summary>
      return SortBy.property("length")(a, b);
   },
   property: function(prop, sortFunc)
   {
      ///<summary>Returns a new function which sorts on the given property</summary>
      ///<param name="prop" optional="false" type="String">The name of the property to compare</param>
      ///<param name="sortFunc" optional="true" type="Function">The sorting function to compare with. Default is SortBy.alphanum</param>
      sortFunc = (typeof sort == "function" ? sortFunc : SortBy.alphanum);
      return (function(a, b)
      {
         if(typeof a[prop] !== "undefined" && typeof b[prop] !== "undefined")
         {
            return sortFunc(a[prop], b[prop]);
         }
         return 0;
      });
   },
   multi: function()
   {
      ///<summary>
      ///Pass in multiple sorting functions and perform a multi-depth sort.
      ///eg: ["bbb","c","cc","aa","z"].sort(SortBy.multi(SortBy.length,SortBy.alphanum_i)) => ["c","z","aa","CC","bbb"]
      ///</summary>
      var items = Array.toArray(arguments);
      return (function(a, b)
      {
         var result = 0;
         for(var x = 0, ln = items.length; x < ln && result == 0; ++x)
         {
            result = items[x](a, b);
         }
         return result;
      });
   }
};

return Sort;

}); // define