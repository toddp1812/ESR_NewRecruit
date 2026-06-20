/*
 * ESR formations load script
 * This script loads a pasted record from the New Recruit game folder.
 * The paste needs to be activated on the Root Selection Entries 
 * in the faction catalog. The pasted text must be in the below.
 * 
 * Formation\Unit    Type      Traits   "Unit 1"   "Unit 2"   
 * Formation 1       <type>    Mass Cav..  x          ...
 * Formation 2 ...
 * 
 * The Unit names on the top of the columns, must match the names of the unit 
 * defined in the Shared Selection Entries.
 * 
 * Every formation with an 'x' for a unit includes that unit in its selection list.
 * 
 */
import Utils from "./utils2.js"; 
const myUtils = new Utils();

function splitLine ( _line ) {
  let returnVal;
  try { returnVal = _line.split( '\t'); 
  } catch (e) {
    console.error ( "split threw error: ", e);
  }
  return returnVal;
}

function processFirstLine ( _line ) {
  const items = splitLine( _line );

  if ( items[0] !== "Formation\\Unit") {
    notify({ text: "Select the entire faction Formations table, line: " + _line, type: "error" });
    return null;
  } else if ( items.length <= 3 ) {
    notify({ text: "Select the entire faction Formations table including units, line: " + _line, type: "error" });
    return null;
  }

  const units = items.splice( 3, items.length-3);
  return units;
}

function parseFactionUnits ( _catalog ) {

  let myFactionUnits = [];
  let myFactionRules = [];
  let rawUnit;

  // look through all units defined in the links
  // there are none in this catalog, all are imported from Units catalog.
  //
  let importIterator = _catalog.iterateAllImported();
  let importData = importIterator.next();
  while ( importData.done == false ) {

    if( importData.value.isEntry() ) {
      //console.log( "selection: ", importData.value.name, " id: ", importData.value.id );
      let unit = {
        name: importData.value.name,
        id: importData.value.id
     };
     myFactionUnits.push(unit);
    } else if (importData.value.isRule() ) {
      let rule = {
        name: importData.value.name,
        id: importData.value.id
      };
      myFactionRules.push(rule);
    }
    
    importData = importIterator.next();
    
  } 

  return {
    units: myFactionUnits, 
    rules: myFactionRules
  };
}



function getNextUnit( _unit, _factionUnits, _sortIndex ) {

  let factionUnit;
  let found = false;
  for ( factionUnit of _factionUnits) { // _factionUnits is in order 0 to length
    if ( _unit == factionUnit.name ) {
      // we found a match
      found = true;
      break;
    }
  }
  if (!found) {
    notify({ text: "Error in data file, no unit from selection, unit: " + unit + " line: " + _line, type: "error" });
    return null;
  }
  // make a record and return it
  const thisUnit = {
    name: factionUnit.name,
    id: myUtils.generateID(),
    targetId: factionUnit.id,
    type: "entryLink",
    hidden: "false",
    sortIndex: _sortIndex
  };

return( thisUnit );

} // getNextUnit()


function getForceCommander ( _factionUnits, _catalog,_faction, _factionType ) {

  // add in the formation commander
  const myCommander = getNextUnit( "Commander", _factionUnits);

  const showThisFactionId = myUtils.getShowFactionId( _catalog, _faction );
  
  const forceCommander = {
    type: "unit",
    name: "Force Commander",
    hidden: "true",
    subType: "unit-group",
    categoryLinks: [
      {name: "Force Commander", primary: "true", targetId: "ct-ForceCommander", id: myUtils.generateID() },
      {name: _faction, targetId: _factionType }
    ],
    entryLinks: [ myCommander ],
    modifiers: [
      {
        type: "set", value:"false", field:"hidden", conditions: [
          {type: "atLeast", value: "1", field: "selections", scope: "force", childId: showThisFactionId, shared: "true", includeChildSelections: "true" }
        ]
      }
    ]
  };

  return forceCommander;

} // getForceCommander() 

