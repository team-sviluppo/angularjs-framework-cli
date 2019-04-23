# Versione
![](https://img.shields.io/badge/aprile_2019-1.0.1-red.svg)

# Introduzione
Questa repository contiene il sorgente per il client terminale del framework angularjs Hextra SRL - Team Sviluppo.

# Installazione
Clonare la repository alla versione attuale (master), quindi:

1.  Lanciare, da terminale, per la repository, il comando `npm install`
2.  Eseguire quindi `npm run link-locally` o `npm link`
3.  Aprire un altro terminale.

# Utilizzo
Eseguire da terminale `hx-angularjs-framework-cli` all'interno della cartella `Extensions\{NomeModulo}` del progetto.
Esempio: per la entity "clienti", eseguire il comando nella cartella `Extensions\Core`.
Lo script richiederà alcuni dati per creare:

-   La cartella del datacontract
-   i files contenenti gli states, i servizi, le directives ed i controllers.
-   la cartella views con dentro il file contenente l'html della list e della edit.