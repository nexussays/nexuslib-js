//
// Extend Array with functional methods.
// Not sure if this is needed anymore, I wrote it in like 2004.
//
interface Array<T>
{
   map$(func: (obj: T, index: Number, arr: Array<T>) => any, scope: any): void;
   //filter(func: (obj: T, index: Number, arr: Array<T>) => Boolean, scope: any): Array<T>;
   flatten(): Array<T>;
   shuffle(): void;
}
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
/*
//map the results of a function to each respective index of an array
//format is: arrayVariable.map(function(valueAtIndex, index, entireArray){});
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
//execute a function over each item in an array
//format is: arrayVariable.forEach(function(valueAtIndex, index, entireArray){});
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
   return arr;
};
//returns the index of the given object or -1 if not found
Array.prototype.indexOf = Array.prototype.indexOf || function(item)
{
   var ln = this.length, from = (+arguments[1]) || 0;
   from = (from < 0) ? Math.ceil(from) + ln : Math.floor(from);

   for(; from < ln; ++from)
   {
      if(from in this && this[from] === item)
      {
         return from;
      }
   }
   return -1;
};
*/
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