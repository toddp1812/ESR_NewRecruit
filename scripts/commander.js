/*
 * ESR Commander load script
 * This script loads a file from the New Recruit game folder
 */
function toCommanderProfiles(Data) {

    const model = {
        parentKey: "profiles",
        name: Data.Commander,
        typeName: "Commander",
        typeId: "pt-CmdUnit",
        characteristics: [
            {typeId: "ct-CmdUnit-Avail-Formation", $text: Data.AvailabilityFormation},
            {typeId: "ct-CmdUnit-Avail-Force", $text: Data.AvailabilityForce},
            {typeId: "ct-CmdUnit-Avail-Army", $text: Data.AvailabilityArmy},
            {typeId: "ct-CmdUnit-Cmd", $text: Data.Command},
            {typeId: "ct-CmdUnit-Thr-LR", $text: Data.RangedFar},
            {typeId: "ct-CmdUnit-Thr-SR", $text: Data.RangedNear},
            {typeId: "ct-CmdUnit-Thr-C", $text: Data.Contact},
            {typeId: "ct-CmdUnit-Coh" ,$text: Data.Cohesion},
            {typeId: "ct-CmdUnit-Move", $text: "24 | 18 | 9"}
        ],
    }

    const entry = {
        parentKey: "selectionEntries",
        name: Data.Commander,
        profiles: [ model ]
    }
    
    return [entry]  

    //    return [model, ...traits]  
}

function addCategoryIfNotExists(gst, catName) {
  const existing = gst.categoryEntries.find((elt) => elt.name === catName);
  if (existing) {
    return existing;
  }
  const newNode = {
    hidden: true,
    name: catName,
  };

  return $store.add_node("categoryEntries", gst, newNode);
}

//
// returns the number of successfully converted elements
//
function tokenizeLine ( line, results ) {

  const tokens = [ "Card", "Name", "AvailabilityFormation", "AvailabilityForce", "AvailabilityArmy", "Command", 
    "RangedLR", "RangedSR","Contact", "Cohesion" ];

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

let commanderResults = [];

export default {

  name: "ESR Cmdr 1",
  arguments: [
    {
      type: "catalogue[]",
    },
  ],
  hooks: {
    paste(e, payload) {
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
      if ( commanderResults.length == 0) {
        notify({ text: "Run this script first before attempting to paste commanders", type: "error"})
        return;
      }
      console.log( selected );

      // get a reference to the Historical commanders
      let historicalCommander = selected.selectionEntryGroups;

      // for each line of the file, process the commander


      // at the end clear the commander results to set up for the next file
      commanderResults = [];

    },
  },
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

    commanderResults = []; 

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
    let results = [];

    line = dataIterator.next();
    let number = 0;
    while ( !line.done ) {
      
      if (line.value == ""){
        line = dataIterator.next();
        continue;
      }
      let num = tokenizeLine ( line, results );
      if ((num > 0) && (results.Name !== "")) {
        console.log( "Processed: ", results.Name );
      }
      //console.log( line );

      commanderResults.push(line);
      number ++; 
      line = dataIterator.next();
    }

    return "Queued " + number + " " + faction + " commanders.";
  }
  
}



