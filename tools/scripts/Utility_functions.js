///<reference path="../../../Javascript/core.js" />
function DisableFields(section)
{
    GetInputFields(section, "text").forEach(function(x){x.disabled = true;});
}
//type should be "radio" or "text"
function GetInputFields(parent, type)
{
    var elements = [];
    get.call(parent, "input", "select").forEach(function(x)
    {
        //type should be "radio" or "text"
        if(x.type == type || (type=="text" && x.nodeName.toLowerCase()=="select"))
        {
            elements.push(x);
        }
    });
    return elements;
}
function ShowNote(id, show)
{
    //assume that if the id passed is not a string it is the element to change
    (id.isString ? get.id(id) : id).style.visibility = show ? "visible" : "hidden";
}
function DisplayBlockLevel(id, show)
{
    (id.isString ? get.id(id) : id).style.display = show ? "block" : "none";
}