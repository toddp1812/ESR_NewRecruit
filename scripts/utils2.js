/*
 * utils.js
 * This files contains utility functions that are used throughout the application.
 */



export default class Utils {
    name = "Utilities Module";

    constructor() {
        this.name = "Utilities Module";
    }

    generateID () {
 
        let myID = crypto.randomUUID();
        return myID;
    }   

    getFactionFromAbbreviation( _abbreviation ) {
        let faction, myFactionType;

        switch (_abbreviation) {
            case "AU":
            faction = "Austria";
            myFactionType = "ct-Faction-Austria";
            break;
            case "BR":
            faction = "England";
            myFactionType = "ct-Faction-England";
            break;
            case "FR":
            faction = "France";
            myFactionType = "ct-Faction-France";
            break;
            case "PR":
            faction = "Prussia";
            myFactionType = "ct-Faction-Prussia";
            break;
            case "RU":
            faction = "Russia";
            myFactionType = "ct-Faction-Russia";
            break;
            case "SP":
            faction = "Spain";
            myFactionType = "ct-Faction-Spain";
            break;
            case "BV":
            faction = "Bavaria";
            myFactionType = "ct-Faction-Bavaria";
            break;
            case "IT":
            faction = "Italy";
            myFactionType = "ct-Faction-Italy";
            break;
            case "PO":
            faction = "Poland";
            myFactionType = "ct-Faction-Poland";
            break;
            case "SX":
            faction = "Saxony";
            myFactionType = "ct-Faction-Saxony";
            break;
            case "WF":
            faction = "Westphalia";
            myFactionType = "ct-Faction-Westphalia";
            break;
            case "Wü":
            faction = "Württemberg";
            myFactionType = "ct-Faction-Württemberg";
            break;

            case "French":
            case "Russian":
            case "English":
            case "Austrian":
            default:
            notify({ text: "Faction: " + factionAbbrevation + "does not have a valid faction mapping.", type: "error" });
            console.error( "Faction: ", factionAbbrevation, "does not have a valid faction mapping.");
            return null;
            break;
        }
        return {faction: faction, type: myFactionType};
    }

    getFactionAbbreviationFromString ( _factionString ) {
        const expression = /([a-zA-ZÀ-ÏÑÒ-ÖŠÙ-ÝŸŽß-ïñò-ÿž]+)/u;   // /u means utc code, so we can match special like ü
        const regexp = new RegExp(expression);
        const testString = _factionString;
        let result = testString.match( regexp );
        if ( result == null ) {
            console.error( "Could not parse first line for faction.");
            notify({ text: "Could not parse first line for faction.", type: "error" });
            return null;
        }
        return result[1];
    }

    getFactionTypeFromFaction ( _faction ) {
        let myFactionType;

        switch ( _faction) {
            case "Austria":
            myFactionType = "ct-Faction-Austria";
            break;
            case "England":
            myFactionType = "ct-Faction-England";
            break;
            case "France":
            myFactionType = "ct-Faction-France";
            break;
            case "Prussia":
            myFactionType = "ct-Faction-Prussia";
            break;
            case "Russia":
            myFactionType = "ct-Faction-Russia";
            break;
            case "Spain":
            myFactionType = "ct-Faction-Spain";
            break;
            case "Bavaria":
            myFactionType = "ct-Faction-Bavaria";
            break;
            case "Italy":
            myFactionType = "ct-Faction-Italy";
            break;
            case "Poland":
            myFactionType = "ct-Faction-Poland";
            break;
            case "Saxony":
            myFactionType = "ct-Faction-Saxony";
            break;
            case "Westphalia":
            myFactionType = "ct-Faction-Westphalia";
            break;
            case "Württemberg":
            myFactionType = "ct-Faction-Württemberg";
            break;

            case "French":
            case "Russian":
            case "English":
            case "Austrian":
            default:
            console.error( "Faction: ", _faction, "does not have a valid commander mapping.");
            return;
            break;
        }

        return myFactionType;
    }
    
