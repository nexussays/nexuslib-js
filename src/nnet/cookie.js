define([], function(){

//
// Provide easier access to browser cookies
//
return new (function()
{
   var cookiesStore = {};

   var self = this;

   this.getString = function(name)
   {
      if(typeof cookiesStore[name] == "undefined")
      {
         var cookies = document.cookie.split(";");
         for(var x = 0; x < cookies.length; ++x)
         {
            var cookie = cookies[x].trim();
            var index = cookie.indexOf("=");
            var key = decodeURIComponent(cookie.substring(0, index));
            var value = decodeURIComponent(cookie.substring(index + 1));
            cookiesStore[key] = value;
         }
      }
      return cookiesStore[name] || null;
   };

   this.getJSON = function(name)
   {
      var value = self.getString(name), result;
      try
      {
         result = value && evalJSON(value);
      }
      catch(ex)
      {
         console.error(ex);
         result = null;
      }
      finally
      {
         return result;
      }
   };

   this.writeString = function(name, value, expiration, pathValue, secure)
   {
      var cookie, expires,
         key = encodeURIComponent(name + ""),
         val = encodeURIComponent(value + ""),
         path = (typeof pathValue === "undefined") ? "/" : pathValue;

      if(expiration)
      {
         expires = new Date();
         //if expiration is negative (ie, expire the cookie) then set it to an hour prior to ensure expiration
         expires.setTime(expires.getTime() + (expiration > 0 ? expiration : -3600000));
      }

      cookie = key + "=" + val +
         (expires ? "; expires=" + expires.toUTCString() : "") +
         ("; path=" + path) +
         (secure === true ? "; secure" : "");

      if(expiration > 0)
      {
         cookiesStore[name] = value;
      }
      else
      {
         delete cookiesStore[name];
      }
      document.cookie = cookie;
   };

   this.writeJSON = function(name, object, expiration, pathValue, secure)
   {
      return self.writeString(name, toJSON(object), expiration, pathValue, secure);
   };

   this.expire = function(name)
   {
      self.writeString(name, "", -1);
   };
})();

}); // define