
function Pair(head, tail) {
    this.head = function () { return head; };
    this.tail = function () { return tail; };
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

module.exports = {
    pair: createPair,
    list: createList,
    isList: isList
};

