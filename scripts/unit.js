/*
 * ESR Unit load script
 * This script loads units from a pasted string. The pasted string is assumed
 * to be in the format of the units spreadsheet. One unit per line.
 * 
 * Units are pasted to the sharedSelectionEntities location within the faction
 * catalog.
 */

//
// create some helper functions to hold our math and comparisons
//

import Utils from "./utils2.js"; 

const myUtils = new Utils();

function calcLR (rangeLR){
  let retval;

    // fix up the values before adding and comparing
  if (rangeLR == "–"){ // not a dash, en dash (0150)
    retval = 0;
  } else {
    // convert the 
    retval = +rangeLR;
  }
  if ( Number.isNaN( retval ) ) {
    notify({ text: "Unexpected long range Threat value of: " + rangeLR, type: "error" });
    retval = 1;
  }
 
  return retval; // return a numeric value
}
function calcSR(rangeSR) {
  let retval;

  if ( rangeSR == "1/4" ) {
    retval = .25;
  } else if ( rangeSR == "1/2" ) {
    retval = .5;
  } else if (rangeSR == "–") {// not a dash, en dash (0150)
    retval = 0;
  } else {
    retval = +rangeSR;
  }
  if ( Number.isNaN( retval )) {
    notify({ text: "Unexpected short range Threat value of: " + rangeSR, type: "error" });
  
    retval = 1;
  }
  return retval; // return a numeric value
}

function calcContact(contact) {
  let retval;

  if ( contact == "1/4" ) {
    retval = .25;
  } else if ( contact == "1/2" ) {
    retval = .5;
  } else if ( contact == "–" ) { // not a dash, en dash (0150) 
    retval = 0;
  } else {
    retval = +contact;
  }
  if( Number.isNaN( retval) ) {
    notify({ text: "Unexpected contact Threat value of: " + contact , type: "error" });
    retval = 1;
  }
  return retval; // return a numeric value
}
function calcCohOpen( COHOpen ){
  let retval;
   if ( COHOpen == "1/4") {
    retval = .25;
   } else if ( COHOpen == "1/2") {
    retval = .5;
  } else if ( COHOpen == "1 1/2" ) {
    retval = 1.5;
  } else if ( COHOpen == "–"  ) { // not a dash, en dash (0150)
    retval = 0;
  } else {
    retval = +COHOpen;
  }
  if ( Number.isNaN(retval)) {
    notify({ text: "Unexpected Cohesion open value of: " + COHOpen , type: "error" });
    retval = 1;
  }
  return retval; // return a numeric value
}
function calcCohEmbarrass( COHEmbarrass ){
  let retval;
  if ( COHEmbarrass == "1/4") {
    retval = .25;
  } else if ( COHEmbarrass == "1/2") {
    retval = .5;
  } else if ( COHEmbarrass == "1 1/2") {
    retval = 1.5;
  }
  else if ( COHEmbarrass == "–" ) { // not a dash, en dash (0150)
    retval = 0; 
  } else {
    retval = +COHEmbarrass;
  }
  if ( Number.isNaN( retval) ) {
    notify({ text: "Unexpected Cohesion embarrassing terrain value of: " + COHEmbarrass, type: "error" });
    retval = 1;
  }
  return retval; // return a numeric value
}
const UNIT_TYPE = Object.freeze ({
  InfantryType: 'infantry',
  CavalryType: 'cavalry',
  PositionArtilleryType: 'position artillery',
  HorseArtilleryType: 'horse artillery'
});
function determineType ( UnitName, UnitType ) {
  let infTypePattern = /^Infantry/;
  let cavTypePattern = /^Cavalry/;
  let artTypePattern = /^Artillery/;
  let retval;

  // determine the type of unit we are profiling
  // match unitType with infantry, cavalry, artillery
  if ( infTypePattern.test( UnitType) ) {
    retval = UNIT_TYPE.InfantryType;
  } else if ( cavTypePattern.test( UnitType ) ) {
    retval = UNIT_TYPE.CavalryType;
  } else if ( artTypePattern.test( UnitType ) ) {
    // if it is artillery is it horse or is it position artillery
    // look for known names of horse artillery
    const knownHorseArtNames = [
      "AU Würst Artillerie",
      "BV Leichte Artillerie",
      "BR 6-pdr Royal Horse Artillery",
      "FR 6-pdr Artillerie à Cheval",
      "FR Artillerie à Cheval de la Vieille Garde",
      "PO Artyleria Koni",
      "PR Artillerie zu Pferd",
      "RU Konno-Artilleriyskaya",
      "RU Donskoy Artilleriyskaya",
      "SX Leichte Artillerie",
      "SP Artillería a Caballo",
      "WF Garde Artillerie zu Pferd",
      "Wü Artillerie zu Pferd"

    ];
    // default to position artillery
    retval = UNIT_TYPE.PositionArtilleryType;
    for( name of knownHorseArtNames ) {
      if ( name == UnitName ) {
        // we have a horse gun
        retval = UNIT_TYPE.HorseArtilleryType;
        break;
      }
    }
  
  } else {
    // not cavalry, not infantry, not artillery
    notify({ text: "Unknown unitType: " + UnitType, type: "error" });
    
    return "";
  }

  return ( retval );
}
function calcPloyed ( unitName, unitType ){
  const ployedInfArt = "12 | 10 | 5";
  const ployedCav = "15 | 12 | 6";
  let retval;

  switch ( determineType(unitName, unitType) ) {
    case UNIT_TYPE.InfantryType:
    case UNIT_TYPE.PositionArtilleryType:
      retval = ployedInfArt;
      break;
    case UNIT_TYPE.CavalryType:
    case UNIT_TYPE.HorseArtilleryType:
      retval = ployedCav;
      break;
    default:
      notify({ text: "Unexpected unit type: " + unitType, type: "error" });
      return ployedInfArt;
  }
 
 return retval; // return a ployed string " X | Y | Z"
}

