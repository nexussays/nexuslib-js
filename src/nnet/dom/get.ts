// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import _t = require("nnet/util/obj/t");
import Types = require("nnet/util/obj/Types");
import _toArray = require("nnet/util/array/toArray");
import _escapeRegExp = require("nnet/util/string/escapeRegExp");

export = get;
/// Usage:      get(args)
/// Parameters: 0 - many; space-seperated strings of element identifiers
/// Returns:    An array containing the results of the query (an empty array if no results were found).
///             If one argument is passed containing a single id identifier, then the resulting element
///             or null is returned directly (not as the zero index of an array).
function get(): Array<Node>;
function get(query: string): Array<Node>;
function get(...query): Array<Node>;
function get(query: string[]): Array<Node>;
function get()
{
   var self = (this == window || !("nodeType" in this)) ? document : this;
   var elements = [], result, query, match, match_tag, argument, arglength = arguments.length, x = 0, i = 0, returnSingle = false, tempArray, queryItem;

   //if "x.get()" was called, return all the elements contained in "x"
   if(arglength === 0)
   {
      elements = get.tag("*");
   }
   else
   {
      //for each argument passed:
      //1) get each argument and split it on any spaces
      //2) go through each resulting word, find it in the DOM, then continue on to its descendants (if any)
      //3) concatenate the results to an array which contains all the results for all arguments
      for(; x < arglength; ++x)
      {
         argument = arguments[x];
         //if the argument is null, undefined, an empty string, etc then skip it
         if(!argument)
         {
            continue;
         }
         //otherwise if it is not null and is a string, search for it
         else if(_t(argument) == Types.string)
         {
            //split the current argument by commas
            //if there is more than one result, then get each individually
            //var parts = argument.split(",");
            //for(i = 0; i < parts.length; ++i)
            //{
            //query = parts[i].trim();
            query = argument.trim();
            //if there is whitespace after trimming, we are getting multiple elements
            if(/ /.test(query))
            {
               //we will be using the example "ul li"
               query = query.split(/\s+/);
               //get the first item and then remove it and work on the next ones from here on out, null is passed as a second parameter to prevent single #id calls from returning an element instead of an array
               //eg - we now have all uls in the page
               result = get.call(self, query.shift(), null);
               //loop through each of the parameters given
               //eg - "li"
               while(query.length !== 0)
               {
                  //if the current level returned an array of results, we need to loop through them
                  //eg - once we have all the uls on the page, we will need to loop through them and, for each one, get all the lis underneath it
                  // * create a temporary array to store these items
                  // * remove the current item from the array                     
                  // * loop through all the items and get all the items that match the current parameter
                  //eg - loop through all the uls and get all lis
                  for(i = 0, tempArray = [], queryItem = query.shift(); i < result.length; ++i)
                  {
                     //we are concatenating the array so all our results are combined
                     tempArray = tempArray.concat(get.call(result[i], queryItem, null));
                  }
                  //then set result equal to this and continue on to the next item in split
                  result = tempArray;
               }
            }
            else
            {
               match = get.__tagid.exec(query);
               match_tag = match[1] || "*";
               //if there is an id passed, get that right away
               if(match[2])
               {
                  //if there is only one argument passed and it matched an ID selector,
                  //return the single result at the end instead of an array
                  returnSingle = (arglength == 1);
                  //call document.getElementById instead of get.id because we don't need
                  //the error checking done by that method and it takes half the time
                  //(though admittedly, that half is fractions of a millisecond)
                  result = document.getElementById(match[2]);
                  //if an element was specified and the element retrieved with the id is not
                  //of the specified type, then return null
                  if(match_tag != "*" && result != null && result.nodeName.toLowerCase() != match_tag.toLowerCase())
                  {
                     result = null;
                  }
                  result = [result];
               }
               //if there was no id selector, get all the tags of the type specified
               else
               {
                  //result = get.byTag.call(self, match_tag);
                  //calling getElementsByTagName instead of get.byTag for the same reaosn we're calling
                  //getElementById instead of get.id above: we don't need the additional error checking
                  //and it is a few fractions of a millisecond faster
                  result = self.getElementsByTagName(match_tag);
               }

               //console.log(query, result.length, result);

               if(result && result[0] != null)
               {
                  match = get.__multiples.exec(query);
                  if(match)
                  {
                     do
                     {
                        var classMatch = match[1];
                        result = Filter.byAttribute(result,
                           (classMatch ? "class" : match[2]),
                           (classMatch ? classMatch : match[5]),
                           (classMatch ? "~" : match[3])
                           );
                     } while(match = get.__multiples.exec(query));
                  }
                  else
                  {
                     result = _toArray(result);
                  }
               }
            } //else / /.test(query)

            //if result is valid, append it to all the elements found so far for each argument
            if(result && result[0] != null)
            {
               elements = elements.concat(result);
            }
            result = null;
            //}
         }
         //check for __get to prevent redundant calls to get() from failing
         //and allow for passing in of elements for the same reasons
         else if(argument.__get || "nodeType" in argument)
         {
            elements = elements.concat(argument);
            //if there is only one argument and it is an element, return the single element
            returnSingle = (arglength == 1 && "nodeType" in argument);
         }
      }//for(; x < arglength; ++x)
   }//else arglength !== 0

   //return the elements that we've found. If returnSingle is true, then return the
   //first argument of the array instead of returning a single item wrapped in an array
   //and causing confusion (also check if a result exists othwerise return null)
   return (returnSingle ? (elements[0] ? elements[0] : null) : elements);
}

