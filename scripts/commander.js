/*
 * ESR Commander load script
 * This script loads a file from the New Recruit game folder
 */
function toCommanderProfiles(Data, Rules) {

    let model = {
        parentKey: "profiles",
        name: Data.Name,
        typeName: "Commander",
        typeId: "pt-CmdUnit",
        characteristics: [
            {typeId: "ct-CmdUnit-Avail-Formation", $text: Data.AvailabilityFormation},
            {typeId: "ct-CmdUnit-Avail-Force", $text: Data.AvailabilityForce},
            {typeId: "ct-CmdUnit-Avail-Army", $text: Data.AvailabilityArmy},
            {typeId: "ct-CmdUnit-Cmd", $text: Data.Command},
            {typeId: "ct-CmdUnit-Thr-LR", $text: Data.RangedLR},
            {typeId: "ct-CmdUnit-Thr-SR", $text: Data.RangedSR},
            {typeId: "ct-CmdUnit-Thr-C", $text: Data.Contact},
            {typeId: "ct-CmdUnit-Coh" ,$text: Data.Cohesion},
            {typeId: "ct-CmdUnit-Move", $text: "24 | 18 | 9"},
            {typeId: "ct-CmdUnit-Trait", $text: Data.Traits }
        ],
    }


    //
    // calculate the threat and Cohesion
    //
    let Threat = +Data.RangedLR + +Data.RangedSR + +Data.Contact;
    let Cohesion = +Data.Cohesion;

    if ( Number.isNaN(Threat)) {
      Threat = 6;
    }
    
    if (Number.isNaN(Cohesion)) {
      Cohesion = 2;
    }

    const ruleLinks = [];
    //
    // loop over rules and see what needs to be included and linked
    // 
    for ( const rule of Rules ) {
      const expression = rule.name+";";
      const regexp = new RegExp(expression);
      const testString = Data.Traits;
      if ( testString.match( regexp ) ) {
        ruleLinks.push( {name: rule.name, hidden: "false", type: "rule", targetId: rule.id } );
      }
    }

    // 
    // entry for the commander unit entry
    // 
  
    let entry = {
        parentKey: "selectionEntries",
        name: Data.Name,
        type: "model",
        profiles: [model],
        costs: [
          {typeId: "esr-ct-Cohesion", name: "Cohesion", value: Cohesion} ,
          {typeId: "esr-ct-Threat", name: "Threat", value: Threat}
        ],
        infoLinks: ruleLinks
      }

    return entry;
}


//
// returns the number of successfully converted elements
//
function tokenizeLine ( line, results ) {

  const tokens = [ "Card", "Name", "AvailabilityFormation", "AvailabilityForce", "AvailabilityArmy", "Command", 
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

function processCommander(CommanderResults, HistoricalCommander, Rules) {
    
  if (HistoricalCommander.name !== "Historical Commander" ) {
    console.error( "The historical commander element reference was not passed, possibly the wrong selection?");
    return;
  }

  //
  // remove any commanders who are currently there
  //
  try { 
    HistoricalCommander.selectionEntries.length = 0;
  } catch (e) {
    // nothing to do, the selectionEntries have not been added yet
  }
    
  
  // loop over all commander results and add them to the Historical commander selections
  for ( const commander of CommanderResults ) {
    let profile = toCommanderProfiles( commander, Rules );
    $store.add_node( "selectionEntries", HistoricalCommander, profile );
  }

  return null;
}




export default {

  name: "ESR Cmdr Import",
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
        return;
      }
      if (selected.name !== "Commander") {
        notify({ text: "Select the Commander selectionEntry", type: "error"})
        return;
      }

      const cat = selected.catalogue;
      // game system == gst
      const gst = cat.gameSystem;
      const faction = cat.name;

        switch (faction) {
          case "French":
          case "Russian":
          case "English":
          case "Austrian":
              // expected faction names
              // nothing to do
            break;

          default:
            console.error( "Faction: ", faction, "does not have a valid file mapping.");
            return;
            break;
        }

 
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

      let historicalCommander = null;
      // get a reference to the Historical commanders
      
      for (const element of selected.selectionEntryGroups[0].selectionEntryGroups) {
        if( element.name == "Historical Commander") {
          historicalCommander = element;
          break;
        }
      }

      if ( historicalCommander == null ) {
        console.error( "Commander unit definition is not correct, cannot find Historical Commander" );
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
          
      processCommander( commanderResults, historicalCommander, factionRules );
      
      console.log( "Processed " + number + " " + faction + " commanders.");
      
      return null;
    }
  }  
}



