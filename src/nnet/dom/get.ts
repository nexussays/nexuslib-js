// Copyright Malachi Griffie <malachi@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import ArrayUtils = require("nnet/util/ArrayUtils");
import str = require("nnet/util/StringUtils");

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
         else if(argument.isString)
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
                        result = ArrayUtils.toArray(result);
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
      return (id != null ? (id.isString ? document.getElementById(id.replace(/^#/, "")) : ("id" in id ? id : null)) : null);
   }

   export function name(name, tag)
   {
      var result = ((this === get) ? document : this).getElementsByName(name);
      result = Filter.byNodeName(result, tag || "*");
      result.__get = true;
      return result;
   }

   export function tag(tag:string): Array<Node>
   {
      var result = ArrayUtils.toArray<Node>((this === get ? document : this).getElementsByTagName(tag || "*"));
      result["__get"] = true;
      return result;
   }

   export function cssClass(name:string, tag?:string): Array<Node>
   {
      return get.attribute.call(this, "class", name.replace(/^\./, ''), tag, "~");
   }
   export function attribute(attr:string, val?:string, tag?:string, type?:string): Array<Node>
   {
      ///<summary>Gets an array of elements in the DOM with the specified attribute values</summary>
      ///<param name="attr" optional="false" type="String">The name of the attribute to get</param>
      ///<param name="val" optional="true" type="String">The value of the attribute</param>
      ///<param name="tag" optional="true" type="String">The name of an element to restrict the search to. If this is not given it will search the entire DOM</param>
      ///<param name="type" optional="true" type="String">The type of search to perform ("~", "^", "$", "*"), if absent an exact search is performed</param>
      ///<returns elementDomElement="true" mayBeNull="true" />
      var allElements = (this === get ? document : this).getElementsByTagName(tag || "*");
      var result = Filter.byAttribute(allElements, attr, str.escapeRegExp(val), type);
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
   
   static byAttribute(elements, attr, val, type)
   {
      var result = [], regex = Filter.regexCache[val] && Filter.regexCache[val][type];
      if(regex == null)
      {
         var value = "(?:" + (val ? val.escapeRegExp() : ".*") + ")";
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