/**
 * not in a global range() function because Javascript has no "yield" or other means
 * to defer execution, so we actually have to generate the entire range. I think
 * a window.range() function would introduce confusion about the implementation.
 */
export function makeRange(from, to, step)
{
   step = step || 1;
   var arr = [];
   while(from <= to)
   {
      arr.push(from);
      from += step;
   }
   return arr;
}

/**
 * Convert an Array-like object to an Array
 */
export function toArray(collection)
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
}