function processNextLine ( _line, _units, _catalog, _factionUnits, _factionRules, _faction, _factionType ) {

  // 
  // get the data for this line
  //
  let items = [];

  items = splitLine( _line );

  // the first three elements are for the formation definition
  // the next elements are aligned with the units
  //
  if ( items <= 3 ) {
    // there are not enough elements for us to process.
    notify({ text: "Select the entire faction Formations table, including units, line: " + _line, type: "error" });
    return null;
  }

  if (_units.length < 1) {
    // there are not any units to process
    notify({ text: "Select the entire faction Formations table, no units selected, line: " + _line, type: "error" });
    return null;
  }
  
  const myRuleLinks = [];
  //
  // loop over rules and see what needs to be included and linked
  // 
  
  for ( const rule of _factionRules ) {
    const expression = rule.name;
    const regexp = new RegExp(expression);
    const testString = items[2];
    if ( testString.match( regexp ) ) {
      myRuleLinks.push( {name: rule.name, id: myUtils.generateID(), hidden: "false", type: "rule", targetId: rule.id } );
    }
  }

  //
  // add the units to the formation
  //
  const myUnitList = [];
  const formationUnitList = items.splice( 3, items.length - 3); // remove the first 3 records which are formation records
                                                                // formationUnitList matches the records in _units 0 to length
  let i, selectedUnit, factionUnit;
  
  for (i = 0; i < formationUnitList.length; i++){
    if( formationUnitList[i] !== "" ){
      // if this unit is selected, add it to the Formation
      
      // add 2. The first index is for the commander, and the index is 1 based
      myUnitList.push(getNextUnit( _units[i], _factionUnits, i + 2 ));
    }
  }

  // add in the formation commander
  myUnitList.push(getNextUnit( "Commander", _factionUnits, 1));
  
  /* 
   * add in the Scenario Rules section
   */
  const scenarioRules = [ "Big Battalions", "Brittle", "Determined", "Enthusiastic", "Impetuous", "Parallel Deployment",
    "Rapid Deployment", "Stoic" ] 
  const factionScenarioRules = [];  // this must be an array of 
  for ( let thisRule of scenarioRules ) {
    let found = false;
    let factionRule;
    for ( factionRule of _factionRules ) {
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
  
  const showThisFactionId = myUtils.getShowFactionId( _catalog, _faction );;


  const formation = {
    type: "unit",
    name: items[0],
    subType: "unit-group",
    categoryLinks: [
      {id: myUtils.generateID(), name: "Formation", primary: "true", targetId: "ct-Formation" },
      {id: myUtils.generateID(), name: _faction, targetId: _factionType }
    ],
    hidden: "true",
    infoLinks: myRuleLinks, 
    entryLinks: myUnitList,
    selectionEntryGroups: [ thisScenarioRuleSelectionGroup ],
      modifiers: [
        {
          type: "set", value:"false", field:"hidden", conditions: [
            {type: "atLeast", value: "1", field: "selections", scope: "force", childId: showThisFactionId, shared: "true", includeChildSelections: "true" }
          ]
        }
      ]
  }
  
  return formation;

}

function  processEachLine( _payload, _catalog, _faction, _factionType ) {


  //
  // get each selection entry (units and commander) into
  // an array we can use to link units into the formation
  //
  let factionUnits = [];
  let formationArray = [];
  let factionRules = [];

  ({units: factionUnits, rules: factionRules} = parseFactionUnits (_catalog));

  // loop over each line in the _payload and process each line
  //
  let pasteLines = _payload.split( '\r\n' );
  let line;
  let lineCount = 0;
  let units = [];
  for ( line of pasteLines ) {
    // process first line differently
    if ( lineCount == 0) {
      units = processFirstLine( line );
      if (units == null) {
        //there was an error
        return null;
      }
      
    } else {
      if ( line == "" ) {
        continue; // skip blank lines
      }
      let nextFormation = processNextLine( line, units, _catalog, factionUnits, factionRules, _faction, _factionType);
      if ( nextFormation !== null) {
        formationArray.push( nextFormation);
      }
    }
    lineCount++;
  }

  // if there is already a force commander, skip this step
  //
  let found = false;
  for ( let mySelectionEntry of _catalog.sharedSelectionEntryGroups ) {
    if( mySelectionEntry.name == "Force Commander"){
      found = true;
      break;
    }
  }
  if (!found) {
    // add the force commander
    formationArray.push(getForceCommander( factionUnits, _catalog, _faction, _factionType ));
  }
  
  
  // make a record and return it
  console.log( "Processed " + (lineCount -1) + " " + _faction + " formations.");
  notify({ text: "Processed " + (lineCount -1) + " " + _faction + " formations.", type: "success" });

  return formationArray; 
}

export default {

  name: "ESR Formation Import",

  hooks: 
  {
    paste(e, payload) {

      if (typeof payload !== "string") return

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

      // 
      // determine which faction we are pasting in
      //
      let myFactionType;
      let faction;

      // skip first line
      let pasteLines = payload.split( '\r\n' );

      const factionAbbrevation = myUtils.getFactionAbbreviationFromString( pasteLines[1] );
      if ( factionAbbrevation == null ) {
        console.error( "Could not parse first line for faction, line: " + pasteLines[1] );
        notify({ text: "Could not parse first line for faction.", type: "error" });

        return;
      }
      let factionData = myUtils.getFactionFromAbbreviation( factionAbbrevation );
      if (!factionData) {
        return;
      }
      faction = factionData.faction;
      myFactionType = factionData.type;

      let formations = processEachLine( payload, selected, faction, myFactionType );

      //console.log( selected );
      
      for ( let thisFormation of formations ) {
        $store.add_node( "sharedSelectionEntryGroups", selected, thisFormation );
      }


      return null;
    }
  }  
}



