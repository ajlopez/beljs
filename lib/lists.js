
function Pair(head, tail) {
    this.head = function () { return head; };
    this.tail = function () { return tail; };
    
    this.evaluate = function (context) {
        const fn = head.evaluate(context);
        const args = expand(tail);
        
        return fn(args);
    };
    
    function expand(pair) {
        if (pair == null)
            return [];
        
        const first = pair.head();
        const rest = expand(pair.tail());
        
        rest.unshift(first);
        
        return rest;
    }
}

function createPair(head, tail) {
    return new Pair(head, tail);
}

function createList(elements, tail) {
    let result = tail === undefined ? null : tail;
    
    for (let k = 0, l = elements.length; k < l; k++)
        result = createPair(elements[l - k - 1], result);
    
    return result;
}

function isList(value) {
    return value === null || value instanceof Pair;
}

function toListString(value) {
    if (value == null)
        return '';
    
    if (!isList(value))
        return value.toString();
    
    let result = toString(value.head());
    
    const tail = value.tail();
    
    if (!isList(tail))
        return result + ' . ' + toString(tail);
    
    const rest = toListString(tail);
    
    if (rest !== '')
        result += ' ';
    
    result += rest;
    
    return result;
}

function toString(value) {
    if (value == null)
        return 'nil';
    
    if (isList(value)) {
        let result = '(';
        
        result += toString(value.head());
        
        const tail = value.tail();
        
        if (isList(tail)) {
            const rest = toListString(tail);
            
            if (rest !== '')
                result += ' ';
            
            result += rest + ')';
            
            return result;
        }
        
        result += ' . ' + toString(tail);
        
        result += ')';
        
        return result;
    }
    
    return value.toString();
}

module.exports = {
    pair: createPair,
    list: createList,
    isList: isList,
    toString: toString
};

