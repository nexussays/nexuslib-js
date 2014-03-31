define(["nnet/dom/get", "nnet/html/html"], function(get, HTML){

//
// ADD SCRIPT
//

// this is nearly a decade old, so it's probably unecessary now

function using(scriptName)
{
   var addScript = function(url, head)
   {
      get.byTag(head===true?"head":"body")[0].appendChild(HTML.script({
         "type": "text/javascript",
         "language": "Javascript",
         "src": url
      }));
   };

   if(!/\.js$/.test(scriptName))
   {
      scriptName += ".js";
   }
   //find core.js include and use the same path
   var scriptTags = get.byTag("script");
   for(var i = 0; i < scriptTags.length; ++i)
   {
      if(scriptTags[i].src && /core\.js$/.test(scriptTags[i].src))
      {
         //get the path to the javascript file
         var path = scriptTags[i].src.replace(/core\.js$/,'');
         
         addScript(path + scriptName, true);
         break;
      }
   }
}
// using("get.js");
// using("get");
// using("debug.js");

return using;

}); // define