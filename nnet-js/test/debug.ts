/// <reference path="../typings/nnet.d.ts"/>
import nnet = require("nnet");

import type = nnet.type;
import node = nnet.dom.nodeTypeToString;
import escapeHTML = nnet.stringutil.escapeHTML;
import getOuterHTML = nnet.dom.getOuterHTML;

export = Debug;

module Debug
{
   // the element to output the debug information to
   var m_outputSource: any = null;

   // allows multiple entries to the output field
   // if this is false, each Debug call will overwrite the output text
   export var allowMultiple: boolean = false;

   // if true, functions are executed when iterating over the properties of objects
   // if false, functions can still be executed if they are passed manually in the properties array and end with "()"
   export var executeAllFunctions: boolean = false;

   export var showAllMembersByDefault: boolean = false;

   export function setOutputSource(value: HTMLInputElement): void;
   export function setOutputSource(value: HTMLElement): void;
   export function setOutputSource(value: Array<string>): void;
   export function setOutputSource(value: Console): void;
   export function setOutputSource(value: any): void
   {
      m_outputSource = value;
   }

   export function clear()
   {
      writeToOutputSource( "", true );
   }

   export function write(text: string, escapeHtml?: boolean): void
   {
      if(escapeHtml)
      {
         text = escapeHTML( text );
      }
      writeToOutputSource( text + "" );
   }

   export function event(obj: Event, properties?: Array<string>);
   export function event(obj: Event, properties?: boolean);
   export function event(obj: Event, properties: any)
   {
      return debugObject( DebugType.Event, obj, properties );
   }

   export function element(obj: Element, properties?: Array<string>);
   export function element(obj: Element, properties?: boolean);
   export function element(obj: Element, properties: any)
   {
      return debugObject( DebugType.Element, obj, properties );
   }

   export function error(obj: Error, properties?: Array<string>);
   export function error(obj: Error, properties?: boolean);
   export function error(obj: Error, properties: any)
   {
      return debugObject( DebugType.Error, obj, properties );
   }

   export function object(obj: any, properties?: Array<string>);
   export function object(obj: any, properties?: boolean);
   export function object(obj: any, properties: any)
   {
      return debugObject( DebugType.Object, obj, properties );
   }

   export function objectSimple(obj: any, properties?: Array<string>);
   export function objectSimple(obj: any, properties?: boolean);
   export function objectSimple(obj: any, properties: any)
   {
      return debugObject( DebugType.ObjectSimple, obj, properties );
   }

   enum DebugType
   {
      Event,
      Element,
      Error,
      Object,
      ObjectSimple
   }

   function writeToOutputSource(text: string, clearExisting: boolean=false): void
   {
      //first ensure that outputSource is valid
      if(m_outputSource !== null)
      {
         switch(type.of( m_outputSource ))
         {
            case type.array:
               writeToOutputSource.array( m_outputSource, text, clearExisting );
               break;
            case type.node:
               if("value" in m_outputSource)
               {
                  writeToOutputSource.input( m_outputSource, text, clearExisting );
               }
               else
               {
                  writeToOutputSource.html( m_outputSource, text, clearExisting );
               }
               break;
            default:
               if(m_outputSource == console)
               {
                  if(clearExisting === true)
                  {
                     console.clear();
                  }
                  console.debug( text );
               }
               else
               {
                  throw new TypeError( "Debug.outputSource is not a valid object. Must be console, an Array, or an HTML element" );
               }
         }
      }
      else
      {
         throw new TypeError( "Debug.outputSource must be set before using Debug methods." );
      }
   }

   // create seperate write methods so we can type outputSource and take advantage of the type checker
   module writeToOutputSource
   {
      export function array(source: Array<string>, text: string, clearExisting: boolean): void
      {
         if(clearExisting === true)
         {
            source.splice( 0, source.length );
         }
         source.push( text );
      }

