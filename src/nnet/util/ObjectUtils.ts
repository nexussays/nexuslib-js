export = ObjectUtils;
class ObjectUtils
{
   static keys(obj)
   {
      var arr = [];
      for(var prop in obj)
      {
         arr.push(prop);
      }
      return arr;
   }

   static map(obj, keyFunc, valFunc)
   {
      var newObj = {};
      for(var x in obj)
      {
         newObj[(keyFunc ? keyFunc(x) : x)] = (valFunc ? valFunc(obj[x]) : obj[x]);
      }
      return newObj;
   }

   static join(obj, join)
   {
      var result = [];
      join = join || "";
      for(var x in obj)
      {
         result.push(x + join + obj[x]);
      }
      return result;
   }
}