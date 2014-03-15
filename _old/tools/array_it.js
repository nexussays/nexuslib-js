///<reference path="../../Javascript/core.js" />
function Go()
{
	var results = [];
	var arrayName = get.id("#name").value || "array";
	var output_array = get.id("#output_array");
	var output_text = get.id("#output_text");
	var info = get.id("info");
	var x, ln;

	//hide it while updates are taking place
	output_array.style.visibility = "hidden";
	output_text.style.visibility = "hidden";

	//clear the output and info divs
	output_array.value = "";
	output_text.value = "";
	
	//split on spaces
	results = Cleanup(get.id("#block").value).split(" ");
	
	if(get.id("sort_alpha").checked)
	{
		//sort alphabetically, case insensitive
		results.sort(Sort.alphanum_i);
	}
	else
	{
		//sort by word size, smallest to largest, and within that sort alphabetically
		results.sort(Sort.multi(Sort.length, Sort.alphanum_i));
	}
	
	//determine instantiation type
	if(get.id("type_enumerated").checked)
	{
		output_array.value += arrayName + " = new Array(" + results.length + ");";
		for(x = 0, ln = results.length; x < ln; x++)
		{
			output_array.value += arrayName + "[" + x + "] = \"" + results[x] + "\";";
		}
	}
	else
	{
		output_array.value += arrayName + " = [";
		for(x = 0, ln = results.length; x < ln; x++)
		{
			output_array.value += "\"" + results[x] + "\"" + (x!=ln-1 ? ", " : "");
		}
		output_array.value += "];";
	}
	
	//replace form text with cleaned up text
	output_text.value = results.join(" ");

	info.innerHTML = "Number of Items: " + results.length;

	output_array.rows = 20;//results.length;
	output_text.rows = 20;
	output_array.style.visibility = "visible";
	output_text.style.visibility = "visible";

	return false;
}

function Cleanup(string)
{
    //replace carriage returns with line feeds
    string = string.replace(/\r/gi, "\n");
    //replace multiple line feeds with one line feed
	string = string.replace(/\n+/gi, "\n");
	//replace new lines with the literal string "\n"
    //string = string.replace(/\n/g, "\\n ");
    
    if(get.id("clean_asterisk").checked)
    {
        string = string.replace(/\*/g, "");
    }
    if(get.id("clean_punctuation").checked)
    {
        string = string.replace(/[:\.;",']/g, "");
    }
    if(get.id("clean_numbersign").checked)
    {
        string = string.replace(/\#/g, "");
    }
    if(get.id("clean_whitespace").checked)
    {
        string = string.replace(/\s+/g, " ");
    }
    if(get.id("clean_duplicates").checked)
    {
        var hash = {}, newarray = [];
        string.split(" ").forEach(function(x)
        {
            if(hash[x] != true)
            {
                newarray.push(x);
                hash[x] = true;
            }
        });
        string = newarray.join(" ");
    }
    return string.trim();
}
//C#
//keywords = "abstract as base bool break byte case catch char checked class const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long namespace new null object operator out override params private protected public readonly ref return sbyte sealed short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using virtual void volatile while";

//Javascript
//keywords = "abstract boolean break byte case catch char class const continue debugger default delete do double else enum export extends false final finally float for function goto if implements import in instanceof int interface long native new null package private protected public return short static super witch synchronized this throw throws transient true try typeof var void volatile while with";