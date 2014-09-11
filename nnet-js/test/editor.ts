/// <reference path="debug.d.ts" />

///ts:import=_nnet,nnet
import nnet = require('../src/_nnet'); ///ts:import:generated
///ts:import=applyEnhancementsToPrototype
import applyEnhancementsToPrototype = require('../src/nnet/dom/applyEnhancementsToPrototype'); ///ts:import:generated
///ts:import=onInteractive
import onInteractive = require('../src/nnet/dom/onInteractive'); ///ts:import:generated
///ts:import=getElement
import getElement = require('../src/nnet/dom/getElement'); ///ts:import:generated
///ts:import=Keyboard,Keys
import Keys = require('../src/nnet/util/Keyboard'); ///ts:import:generated
///ts:import=BrowserUtils,Browser
import Browser = require('../src/nnet/browser/BrowserUtils'); ///ts:import:generated
///ts:import=Milliseconds
import Milliseconds = require('../src/nnet/util/Milliseconds'); ///ts:import:generated
///ts:import=Cookie
import Cookie = require('../src/nnet/browser/Cookie'); ///ts:import:generated

import Debug = require("debug");
///ts:import=webtest
import webtest = require('./webtest'); ///ts:import:generated
///ts:import=benchmark,Benchmark
import Benchmark = require('./benchmark'); ///ts:import:generated

//Hoist up some methods to window and set local vars for others
(<any>window).get = nnet.dom.getElement;

declare var unescape: any;
declare var escape: any;

//Make sure HTMLElements are extended
applyEnhancementsToPrototype();

var execute_text,
    showmembers,
    showoutput,
    catchtabs,
    output_executiondetails;
var editorCookie;
onInteractive( function()
{
   console.log( "dom init" );
   //create the dropdown menu
   webtest.createMenu( "nav", webtest.sections.Javascript.Menu );
   editorCookie = Cookie.retrieveOrCreate( "EditorPreferences" );

   //get the textarea with the code
   execute_text = getElement.id( "#execute_text" );
   execute_text.bind( "keydown", execute_text_onkeydown );
   execute_text.value = editorCookie.data.execute_text ? unescape( editorCookie.data.execute_text ) : "";
   //wireup event handlers
   getElement.id( "#execute_go" ).onclick = __go;
   output_executiondetails = getElement.id( "output_executiondetails" );

   //setup options
   //default to verbose output (this value is actually checked in __go)
   showmembers = getElement.id( "#showmembers" );
   showmembers.checked = editorCookie.data.showmembers;
   //show the output of the eval
   showoutput = getElement.id( "#showoutput" );
   showoutput.checked = editorCookie.data.showoutput;
   //default to not capturing tabs (ie - tabbing will take you out of the textarea and to the next form element)
   catchtabs = getElement.id( "#catchtabs" );
   catchtabs.checked = editorCookie.data.catchtabs;

   //set the output source for Debug results
   Debug.outputSource = getElement.id( "#output" );
   Debug.allowMultiple = true;

   //update the displayed HTML with the data actually on the page
   //update the cookie which stores preference values
   __updateTestingHTMLAndCookie();

   var toggle = getElement.id( "#html_toggle_link" );
   toggle.bind( "click", function()
   {
      var html = getElement.id( "#testinghtml" );
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
   var testinghtml = getElement.id( "#testinghtml" );
   testinghtml.innerHTML = getElement.id( "#extra" ).getOuterHTML( true ).replace( /\t/g, "   " );

   editorCookie.data.showmembers = showmembers.checked;
   editorCookie.data.showoutput = showoutput.checked;
   editorCookie.data.catchtabs = catchtabs.checked;
   editorCookie.data.execute_text = escape( execute_text.value );
   editorCookie.expireIn( Milliseconds.days( 30 ) ).save();
}

function execute_text_onkeydown(e)
{
   var tab = "   ",
       start = execute_text.selectionStart,
       end = execute_text.selectionEnd;

   //only catch tabs if the corresponding checkbox is checked
   if(catchtabs.checked && e.key.code == Keys.Tab)
   {
      //prevent the default action
      e.preventDefault();

      if(e.key.shift)
      {
         execute_text.value = execute_text.value.substr( 0, start ) + tab +
            execute_text.value.substr( end, execute_text.value.length );
      }
      else
      {
         execute_text.value = execute_text.value.substr( 0, start ) + tab +
            execute_text.value.substr( end, execute_text.value.length );
      }

      execute_text.focus();

      execute_text.setSelectionRange( start + tab.length, start + tab.length );
   }
   if(e.key.ctrl && (e.key.code == Keys.Enter || e.key.value == "S"))
   {
      //prevent the default action
      e.preventDefault();

      getElement.id( "#execute_go" ).trigger( "click" );
   }
}

function __go()
{
   //determine properties
   Debug.showAllMembers = showmembers.checked;
   //Debug.allowMultiple = allowmultiple.checked;

   //display the waiting image
   getElement.id( "#waiting" ).addClass( "hidden" );

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
         result = eval( execute_text.value );
         if(result != null && showoutput.checked)
         {
            out( "<textarea id=\"eval_results\" readonly=\"readonly\" rows=\"3\" cols=\"10\">" + result + "</textarea>" );
         }
      }
      catch(ex)
      {
         Debug.Error( ex, true );
      }
      //end the timer and hide the waiting image
      end = Date.now();

      getElement.id( "#waiting" ).addClass( "hidden" );

      //update the testing HTML to reflect any changes
      //update the cookie with updated preferences
      __updateTestingHTMLAndCookie();

      output_executiondetails.innerHTML = (end - start) / 1000 + " seconds; " + execute_text.value.length + " characters";
   }, 100 );
}

function el(x, props)
{
   Debug.Element( x, props );
}

function obj(x, props)
{
   Debug.Object( x, props );
}

function simp(x, props)
{
   Debug.Simple( x, props );
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