<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<gameSystem id="ae43-676e-ac1e-c7a8" name="ESR" battleScribeVersion="2.03" revision="20" type="gameSystem" xmlns="http://www.battlescribe.net/schema/gameSystemSchema" authorName="Todd Pressley">
  <categoryEntries>
    <categoryEntry name="Formation" id="ct-Formation" hidden="false">
      <description>Main subordinate organization within a Force</description>
    </categoryEntry>
    <categoryEntry name="Infantry" id="ct-Infantry" hidden="false"/>
    <categoryEntry name="Cavalry" id="ct-Cavalry" hidden="false"/>
    <categoryEntry name="Force Commander" id="ct-ForceCommander" hidden="false"/>
    <categoryEntry name="Army Commander" id="ct-ArmyCommander" hidden="false"/>
    <categoryEntry name="Formation Commander" id="ct-FormationCommander" hidden="false"/>
    <categoryEntry name="Artillery" id="ct-Artillery" hidden="false"/>
    <categoryEntry name="Faction: Austria" id="ct-Faction-Austria" hidden="false"/>
    <categoryEntry name="Faction: England" id="ct-Faction-England" hidden="false"/>
    <categoryEntry name="Faction: France" id="ct-Faction-France" hidden="false"/>
    <categoryEntry name="Faction: Prussia" id="ct-Faction-Prussia" hidden="false"/>
    <categoryEntry name="Faction: Russia" id="ct-Faction-Russia" hidden="false"/>
    <categoryEntry name="Faction: Spain" id="ct-Faction-Spain" hidden="false"/>
    <categoryEntry name="Faction: Bavaria" id="ct-Faction-Bavaria" hidden="false"/>
    <categoryEntry name="Faction: Italy" id="ct-Faction-Italy" hidden="false"/>
    <categoryEntry name="Faction: Poland" id="ct-Faction-Poland" hidden="false"/>
    <categoryEntry name="Faction: Saxony" id="ct-Faction-Saxony" hidden="false"/>
    <categoryEntry name="Faction: Westphalia" id="ct-Faction-Westphalia" hidden="false"/>
    <categoryEntry name="Faction: Württemberg" id="ct-Faction-Württemberg" hidden="false"/>
    <categoryEntry name="Allies Selector" id="9b1a-98e8-e0ed-a119" hidden="false"/>
    <categoryEntry name="Show: Bavaria" id="3ec4-cc2b-ded5-7f95" hidden="false"/>
    <categoryEntry name="Show: England" id="4551-19c6-ebd9-ef3d" hidden="false"/>
    <categoryEntry name="Show: France" id="a07e-3373-9f8a-d4da" hidden="false"/>
    <categoryEntry name="Show: Italy" id="2f41-d909-404e-b848" hidden="false"/>
    <categoryEntry name="Show: Poland" id="5bb4-8e70-27f6-ae3d" hidden="false"/>
    <categoryEntry name="Show: Prussia" id="a97b-1b72-c619-9dcb" hidden="false"/>
    <categoryEntry name="Show: Russia" id="cc63-8ca6-0fd0-2682" hidden="false"/>
    <categoryEntry name="Show: Saxony" id="4f32-2860-a3d6-ac53" hidden="false"/>
    <categoryEntry name="Show: Spain" id="7b86-e75a-627e-f018" hidden="false"/>
    <categoryEntry name="Show: Westphalia" id="2579-f130-7874-6505" hidden="false"/>
    <categoryEntry name="Show: Württemberg" id="a003-14d2-b554-aff8" hidden="false"/>
    <categoryEntry name="Show: Austria" id="d1f8-f497-a419-5feb" hidden="false"/>
    <categoryEntry name="Show Revolution!" id="ff61-b884-3bcc-d1a8" hidden="false"/>
    <categoryEntry name="Show Early War" id="ed31-39ce-cc4e-763c" hidden="false"/>
    <categoryEntry name="Show Late War" id="734a-e728-e036-8dc7" hidden="false"/>
    <categoryEntry name="Show Mid War" id="24cc-3040-b915-f72a" hidden="false"/>
    <categoryEntry name="Force Setup" id="78b9-9166-78b4-dc7d" hidden="false"/>
  </categoryEntries>
  <forceEntries>
    <forceEntry name="ESR Force" id="esr-force" hidden="false" childForcesLabel="ESR Force">
      <categoryLinks>
        <categoryLink name="Force Setup" hidden="false" id="d076-fd49-ff01-080f" targetId="78b9-9166-78b4-dc7d">
          <constraints>
            <constraint type="min" value="1" field="selections" scope="parent" shared="true" id="cfba-be44-ecd5-1b11-min-min"/>
            <constraint type="max" value="1" field="selections" scope="parent" shared="true" id="cfba-be44-ecd5-1b11-min-max"/>
          </constraints>
        </categoryLink>
        <categoryLink name="Force Commander" hidden="false" id="391e-b38b-7843-5ba8" targetId="ct-ForceCommander">
          <constraints>
            <constraint type="min" value="1" field="selections" scope="parent" shared="true" id="8300-0ad4-0649-bb57-min-max-min-min"/>
            <constraint type="max" value="1" field="selections" scope="parent" shared="true" id="8300-0ad4-0649-bb57-min-max-min-max"/>
          </constraints>
        </categoryLink>
        <categoryLink name="Formation" hidden="false" id="4ef8-354d-bcdf-287b" targetId="ct-Formation">
          <constraints>
            <constraint type="min" value="1" field="selections" scope="parent" shared="true" id="4988-3c44-a64c-e0d1-min"/>
          </constraints>
        </categoryLink>
      </categoryLinks>
    </forceEntry>
  </forceEntries>
  <publications>
    <publication name="Player&apos;s Guide &amp; Planning for War" id="0e06-41dc-0230-b188" hidden="false" publisher="ESR-1s3: Et sans resultat! ESR Napoleonics, Series 3" publicationDate="2022" shortName="ESR Player&apos;s Guide &amp; Planning for War" publisherUrl="https://thewargamingcompany.com/products/esr-napoleonics-et-sans-resultat-series-3/"/>
  </publications>
  <costTypes>
    <costType name="Cohesion" id="esr-ct-Cohesion" defaultCostLimit="-1"/>
    <costType name="Threat" id="esr-ct-Threat" defaultCostLimit="-1"/>
  </costTypes>
  <profileTypes>
    <profileType name="Unit" id="pt-Unit" hidden="false">
      <characteristicTypes>
        <characteristicType name="____Ploy____" id="ct-Unit-Ploy"/>
        <characteristicType name="___Deploy___" id="ct-Unit-Deploy"/>
        <characteristicType name="Thr-LR" id="ct-Unit-Thr-LR"/>
        <characteristicType name="Thr-SR" id="ct-Unit-Thr-SR"/>
        <characteristicType name="Thr-C" id="ct-Unit-Thr-C"/>
        <characteristicType name="Coh-O" id="ct-Unit-Coh-O"/>
        <characteristicType name="Coh-E" id="ct-Unit-Coh-E"/>
        <characteristicType name="Trait" id="ct-Unit-Trait" kind="longText"/>
      </characteristicTypes>
    </profileType>
    <profileType name="Formation" id="4feb-59f6-c7ed-ccde" hidden="false" sortIndex="1">
      <characteristicTypes>
        <characteristicType name="Trait" id="ct-Form-Trait" kind="longText"/>
      </characteristicTypes>
    </profileType>
    <profileType name="Cmd Unit" id="pt-CmdUnit" hidden="false">
      <characteristicTypes>
        <characteristicType name="Cmd" id="ct-CmdUnit-Cmd" kind="annotation"/>
        <characteristicType name="___Move___" id="ct-CmdUnit-Move"/>
        <characteristicType name="Thr-LR" id="ct-CmdUnit-Thr-LR"/>
        <characteristicType name="Thr-SR" id="ct-CmdUnit-Thr-SR"/>
        <characteristicType name="Thr-C" id="ct-CmdUnit-Thr-C"/>
        <characteristicType name="Coh" id="ct-CmdUnit-Coh"/>
        <characteristicType name="Trait" id="ct-CmdUnit-Trait" kind="longText"/>
        <characteristicType name="AvForm" id="ct-CmdUnit-Avail-Formation"/>
        <characteristicType name="AvForce" id="ct-CmdUnit-Avail-Force"/>
        <characteristicType name="AvArmy" id="ct-CmdUnit-Avail-Army"/>
      </characteristicTypes>
    </profileType>
  </profileTypes>
  <sharedRules>
    <rule name="Lights" id="d557-936b-57a3-c4f5" hidden="false" publicationId="0e06-41dc-0230-b188" page="78">
      <description>These Units are better at operating in embarrassing terrain. They do not halt when entering or exiting dense terrain and their Threat is not reduced when Threatening target in dense terrain or Threatening targets in Built-up-Areas at range.</description>
    </rule>
    <rule name="Sapeurs" id="1155-4386-acc9-f30b" hidden="false">
      <description>Threat vs Built-up-Areas, Strong Points, or Walls at contact is not reduced. Committing to a Threatened Battery recovers -1 Fatigue.</description>
    </rule>
    <rule name="Shock" id="ff54-e2c4-8419-4718" hidden="false" publicationId="0e06-41dc-0230-b188" page="78">
      <description>Threat is not reduced vs Built-up- Areas, Strong Points, or Walls.</description>
    </rule>
    <rule name="Grand Battery" id="708e-451c-8172-299c" hidden="false" publicationId="0e06-41dc-0230-b188" page="76">
      <description>A Commander with this Trait is required in order to form a Grand Battery. If the Commander leaves the Grand Battery, including if he is removed by Leader Fate, the Grand Battery ceases to be and is treated the same as any other Formation. See 3.5 Create Grand Battery.</description>
    </rule>
    <rule name="Charmed Death" id="aa54-af6b-495c-ff26" hidden="false">
      <description>Some commanders seemed to have charmed Death itself and be almost impervious to its peril. These Commanders receive +2 to Leader Fate.</description>
    </rule>
    <rule name="Mass Cavalry" id="853c-a696-ee7b-3b9d" hidden="false" page="77" publicationId="0e06-41dc-0230-b188">
      <description>As an exception to 11.Conversion, the Commander may Convert Cavalry Formation to Attack [A] during the Conversion Step of additional Combat Phases even if it did not otherwise participate during the phase as is normally required.</description>
    </rule>
    <rule name="Flirts with Death" id="df40-fbb5-fd15-e8e1" hidden="false" page="76" publicationId="0e06-41dc-0230-b188">
      <description>Some Commanders are prone to near misses and seemingly flirt with death. These Commanders suffer -1 to Leader Fate, +2 if Harmed.</description>
    </rule>
    <rule name="Date with Death" id="1892-f4ae-e81a-5012" hidden="false" publicationId="0e06-41dc-0230-b188" page="76">
      <description>Commander who were historically killed on the battlefield are at a higher risk of repeating their fate. These Commander suffer -2 in Leader Fate (date).</description>
    </rule>
    <rule name="Peerless" id="eee5-e63b-aaf3-e973" hidden="false">
      <description>If present, must be Army Commander (dates)</description>
    </rule>
    <rule name="Engineers" id="e6d7-2276-f328-582e" hidden="false" publicationId="0e06-41dc-0230-b188" page="78">
      <description>Engineering Companies have unique abilities once committed via the Leader Action: Commit an Asset. The Engineering Company, or any unit it is committed to, may not move or interact with the enemy to make progress on a task.
