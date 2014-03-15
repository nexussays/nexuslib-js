define(['nnet/error'], function(NNetError){

//
// HTTP REQUEST
//
function HttpRequest(url, params)
{
   this.request = null;
   this.params = params || {};
   this.body = null;
   this.headers = {};
   this.url = url || "";
   
   this.response = {
      text : null,
      xml : null,
      time : 0,
      status : 0
   };
   
   this.onComplete = function(){};
   
   //create object
   if(typeof window.XMLHttpRequest != "undefined")
   {
      this.request = new XMLHttpRequest();
   }
   //use one of IE's methods
   else if(typeof window.ActiveXObject != "undefined")
   {
      //this.request = new ActiveXObject("Msxml2.XMLHTTP");
      this.request = new ActiveXObject("Microsoft.XMLHTTP");
   }
   else
   {
      throw new NNetError("HttpRequest is not supported in this browser");
   }
}
HttpRequest.prototype = 
{
   sendGet : function(async)
   {
      return this.send("GET", async);
   },
   sendPost : function(async)
   {
      return this.send("POST", async);
   },
   sendPut : function(async)
   {
      return this.send("PUT", async);
   },
   sendDelete : function(async)
   {
      return this.send("DELETE", async);
   },
   sendHead : function(async)
   {
      return this.send("HEAD", async);
   },
   send : function(httpmethod, asynchronous)
   {
      var self = this, async = (asynchronous === false ? false : true), method = httpmethod.toUpperCase();
      var querystring = [], x, time;
      
      //if we are sending an entity body, ignore the query string
      if(this.body == null)
      {
         for(x in this.params)
         {
            querystring.push(encodeURIComponent(x) + "=" + encodeURIComponent(this.params[x]));
         }
         querystring = querystring.join("&");
      }

      switch(method)
      {
         case "GET":
            this.url += (querystring.length > 0 ? "?" + querystring : "");
            querystring = null;
            break;
         case "POST":
         case "PUT":
         case "DELETE":
            if(querystring.length > 0)
            {
               this.headers["Content-Type"] = "application/x-www-form-urlencoded";
            }
            else
            {
               //TODO: Need to determine how we're getting content-type here
               this.headers["Content-Type"] = "application/xml";
               querystring = null;
            }
            break;
         case "HEAD":
            throw new NNetError("HttpRequest.sendHead() is not yet implemented");
            break;
         default:
            throw new NNetError("Improper value \""+method+"\" passed to HttpRequest.send() method. Valid values are \"GET, POST, PUT, DELETE, HEAD\"");
      }
      
      this.request.open(method, this.url, async);
      this.request.onreadystatechange = function(){self.stateChange();};
      
      this.headers["Connection"] = "close";
      //Cache-Control: no-cache
      //Pragma: no-cache
      
      for(header in this.headers)
      {
         this.request.setRequestHeader(encodeURIComponent(header), encodeURIComponent(this.headers[header]));
      }
      
      this.response.time = new Date();
      this.request.send(this.body || querystring);
            
      return true;
   },
   stateChange : function()
   {
      switch(this.request.readyState)
      {
         case 0:
            break;
         case 1:
            break;
         case 2:
            //try{this.response.status = this.request.status;}catch(e){}
            break;
         case 3:
            //this.response = {"text":this.request.responseText,"xml":this.request.responseXML};
            break;
         case 4:
            this.response.status = this.request.status;
            this.response.time = (new Date() - this.response.time);
            this.response.text = this.request.responseText || null;
            this.response.xml = this.request.responseXML || null;
            //Debug.Object(this.request, true);
            this.onComplete(this.response);
            break;
         default:
            throw new NNetError("INVALID readyState \"" + this.request.readyState + "\" in HTTPRequest");
      }
   }
};

return HttpRequest;

}); // define