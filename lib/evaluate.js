
function evaluate(value, context) {
    if (value && value.evaluate && typeof value.evaluate === 'function')
        return value.evaluate(context);
    
    return value;
}

module.exports = evaluate;

