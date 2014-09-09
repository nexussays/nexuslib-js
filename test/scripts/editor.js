requirejs.config({ paths: { nnet: './out/nnet' } });
requirejs.onError = function (err) {
   console.error(err.requireType + ', modules=' + err.requireModules);
   throw err;
};
require([
   "./out/_nnet",
   "nnet/_dom",
   "nnet/dom/onInteractive",
   "nnet/browser/Cookie",
   "nnet/dom/ElementUtils",
   "./debug",
   "nnet/browser/BrowserUtils",
   "nnet/util/Milliseconds",
   "nnet/event/Keys",
   "./webtest",
   "./benchmark"
], function( nnet, dom, onInteractive, Cookie, Element, Debug, Browser, Milliseconds, Keys ) {

//Hoist up some methods to window
window.get = nnet.dom.get;

//window.HTML = nnet.html.HTML;
//Make sure HTMLElements are extended
Element.applyElementPrototypes();

var execute_text, showmembers, showoutput, catchtabs, output_executiondetails;
var waitingImage, editorCookie;
onInteractive( function()
{
   console.log( "dom init" );
   //create the dropdown menu
   CreateMenu("nav", Sections.Javascript.Menu);
   editorCookie = Cookie.retrieveOrCreate("EditorPreferences");
   
   //get the textarea with the code
   execute_text = get.id("#execute_text");
   execute_text.bind("keydown", execute_text_onkeydown);
   execute_text.value = editorCookie.data.execute_text ? unescape(editorCookie.data.execute_text) : "";
   //wireup event handlers
   get.id("#execute_go").onclick = __go;
   output_executiondetails = get.id("output_executiondetails");
   
   waitingImage = get.id("#waiting");
   
   //setup options
   //default to verbose output (this value is actually checked in __go)
   showmembers = get.id("#showmembers");
   showmembers.checked = editorCookie.data.showmembers;
   //show the output of the eval
   showoutput = get.id("#showoutput");
   showoutput.checked = editorCookie.data.showoutput;
   //default to not capturing tabs (ie - tabbing will take you out of the textarea and to the next form element)
   catchtabs = get.id("#catchtabs");
   catchtabs.checked = editorCookie.data.catchtabs;
   
   //set the output source for Debug results
   Debug.outputSource = get.id("#output");
   Debug.allowMultiple = true;
   
   //update the displayed HTML with the data actually on the page
   //update the cookie which stores preference values
   __updateTestingHTMLAndCookie();
   
   var toggle = get.id("#html_toggle_link");
   toggle.onclick = function()
   {
      var html = get.id("#testinghtml");
      if(html.style.display == "none")
      {
         html.style.display = "block";
         this.innerHTML = "Hide available testing HTML&#8682;";
      }
      else
      {
         html.style.display = "none";
         this.innerHTML = "Show available testing HTML&#8681;";
      }
   }
   toggle.onclick();
});
function __updateTestingHTMLAndCookie()
{
   var testinghtml = get.id("#testinghtml");
   var temp = get.id("#extra");
   testinghtml.innerHTML = Element.getOuterHTML(temp, true).replace(/\t/g,"   ");
   
   editorCookie.data.showmembers = showmembers.checked;
   editorCookie.data.showoutput = showoutput.checked;
   editorCookie.data.catchtabs = catchtabs.checked;
   editorCookie.data.execute_text = escape(execute_text.value);
   editorCookie.expireIn(Milliseconds.days(30)).save();
}
function execute_text_onkeydown(e)
{
   var tab = "   ", start = execute_text.selectionStart, end = execute_text.selectionEnd;
   
   //only catch tabs if the corresponding checkbox is checked
   if(catchtabs.checked && e.key.code == Keys.Tab)
   {
      //prevent the default action
      e.preventDefault();
      
      if(e.key.shift)
      {
         execute_text.value = execute_text.value.substr(0, start) + tab +
            execute_text.value.substr(end, execute_text.value.length);
      }
      else
      {
         execute_text.value = execute_text.value.substr(0, start) + tab +
            execute_text.value.substr(end, execute_text.value.length);
      }
         
      execute_text.focus();
      
      execute_text.setSelectionRange(start + tab.length, start + tab.length);
   }
   if(e.key.ctrl && (e.key.code == Keys.Enter || e.key.value == "S"))
   {
      //prevent the default action
      e.preventDefault();
      
      get.id("#execute_go").onclick();
   }
}
function __go()
{
   //determine properties
   Debug.showAllMembers = showmembers.checked;
   //Debug.allowMultiple = allowmultiple.checked;
   
   //display the waiting image
   Element.removeClass(waitingImage, "hidden");
      
   //reset html of output area so that is not included in any code executed below
   //(eg - if the debug output element is called using get() in the debug code)
   Debug.clear();
   
   setTimeout(function()
   {
      var end, start = new Date(), result;
      try
      {
         //execute the code in the textarea
         result = eval(execute_text.value);
         if(result != null && showoutput.checked)
         {
            out("<textarea id=\"eval_results\" readonly=\"readonly\" rows=\"3\" cols=\"10\">" + result + "</textarea>");
         }
      }
      catch(ex)
      {
         Debug.Error(ex, true);
      }
      //end the timer and hide the waiting image
      end = new Date();

      Element.addClass(waitingImage, "hidden");
      
      //update the testing HTML to reflect any changes
      //update the cookie with updated preferences
      __updateTestingHTMLAndCookie();
      
      output_executiondetails.innerHTML = (end-start)/1000 + " seconds; " + execute_text.value.length + " characters";
   }, 100);
}
function el(x, props)
{
   Debug.Element(x, props);
}
function obj(x, props)
{
   Debug.Object(x, props);
}
function simp(x, props)
{
   Debug.Simple(x, props);
}
function loop(times, code, context)
{
   simp(Benchmark.loop(times, code, context), true);
}
function out()
{
   //"convert" the items to strings so that null and undefined are actually written
   Debug.write(Array.prototype.map.call(arguments, function(x){return x += "";}).join("<br />"), false);
}

}); //require