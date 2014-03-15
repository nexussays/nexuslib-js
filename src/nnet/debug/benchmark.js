define(['main'], function(){

//
// Methods to perform rudimentary performance benchmarks
//
return new (function()
{
    var self = this;
    
    var timers = {};
    
    this.start = function(key)
    {
        timers[key] = {};
        timers[key].startTime = (new Date()).getTime();
    };
    
    this.stop = function(key)
    {
        timers[key].endTime = (new Date()).getTime();
        return self.getSeconds(key);
    };
    
    this.getSeconds = function(key)
    {
        return (timers[key].endTime - timers[key].startTime)/1000;
    };
    
    //seperate from the functions to time manually, this will execute the specified bit of code a set number
    //of times and return the timing results
    this.loop = function(times, code, context)
    {
       var x = 1, result, ms, scope = context || window, count = Math.abs(times), exec = code, start, end;
        //var exec = (typeof code == "function" ? code : function(){return eval(code, this);});
        if(typeof code != "function")
        {
            throw new TypeError("\"" + code + "\" of type \"" + ___gettype(code) + "\" is not a valid function call");
        }
        
        start = (new Date()).getTime();
        //execute once to get a return value
        result = exec.call(scope);//, x, count);
        ++x;
        for(; x <= count; ++x)
        {
            exec.call(scope);//, x, count);
        }
        end = (new Date()).getTime();

        ms = (end - start);

        return { "execution": exec, "result": result, "ms": ms, "iterations": count, "msEach": ms / count };
    };
});

}); //define