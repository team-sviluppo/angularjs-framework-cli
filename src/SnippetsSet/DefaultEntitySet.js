module.exports = {
    FilesList: [
        {
            snippetPath:        "./snippets/EntityFullSnippet/entityState.snippet",
            resRelativePath:    "§DataContract§/§entity§.states.js"
        },
        {
            snippetPath:        "./snippets/EntityFullSnippet/entityService.snippet",
            resRelativePath:    "§DataContract§/§entity§.services.js"
        },
        {
            snippetPath:        "./snippets/EntityFullSnippet/entityDirectives.snippet",
            resRelativePath:    "§DataContract§/§entity§.directives.js"
        },
        {
            snippetPath:        "./snippets/EntityFullSnippet/entityControllers.snippet",
            resRelativePath:    "§DataContract§/§entity§.controllers.js"
        },
        {
            snippetPath:        "./snippets/EntityFullSnippet/entityListView.snippet",
            resRelativePath:    "§DataContract§/views/§entityLowerCase§list.html"
        },
        {
            snippetPath:        "./snippets/EntityFullSnippet/entityEditView.snippet",
            resRelativePath:    "§DataContract§/views/§entityLowerCase§edit.html"
        },
    ],
    VariablesToFill: {
        "entity": {
            hint: "Nome dell'entity. Esempio: acquistiAssegnazione"
        },
        "entityLowerCase": {
            calculated: true,
            evaluate: function(toFill) {
                return toFill['entity'].value.toLowerCase();
            }
        },
        "entityLowercaseCapitalized": {
            calculated: true,
            evaluate: function(toFill) {
                return toFill['entity'].value.charAt(0).toUpperCase() + toFill['entity'].value.slice(1).toLowerCase();
            }
        },
        "entityDirectivePrefix": {
            calculated: true,
            assertAfter: ['entityLowerCase'],
            evaluate: function(toFill) {
                const _Module = toFill['EntityModule'].value;
                const _EntityCapitalized = toFill['entityLowercaseCapitalized'].value;
                return `hx${_Module}${_EntityCapitalized}`
            }
        },
        "entityHtmlListDirectiveTag": {
            calculated: true,
            assertAfter: ['entityLowerCase'],
            evaluate: function(toFill) {
                const _Module = toFill['EntityModule'].value.toLowerCase();
                const _EntityLowercase = toFill['entityLowerCase'].value;
                return `hx-${_Module}-${_EntityLowercase}list`
                //hx-doc-acquistiassegnazionelist
            }
        },
        "entityDropdownLabel": {
            hint: "Etichetta da mostrare per il label del dropdown"
        },
        "DataContract": {
            hint: "Nome del datacontract (lato server). Esempio: DocAcquistiAssegnazione"
        },
        "EntityModule": {
            hint: "Modulo dell'entity. Esempio per il modulo documentale: 'Doc'"
        },
        "EntitySvc": {
            hint: "Indica l'SVC della entity. Per il modulo Doc, ad esempio, è 'Document.svc'"
        },
        "EntityModuleLowerCase": {
            calculated: true,
            evaluate: function(toFill) {
                return toFill['EntityModule'].value.toLowerCase();
            }
        }
    }
}
