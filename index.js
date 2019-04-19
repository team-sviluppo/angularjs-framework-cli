const prompt = require('prompt');
const path = require('path');
const fsExtra = require('fs-extra');
const argv = require('yargs').argv;

const SnippetUtilities = require('./src/SnippetsSet/SnippetsUtilities');
const DefaultEntitySet = require('./src/SnippetsSet/DefaultEntitySet');

module.exports = () => {
    // Crea le domande del prompt.
    const _promptQuestions = Object.keys(DefaultEntitySet.VariablesToFill).map(key => {
        if (DefaultEntitySet.VariablesToFill[key].calculated) return null;
        else {
            return {
                name: key,
                description: DefaultEntitySet.VariablesToFill[key].hint
            };
        }
    }).filter(i => i !== null);

    prompt.start();
    prompt.get(_promptQuestions, (err, result) => {
        console.log('result is', result);
        // Effettua il fill dei valori.
        Object.keys(result).forEach(k => {
            DefaultEntitySet.VariablesToFill[k].value = result[k];
        });
        const _ToEvaluate = Object.keys(DefaultEntitySet.VariablesToFill).filter(k => DefaultEntitySet.VariablesToFill[k].calculated);
        _ToEvaluate.forEach(k => {
            DefaultEntitySet.VariablesToFill[k].value = DefaultEntitySet.VariablesToFill[k].evaluate(DefaultEntitySet.VariablesToFill);
        });
        // Effettua il fill dei valori calcolati.

        let replaceElements = Object.keys(DefaultEntitySet.VariablesToFill).map((item) => {
            return {
                search:         `§${item}§`,
                replaceValue:   DefaultEntitySet.VariablesToFill[item].value
            };
        });
        console.log('Dati acquisiti, creo i files:');
        const entityDir = path.resolve(process.cwd(), DefaultEntitySet.VariablesToFill.DataContract.value);
        console.log('verifico che ' + entityDir + ' esista');
        fsExtra.ensureDirSync(entityDir);
        DefaultEntitySet.FilesList.forEach((f) => {
            const snippetPath = f.snippetPath;
            const snippetResRelativePath = f.resRelativePath;
            let fileToWrite = SnippetUtilities.readSnippetFileAsString(path.resolve(__dirname, 'src', 'SnippetsSet', snippetPath));
            fileToWrite = SnippetUtilities.replaceSnippetValues(fileToWrite, replaceElements);
            fsExtra.ensureFileSync(path.resolve(process.cwd(), SnippetUtilities.replaceSnippetValues(snippetResRelativePath, replaceElements)));
            fsExtra.writeFileSync(path.resolve(process.cwd(), SnippetUtilities.replaceSnippetValues(snippetResRelativePath, replaceElements)), fileToWrite);
        });
    });
};
