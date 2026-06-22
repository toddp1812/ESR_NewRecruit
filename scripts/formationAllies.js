/*
 * ESR Formation Allies
 *
 * This script is designed to create the allied formation where all
 * units are available. 
 * 
 */
import Utils from "./utils2.js"; 

const myUtils = new Utils();

export default {

    name: "ESR Formation Allies Setup",
    /* arguments: [
        {
        type: "catalogue[]",
        },
    ], */

    hooks: 
    {
        paste(e, payload) {

            const selected = $store.get_selected();

            // this should be the Root Selection Entries
            if (selected.parentKey !== "catalogue") {
                notify({ text: "Select the Root Selection Entries item", type: "error" });
                console.error( "Select the Root Selection Entries item" );

                return;
            }


            const cat = selected;
        

            const catalogFile = selected.name;
            if (catalogFile !== "Formations") {
                notify({ text: "Select the only the Formations catalog", type: "error" });
                console.error( "Select the only the Formations catalog" );
                return;
            }

                // make certain we can access all of the data
            try {
                let testList = selected.sharedSelectionEntryGroups;

            }
            catch (e) {
                notify({ text: "Error processing formations, could not access shareSelectionEntryGroup data, please select the Share Selection Entry Group for paste", type: "error" });
                console.error( "Error processing formations, could not access shareSelectionEntryGroup data, please select the Share Selection Entry Group for paste, error: ", e );
                return null;
            }

            // loop through all of the selection entries and build a huge formation
            // add directly to the foramtion, units entry list. Make sure the sortIndex for the 
            // Commander is 1
            // at the same time, look for rules that we will have to process later
            // put any rules we find in myFactionRules
            //
                       
            let importIterator = selected.iterateAllImported();
            let importData = importIterator.next();
            let count = 2; 
            const myUnitList = [];
            const myFactionRules = [];

            while ( importData.done == false ) {

                if ( importData.value.name == "Commander" ) {
                    myUnitList.push ( {id: myUtils.generateID(),  name: importData.value.name, type: "entryLink",
                    targetId: importData.value.id, hidden: "false", sortIndex: "1" } );
                } else if( importData.value.isUnit() ) {
                    // filter out the links, if there is a link, skip it
                    if ( importData.value.isGroup() == false ) {
                        myUnitList.push( {id: myUtils.generateID(), name: importData.value.name, type: "entryLink",
                            targetId: importData.value.id, hidden: "false", sortIndex: count})
                        count++;
                    }
                } else if ( importData.value.isRule() ) {
                    let rule = {
                        name: importData.value.name,
                        id: importData.value.id
                    };
                    myFactionRules.push(rule);
                }
                importData = importIterator.next();
                
            } 


            /* 
            * add in the Scenario Rules section
            */
            const scenarioRules = [ "Big Battalions", "Brittle", "Determined", "Enthusiastic", "Impetuous", "Parallel Deployment",
                "Rapid Deployment", "Stoic" ] 
            const factionScenarioRules = [];  // this must be an array of 
            for ( let thisRule of scenarioRules ) {
                let found = false;
                let factionRule;
                for ( factionRule of myFactionRules ) {
                    if ( factionRule.name == thisRule ) {
                        found = true;
                        break;
                    }
                }
                const selectionEntry = {
                    name: factionRule.name,
                    id: myUtils.generateID(),
                    type: "upgrade",
                    hidden: "false",
                    import: "true",
                    infoLinks: [ {name: factionRule.name, import: "true", hidden: "false", type: "upgrade", targetId: factionRule.id, id: myUtils.generateID() } ], 
                    constraints: [ { type: "max", value: "1", field: "selections", scope: "force", shared: "true", includeChildSelections: "false", id: myUtils.generateID() }]
                };

                if (found == true) {
                    factionScenarioRules.push( selectionEntry );
                } else {
                    notify({ text: "Scenario rule: " + thisRule + " does not match any rule", type: "error" });
                    console.error( "Scenario rule: " + thisRule + " does not match any rule" );
                    return null;
                }
            }

            // add these rules to the selection list

            
            const thisScenarioRuleSelectionGroup = {
                name: "Scenario Rules",
                hidden: "false",
                selectionEntries: factionScenarioRules,
                id: myUtils.generateID()
            }; 
            
            const formation = {
                type: "unit",
                name: "Allied Formation",
                subType: "unit-group",
                categoryLinks: [
                    {id: myUtils.generateID(), name: "Formation", primary: "true", targetId: "ct-Formation" },
                    {id: myUtils.generateID(), name: "Faction: Austria", targetId: "ct-Faction-Austria" },
                    {id: myUtils.generateID(), name: "Faction: Bavaria", targetId: "ct-Faction-Bavaria" },
                    {id: myUtils.generateID(), name: "Faction: England", targetId: "ct-Faction-England" },
                    {id: myUtils.generateID(), name: "Faction: France", targetId: "ct-Faction-France" },
                    {id: myUtils.generateID(), name: "Faction: Italy", targetId: "ct-Faction-Italy" },
                    {id: myUtils.generateID(), name: "Faction: Poland", targetId: "ct-Faction-Poland" },
                    {id: myUtils.generateID(), name: "Faction: Prussia", targetId: "ct-Faction-Prussia" },
                    {id: myUtils.generateID(), name: "Faction: Russia", targetId: "ct-Faction-Russia" },
                    {id: myUtils.generateID(), name: "Faction: Saxony", targetId: "ct-Faction-Saxony" },
                    {id: myUtils.generateID(), name: "Faction: Spain", targetId: "ct-Faction-Spain" },
                    {id: myUtils.generateID(), name: "Faction: Westphalia", targetId: "ct-Faction-Westphalia" },
                    {id: myUtils.generateID(), name: "Faction: Württemberg", targetId: "ct-Faction-Württemberg" }
                ],
                hidden: "false",
                entryLinks: myUnitList,
                selectionEntryGroups: [ thisScenarioRuleSelectionGroup ],
            }

            // push this formation into our selection list
            $store.add_node( "sharedSelectionEntryGroups", selected, formation );
         
            console.log( "Processed " + (count -1) + " units for combined Allied formation.");
            notify({ text: "Processed " + (count -1) + " units for combined Allied formation.", type: "success" });

            return null;
        }
    }

}
