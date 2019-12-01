
function Fn(args, body) {
    this.evaluate = function () { return body; };
}

function createFn(args, body) {
    return new Fn(args, body);
}

module.exports = {
    fn: createFn,
    isFn: function (value) { return value instanceof Fn; }
};