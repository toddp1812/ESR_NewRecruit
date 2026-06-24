# ESR_NewRecruit
ESR Force Database

**Release 2.0**
This release re-imagines the architecture with all units, commanders, and formations belonging to separate catalog files. This is to allow for any formation or unit to be included in any faction. While every grouping is not historically accurate, there was a lot of cross lending that it would be more difficult to disallow specifics without a lot of extra rules getting in the way.

The top of the New Recruit army builder is a control called "Force Setup". This will include the ability to select the Force Era and to determine which allies may be included in the force. Simply check the Era box, currently Mid or Early war. The system will only let the player check one era at a time. The "Show: XXX" enables the display of allied contingents.

Every faction now includes the two letter appreviation in the name of their common / generic commanders, units, and formations. This allows the player to quickly identify which unit is being included in an allied formation. This is especially critical with the German speaking states where so many of their units and formations have the same name across nations.

There is a new formation available to all nations. it is the Allied formation. This formation allows any individual unit to be included across national boundaries. By default, no allies are shown, but if the "Show: XXX" faction control in the Force Setup panel is selected, those other units will be displayed.

# Design Heirarchy

**Concepts**
There are quite a few data file requirements and requests from the players. 
***Requirement 1:*** Support all of the published commander, unit, and formation information from https://thewargamingcompany.com/esr-players-guide/#scrollpoint-compositionguides
***Requirement 2:*** Support other unit combinations, less common formations, like adding dragoons to infantry formations.
***Requirement 3:*** Support cross attachment of allied formations.
***Requirement 4:*** Support cross attachment of allied units.
***Requirement 5:*** Include support for the different eras.

**Structure**
The first version of these files defined the units and formations specific to each faction. However, as more factions were added it become untenable to cross includes French, Westphalians, Bavarians to meet requirements 3 and 4. Originally, we considered having all of the data from each faction fully defined within a formations catalog. However, testing revealed that it was difficult to get items to save. Further, future iterations of these data files may consider specific configurations for each faction. This would not be easily achievable if all units were implemented in a single file. This resulted in the following file structure:

1. ESR.gst -- baseline game system file. This defines all category types like *Faction: France* All common rules used by every faction are included here, such as Lights, Shock, and Mass Cavalry.
2. Unit.cat -- all units from every faction (nation) are defined in this single file. Every unit must be categorized as Infantry, Cavalry, or Artillery and assigned to a faction -- all through categpry assignments. Included as a library. All units have a two character prefix to their name to show the faction they are assigned to.
3. Commanders.cat -- all commanders both common and historical. This is where the Commander selector is defined showing both common and historical commanders but only allowing the choice of one or the other. Each commander is tagged with the primary faction category the commander belongs to. The common/generic commanders are listed by role and include the two letter prefix of the faction. Included as a library.
4. Formations.cat -- all formations from every faction are included here. These are faction aligned with the faction unit definitions published on The Wargaming Company website. An additional faction focused Mixed formation allows any unit to be included with any other unit, beyond the limits of the 'standard' formations published.  This is included as a library. There is also an Allied formation which includes every unit from every faction. This allows individual units to be cross included within any Force.
5. <faction>.cat -- all factions include the specific rules to the faction such as *Maréchal d’Empire* is defined within the France.cat and only used there. Unit, Commanders, and Foramtions are included as libraries in all these catalog files. Note that the Root selections need to define two specific selection items.

A. Force Setup -- this selection entry defines the ability of the player to select which Era the force represents. The player can also select the allied formations and units to be displayed. The Force Setup must be marked with the category items 
B. Force Commander -- this is the selection entry which can only be one per Force. The commander may be a "common" commander or a historical commander.

