/*
 * ESR Faction Create Script
 * This script is designed to flesh out the Root selection entries fof teh 
 * an ESR faction. 
 * 
 */
import Utils from "./utils2.js"; 

const myUtils = new Utils();

function findFormationEntries(_sharedSelection) {
    const formations = [];
    // loop through the import data for formations 
    let importIterator = _sharedSelection.iterateAllImported();
    let importData = importIterator.next();
    while ( importData.done == false ) {

        if( importData.value.isGroup() ) {
            // is this a formation?
            let categoryIterator = importData.value.categoryLinksIterator();
            let categoryData = categoryIterator.next();
            let isFormation = false;
            while( categoryData.done == false ) {
                if( categoryData.value.name == "Formation"){
                    // if this is a link already in the file, skip it
                    // if importData has a targetId parameter, it is a link in our 
                    // root selection entries, skip it
                    if( typeof importData.value.targetId == 'undefined' ){ 
                        isFormation = true;
                        break;
                    }
                }
                categoryData = categoryIterator.next();
            }
            if (isFormation) {
                formations.push( {name: importData.value.name, id: importData.value.id})
            }
        }
        importData = importIterator.next();
    } 

    // return the list of formations
    return formations;
}

function linkFormationEntries (_sharedSelection, _formationEntries, _factionName ) {
    // loop through each of the passed formations and add them to the list 
    // of entries if they are not found, create a work list of entries to add to list
    //
    const workList = [];

    for( const entry of _formationEntries) {
        // search for this entry in the selection list
        let entriesIterator = _sharedSelection.localSelectionsIterator();
        let entryData = entriesIterator.next();
        let found = false;
        while ( entryData.done == false ) {
            if( entryData.value.isLink() ) {
                if ( entryData.value.targetId == entry.id ) {
                    found = true;
                    break;
                }
            }
            entryData = entriesIterator.next();
        }
        if ( !found ) {
            // add this entry to our workflow
            workList.push( { name: entry.name, id: entry.id });
        }
    }

    // from the workList loop over each entry and add to the faction's selection list
    for ( const workItem of workList ) {

        const entry = {
            id: myUtils.generateID(),
            name: workItem.name,
            import: "true",
            hidden: "false",
            type: "selectionEntryGroup",
            targetId: workItem.id
        }

        $store.add_node( "entryLinks", _sharedSelection, entry );
        
    }

    const numberOfAdded = workList.length;
    console.log( "Processed " + numberOfAdded + " " + _factionName + " (native and allied) formations.");
    notify({ text: "Processed " + numberOfAdded + " " + _factionName + " (native and allied) formations.", type: "success" });

}


export default {

    name: "ESR Faction Add Formations",
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

            // look at the top level catalog entries
            // Administration & Force Commander
            
            // look at all Formation entries in the shared catalog that are units and 
            // process any units which have not been added yet
            //
            let formationEntries = findFormationEntries(sharedSelection);  // from the shared selection entries
            linkFormationEntries(sharedSelection, formationEntries, factionName);

            return null;
        }
    }

}
