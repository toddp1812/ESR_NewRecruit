/*
 * ESR Generic Commander load script
 * This script loads a pasted record from the New Recruit game folder.
 * The paste needs to be activated on the Commander shareSelectionEntry 
 * in the faction catalog. The pasted text must be in the format of the 
 * commander spreadsheet, all columns. Each row should be one Commander.
 * 
 * Commander has an assumed structure:
 * * Commander
 * -- Generic or Historical Commander
 * -- * Generic
 * -- * -- all generic comamnders go here
 * -- * Historical Commander
 * -- * -- all historical commanders go here
 * 
 */
import Utils from "./utils2.js"; 

const myUtils = new Utils();

function toCommanderProfiles(_data, _genericCommander, _rules, _factionName, _factionType) {

    let model = {
        id: myUtils.generateID(),
        parentKey: "profiles",
        name: _data.Name,
        typeName: "Commander",
        typeId: "pt-CmdUnit",
        characteristics: [
            {typeId: "ct-CmdUnit-Avail-Formation", $text: _data.Formation},
            {typeId: "ct-CmdUnit-Avail-Force", $text: "–"},
            {typeId: "ct-CmdUnit-Avail-Army", $text: "–"},
            {typeId: "ct-CmdUnit-Cmd", $text: _data.Command},
            {typeId: "ct-CmdUnit-Thr-LR", $text: _data.RangedLR},
            {typeId: "ct-CmdUnit-Thr-SR", $text: _data.RangedSR},
            {typeId: "ct-CmdUnit-Thr-C", $text: _data.Contact},
            {typeId: "ct-CmdUnit-Coh" ,$text: _data.Cohesion},
            {typeId: "ct-CmdUnit-Move", $text: "N/A"},
            {typeId: "ct-CmdUnit-Trait", $text: _data.Traits }
        ],
        
    }


    //
    // calculate the threat and Cohesion
    //
    let Threat = +_data.RangedLR + +_data.RangedSR + +_data.Contact;
    let Cohesion = +_data.Cohesion;

    if ( Number.isNaN(Threat)) {
      Threat = 6;
      console.error( "Threat value is hard coded for commander: ", _data.Name, " because of an error in the source data. Check the RangedLR, RangedSR and Contact fields for non-numeric characters." );
      notify({ text: "Threat value is hard coded for commander: " + _data.Name + " because of an error in the source data. Check the RangedLR, RangedSR and Contact fields for non-numeric characters.", type: "error" });
    }
    
    if (Number.isNaN(Cohesion)) {
      Cohesion = 2;
      console.error( "Cohesion value is hard coded for commander: ", _data.Name, " because of an error in the source data. Check the Cohesion field for non-numeric characters." );
      notify({ text: "Cohesion value is hard coded for commander: " + _data.Name + " because of an error in the source data. Check the Cohesion field for non-numeric characters.", type: "error" });
    }

    const ruleLinks = [];
    //
    // loop over rules and see what needs to be included and linked
    // 
    for ( const rule of _rules ) {
      const expression = rule.name+";";
      const regexp = new RegExp(expression);
      const testString = _data.Traits;
      if ( testString.match( regexp ) ) {
        ruleLinks.push( {id: myUtils.generateID(), name: rule.name, hidden: "false", type: "rule", targetId: rule.id } );
      }
    }

    // 
    // entry for the commander unit entry
    // 
    const catalog = _genericCommander.getCatalogue();
    const showThisFactionId = myUtils.getShowFactionId( catalog, _factionName );

    let entry = {
        id: myUtils.generateID(),
        parentKey: "selectionEntries",
        name: _data.Name,
        type: "model",
        hidden: "true",
        profiles: [model],
        costs: [
          {typeId: "esr-ct-Cohesion", name: "Cohesion", value: Cohesion} ,
          {typeId: "esr-ct-Threat", name: "Threat", value: Threat}
        ],
        infoLinks: ruleLinks,
        categoryLinks:  [ {id: myUtils.generateID(), name: _factionName, primary: "true", targetId: _factionType } ],
        modifiers: [
          {
            type: "set", value:"false", field:"hidden", conditions: [
              {type: "atLeast", value: "1", field: "selections", scope: "force", childId: showThisFactionId, shared: "true", includeChildSelections: "true" }
            ]
          }
        ]
      }

    return entry;
}


