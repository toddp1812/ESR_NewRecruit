<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<gameSystem id="ae43-676e-ac1e-c7a8" name="ESR" battleScribeVersion="2.03" revision="3" type="gameSystem" xmlns="http://www.battlescribe.net/schema/gameSystemSchema" authorName="Todd Pressley">
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
  </categoryEntries>
  <forceEntries>
    <forceEntry name="ESR Force" id="esr-force" hidden="false" childForcesLabel="ESR Force">
      <categoryLinks>
        <categoryLink name="Force Commander" hidden="false" id="391e-b38b-7843-5ba8" targetId="ct-ForceCommander">
          <constraints>
            <constraint type="min" value="1" field="selections" scope="parent" shared="true" id="8300-0ad4-0649-bb57-min-min"/>
            <constraint type="max" value="1" field="selections" scope="parent" shared="true" id="8300-0ad4-0649-bb57-min-max"/>
          </constraints>
        </categoryLink>
        <categoryLink name="Formation" hidden="false" id="4ef8-354d-bcdf-287b" targetId="ct-Formation">
          <constraints>
            <constraint type="min" value="1" field="selections" scope="parent" shared="true" id="4988-3c44-a64c-e0d1"/>
          </constraints>
        </categoryLink>
      </categoryLinks>
    </forceEntry>
    <forceEntry name="ESR Army" id="esr-army" hidden="false" childForcesLabel="ESR Force">
      <categoryLinks>
        <categoryLink name="Army Commander" hidden="false" id="bef0-51c1-f9ab-c70a" targetId="ct-ArmyCommander">
          <constraints>
            <constraint type="min" value="1" field="selections" scope="parent" shared="true" id="f5db-0306-10be-1c47-min"/>
            <constraint type="max" value="1" field="selections" scope="parent" shared="true" id="f5db-0306-10be-1c47-max"/>
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
</gameSystem>
