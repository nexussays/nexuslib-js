/// ts:import=_nnet,nnet
import nnet = require('../src/_nnet'); ///ts:import:generated
///ts:import=applyEnhancementsToPrototype
import applyEnhancementsToPrototype = require('../src/nnet/dom/applyEnhancementsToPrototype'); ///ts:import:generated
///ts:import=onInteractive
import onInteractive = require('../src/nnet/dom/onInteractive'); ///ts:import:generated
///ts:import=find
import find = require('../src/nnet/dom/find'); ///ts:import:generated
///ts:import=Key,Keys
import Keys = require('../src/nnet/util/Key'); ///ts:import:generated
///ts:import=Milliseconds,ms
import ms = require('../src/nnet/util/Milliseconds'); ///ts:import:generated
///ts:import=Cookie
import Cookie = require('../src/nnet/browser/Cookie'); ///ts:import:generated
///ts:import=EnhancedHTMLElement
import EnhancedHTMLElement = require('../src/nnet/dom/EnhancedHTMLElement'); ///ts:import:generated
///ts:import=EnhancedEvent
import EnhancedEvent = require('../src/nnet/event/EnhancedEvent'); ///ts:import:generated

///ts:import=debug,Debug
import Debug = require('./debug'); ///ts:import:generated
///ts:import=nav
import nav = require('./nav'); ///ts:import:generated
///ts:import=benchmark,Benchmark
import Benchmark = require('./benchmark'); ///ts:import:generated

//Hoist up some methods to window and set local vars for others
(<any>window).find = nnet.dom.find;

// not sure why but compiler isn't liking these not being defined
declare var unescape: any;
declare var escape: any;

//Make sure HTMLElements are extended
nnet.array.enhancePrototype();
applyEnhancementsToPrototype();

var editorTextarea,
    showAllMembers,
    showReturnValue,
    catchTabs,
    executionOutputTextarea: EnhancedHTMLElement;
var editorCookie: Cookie;
onInteractive( function()
{
   console.log( "dom init" );
   //create the dropdown menu
   nav.createMenu( "nav", nav.sections.Javascript );
   editorCookie = Cookie.retrieveOrCreate( "EditorPreferences" );

   //get the textarea with the code
   editorTextarea = find.id( "#execute_text" );
   editorTextarea.bind( "keydown", editorTextarea_keydown );
   editorTextarea.value = editorCookie.data.editorTextarea ? unescape( editorCookie.data.editorTextarea ) : "";

   // wireup execute button
   find.id( "#execute_go" ).bind( "click", __go );
   executionOutputTextarea = find.id( "executionOutputTextarea" );

   //setup options
   //default to verbose output (this value is actually checked in __go)
   showAllMembers = find.id( "#showmembers" );
   showAllMembers.checked = editorCookie.data.showAllMembers;
   //show the output of the eval
   showReturnValue = find.id( "#showoutput" );
   showReturnValue.checked = editorCookie.data.showReturnValue;
   //default to not capturing tabs (ie - tabbing will take you out of the textarea and to the next form element)
   catchTabs = find.id( "#catchtabs" );
   catchTabs.checked = editorCookie.data.catchTabs;

   //set the output source for Debug results
   Debug.setOutputSource( find.id( "#output" ) );
   Debug.allowMultiple = true;

   //update the displayed HTML with the data actually on the page
   //update the cookie which stores preference values
   __updateTestingHTMLAndCookie();

   var toggle = find.id( "#html_toggle_link" );
   toggle.bind( "click", function()
   {
      var html = find.id( "#testinghtml" );
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
   } );
   toggle.trigger( "click" );
} );

function __updateTestingHTMLAndCookie()
{
   var testinghtml = find.id( "#testinghtml" );
   testinghtml.innerHTML = find.id( "#extra" ).getOuterHTML( true, true ).replace( /\t/g, "   " );

   editorCookie.data.showAllMembers = showAllMembers.checked;
   editorCookie.data.showReturnValue = showReturnValue.checked;
   editorCookie.data.catchTabs = catchTabs.checked;
   editorCookie.data.editorTextarea = escape( editorTextarea.value );
   editorCookie.expireIn( ms.days( 90 ) );
   editorCookie.save();
}

function editorTextarea_keydown(e:EnhancedEvent)
{
   var tab = "   ",
       start = editorTextarea.selectionStart,
       end = editorTextarea.selectionEnd;

   //only catch tabs if the corresponding checkbox is checked
   if(catchTabs.checked && e.keyInfo.code == Keys.Tab)
   {
      //prevent the default action
      e.preventDefault();

      if(e.keyInfo.shift)
      {
         editorTextarea.value = editorTextarea.value.substr( 0, start ) + tab +
            editorTextarea.value.substr( end, editorTextarea.value.length );
      }
      else
      {
         editorTextarea.value = editorTextarea.value.substr( 0, start ) + tab +
            editorTextarea.value.substr( end, editorTextarea.value.length );
      }

      editorTextarea.focus();

      editorTextarea.setSelectionRange( start + tab.length, start + tab.length );
   }
   if(e.keyInfo.ctrl && (e.keyInfo.code == Keys.Enter || e.keyInfo.stringValue == "S"))
   {
      //prevent the default action
      e.preventDefault();

      find.id( "#execute_go" ).trigger( "click" );
   }
}

function __go()
{
   //determine properties
   Debug.showAllMembersByDefault = showAllMembers.checked;
   //Debug.allowMultiple = allowmultiple.checked;

   //display the waiting image
   find.id( "#waiting" ).addClass( "hidden" );

   //reset html of output area so that is not included in any code executed below
   //(eg - if the debug output element is called using get() in the debug code)
   Debug.clear();

   setTimeout( function()
   {
      var end,
          start = Date.now(),
          result;
      try
      {
         //execute the code in the textarea
         result = eval( editorTextarea.value );
         if(showReturnValue.checked)
         {
            out( "<textarea id=\"eval_results\" readonly=\"readonly\" rows=\"3\" cols=\"10\">" + result + "</textarea>" );
         }
      }
      catch(ex)
      {
         Debug.error( ex, true );
      }
      //end the timer and hide the waiting image
      end = Date.now();

      find.id( "#waiting" ).addClass( "hidden" );

      //update the testing HTML to reflect any changes
      //update the cookie with updated preferences
      __updateTestingHTMLAndCookie();

      executionOutputTextarea.innerHTML = (end - start) / 1000 + " seconds; " + editorTextarea.value.length + " characters";
   }, 1 );
}

function el(x, props)
{
   Debug.element( x, props );
}

function obj(x, props)
{
   Debug.object( x, props );
}

function simp(x, props)
{
   Debug.objectSimple( x, props );
}

function loop(times, code, context)
{
   var b = new Benchmark();
   simp( b.loop( times, code, context ), true );
}

function out(...params: any[])
{
   //"convert" the items to strings so that null and undefined are actually written
   Debug.write( params.map( x => x += "" ).join( "<br />" ), false );
}