function calcDeployed (unitName, unitType ){
  const deployedInf = "8 | 4 | 4";
  const deployedCav = "10 | 5 | 5";
  const deployedArt = "8 | 4 | –";
  const deployedHrsArt = "10 | 5 | –";
  let retval;

  switch ( determineType(unitName, unitType) ) {
    case UNIT_TYPE.InfantryType:
      retval = deployedInf;
      break;
    case UNIT_TYPE.PositionArtilleryType:
      retval = deployedArt;
      break;
    case UNIT_TYPE.CavalryType:
      retval = deployedCav;
      break;
    case UNIT_TYPE.HorseArtilleryType:
      retval = deployedHrsArt;
      break;
    default:
      notify({ text: "Unexpected unit type: " + unitType, type: "error" });      
      return deployedInfArt;
  }
 
 return retval; // return a ployed string " X | Y | Z"
}


function toUnitProfiles(_data, _selection, _rules, _faction, _factionType ) {
    //
    // calculate the threat and Cohesion
    //
    let rangeLR = calcLR (_data.RangedLR);
    let rangeSR = calcSR(_data.RangedSR);
    let rangeContact = calcContact(_data.Contact);
    let cohOpen = calcCohOpen( _data.CohesionOpen );
    let cohEmbarrass = calcCohEmbarrass( _data.CohesionEmbarrass );
    
    let ployed = calcPloyed ( _data.Unit, _data.Type );
    let deployed = calcDeployed ( _data.Unit, _data.Type );
    

    let Threat = rangeLR + rangeSR + rangeContact;
    let Cohesion = Math.max( cohOpen, cohEmbarrass );

    if ( Number.isNaN(Threat)) {
      log.error( "unexpected Threat value in : ", _data );
      return;
    }
    
    if (Number.isNaN(Cohesion)) {
      log.error( "unexpected Cohesion value in : ", _data );
      return;
    }


    // remove extra quotes from multiline import from excel
    
    let expression = /^\"/;
    let regexp = new RegExp(expression);
    let testString = _data.Traits;
    testString = testString.replace( regexp,"" );
    expression = /\"$/;
    regexp = new RegExp(expression);
    testString = testString.replace( regexp, "");
    _data.Traits = testString;
    
    let model = {
        id: myUtils.generateID(),
        parentKey: "profiles",
        name: _data.Unit,
        typeName: "Unit",
        typeId: "pt-Unit",
        hidden: "false",
        characteristics: [
            {typeId: "ct-Unit-Ploy", $text: ployed},
            {typeId: "ct-Unit-Deploy", $text: deployed},
            {typeId: "ct-Unit-Thr-LR", $text: _data.RangedLR},
            {typeId: "ct-Unit-Thr-SR", $text: _data.RangedSR},
            {typeId: "ct-Unit-Thr-C", $text: _data.Contact},
            {typeId: "ct-Unit-Coh-O" ,$text: _data.CohesionOpen},
            {typeId: "ct-Unit-Coh-E" ,$text: _data.CohesionEmbarrass},
            {typeId: "ct-Unit-Trait", $text: _data.Traits }
        ],
    }

    const ruleLinks = [];
    //
    // loop over _rules and see what needs to be included and linked
    // 
    for ( const rule of _rules ) {
      const expression = rule.name+":";
      const regexp = new RegExp(expression);
      const testString = _data.Traits;
      if ( testString.match( regexp ) ) {
        ruleLinks.push( {id: myUtils.generateID(), name: rule.name, hidden: "false", type: "rule", targetId: rule.id } );
      }
    }

    const typeLinks = [];
    // 
    // set the primary unit type for this unit 
    //
    let myTargetId;
    let myTypeName;
    
    switch( determineType ( _data.Unit, _data.Type ) ){

      case UNIT_TYPE.InfantryType:
        myTargetId = "ct-Infantry";
        myTypeName = "Infantry";
        break
      case UNIT_TYPE.PositionArtilleryType:
      case UNIT_TYPE.HorseArtilleryType:
        myTargetId = "ct-Artillery";
        myTypeName = "Artillery";
        break;
      case UNIT_TYPE.CavalryType:
        myTargetId = "ct-Cavalry";
        myTypeName = "Cavalry";
        break;
      default:
        notify({ text: "Unexpected unit type: " + _data.Type, type: "error" });      
        return null;
    }

    typeLinks.push({name: myTypeName, primary: "true", targetId: myTargetId });
    typeLinks.push({name: _faction, targetId: _factionType });

    // get the child id of the show faction type
    const showThisFactionId = myUtils.getShowFactionId( _selection, _faction );

    // 
    // entry for the commander unit entry
    // 
  
    let entry = {
        parentKey: "selectionEntries",
        id: myUtils.generateID(),
        name: _data.Unit,
        type: "model",
        profiles: [model],
        costs: [
          {typeId: "esr-ct-Cohesion", name: "Cohesion", value: Cohesion} ,
          {typeId: "esr-ct-Threat", name: "Threat", value: Threat}
        ],
        infoLinks: ruleLinks,
        categoryLinks: typeLinks,
        hidden: "true",
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

  const tokens = [ "Unit", "Type", "RangedLR", "RangedSR","Contact", "CohesionOpen", 
    "CohesionEmbarrass", "Traits" ];

  let count = 0;
  let items = [];


  items = line.split(/\t/);

  tokens.map( (token) => { 
    //console.log( token );
    results[ token ] = items[ count++];
    
    } );

  return count;
}

function processUnit(_unitResults, _sharedSelection, _rules, _faction, _factionType) {
    
  
  
  // loop over all unit results and add them to the Historical commander selections
  for ( const unit of _unitResults ) {
    let profile = toUnitProfiles( unit, _sharedSelection, _rules, _faction, _factionType );
    $store.add_node( "sharedSelectionEntries", _sharedSelection, profile );
  }

  return null;
}




export default {

  name: "ESR Unit Import",

  hooks: 
  {
    paste(e, payload) {

      const unitResults = [];
      const factionRules = [];

      if (typeof payload !== "string") return
      const sharedSelection = $store.get_selected();

      if (sharedSelection.parentKey !== "catalogue") {
        notify({ text: "Select the (top-level) Shared Selection Entries", type: "error" });
        return;
      }

      // game system == gst
      const gst = sharedSelection.gameSystem;
      const catalogFile = sharedSelection.name;
      if (catalogFile !== "Units") {
        notify({ text: "Select the only the Units catalog", type: "error" });
        return;
      }

      // 
      // determine which faction we are pasting in
      //
      let myFactionType;
      let faction;
      const firstline = payload.split( '\r\n')[1];
      
      const abbrevation = myUtils. getFactionAbbreviationFromString ( firstline ); 
      if ( !abbrevation ) {
        console.error( "Could not parse first line for faction, line: " + firstline);
        notify({ text: "Could not parse first line for faction.", type: "error" });
        return;
      } 
      let factionRef = myUtils.getFactionFromAbbreviation( abbrevation );
      if ( !factionRef ) {
        console.error( "Could not parse first line for faction.");
        notify({ text: "Could not parse first line for faction.", type: "error" });
        return;
      }
      faction = factionRef.faction;
      myFactionType = factionRef.type;

      factionRules.length = 0;
      if (sharedSelection.sharedRules !== undefined) {
        for ( const rule of sharedSelection.sharedRules ) {
          factionRules.push(rule);
        } 
      }
      if (gst.sharedRules !== undefined ) {
        for ( const rule of gst.sharedRules ) {
            factionRules.push(rule);
          }
      }
 
      //console.log( sharedSelection );

      
      // if we get to here, we have the data from the file
      // loop over every line and load the units into a structure
      // 
      let lineByLine = payload.split( '\r\n');
      let line;
      let number = 0;
      for ( line of lineByLine ) {
        let results = []; // scope, need to create new entries for EACH unit
        if (line == ""){
          continue;
        }
        let num = tokenizeLine ( line, results );
        if ((num > 0) && (results.Name !== "")) {
          unitResults[number] = results;
          number ++; 
          console.log( "Processed: ", results.Name );
        }
        //console.log( line );
  
      }
          
      processUnit( unitResults, sharedSelection, factionRules, faction, myFactionType );
      
      console.log( "Processed " + number + " " + faction + " units.");
      
      return null;
    }
  }  
}