Build a Bridge
Destroy a Bridge
Fortify a Built-up-Area or Bridge
Repair a Bridge</description>
    </rule>
    <rule name="Irregulars" id="aee1-9ced-dc20-75a9" hidden="false" publicationId="0e06-41dc-0230-b188" page="78">
      <description>These Units are better at operating in embarrassing terrain. Their movement does not halt when entering or exiting dense terrain and their Threat is not reduced against targets in dense terrain. 
A Formation may not recover Fatigue during the Combat Phase while it has Irregular Unit in play. Irregular Unit may be removed from play or detached from the Formation using a Leader Action.</description>
    </rule>
    <rule name="Captain of the Guard" id="0199-f55a-25b3-e8b9" hidden="false" publicationId="0e06-41dc-0230-b188" page="76">
      <description>This Commander may or must command a Force or Formations of their army&apos;s Guard.</description>
    </rule>
    <rule name="Personal Rivalry" id="66a4-9d87-e671-5bbd" hidden="false" publicationId="0e06-41dc-0230-b188" page="77">
      <description>The Commander may not be a subordinate of the designated Commander or suffers a Command Test penalty when interacting with them.</description>
    </rule>
    <rule name="Particular Specialty" id="743e-e9ec-0786-c579" hidden="false" publicationId="0e06-41dc-0230-b188" page="77">
      <description>The Commander&apos;s Bonuses improve if the Commander leads troops of a specific type or faction such as an Artillery Formation or Saxon Units.</description>
    </rule>
    <rule name="Preferred Assignment" id="1fb3-f637-a5bc-4e75" hidden="false" publicationId="0e06-41dc-0230-b188" page="77">
      <description>The Commander must lead specific troops, such as a Cavalry Formation or Polish Units.</description>
    </rule>
    <rule name="Specific Talent" id="ba2a-86f2-73cf-52ce" hidden="false" publicationId="0e06-41dc-0230-b188" page="77">
      <description>The Commander&apos;s Bonuses improve when leading a Formation with the specified active Directive.</description>
    </rule>
    <rule name="Big Battalions" id="c570-38f5-5494-2b60" hidden="false" publicationId="0e06-41dc-0230-b188" page="77">
      <description>These Infantry Formations have larger than normal Units and are able to absorb more losses than the average Formation. For every three deployed Infantry Battalions it receives +1 Cohesion.</description>
    </rule>
    <rule name="Brittle" id="b6ff-e568-e70e-2e3d" hidden="false" publicationId="0e06-41dc-0230-b188" page="77">
      <description>These Formations lack the will to stay in the fight, perhaps because they are inexperienced, demoralized, or otherwise expended. The Formation will involuntarily Retreat [RT], not Withdraw [W], at 1/2:1 and Break [BK] at 1:1.</description>
    </rule>
    <rule name="Determined" id="c268-08f7-9fef-83c0" hidden="false" publicationId="0e06-41dc-0230-b188" page="77">
      <description>These Formations can tolerate substantially more pressure than any other and do so while remaining resolute to continue the fight. The Formation will Withdraw [W] at 1:1, Retreat [RT] at 1-1/2:1 and Break [BK] at 2:1. This Trait is exceptionally rare and should be used sparingly.</description>
    </rule>
    <rule name="Enthusiastic" id="b446-412a-5f4e-fe22" hidden="false" page="77" publicationId="0e06-41dc-0230-b188">
      <description>These Formations are so excited to fight that they can resist initial urges to break-off. If the Formation has an active Attack [A] Directive it may choose not to Withdraw [W] at 1/2:1 and instead suffer +1 Fatigue. The Formation may do this until it reaches the Retreat [RT] threshold of 1:1.</description>
    </rule>
    <rule name="Impetuous" id="d74a-8bc3-3c04-64dd" hidden="false" publicationId="0e06-41dc-0230-b188" page="77">
      <description>A Cavalry Formation inside an enemy Threat Zone at the start of a Conversion Step, which is able to reach an enemy by Converting to Attack [A] rolls 2D6. On a result of ≤ 5, the Cavalry Formation involuntarily Converts to Attack [A] targeting the closest enemy it can successfully reach.</description>
    </rule>
    <rule name="Stoic" id="66f8-5090-b257-5150" hidden="false" publicationId="0e06-41dc-0230-b188" page="77">
      <description>Formations with this Trait are resigned to perform a stiff resistance an will refuse to yield ground even while taking significant losses.
