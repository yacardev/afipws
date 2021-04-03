String.prototype.allReplace = function(replaces) {
    var retStr = this;
    return Object.keys(replaces).reduce(
        (acc, search) => acc.replace(new RegExp(search, 'g'), replaces[search]), retStr);
};