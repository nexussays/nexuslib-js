/// <reference path="/lib/require.d.ts" />

//
// Use to package everything together with r.js
//

var NNet = {version : "0.10.0"};

function alertall()
{
   alert(Array.prototype.join.call(arguments, "\n"));
}

define(
[
   'nnet/browser',
   'nnet/util/function',
   'nnet/html/element',

   'nnet/dom/get',
   'nnet/html/html',
   'nnet/net/HttpRequest',
   'nnet/util/array',
   'nnet/util/array_utils',
   'nnet/util/string',
   'nnet/color',
   'nnet/cookie',
   'nnet/core',
   'nnet/error',
   'nnet/event',
   'nnet/form',
   'nnet/load',
   'nnet/sort',
   'nnet/using'
], function()
{

});