//
// Methods to perform rudimentary performance benchmarks
//
export = Benchmark;
class Benchmark
{
    private timers = {};
    
    start(key)
    {
        this.timers[key] = {};
        this.timers[key].startTime = (new Date()).getTime();
    }
    
    stop(key)
    {
        this.timers[key].endTime = (new Date()).getTime();
        return this.getSeconds(key);
    }
    
    getSeconds(key)
    {
        return (this.timers[key].endTime - this.timers[key].startTime)/1000;
    }
    
    //seperate from the functions to time manually, this will execute the specified bit of code a set number
    //of times and return the timing results
    loop(times, code, context)
    {
       var x = 1, result, ms, scope = context || window, count = Math.abs(times), exec = code, start, end;
        //var exec = (typeof code == "function" ? code : function(){return eval(code, this);});
        if(typeof code != "function")
        {
            throw new TypeError("\"" + code + "\" is not a valid function call");
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
    }
}