// ReSharper disable once InconsistentNaming
module get
{
   //not used at the moment
   //get.__matchAll = /^(\w*|\*)?(?:#([\w-]+))?(?:\.([\w-]+))*(?:\[(\w+)(?:([~^$*|]?)=(["'])?((?:\\\6|[^\]])*?)\6)?\])*$/i;

   //[1] -- the class matched, if any
   //[2] -- the name of the attribute to match, if any
   //[3] -- the type of attribute comparator, if any
   //[4] -- *ignore* the type of containing quotes in the attribute
   //[5] -- the attribute value matched, if any
   //see: <http://blog.stevenlevithan.com/regular-expressions/match-quoted-string>
   export var __multiples = /(?:\.([\w-]+))|(?:\[(\w+)(?:([~^$*|]?)=(["'])?((?:\\\4|[^\]])*?)\4)?\])/ig;

   //[1] -- the element tag matched, if any
   //[2] -- the id matched, if any
   export var __tagid = /^(\*|\w*)?(?:#([\w-]+))?/i;

   //I would like to not allow tag, but since tag#id is valid CSS selector syntax, I guess we can't ignore that usage
   export function id(id) //, tag)
   {
      ///<summary>Gets an element in the DOM with the specified id attribute</summary>
      ///<param name="id" optional="false" type="String">The id of the element</param>
      ///<returns domElement="true" mayBeNull="true" />
      //return document.getElementById(id.replace(/^#/,''));

      //if id is null or doesn't match either of the below, return null
      //if id is a string, return it from the DOM
      //if id has a property called "id" assume it is an element (eg - redundant call to get()) and return it
      return (id ? (_t(id) == Types.string ? document.getElementById(id.replace(/^#/, "")) : ("id" in id ? id : null)) : null);
   }

   export function name(name, tag)
   {
      var result = ((this === get) ? document : this).getElementsByName(name);
      result = Filter.byNodeName(result, tag || "*");
      result.__get = true;
      return result;
   }

   /*
   export function tag(name: "a"): Array<HTMLAnchorElement>;
   export function tag(name: "abbr"): Array<HTMLElement>;
   export function tag(name: "address"): Array<HTMLElement>;
   export function tag(name: "area"): Array<HTMLAreaElement>;
   export function tag(name: "article"): Array<HTMLElement>;
   export function tag(name: "aside"): Array<HTMLElement>;
   export function tag(name: "audio"): Array<HTMLAudioElement>;
   export function tag(name: "b"): Array<HTMLElement>;
   export function tag(name: "base"): Array<HTMLBaseElement>;
   export function tag(name: "bdi"): Array<HTMLElement>;
   export function tag(name: "bdo"): Array<HTMLElement>;
   export function tag(name: "blockquote"): Array<HTMLQuoteElement>;
   export function tag(name: "body"): Array<HTMLBodyElement>;
   export function tag(name: "br"): Array<HTMLBRElement>;
   export function tag(name: "button"): Array<HTMLButtonElement>;
   export function tag(name: "canvas"): Array<HTMLCanvasElement>;
   export function tag(name: "caption"): Array<HTMLTableCaptionElement>;
   export function tag(name: "cite"): Array<HTMLElement>;
   export function tag(name: "code"): Array<HTMLElement>;
   export function tag(name: "col"): Array<HTMLTableColElement>;
   export function tag(name: "colgroup"): Array<HTMLTableColElement>;
   export function tag(name: "datalist"): Array<HTMLDataListElement>;
   export function tag(name: "dd"): Array<HTMLElement>;
   export function tag(name: "del"): Array<HTMLModElement>;
   export function tag(name: "dfn"): Array<HTMLElement>;
   export function tag(name: "div"): Array<HTMLDivElement>;
   export function tag(name: "dl"): Array<HTMLDListElement>;
   export function tag(name: "dt"): Array<HTMLElement>;
   export function tag(name: "em"): Array<HTMLElement>;
   export function tag(name: "embed"): Array<HTMLEmbedElement>;
   export function tag(name: "fieldset"): Array<HTMLFieldSetElement>;
   export function tag(name: "figcaption"): Array<HTMLElement>;
   export function tag(name: "figure"): Array<HTMLElement>;
   export function tag(name: "footer"): Array<HTMLElement>;
   export function tag(name: "form"): Array<HTMLFormElement>;
   export function tag(name: "h1"): Array<HTMLHeadingElement>;
   export function tag(name: "h2"): Array<HTMLHeadingElement>;
   export function tag(name: "h3"): Array<HTMLHeadingElement>;
   export function tag(name: "h4"): Array<HTMLHeadingElement>;
   export function tag(name: "h5"): Array<HTMLHeadingElement>;
   export function tag(name: "h6"): Array<HTMLHeadingElement>;
   export function tag(name: "head"): Array<HTMLHeadElement>;
   export function tag(name: "header"): Array<HTMLElement>;
   export function tag(name: "hgroup"): Array<HTMLElement>;
   export function tag(name: "hr"): Array<HTMLHRElement>;
   export function tag(name: "html"): Array<HTMLHtmlElement>;
   export function tag(name: "i"): Array<HTMLElement>;
   export function tag(name: "iframe"): Array<HTMLIFrameElement>;
   export function tag(name: "img"): Array<HTMLImageElement>;
   export function tag(name: "input"): Array<HTMLInputElement>;
   export function tag(name: "ins"): Array<HTMLModElement>;
   export function tag(name: "kbd"): Array<HTMLElement>;
   export function tag(name: "label"): Array<HTMLLabelElement>;
   export function tag(name: "legend"): Array<HTMLLegendElement>;
   export function tag(name: "li"): Array<HTMLLIElement>;
   export function tag(name: "link"): Array<HTMLLinkElement>;
   export function tag(name: "main"): Array<HTMLElement>;
   export function tag(name: "map"): Array<HTMLMapElement>;
   export function tag(name: "mark"): Array<HTMLElement>;
   export function tag(name: "menu"): Array<HTMLMenuElement>;
   export function tag(name: "meta"): Array<HTMLMetaElement>;
   export function tag(name: "nav"): Array<HTMLElement>;
   export function tag(name: "noscript"): Array<HTMLElement>;
   export function tag(name: "object"): Array<HTMLObjectElement>;
   export function tag(name: "ol"): Array<HTMLOListElement>;
   export function tag(name: "optgroup"): Array<HTMLOptGroupElement>;
   export function tag(name: "option"): Array<HTMLOptionElement>;
   export function tag(name: "p"): Array<HTMLParagraphElement>;
   export function tag(name: "param"): Array<HTMLParamElement>;
   export function tag(name: "pre"): Array<HTMLPreElement>;
   export function tag(name: "progress"): Array<HTMLProgressElement>;
   export function tag(name: "q"): Array<HTMLQuoteElement>;
   export function tag(name: "rp"): Array<HTMLElement>;
   export function tag(name: "rt"): Array<HTMLElement>;
   export function tag(name: "ruby"): Array<HTMLElement>;
   export function tag(name: "s"): Array<HTMLElement>;
   export function tag(name: "samp"): Array<HTMLElement>;
   export function tag(name: "script"): Array<HTMLScriptElement>;
   export function tag(name: "section"): Array<HTMLElement>;
   export function tag(name: "select"): Array<HTMLSelectElement>;
   export function tag(name: "small"): Array<HTMLElement>;
   export function tag(name: "source"): Array<HTMLSourceElement>;
   export function tag(name: "span"): Array<HTMLSpanElement>;
   export function tag(name: "strong"): Array<HTMLElement>;
   export function tag(name: "style"): Array<HTMLStyleElement>;
   export function tag(name: "sub"): Array<HTMLElement>;
   export function tag(name: "summary"): Array<HTMLElement>;
   export function tag(name: "sup"): Array<HTMLElement>;
   export function tag(name: "table"): Array<HTMLTableElement>;
   export function tag(name: "tbody"): Array<HTMLTableSectionElement>;
   export function tag(name: "td"): Array<HTMLTableDataCellElement>;
   export function tag(name: "textarea"): Array<HTMLTextAreaElement>;
   export function tag(name: "tfoot"): Array<HTMLTableSectionElement>;
   export function tag(name: "th"): Array<HTMLTableHeaderCellElement>;
   export function tag(name: "thead"): Array<HTMLTableSectionElement>;
   export function tag(name: "title"): Array<HTMLTitleElement>;
   export function tag(name: "tr"): Array<HTMLTableRowElement>;
   export function tag(name: "track"): Array<HTMLTrackElement>;
   export function tag(name: "u"): Array<HTMLElement>;
   export function tag(name: "ul"): Array<HTMLUListElement>;
   export function tag(name: "var"): Array<HTMLElement>;
   export function tag(name: "video"): Array<HTMLVideoElement>;
   export function tag(name: "wbr"): Array<HTMLElement>;
   //*/
   export function tag(name?: string): Array<Node>
   {
      var result = _toArray<Node>((this === get ? document : this).getElementsByTagName(name || "*"));
      result["__get"] = true;
      return result;
   }

   export function cssClass(name: string, tag?: string): Array<Node>
   {
      return get.attribute.call(this, "class", name.replace(/^\./, ''), tag, "~");
   }

   /**
    * Gets an array of elements in the DOM with the specified attribute values
    * @param attr The name of the attribute to get
    * @param val The value of the attribute
    * @param tag The name of an element to restrict the search to.
    * If this is not given it will search the entire DOM
    * @param type The type of search to perform ("~", "^", "$", "*"), if absent an exact search is performed
    */
   export function attribute(attr: string, val?: string, tag?: string, type?: string): Array<Node>
   {
      var allElements = (this === get ? document : this).getElementsByTagName(tag || "*");
      var result = Filter.byAttribute(allElements, attr, val, type);
      result["__get"] = true;
      return result;
   }
}

//
// Filter helper methods for get
//
class Filter
{
   static regexCache = {};

   static byAttribute(elements, attr: string, val?: string, type?: string)
   {
      var result = [], regex = Filter.regexCache[val] && Filter.regexCache[val][type];
      if(regex == null)
      {
         var value = "(?:" + (val ? _escapeRegExp(val) : ".*") + ")";
         switch(type)
         {
            //match string or end-line delimited   
            case "~": regex = new RegExp("(?:^|\\s)" + value + "(?:\\s|$)", 'i'); break;
            //match beginning with   
            case "^": regex = new RegExp("^" + value, 'i'); break;
            //match ending with   
            case "$": regex = new RegExp(value + "$", 'i'); break;
            //match anywhere   
            case "*": regex = new RegExp(value, 'i'); break;
            //exactly, or begins with followed by (U+002D)   
            case "|": regex = new RegExp("^" + value + "-?", 'i'); break;
            //match exactly   
            default: regex = new RegExp("^" + value + "$", 'i'); break;
         }
         Filter.regexCache[val] = Filter.regexCache[val] || {};
         Filter.regexCache[val][type] = regex;
      }

      for(var x = 0, ln = elements.length; x < ln; ++x)
      {
         var element = elements[x];
         //second parameter to getAttribute is an IE custom thing, see:
         //http://msdn.microsoft.com/en-us/library/ms536429.aspx
         var temp = (attr == "class" ? element.className : element.getAttribute(attr, 2));
         if(temp && regex.test(temp))
         {
            result.push(element);
         }
      }

      return result;
   }

   static byNodeName(elements, name)
   {
      name = name.toLowerCase();
      var result = [];
      for(var x = 0, ln = elements.length; x < ln; ++x)
      {
         var el = elements[x];
         if(name == "*" || name == el.nodeName.toLowerCase())
         {
            result.push(el);
         }
      }
      return result;
   }
}