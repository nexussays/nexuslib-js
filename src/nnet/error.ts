/**
 * Base class for errors thrown by nnet-js
 */
export = NNetError;
class NNetError
{
   name: string;
   message: string;
   description: string;

   constructor(message)
   {
      this.name = arguments.callee["name"] || "NNetError";
      this.message = message || "An unhandled Exception has occured in nnet-js";
      this.description = this.message;
   }

   toString()
   {
      return this.message;
   }
}