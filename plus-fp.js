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

    // pick a weighted random item
    exports.wandom = fp.curry(function(vec)
    {
        // if array objects have a weight property, use it

        var pick;

        if (vec.length && fp.has('weight', vec[0]))
        {
            var weights = fp.pluck('weight', vec);

            // sum the weights to normalize them
            var sum = fp.reduce(function(sum, n)
            {
                return sum + n;
            }, 0, weights);

            if (sum)
            {
                // convert each to 0..1
                var probs = fp.map(function(w)
                {
                    return w / sum;
                }, weights);

                var r = math.random(0, 1);

                // find where cumulative sum exceeds r
                var rsum = 0;
                var i = -1;

                do {
                    i += 1;
                    rsum += probs[i];
                } while (rsum <= r && i < vec.length - 1);

                pick = vec[i];
            }
        }
        else
        {
            // no weights

            pick = math.pickRandom(vec);
        }

        return pick;

    });

    // biased random
    // larger n means small result (0..1)
    // -ve n -> larger result (0..1)

    exports.bandom = fp.curry(function(max, n)
    {
        var r = math.random(max);

        var m = math.abs(n);

        while (--m > 0)
        {
            r = math.random(r);
        }

        if (n < 0)
        {
            r = 1 - r;
        }

        return r;
    });

    exports.bandomInt = fp.curry(function(max, n)
    {
        var r = math.randomInt(max);

        var m = math.abs(n);

        while (--m > 0)
        {
            r = math.randomInt(r);
        }

        if (n < 0)
        {
            r = max - 1 - r;
        }

        return r;
    });

    exports.nameOf = function(fn)
    {
        // http://stackoverflow.com/questions/2648293/javascript-get-function-name

        var ret = fn.toString();
        ret = ret.substr('function '.length);
        ret = ret.substr(0, ret.indexOf('('));

        return ret;
    };

    exports.randomSign = function()
    {
        return math.random(1) < 0.5 ? -1 : 1;
    };
})();
