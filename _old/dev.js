document.bind = function(object, specialHandler)
{
   var debug = [];
   var self = (this == window) ? document : this;
   
   //if there is no specialHandler, just create an empty function so we can call it without error checking
   if($type(specialHandler) != "function")
   {
      specialHandler = function(){};
   }
   
   function rec(item, parentName)
   {
      parentName = parentName ? (parentName + ".") : "";
      
      for(propName in item)
      {
         if($type(item[propName]) == "object")
         {
            rec(item[propName], parentName + propName);
         }
         else if($type(item[propName]) == "array")
         {
            debug.push("[ARRAY] " + parentName + propName + ":" + item[propName]);
            specialHandler((parentName + propName), item[propName], object, null);
         }
         //ignore functions
         else if($type(item[propName]) == "function")
         {
         }
         else
         {
            var name = (parentName + propName);
            var val = item[propName];
            try
            {
               val = val.toString();
            }catch(e){}
            var el = $A(self.getElementsByName(name));

            //if there is only one element in the array we can set it directly
            if(el.length == 1)
            {
               el = el[0];
               switch(el.nodeName.toLowerCase())
               {
                  //loop through the select and find the proper option to select
                  case "select":
                     for(var i = 0; i < el.length; ++i)
                     {
                        if(el[i].value == val)
                        {
                           el.selectedIndex = i;
                        }
                     }
                     break;
                  case "input":
                     switch(el.type.toLowerCase())
                     {
                        case "text":
                        case "password":
                        case "hidden":
                           el.value = val;
                           break;
                     }
                     break;
                  case "textarea":
                     el.value = val;
                     break;
               }
               debug.push(name + ":" + val + " ==> " + el + " (set to: " + el.value + ")");
            }
            //if there is more than one element we either have a radio/checkbox collection, or a special situation
            else if(el.length > 1)
            {
               //if the element is an input of type radio or checkbox, then we can set it up
               if( (el[0].nodeName.toLowerCase() == "input") && (el[0].type.toLowerCase() == "radio" || el[0].type.toLowerCase() == "checkbox") )
               {
                  var set = false;
                  for(var i = 0; i < el.length; ++i)
                  {
                     if(el[i].value == val)
                     {
                        el[i].checked = "checked";
                        set = true;
                        
                        debug.push(name + ":" + val + " ==> " + el + " (set to: " + el[i].value + ")");
                        
                        if(el[0].type.toLowerCase() == "radio")
                        {
                           break;
                        }
                     }
                  }
                  if(!set)
                  {
                     debug.push("[FAILURE SETTING] " + name + ":" + val + " ==> " + el);
                  }
               }
               //otherwise there is something special going on so we pass it to another function to handle
               else
               {   
                  debug.push("[SPECIAL CASE] " + name + ":" + val + " ==> " + el);
                  specialHandler(name, val, object, el);
               }
            }
            else
            {
               debug.push(name + ":" + val + " ==> " + el);
            }
         }
      }
   }
   rec(object);
   
   return debug;
}