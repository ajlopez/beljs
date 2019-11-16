
function Context(parent) {
    const values = {};
    
    this.get = function (name) { if (values[name] === undefined && parent) return parent.get(name); else return values[name]; };
    this.set = function (name, value) { values[name] = value; };
}

function createContext(parent) {
    return new Context(parent);
}

module.exports = {
    context: createContext,
    top: function () { return createContext(topcontext); }
};

