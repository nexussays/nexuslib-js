define([], function(){

//
// Extend Array with functional methods.
// Not sure if this is needed anymore, I wrote it in like 2004.
//

//map the results of a function to each respective index of an array
//format is: arrayVariable.map(function(valueAtIndex, index, entireArray){/*CODE*/});
Array.prototype.map = Array.prototype.map || function(func, scope)
{
   //ExceptionHelper.isFunction(func);
   var x = 0, ln = this.length, self = scope || this, arr = [];
   for(; x < ln; ++x)
   {
      if(x in this)
      {
         arr[x] = func.call(self, this[x], x, this);
      }
   }
   return arr;
};
//map which directly alters the array instead of returning a new array with the modified results
Array.prototype.map$ = function(func, scope)
{
   var x = 0, ln = this.length, self = scope || this;
   for(; x < ln; ++x)
   {
      if(x in this)
      {
         this[x] = func.call(self, this[x], x, this);
      }
   }
};
//execute a function over each item in an array
//format is: arrayVariable.forEach(function(valueAtIndex, index, entireArray){/*CODE*/});
Array.prototype.forEach = Array.prototype.forEach || function(func, scope)
{
   //ExceptionHelper.isFunction(func);
   var x = 0, ln = this.length, self = scope || this;
   for(; x < ln; ++x)
   {
      if(x in this)
      {
         func.call(self, this[x], x, this);
      }
   }
};
//Creates a new array with all elements that pass the test implemented by the provided function.
Array.prototype.filter = function(func, scope)
{
   //ExceptionHelper.isFunction(func);
   var x = 0, ln = this.length, self = scope || this, arr = [];
   for(; x < ln; ++x)
   {
      if(x in this)
      {
         var value = this[x];
         if(func.call(self, this[x], x, this))
         {
            arr.push(value);
         }
      }
   }
};
//returns the index of the given object or -1 if not found
Array.prototype.indexOf = Array.prototype.indexOf ||function(item /*, from*/)
{
   var ln = this.length, from = (+arguments[1]) || 0;
   from = (from < 0) ? Math.ceil(from) + len : Math.floor(from);

   for(; from < ln; ++from)
   {
      if(from in this && this[from] === item)
      {
         return from;
      }
   }
   return -1;
};
//returns a new array with the same values but in a random order
Array.prototype.shuffle = function()
{
   var i = this.length, j, temp;
   while(i)
   {
      --i;
      j = Math.floor(Math.random() * (i + 1));
      temp = this[i];
      this[i] = this[j];
      this[j] = temp;
   }
   return this;
};
//flattens an array of arrays into a single array.
//eg: [0,1,2,3,4,["a","b","c"],5,[["x","y","z"],[1,2,3]]]
//becomes [0,1,2,3,4,"a","b","c",5,"x","y","z",1,2,3]
Array.prototype.flatten = function()
{
   var x = 0, ln = this.length, arr = [];
   for(; x < ln; ++x)
   {
      if(x in this)
      {
         var value = this[x];
         arr = arr.concat(value instanceof Array ? value.flatten() : value);
      }
   }
   return arr;
};
// not in a global range() function because Javascript has no "yield" or other means
// to defer execution, so we actually have to generate the entire range. I think
// a window.range() function would introduce confusion about the implementation.
Array.makeRange = function(from, to, step)
{
   step = step || 1;
   var arr = [];
   while(from <= to)
   {
      arr.push(from);
      from += step;
   }
   return arr;
};
//convert an Array-like object to an Array
Array.toArray = function(collection)
{
   if(collection instanceof Array)
   {
      return collection;
   }
   for(var x = 0, ln = collection.length, arr = []; x < ln; ++x)
   {
      arr[x] = collection[x];
   }
   return arr;
};

}); // define