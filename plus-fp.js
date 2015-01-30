var fp = require('lodash-fp');

exports.anyOf = fp.curry(function(arr, w)
{
    return fp.any(function(f)
    {
        return f(w);
    }, arr);
});

exports.allOf = fp.curry(function(arr, w)
{
    return fp.all(function(f)
    {
        return f(w);
    }, arr);
});