      export function html(source: HTMLElement, text: string, clearExisting: boolean): void
      {
         if(clearExisting === true)
         {
            source.innerHTML = "";
         }

         //if we are allowing multiple debug outputs and there is currently content in the output, then add an hr
         if(source.innerHTML !== "" && allowMultiple)
         {
            source.innerHTML += '<hr class="nnet-debug-separator" />';
         }
         source.innerHTML += text;
      }

      export function input(source: HTMLInputElement, text: string, clearExisting: boolean): void
      {
         if(clearExisting === true)
         {
            source.value = "";
         }

         //if we are allowing multiple debug outputs and there is currently content in the output, then add an hr
         if(source.value !== "" && allowMultiple)
         {
            source.value += "---\n";
         }
         source.value += text;
      }
   }

   function toString(obj: any): string
   {
      var result: string;
      if(type.of( obj ) == type.node && (<Node>obj).nodeType == Node.ELEMENT_NODE)
      {
         result = getOuterHTML( obj, false, false );
      }
      else
      {
         result = (obj != null && type.of( obj.toString ) == type.function ? obj.toString() : obj + "");
      }
      return result;
   }

   function exec(code): string
   {
      var result = null;
      try
      {
         result = (type.of( code ) == type.function ? code() : eval( code ));
      }
      catch(e)
      {
         result = e;
      }
      finally
      {
         return escapeHTML( toString( result ) );
      }
   }

