(function()
{
    "use strict";

    var R = require('ramda');
    var math = require('mathjs');

    exports.wandom = R.curry(function(vec)
    {
        return exports.wandomExcept([], vec);
    });

    // pick a weighted random item
    exports.wandomExcept = R.curry(function(except, vec)
    {
        // if array objects have a weight property, use it
        // does not choose those in except, an array of indexes

        var pick;

        do {
            if (vec.length && R.has('weight', vec[0]))
            {
                if (R.pluck('weight', vec).length !== vec.length)
                {
                    throw "wandom: Not all elments have weight";
                }

                var weights = R.pluck('weight', vec);

                // sum the weights to normalize them
                var sum = R.reduce(function(sum, n)
                {
                    return sum + n;
                }, 0, weights);

                if (sum)
                {
                    // convert each to 0..1
                    var probs = R.map(function(w)
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

                    pick = i;
                }
            }
            else
            {
                // no weights

                pick = math.randomInt(vec.length);
            }
        } while (except.indexOf(pick) >= 0);

        return vec[pick];

    });

    // biased random
    // larger n means small result (0..1)
    // -ve n -> larger result (0..1)

    exports.bandom = R.curry(function(max, n)
    {
        var r = math.random(max);

        n = n || 1;

        var m = math.abs(n);

        while (--m > 0)
        {
            r = math.random(r);
        }

        if (n < 0)
        {
            r = max - r;
        }

        return r;
    });

    exports.bandomInt = R.curry(function(max, n)
    {
        var r = math.randomInt(max);

        n = n || 1;

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

    exports.randomBoolean = function()
    {
        return math.random(1) < 0.5;
    };

})();
