(function()
{
    "use strict";

    var fp = require('lodash-fp');
    var math = require('mathjs');

    // returns true if any predicates is true
    exports.anyOf = fp.curry(function(arr, w)
    {
        return fp.any(function(f)
        {
            return f(w);
        }, arr);
    });

    // returns true if all predicates are true
    exports.allOf = fp.curry(function(arr, w)
    {
        return fp.all(function(f)
        {
            return f(w);
        }, arr);
    });

    // pick a random property
    exports.pickRandomKey = fp.curry(function(x)
    {
        var key = math.pickRandom(fp.keys(x));
        return key;
    });

    // pick a random property
    exports.pickRandom = fp.curry(function(x)
    {
        return x[exports.pickRandomKey(x)];
    });

})();
