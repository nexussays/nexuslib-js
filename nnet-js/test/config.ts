/// <reference path="../lib/require.d.ts" />

require.config( {
   paths: {
      nnet: '../src/nnet',
      debug: "../../debug"
   }
} );
require.onError = function(err)
{
   console.error( err.requireType + ', modules=' + err.requireModules );
   throw err;
};

require( ["editor"] );