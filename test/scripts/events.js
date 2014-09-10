requirejs.config({ paths: { nnet: './out/nnet' } });
requirejs.onError = function (err) {
   console.error(err.requireType + ', modules=' + err.requireModules);
   throw err;
};
require([
   "./out/_nnet",
   "nnet/_dom",
   "nnet/dom/onInteractive",
   "nnet/dom/ElementUtils",
   "./debug",
   "./webtest"
], function( nnet, dom, onInteractive, Element, Debug ) {
Element.applyElementPrototypes();
//Hoist get to window
window.get = nnet.dom.get;
onInteractive( function()
{
   //create the dropdown menu
   CreateMenu( "nav", Sections.Javascript.Menu );

   Debug.outputSource = get.id( "output" );
   Debug.allowMultiple = true;

   get( "input[type='checkbox']" ).forEach( function( x )
   {
      x.onclick = detectevent_click;
      x.checked = false;
      x.onclick();
   } );

   log.el = get.id( "log" );
   log.clear();
   get.id( "log_clear" ).onclick = log.clear;

   var key = get.id( "keyevent" );
   key.bind( "keyup", stopEvent );
   key.bind( "keydown", stopEvent );
   key.bind( "keypress", stopEvent );
   
   var input = get.id( "inputevent" );
   input.bind( "click", stopEvent );
   input.bind( "mouseup", stopEvent );
   input.bind( "mousedown", stopEvent );
   input.bind( "contextmenu", stopEvent );
   input.bind( "mousemove", stopEvent );
   input.bind( "mouseout", stopEvent );
   input.bind( "mouseover", stopEvent );
   input.bind( "touchstart", stopEvent );
   input.bind( "touchend", stopEvent );
   input.bind( "touchcancel", stopEvent );
   input.bind( "touchleave", stopEvent );
   input.bind( "touchmove", stopEvent );
} );
function stopEvent(e)
{
   e.preventDefault();
}
function logEvent( e )
{
   Debug.clear();
   //output our custom information on the event
   Debug.Simple( e, ["type", "pageX", "pageY", "screenX", "screenY", "clientX", "clientY", "target", "relatedTarget", "mouse", "key", "isMouseEvent()", "isKeyboardEvent()", "isTouchEvent()"] );
   //output information on the entire event
   Debug.Event( e.originalEvent );
   //add to list of events and scroll the textbox
   log.write( e.type + " " + this + " (" + e.pageX + ", " + e.pageY + ")" );

   if( "value" in this )
   {
      this.value = "";
   }
}
//aditional utility functions
function detectevent_click()
{
   var el;
   if(/^key/.test( this.id ))
   {
      el = get.id( "keyevent" );
   }
   else
   {
      el = get.id( "inputevent" );
   }

   log.write( this.id + ( this.checked ? " ADDED" : " REMOVED" ) );
   el[this.checked ? "bind" : "unbind"]( this.id, logEvent );
}
var log =
{
   clear: function()
   {
      if( log.el )
      {
         log.el.value = "time   : e.type [this] (e.pageX, e.pageY)\r\n";
      }
   },
   write: function()
   {
      var time = new Date();
      if( log.el )
      {
         time = time.getUTCMinutes() + "" + time.getUTCSeconds() + "" + time.getUTCMilliseconds();
         while( time.length < 7 )
         {
            time += " ";
         }
         log.el.value += time + ": " + arguments[0] + "\r\n";
         log.el.scrollTop = log.el.scrollHeight;
      }
   }
};

} ); //require