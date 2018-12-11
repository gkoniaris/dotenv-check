const fs = require('fs')

module.exports.extendedSplit = function (str, separator, max) {
    var out = [], 
    index = 0,
    next;
    
    while (!max || out.length < max - 1 ) { 
        next = str.indexOf(separator, index);
        if (next === -1) {
            break;
        }
        out.push(str.substring(index, next));
        index = next + separator.length;
    }
    out.push(str.substring(index));
    return out;
};

module.exports.readFileAsync = function() {
    return new Promise((resolve, reject) => {
        fs.readFile(...arguments, function(err, file) {
            if (err) return reject(err)
            return resolve(file)
        })
    })
}