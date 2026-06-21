/*
 * ESR Faction Setup Create Script
 * This script is designed to flesh out the Root selection entries of the
 * an ESR faction. It sets up the Administration and Force Commander entries.
 * This script can be safely run to add entries after the initial file creation. 
 * It will scan the existing entries to determine what needs to be added. 
 * 
 */
import Utils from "./utils2.js"; 

const myUtils = new Utils();

function findAddRootAdministrationAndForceCommander(_sharedSelection) {

    // look for the Administative name and Force Commander tag 
    // in the root selections
    let foundAdmin = false;
    let foundForce = false;

    // iterate over the root selections 
    let formation;
    if ( typeof _sharedSelection.selectionEntries !== 'undefined') {
        if (_sharedSelection.selectionEntries.length !== 0) {
            for( formation of _sharedSelection.selectionEntries ) {
                if ( formation.name == "Administration") {
                    foundAdmin = true;
                } else if ( formation.name == "Force Commander") {
                    foundForce = true;
                }
                if ( foundAdmin && foundForce ) {
                    break;
                }
            }

        } 
    }
    // if there is nothing in the selectionEntries there is nothing to find

    // which faction is this
    const faction = _sharedSelection.name;

    if ( !foundAdmin ) {
        // add links to Faction category, Show Faction, and Force Setup
        const showFactionName = "Show: " + faction;
        const factionCategoryName = "Faction: " + faction;
        let factionCategoryId = myUtils.getCategoryTag( _sharedSelection, factionCategoryName );
        let showFactionId = myUtils.getCategoryTag( _sharedSelection, showFactionName );
        let forceCategoryId = myUtils.getCategoryTag( _sharedSelection, "Force Setup");

        const categoryLinks = [];
        categoryLinks.push({name: "Force Setup", primary: "true", targetId: forceCategoryId, id: myUtils.generateID() });
        categoryLinks.push({name: showFactionName, primary: "false", targetId: showFactionId, id: myUtils.generateID() });
        categoryLinks.push({name: factionCategoryName, primary: "false", targetId: factionCategoryId, id: myUtils.generateID() });


        // find the tags for Allies selector and Era selector
        let alliesSelectorId = myUtils.getGroupId( _sharedSelection, "Allies Selector" );
        let eraSelectorId = myUtils.getGroupId( _sharedSelection, "Era Selector");
        let entryLinks = [];
        entryLinks.push({name: "Allies Selector", import: "true", hidden: "false", id: myUtils.generateID(), type: "selectionEntryGroup", 
            targetId: alliesSelectorId, sortIndex: "2"});
        entryLinks.push({name: "Era Selector", import: "true", hidden: "false", id: myUtils.generateID(), type: "selectionEntryGroup", 
            targetId: eraSelectorId, sortIndex: "1"});

        // build the constraints, exactly 1 in force

        let constraintLinks = [];
        constraintLinks.push({type: "min", value: "1", field: "selections", scope: "force", shared: "false", id: myUtils.generateID(), 
            includeChildSelections: "true" });
        constraintLinks.push({type: "max", value: "1", field: "selections", scope: "force", shared: "false", id: myUtils.generateID(), 
            includeChildSelections: "true" });

        const entry = {
            id: myUtils.generateID(),
            name: "Administration",
            type: "upgrade",
            import: "true",
            hidden: "false",
            exportable: "false",
            categoryLinks: categoryLinks,
            constraints: constraintLinks,
            entryLinks: entryLinks
        }
        $store.add_node( "selectionEntries", _sharedSelection, entry );

        console.log( "Added Force Setup for " + faction );
        notify({ text: "Added Force Setup for  " + faction, type: "success" });

    }

    if ( !foundForce ) {
        
        const forceCommanderLinkId = myUtils.getGroupId( _sharedSelection, "Force Commander");

        const constraintLinks = [];
        constraintLinks.push({type: "min", value: "1", field: "selections", scope: "force", shared: "false", id: myUtils.generateID(), 
            includeChildSelections: "true" });
        constraintLinks.push({type: "max", value: "1", field: "selections", scope: "force", shared: "false", id: myUtils.generateID(), 
            includeChildSelections: "true" });
        const entry = {
            id: myUtils.generateID(),
            name: "Force Commander",
            type: "upgrade",
            import: "true",
            hidden: "false",
            categoryLinks: [ {id: myUtils.generateID(), name: "Force Commander", targetId: "ct-ForceCommander", primary: "true" }],
            constraintLinks: constraintLinks,
            entryLinks: [ {id: myUtils.generateID(), name: "Force Commander", import: "true", type: "selectionEntryGroup", targetId: forceCommanderLinkId}]
        }
        $store.add_node( "selectionEntries", _sharedSelection, entry );

        console.log( "Added Force Commander for " + faction );
        notify({ text: "Added Force Commander for  " + faction, type: "success" });


    }
  

}


export default {

    name: "ESR Faction Setup",
    /* arguments: [
        {
        type: "catalogue[]",
        },
    ], */

    hooks: 
    {
        paste(e, payload) {
            // for the faction we just need to determine that we have a faction catalog.
            // after we know that we have a valid catalog we can start the work of 
            // adding out the data.

            if (typeof payload !== "string") return
            const sharedSelection = $store.get_selected();

            if (sharedSelection.parentKey !== "catalogue") {
                notify({ text: "Select any top level of a faction catalog", type: "error" });
                console.error( "Select any top level of a faction catalog" );
                return;
            }

            // game system == gst
            const gst = sharedSelection.gameSystem;
            const factionName = sharedSelection.name;

            if ( myUtils.isValidFaction( factionName ) == false ) {
                notify( {text: factionName + " is not a valid faction", type: "error"});
                console.error( factionName + " is not a valid faction");
                return;
            }

            // get the two letter abbreviation for this faction
            const thisFactionAbbreviation = myUtils.getFactionAbbreviationFromName( factionName );

            if (thisFactionAbbreviation == null ) {
                notify( {text: factionName + " does not have an abbreviation", type: "error"});
                console.error( factionName + " does not have an abbreviation");
                return;
            }

            // look at the top level catalog entries
            // Administration & Force Commander
            
            // look for Administration and Force Commander, if it is not found, then add them
            findAddRootAdministrationAndForceCommander(sharedSelection);
         
            return null;
        }
    }

}
