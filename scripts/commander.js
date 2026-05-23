/*
 * ESR Commander load script
 * This script loads a file from the New Recruit game folder
 */
function toCommanderProfiles(Data) {

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
    const Threat = +Data.RangedLR + +Data.RangedSR + +Data.Contact;
    const Cohesion = +Data.Cohesion;


    // 
    // entry for the commander unit entry
    // 
  
    let entry = {
        parentKey: "selectionEntries",
        name: Data.Name,
        type: "model",
        profiles: [model],
        costs: [
        {typeId: "esr-ct-Cohesion", $text: Cohesion,
          typeId: "esr-ct-Threat", $text: Threat}
        ]

      }

    return entry;

    //    return [model, ...traits]  
}


//
// returns the number of successfully converted elements
//
function tokenizeLine ( line, results ) {

  const tokens = [ "Card", "Name", "AvailabilityFormation", "AvailabilityForce", "AvailabilityArmy", "Command", 
    "RangedLR", "RangedSR","Contact", "Cohesion", "Traits" ];

  let count = 0;
  let items = [];


  items = line.value.split(/\t/);

  tokens.map( (token) => { 
    //console.log( token );
    results[ token ] = items[ count++];
    //results.token = items[count++]; 
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

function processCommander(commandElement) {
    
  if (commandElement.name !== "Commander") {
    notify({ text: "Select the Commander selectionEntry", type: "error"})
    return;
  }
  if ( commanderResults.length == 0) {
    notify({ text: "Commander file did not proces correctly", type: "error"})
    return;
  }

  let historicalCommander;
  // get a reference to the Historical commanders
  
  for (const element of commandElement.selectionEntryGroups[0].selectionEntryGroups) {
    if( element.name == "Historical Commander") {
      historicalCommander = element;
      break;
    }
  }

  // for each line of the commanderResult, process the commander

  const commander = commanderResults[0];
  
  let entryTest = {
    parentKey: "selectionEntries",
    name: commander.Name, 
    type: "model"
  } 

  let profile = toCommanderProfiles( commander );

  
  //historicalCommander.selectionEntries[3] = entryTest;
  $store.add_node( "selectionEntries", historicalCommander, profile );
  
  
  /*
  for ( const commander of commanderResults ) {
    historicalCommander.selectionEntries.push(toCommanderProfiles( commander ));
  }*/

  // at the end clear the commander results to set up for the next file
  commanderResults.length = 0;

  return null;
}



const commanderResults = [];

export default {

  name: "ESR Cmdr Test",
  arguments: [
    {
      type: "catalogue[]",
    },
  ],


  async run(catalogues) {


    const gst = catalogues[0];

    let faction = "";
    let fileName = "";

    if ( catalogues.length !== 1) {
      console.error( "Select one catalog only" );
      return;
    } else if (catalogues[0].name == 'ESR' ){
      console.error( "Do not select the ESR catalog"); 
      return;
    } else {
      faction = catalogues[0].name;
    }

    switch (faction) {
      case "French":
        fileName = "ESR Command Cards-French Commanders.txt";
      break;

      case "Russian":
        fileName = "ESR Command Cards-Russian Commanders.txt";
      break;

      case "English":
        fileName = "ESR Command Cards-English Commanders.txt";
        break;

      case "Austrian":
        fileName = "ESR Command Cards-English Commanders.txt";
        break;

      default:
        console.error( "Faction: ", faction, "does not have a valid file mapping.");
        return;
        break;
    }

    // zero out results if there is anything in it now.
    commanderResults.length = 0; 

    const workingPath = import.meta.url.replace( /^file:\/\/\//,"" );
    const dirName = workingPath.split('/').slice(0, -2).join('/');
    const filePath = `${dirName}/${fileName}`;
    const fileData = await $node.readFile( filePath );
    
    if( fileData.data == undefined) {
      console.error( "Could not open file ", filePath);
      return;
    }
    console.log( "Processing: ", filePath );
      
    // if we get to here, we have the data from the file
    // loop over every line and load the commanders into a structure
    // 
    let lineByLine = fileData.data.split( '\r\n');
    const dataIterator = lineByLine.values();
    let line;


    line = dataIterator.next();
    let number = 0;
    while ( !line.done ) {
      let results = []; // scope, need to create new entries for EACH commander
      if (line.value == ""){
        line = dataIterator.next();
        continue;
      }
      let num = tokenizeLine ( line, results );
      if ((num > 0) && (results.Name !== "")) {
        commanderResults[number] = results;
        number ++; 
        console.log( "Processed: ", results.Name );
      }
      //console.log( line );

 
      line = dataIterator.next();
    }

    // Get a reference to the 
    // faction catalog
    let entry;
    for ( entry of gst.sharedSelectionEntries ) {
      if ( entry.name == "Commander") {
        processCommander( entry );
        break;
      }
    }

    return "Processed " + number + " " + faction + " commanders.";

  }
  
}