    getShowFactionId ( _catalog, _faction ) {     

        let importIterator = _catalog.iterateAllImported();
        let importData = importIterator.next();
        while ( importData.done == false ) {

            if( importData.value.isCategory() ) {
                if ( importData.value.name == "Show: " + _faction ) {
                    break;
                }
            }
            importData = importIterator.next();
            
        } 

        // check that we have a valid id
        if ( importData.done == true ) {
            console.error( "Could not find Show: " + _faction + " in the imported selectionEntry.");
            notify({ text: "Could not find Show: " + _faction + " in the imported selectionEntry.", type: "error" });
            return null;
        }

        return importData.value.id;

    }

    getFactionFromTSVLine( _line ) {

      // the faction should be the first string in the selection
      const expression = /([a-zA-ZÀ-ÏÑÒ-ÖŠÙ-ÝŸŽß-ïñò-ÿž]+)\t/u;

      const regexp = new RegExp(expression);
      const testString = _line;
      let result = testString.match( regexp );
      if ( result == null ) {
        notify({ text: "Could not parse first line for faction.", type: "error" });
        console.error( "Could not parse first line for faction.");
        return;
      }
      let faction = result[1];
      let myFactionType;

      myFactionType = this.getFactionTypeFromFaction( faction );

      if ( myFactionType == null ) {
        notify({ text: "Faction: " + faction + " does not have a valid faction mapping.", type: "error" });
        console.error( "Faction: ", faction, "does not have a valid faction mapping.");
        return;
      }

      return {faction: faction, type: myFactionType};
    }

    isValidFaction( _faction ) {
        let retval = false;

        switch ( _faction) {
            case "Austria":
            case "England":
            case "France":
            case "Prussia":
            case "Russia":
            case "Spain":
            case "Bavaria":
            case "Italy":
            case "Poland":
            case "Saxony":
            case "Westphalia":
            case "Württemberg":
                retval = true;
            break;

            case "French":
            case "Russian":
            case "English":
            case "Austrian":
            default:
                console.error( "Faction: ", _faction, "does not have a valid commander mapping.");
            break;
        }

        return retval;
    }

    getFactionAbbreviationFromName( _faction ) {
        let retval = null;
        switch ( _faction) {
            case "Austria":
                retval = "AU";
                break;
            case "England":
                retval = "BR";
                break;
            case "France":
                retval = "FR";
                break;
            case "Prussia":
                retval = "PR";
                break;
            case "Russia":
                retval = "RU";
                break;
            case "Spain":
                retval = "SP";
                break;
            case "Bavaria":
                retval = "BV";
                break;
            case "Italy":
                retval = "IT";
                break;
            case "Poland":
                retval = "PO";
                break;
            case "Saxony":
                retval = "SX";
                break;
            case "Westphalia":
                retval = "WF";
                break;
            case "Württemberg":
                retval = "Wü";
                break;
            break;

            case "French":
            case "Russian":
            case "English":
            case "Austrian":
            default:
                console.error( "Faction: ", _faction, "does not have a valid commander mapping.");
            break;
        }   
        return retval;
    }

    getCategoryTag (_catalog, _name ){

        let retval = null;
        let importIterator = _catalog.iterateAllImported();
        let importData = importIterator.next();
        while ( importData.done == false ) {

            if( importData.value.isCategory() ) {
                if ( importData.value.name == _name ) {
                    retval = importData.value.id;
                    break;
                }
            }
            importData = importIterator.next();
        } 
        return retval;
    }

    // getGroupID()
    // shared Selection Entry Group identifier, not anything that is already linked
    // under Root Selection Entries
    getGroupId (_catalog, _name ) {

        let retval = null;


        let importIterator = _catalog.iterateAllImported();
        let importData = importIterator.next();
        while ( importData.done == false ) {
            if( importData.value.isGroup() ) {
                if( importData.value.name == _name ) {
                        // if this is a link already in the file, skip it
                        // if importData has a targetId parameter, it is a link in our 
                        // root selection entries, skip it
                    if( typeof importData.value.targetId == 'undefined' ){ 
                        retval = importData.value.id;
                        break;
                    }
                
                }
            }
            importData = importIterator.next();
        } 

        return retval;
    }
}

