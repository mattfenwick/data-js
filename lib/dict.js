'use strict';

// relies on:
//   Object.create(null) not having a prototype
//   `__proto__` and all other possible strings not
//     being special property names in an Object.create(null) object

function Dict(keyVals) {
    this._dict = Object.create(null);
    this._size = 0;
    var self = this;
    Object.getOwnPropertyNames(keyVals).map(function(key) {
        self.set(key, keyVals[key]);
    });
}

function checkKeyType(val) {
    // can't use String objects as keys
    if ( typeof val !== 'string' ) {
        throw new TypeError('Dict keys must be strings');
    }
}

Dict.prototype.has = function(key) {
    checkKeyType(key);
    return (key in this._dict);
};

Dict.prototype.set = function(key, val) {
    checkKeyType(key);
    if ( !this.has(key) ) { this._size++;}
    this._dict[key] = val;
};

Dict.prototype.get = function(key) {
    checkKeyType(key);
    if ( this.has(key) ) {
        return this._dict[key];
    }
    throw new Error('missing key -- ' + key);
};

Dict.prototype.remove = function(key) {
    checkKeyType(key);
    if ( !this.has(key) ) {
        throw new Error('missing key -- ' + key);
    }
    this._size--;
    delete this._dict[key];
};

Dict.prototype.size = function() {
    return this._size;
};

Dict.prototype.keys = function() {
    return Object.getOwnPropertyNames(this._dict);
};

Dict.prototype.toArray = function() {
    var self = this;
    return this.keys().map(function(k) {return [k, self.get(k)];});
};

Dict.prototype.fmap = function(f) {
    var new_dict = new Dict({}),
        self = this;
    this.keys.map(function(k) {
        new_dict.set(k, f(self.get(k)));
    });
    return new_dict;
};

Dict.prototype.filter = function(predicate) {
    var new_dict = new Dict({}),
        self = this;
    this.keys.map(function(k) {
        if ( predicate(k, self.get(k)) ) {
            new_dict.set(k, self.get(k));
        }
    });
    return new_dict;
};

Dict.prototype.toJSON = function() {
    return {'type': 'Dict', 'keyVals': this._dict};
};


module.exports = {
    'Dict': Dict
};

