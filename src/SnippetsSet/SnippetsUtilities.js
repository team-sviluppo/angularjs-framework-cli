const path = require('path');
const fsExtra = require('fs-extra');
// Polyfill per replaceAll.
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

module.exports = {
    replaceSnippetValues: function(originalString, kvpairs) {
        kvpairs.forEach((item) => {
            originalString = originalString.replaceAll(item.search, item.replaceValue)
        });
        return originalString;
    },
    readSnippetFileAsString: function(snippetPath) {
        let classFileBuffer = fsExtra.readFileSync(path.resolve(__dirname, snippetPath), "utf8");
        let fileToWrite = classFileBuffer.toString();
        return fileToWrite;
    }
}
