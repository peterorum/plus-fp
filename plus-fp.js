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
    exports.pickRandom = fp.curry(function(x)
    {
        var key = math.pickRandom(fp.keys(x));
        var val = x[key];

        // return property name in object

        if (/object|function/.test(val))
        {
            val.key = key;
        }

        return val;

    });

})();