   function debugObject(debugType: DebugType, obj: any, properties: Array<string>);
   function debugObject(debugType: DebugType, obj: any, properties: boolean);
   function debugObject(debugType: DebugType, obj: any, properties: any)
   {
      var objToString = escapeHTML( toString( obj ) );

      // default to showAllMembersByDefault
      var selectedMembers: Array<string> = showAllMembersByDefault ? undefined : [];
      // if properties is an array, only show the members in said array
      if(type.of( properties ) == type.array)
      {
         selectedMembers = properties;
      }
      // else if properties is truthy, then show all members of the object (represented by undefined)
      else if(!!(properties) === true)
      {
         selectedMembers = undefined;
      }

      var tests: Array<{ name: string; value: Function }>;
      //get all members
      switch(debugType)
      {
         case DebugType.Element:
            tests = [
               //[".nodeName / .id / .className", "obj.nodeName + ' / ' + obj.id + ' / ' + obj.className"],
               {
                  name: "nodeType",
                  value: () => obj.nodeType + " (" + node( obj ) + ")"
               },
               {
                  name: "constructor",
                  value: () => obj.constructor
               },
               {
                  name: "childNodes.length",
                  value: () => obj.childNodes.length
               }
            ];
            break;
         case DebugType.Error:
            tests = [
               {
                  name: "name",
                  value: () => obj.name
               },
               {
                  name: "lineNumber / number",
                  value: () => obj.lineNumber + ' / ' + obj.number
               },
               {
                  name: "message / description",
                  value: () => obj.message + ' / ' + obj.description
               }
            ];
            break;
         case DebugType.Event:
            tests = [
               {
                  name: "type",
                  value: () => obj.type
               },
               {
                  name: "target / srcElement",
                  value: () => obj.target + ' / ' + obj.srcElement
               },
               {
                  name: "keyCode / charCode / which",
                  value: function()
                  {
                     var result = obj.keyCode +
                     (typeof obj.keyCode !== "undefined" ? ' (' + String.fromCharCode( obj.keyCode ) + ')' : "");
                     result += " / ";
                     result += obj.charCode +
                     (typeof obj.charCode !== "undefined" ? ' (' + String.fromCharCode( obj.charCode ) + ')' : "");
                     result += " / ";
                     result += obj.which +
                     (typeof obj.which !== "undefined" ? ' (' + String.fromCharCode( obj.which ) + ')' : "");
                     return result;
                  }
               },
               {
                  name: "button",
                  value: () => "obj.button"
               },
               {
                  name: "ctrlKey/shiftKey/altKey/metaKey",
                  value: () => obj.ctrlKey + '/' + obj.shiftKey + '/' + obj.altKey + '/' + obj.metaKey
               }
            ];
            break;
         // no extra information
         case DebugType.ObjectSimple:
            tests = [];
            break;
         default:
            tests = [
               {
                  name: "typeof / type.of()",
                  value: () => typeof obj + ' / ' + type.of( obj ) + ' (' + type[type.of( obj )] + ')'
               },
               {
                  name: "constructor",
                  value: () => obj.constructor
               },
               {
                  name: "length",
                  value: () => obj.length
               }
            ];
            break;
      }

      var testResults = "";
      if(tests.length > 0)
      {
         //run the tests and get the results
         testResults = "<ul class=\"nnet-debug-tests\">\n" +
            "\t<li>\n" + tests.map( x => "\t\t<p>" + x.name + "</p>\n\t\t<div>" + exec( x.value ) + "</div>" ).join( "\n</li>\n\t<li>\n" ) +
            "\n\t</li>\n" +
            "</ul>\n";
      }

      var html = debugType == DebugType.ObjectSimple ?
                    {
                       startList: "<ul class=\"nnet-debug-tests\">\n",
                       startHead: "\t<li>\n\t\t<p>",
                       endHead: "</p>\n",
                       startBody: "\t\t<div style=\"white-space:pre\">",
                       endBody: "</div>\n\t</li>\n",
                       endList: "</ul>\n"
                    } : {
                       startList: "<dl class=\"nnet-debug-members\">\n",
                       startHead: "\t<dt>",
                       endHead: "</dt>\n",
                       startBody: "\t<dd>",
                       endBody: "</dd>\n",
                       endList: "</dl>\n"
                    };
      var params = "";
      if(selectedMembers === undefined || selectedMembers.length > 0)
      {
         params = html.startList;
         var objType = type.of( obj );
         for(var property in obj)
         {
            if(!obj.hasOwnProperty( property ))
            {
               continue;
            }
            var item = obj[property];
            var itemType = type.of( item );
            // if we are iterating over all elements, check executeAllFunctions
            var executeItem = selectedMembers === undefined && executeAllFunctions === true;
            // check executeItem again here since it could have been passed manually in the properties array as "property()"
            if(executeItem || selectedMembers === undefined || selectedMembers.indexOf( property ) != -1 ||
            (executeItem = (itemType == type.function && selectedMembers.indexOf( property + "()" ) != -1)))
            {
               // special handling for strings so we don't enumerate over every single character in it
               if(objType == type.string && (property >= 0 && property < obj.length))
               {
                  continue;
               }

               params += html.startHead;
               params += property;
               // add type information
               params += ' <span class="nnet-debug-type">';
               params += "[" + type[itemType] + (itemType == type.node ? ": " + node( item ) : "") + "]";
               params += "</span>";
               params += html.endHead;

               params += html.startBody;
               try
               {
                  // debug properties one level deep in a more simplistic manner
                  if(itemType == type.object && item !== window)
                  {
                     // TODO: Just output JSON?
                     //params += nnet.serialization.JsonSerializer.encode( item, null, 3 );
                     var k: string[] = [];
                     for(var subProp in item)
                     {
                        if(!item.hasOwnProperty( subProp ))
                        {
                           continue;
                        }
                        k.push( subProp + ":" + escapeHTML( toString( item[subProp] ) ) );
                     }
                     params += k.join( debugType == DebugType.ObjectSimple ? " | " : "<br />" );
                  }
                  // if not an object, just output the property directly
                  else
                  {
                     params += escapeHTML( toString( executeItem ? item.call( obj ) : item ) );
                  }
               }
               catch(ex)
               {
                  params += "[DEBUG() ERROR] Error.name=\"" + ex.name + "\" Error.message=\"" + ex.message + "\"";
               }
               params += html.endBody;
            }
         }
         params += html.endList;
      }

      var resultSet = "<div class=\"nnet-debug\">\n";
      resultSet += "<p>" + objToString + "</p>\n";
      resultSet += testResults;
      resultSet += params + "</div>";

      writeToOutputSource( resultSet );
      //return the results also
      return resultSet;
   }
}