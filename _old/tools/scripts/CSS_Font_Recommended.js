function SelectFont(caller)
{
   caller = GetElement(this, caller);
   //else if the caller is not null, assume it's an element, if it is null...
   //if caller is still null, something is wrong, quit the function
   if(caller == null){return;}
   
   //find the section that the caller is in
   var parentSection = ParentSection(caller.id);
   //get the font-family desired
   var fontFamily = (caller.id).replace("font_","");
   //get the corresponding section in the body
   var textSection = document.getElementById((parentSection.id).replace("font","types"));
   
   //check the radio button if it was called by id and not from an event handler
   caller.checked = "checked";
   
   var family;
   var sizes = new Array(4);
   sizes[0] = "medium";
   sizes[1] = "medium";
   sizes[2] = "medium";
   sizes[3] = "medium";
   
   switch(fontFamily)
   {
      case 'arial':
         sizes[0] = ".85em";
         sizes[1] = ".95em";
         sizes[2] = "1.05em";
         sizes[3] = "1.1em";
         break;
      case 'garamond':
         sizes[0] = ".95em";
         sizes[1] = "1em";
         sizes[2] = "1.1em";
         sizes[3] = "1.2em";
         break;
      case 'verdana':
         sizes[0] = ".8em";
         sizes[1] = ".9em";
         sizes[2] = "1em";
         sizes[3] = "1.05em";
         break;
   }
   var lis = document.getElementById("types_maincontent").getElementsByTagName("li");
   var iterator = 0;
   //all this only works for the specific HTML on the page, this means --> bad code. do not do this again.
   for(i = 0; i < lis.length; i++)
   {
      if(i%2 == 0)
      {
         lis[i].firstChild.firstChild.nodeValue = "font-size: " + sizes[iterator];
      }
      else
      {
         lis[i].style.fontSize = sizes[iterator];
         lis[i].style.fontFamily = fontFamily + ", monospace";
         iterator++;
      }
   }
}
function AddEventHandlers()
{
   var elements = new Array();
   elements = GetInputFields("font_maincontent","radio");
   for(x = 0; x < elements.length; x++)
   {
      addEventHandler(elements[x],"onclick",SelectFont);
   }
}
addLoadEvent(function (){
   AddEventHandlers();
   SelectFont("font_verdana");
});