If this Formation has an active Defend [D] Directive may choose to not Withdraw [W] at 1/2:1, instead suffering +1 Fatigue. this may be done until the Formation reaches the Retreat [RT] threshold.</description>
    </rule>
    <rule name="Parallel Deployment" id="3ad9-1aa8-4ddf-9d61" hidden="false">
      <description>Formations with this Trait are trained to deploy efficiently, but not dynamically, by marching parallel to their desired frontage and then turning from column into line. The Formation rolls -1D6 when deploying unless all deploying Unites do so by turning 90° left or right and moving 225 yards (1-1/2&quot;) directly forward. All deploying Units must turn the same direction.</description>
    </rule>
    <rule name="Rapid Deployment" id="95a5-06ca-7e40-b11d" hidden="false">
      <description>A Formation with this Trait is highly proficient in deploying and can do so faster than most. The Formation rolls an additional +1D6 when deploying Unit form a ployed column.</description>
    </rule>
  </sharedRules>
  <sharedSelectionEntryGroups>
    <selectionEntryGroup name="Allies Selector" id="4987-a768-84fa-de1d" hidden="false">
      <selectionEntries>
        <selectionEntry type="upgrade" import="true" name="Show: Austria" hidden="false" id="a20d-fb68-8bc6-60c5" defaultAmount="0">
          <constraints>
            <constraint type="max" value="1" field="selections" scope="parent" shared="true" id="218c-cc2f-640e-f4e7"/>
          </constraints>
          <modifiers>
            <modifier type="set" value="true" field="hidden">
              <conditions>
                <condition type="instanceOf" value="1" field="selections" scope="ancestor" childId="ct-Faction-Austria" shared="true" childName="Faction: Austria"/>
              </conditions>
            </modifier>
          </modifiers>
          <categoryLinks>
            <categoryLink targetId="d1f8-f497-a419-5feb" id="70ce-e9e1-c819-e42c" primary="false" name="Show: Austria"/>
          </categoryLinks>
        </selectionEntry>
        <selectionEntry type="upgrade" import="true" name="Show: Bavaria" hidden="false" id="3352-f2db-32ac-86e7" defaultAmount="0">
          <constraints>
            <constraint type="max" value="1" field="selections" scope="parent" shared="true" id="086c-e6ad-baf1-14af"/>
          </constraints>
          <modifiers>
            <modifier type="set" value="true" field="hidden">
              <conditions>
                <condition type="instanceOf" value="1" field="selections" scope="ancestor" childId="ct-Faction-Bavaria" shared="true" childName="Faction: Bavaria"/>
              </conditions>
            </modifier>
          </modifiers>
          <categoryLinks>
            <categoryLink targetId="3ec4-cc2b-ded5-7f95" id="bad8-9d93-fd45-06b3" primary="false" name="Show: Bavaria"/>
          </categoryLinks>
        </selectionEntry>
        <selectionEntry type="upgrade" import="true" name="Show: England" hidden="false" id="d689-4924-d429-1e96" defaultAmount="0">
          <constraints>
            <constraint type="max" value="1" field="selections" scope="parent" shared="true" id="4ab8-69c0-d16c-132b"/>
          </constraints>
          <modifiers>
            <modifier type="set" value="true" field="hidden">
              <conditions>
                <condition type="instanceOf" value="1" field="selections" scope="ancestor" childId="ct-Faction-England" shared="true" childName="Faction: England"/>
              </conditions>
            </modifier>
          </modifiers>
          <categoryLinks>
            <categoryLink targetId="4551-19c6-ebd9-ef3d" id="7bde-31a8-dea5-6c93" primary="false" name="Show: England"/>
          </categoryLinks>
        </selectionEntry>
        <selectionEntry type="upgrade" import="true" name="Show: France" hidden="false" id="b7f5-78f0-d055-ec14" defaultAmount="0">
          <constraints>
            <constraint type="max" value="1" field="selections" scope="parent" shared="true" id="626b-ba81-839a-7980"/>
          </constraints>
          <modifiers>
            <modifier type="set" value="true" field="hidden">
              <conditions>
                <condition type="instanceOf" value="1" field="selections" scope="ancestor" childId="ct-Faction-France" shared="true" childName="Faction: France"/>
              </conditions>
            </modifier>
          </modifiers>
          <categoryLinks>
            <categoryLink targetId="a07e-3373-9f8a-d4da" id="aee8-7d1e-7373-5ea0" primary="false" name="Show: France"/>
          </categoryLinks>
        </selectionEntry>
        <selectionEntry type="upgrade" import="true" name="Show: Italy" hidden="false" id="a85c-5253-4eff-eca6" defaultAmount="0">
          <constraints>
            <constraint type="max" value="1" field="selections" scope="parent" shared="true" id="7d05-4a5a-c420-33e0"/>
          </constraints>
          <modifiers>
            <modifier type="set" value="true" field="hidden">
              <conditions>
                <condition type="instanceOf" value="1" field="selections" scope="ancestor" childId="ct-Faction-Italy" shared="true" childName="Faction: Italy"/>
              </conditions>
            </modifier>
          </modifiers>
          <categoryLinks>
            <categoryLink targetId="2f41-d909-404e-b848" id="ae3d-a0e5-e48a-f9b7" primary="false" name="Show: Italy"/>
          </categoryLinks>
        </selectionEntry>
        <selectionEntry type="upgrade" import="true" name="Show: Poland" hidden="false" id="ff09-1639-87c4-79c7">
          <constraints>
            <constraint type="max" value="1" field="selections" scope="parent" shared="true" id="ecc9-478c-71ce-3455"/>
          </constraints>
          <modifiers>
            <modifier type="set" value="true" field="hidden">
              <conditions>
                <condition type="instanceOf" value="1" field="selections" scope="ancestor" childId="ct-Faction-Poland" shared="true" childName="Faction: Poland"/>
              </conditions>
            </modifier>
          </modifiers>
          <categoryLinks>
            <categoryLink targetId="5bb4-8e70-27f6-ae3d" id="b5a5-2683-f448-3ef8" primary="false" name="Show: Poland"/>
          </categoryLinks>
        </selectionEntry>
        <selectionEntry type="upgrade" import="true" name="Show: Prussia" hidden="false" id="4818-efd3-cd25-fd55">
          <constraints>
            <constraint type="max" value="1" field="selections" scope="parent" shared="true" id="3fac-6b50-2ca4-d3dd"/>
          </constraints>
          <modifiers>
            <modifier type="set" value="true" field="hidden">
              <conditions>
                <condition type="instanceOf" value="1" field="selections" scope="ancestor" childId="ct-Faction-Prussia" shared="true" childName="Faction: Prussia"/>
              </conditions>
            </modifier>
          </modifiers>
          <categoryLinks>
            <categoryLink targetId="a97b-1b72-c619-9dcb" id="baf9-21fd-363c-ddb4" primary="false" name="Show: Prussia"/>
          </categoryLinks>
        </selectionEntry>
        <selectionEntry type="upgrade" import="true" name="Show: Russia" hidden="false" id="c9c4-2915-3c45-578f">
          <constraints>
            <constraint type="max" value="1" field="selections" scope="parent" shared="true" id="8f9a-f4c4-732c-a75d"/>
          </constraints>
          <modifiers>
            <modifier type="set" value="true" field="hidden">
              <conditions>
                <condition type="instanceOf" value="1" field="selections" scope="ancestor" childId="ct-Faction-Russia" shared="true" childName="Faction: Russia"/>
              </conditions>
            </modifier>
          </modifiers>
          <categoryLinks>
            <categoryLink targetId="cc63-8ca6-0fd0-2682" id="413c-f88f-6124-fb75" primary="false" name="Show: Russia"/>
          </categoryLinks>
        </selectionEntry>
        <selectionEntry type="upgrade" import="true" name="Show: Spain" hidden="false" id="7c90-68b6-6578-99d6">
          <constraints>
            <constraint type="max" value="1" field="selections" scope="parent" shared="true" id="dbcb-8cc8-a36d-4c7b"/>
          </constraints>
          <modifiers>
            <modifier type="set" value="true" field="hidden">
              <conditions>
                <condition type="instanceOf" value="1" field="selections" scope="ancestor" childId="ct-Faction-Spain" shared="true" childName="Faction: Spain"/>
              </conditions>
            </modifier>
          </modifiers>
          <categoryLinks>
            <categoryLink targetId="7b86-e75a-627e-f018" id="70ef-9e02-4316-623a" primary="false" name="Show: Spain"/>
          </categoryLinks>
        </selectionEntry>
        <selectionEntry type="upgrade" import="true" name="Show: Westphalia" hidden="false" id="2d36-915e-2d1f-ee59">
          <constraints>
            <constraint type="max" value="1" field="selections" scope="parent" shared="true" id="ec2f-d595-22f7-1124"/>
          </constraints>
          <modifiers>
            <modifier type="set" value="true" field="hidden">
              <conditions>
                <condition type="instanceOf" value="1" field="selections" scope="ancestor" childId="ct-Faction-Westphalia" shared="true" childName="Faction: Westphalia"/>
              </conditions>
            </modifier>
          </modifiers>
          <categoryLinks>
            <categoryLink targetId="2579-f130-7874-6505" id="9c11-5ca0-6260-e733" primary="false" name="Show: Westphalia"/>
          </categoryLinks>
        </selectionEntry>
        <selectionEntry type="upgrade" import="true" name="Show: Württemberg" hidden="false" id="979b-ef1a-33d3-0308">
          <constraints>
            <constraint type="max" value="1" field="selections" scope="parent" shared="true" id="0f62-d008-6cda-a939"/>
          </constraints>
          <modifiers>
            <modifier type="set" value="true" field="hidden">
              <conditions>
                <condition type="instanceOf" value="1" field="selections" scope="ancestor" childId="ct-Faction-Württemberg" shared="true" childName="Faction: Württemberg"/>
              </conditions>
            </modifier>
          </modifiers>
          <categoryLinks>
            <categoryLink targetId="a003-14d2-b554-aff8" id="828e-2768-165d-7c2f" primary="false" name="Show: Württemberg"/>
          </categoryLinks>
        </selectionEntry>
      </selectionEntries>
    </selectionEntryGroup>
    <selectionEntryGroup name="Era Selector" id="6a4f-df66-4997-ef80" hidden="false">
      <selectionEntries>
        <selectionEntry type="upgrade" import="true" name="Revolution!" hidden="true" id="d98d-1af3-2eca-eb5b" defaultAmount="0" step="1">
          <constraints>
            <constraint type="max" value="1" field="selections" scope="parent" shared="true" id="085b-54bf-ff27-69d8"/>
          </constraints>
          <categoryLinks>
            <categoryLink targetId="ff61-b884-3bcc-d1a8" id="2bc0-6f91-6fb9-47e2" primary="false" name="Show Revolution!"/>
          </categoryLinks>
        </selectionEntry>
        <selectionEntry type="upgrade" import="true" name="Early War" hidden="false" id="c8ad-fcfa-039d-44b9" defaultAmount="0" step="1">
          <constraints>
            <constraint type="max" value="1" field="selections" scope="parent" shared="true" id="e79b-2d97-f327-b6c0"/>
          </constraints>
          <categoryLinks>
            <categoryLink targetId="ed31-39ce-cc4e-763c" id="fe3e-4382-e0b9-a465" primary="false" name="Show Early War"/>
          </categoryLinks>
        </selectionEntry>
        <selectionEntry type="upgrade" import="true" name="Mid War" hidden="false" id="b658-8a7b-5f86-02da" defaultAmount="1" step="1">
          <constraints>
            <constraint type="max" value="1" field="selections" scope="parent" shared="true" id="d237-ef38-ce37-e4da"/>
          </constraints>
          <categoryLinks>
            <categoryLink targetId="24cc-3040-b915-f72a" id="e21f-287b-17d3-8cd7" primary="false" name="Show Mid War"/>
          </categoryLinks>
        </selectionEntry>
        <selectionEntry type="upgrade" import="true" name="Late War" hidden="true" id="9264-1b7c-cdcf-867a" defaultAmount="0" step="1">
          <constraints>
            <constraint type="max" value="1" field="selections" scope="parent" shared="true" id="9ffc-a38e-3bbf-a409"/>
          </constraints>
          <categoryLinks>
            <categoryLink targetId="734a-e728-e036-8dc7" id="df68-13cf-bb28-480d" primary="false" name="Show Late War"/>
          </categoryLinks>
        </selectionEntry>
      </selectionEntries>
      <constraints>
        <constraint type="min" value="1" field="selections" scope="parent" shared="true" id="9ed4-4fbc-63ef-b7cd-min"/>
        <constraint type="max" value="1" field="selections" scope="parent" shared="true" id="9ed4-4fbc-63ef-b7cd-max"/>
      </constraints>
    </selectionEntryGroup>
  </sharedSelectionEntryGroups>
</gameSystem>
