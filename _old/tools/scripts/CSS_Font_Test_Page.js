///<reference path="../../../Javascript/core.js" />
function ChangeTextSize()
{
    //find the section that the caller is in
   var parentSection = getAncestor(this, "fieldset");
   //get the type by retreiving the last two chars of the id (ids end in _px _pt etc)
   var sizeType = (this.id).substring((this.id).length-2);
   //changing the font in the corresponding text section (ids are of the same format minus this one word)
   var textSection = get.id((parentSection.id).replace("size","text"));
   
   //the current value for the size and font
   var size = textSection.style.fontSize;
   var family = textSection.style.fontFamily;
   
   switch(sizeType)
   {
      case 'kw':
         size = this.options[this.selectedIndex].value;
         break;
      case 'px':
      case 'pt':
      case 'em':
         size = this.value + sizeType;
         break;
      case 'pc':
         size = this.value + "%";
         break;
      case 'ft':
         //have to make a change here since font is a special case
         textSection = get.id((parentSection.id).replace("font","text"));
         //get and set the new font
         family = this.options[this.selectedIndex].value;
         textSection.style.fontFamily = family;
         //return instead of break so the font size isn't changed
         return;
   }
   //set the font size
   textSection.style.fontSize = size;
}
function ChangeTextSizeUnit()
{
    this.checked = true;
    
    //get info about the caller
    var controllingTextField = get.id((this.id).replace("type","value"));

    //disable all text fields in the section the calling element is contained in
    DisableFields(getAncestor(this, "fieldset"));
    //re-enable the element pointed to by the calling element (radio buttons control the text boxes)
    controllingTextField.disabled = false;
    
    //call the change function
    controllingTextField.onchange();
}
function HoverColors()
{
   var marginSize = "10px";
   var main = "#fff";
   var sub = "#fff";
   var form = "#fff";
   var font_maincontent = get.id("#font_maincontent");
   var text_maincontent = get.id("#text_maincontent");
   var size_maincontent = get.id("#size_maincontent");
   var text_subcontent = get.id("#text_subcontent");
   var size_subcontent = get.id("#size_subcontent");
   var link = get.id("#showcoloring");
   
   //determine action by the inner text of the element, not the best idea, but it works for this
   if(link.innerHTML == "Show Informative Coloring")
   {
      //       RGB
      main = "#eef";
      sub =  "#eed9d9";//#EE6363
      form = "#cec";
      text_maincontent.style.marginLeft = "0";
      text_maincontent.style.borderLeft = marginSize + " solid " + form;
      link.innerHTML = "Hide Informative Coloring";
   }
   else
   {
      link.innerHTML = "Show Informative Coloring";
      text_maincontent.style.marginLeft = marginSize;
      text_maincontent.style.borderLeft = "0";
   }
   
   font_maincontent.style.backgroundColor = form;
   text_maincontent.style.backgroundColor = size_maincontent.style.backgroundColor = main;
   text_subcontent.style.backgroundColor = size_subcontent.style.backgroundColor = sub;  
}
window.load.copySection = function()
{
    var subList = get("#size_subcontent ul")[0];
    var mainList = get("#size_maincontent ul")[0];
    subList.innerHTML = mainList.innerHTML.replace(/maincontent/g,"subcontent");
}
window.load.init = function()
{
    var elements = new Array();
    get("fieldset").forEach(function(fieldset)
    {
        //if the fieldset element's id starts with "size"
        if((fieldset.id).substring(0,4) == "size")
        {
            //add event handlers to radio buttons
            GetInputFields(fieldset.id,"radio").forEach(function(x){x.onclick = ChangeTextSizeUnit;});
            //add events for textboxes
            GetInputFields(fieldset.id,"text").forEach(function(x)
            {
                x.onchange = ChangeTextSize;
                x.onkeyup = ChangeTextSize;
            });
        }
    });
    
    //setup defaults
    get.id("size_maincontent_type_kw").onclick();
    get.id("size_subcontent_type_em").onclick();
    
    //add for font selection
    var id = get.id("font_maincontent_select_ft");
    id.onfocus = function(){ShowNote('font_select_note',true);};
    id.onblur = function(){ShowNote('font_select_note',false);};
    id.onblur();
    id.onkeyup = ChangeTextSize;
    id.onchange = ChangeTextSize;
    id.onchange();
    
    get.id("showcoloring").onclick = HoverColors;
};