//
// returns the number of successfully converted elements
//
function tokenizeLine ( line, results ) {

  const tokens = [ "Nation", "Name", "Formation", "Command", 
    "RangedLR", "RangedSR","Contact", "Cohesion", "Traits" ];

  let count = 0;
  let items = [];


  items = line.split(/\t/);

  tokens.map( (token) => { 
    //console.log( token );
    results[ token ] = items[ count++];
    
    } );

  if( results.Name == "" ) {
    count = -1;
  } else if( results.AvailabilityArmy == "Rated 3" ) {
    count = -1;
  } else if ( results.AvailabilityFormation == "Availability") {
    count = -1;
  }

  return count;
}

function processCommander(_commanderResults, _genericCommander, _rules, _factionName, _factionType) {
    
  if (_genericCommander.name !== "Common Formation Commander" ) {
    console.error( "The generic commander element reference was not passed, possibly the wrong selection?");
    return;
  }

  
  
  // loop over all commander results and add them to the generic commander selections
  for ( const commander of _commanderResults ) {
    let profile = toCommanderProfiles( commander, _genericCommander, _rules, _factionName, _factionType );
    $store.add_node( "selectionEntries", _genericCommander, profile );
  }

  return null;
}




export default {

  name: "ESR Generic Cmdr Import",
  /* arguments: [
    {
      type: "catalogue[]",
    },
  ], */

  hooks: 
  {
    paste(e, payload) {

      const commanderResults = [];
      const factionRules = [];

      if (typeof payload !== "string") return
      const selected = $store.get_selected();
      if (selected.parentKey !== "sharedSelectionEntries") {
        notify({ text: "Select the (top-level) Commander selectionEntry", type: "error" });
        console.error( "Select the (top-level) Commander selectionEntry" );
        return;
      }
      if (selected.name !== "Commander") {
        notify({ text: "Select the top-level Commander selectionEntry", type: "error"});
        console.error( "Select the top-levelCommander selectionEntry" );
        return;
      }

     // get the faction from the first line of the pasted data
     const factionResults = myUtils.getFactionFromTSVLine( payload );
      if ( factionResults == null ) {
        notify({ text: "Could not part faction out of line: " + payload, type: "error" });
        console.error( "Could not part faction out of line: " + payload );
        return;
      }
        
      const faction = factionResults.faction;
      const factionType = factionResults.type;


      const cat = selected.catalogue;
      // game system == gst
      const gst = cat.gameSystem;
 
      factionRules.length = 0;
      if (cat.sharedRules !== undefined) {
        for ( const rule of cat.sharedRules ) {
          factionRules.push(rule);
        } 
      }
      if (gst.sharedRules !== undefined ) {
        for ( const rule of gst.sharedRules ) {
            factionRules.push(rule);
          }
      }
 
      //console.log( selected );

      // find the Common Commander entry
      let genericCommander = null;
      // get a reference to the generic commanders
      
      for (const element of selected.selectionEntryGroups[0].selectionEntryGroups) {
        if( element.name == "Common Formation Commander") {
          genericCommander = element;
          break;
        }
      }

      if ( genericCommander == null ) {
        console.error( "Commander unit definition is not correct, cannot find Common Formation Commander" );
        return;
      }
      
      // if we get to here, we have the data from the file
      // loop over every line and load the commanders into a structure
      // 
      let lineByLine = payload.split( '\r\n');
      let line;
      let number = 0;
      for ( line of lineByLine ) {
        let results = []; // scope, need to create new entries for EACH commander
        if (line == ""){
          continue;
        }
        let num = tokenizeLine ( line, results );
        if ((num > 0) && (results.Name !== "")) {
          commanderResults[number] = results;
          number ++; 
          console.log( "Processed: ", results.Name );
        }
        //console.log( line );
  
      }
          
      processCommander( commanderResults, genericCommander, factionRules, faction, factionType );
      
      console.log( "Processed " + number + " " + faction + " commanders.");
      
      return null;
    }
  }  
}



