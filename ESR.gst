<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<gameSystem id="ae43-676e-ac1e-c7a8" name="ESR" battleScribeVersion="2.03" revision="9" type="gameSystem" xmlns="http://www.battlescribe.net/schema/gameSystemSchema" authorName="Todd Pressley">
  <categoryEntries>
    <categoryEntry name="Force Units" id="1e1a-f413-82fb-9b4b" hidden="false">
      <description>Main subordinate organization within a Force</description>
    </categoryEntry>
    <categoryEntry name="Infantry" id="1271-fdfe-9bcf-e1f3" hidden="false"/>
    <categoryEntry name="Cavalry" id="55f7-a909-f342-11a8" hidden="false"/>
    <categoryEntry name="Force Commander" id="b77d-993e-0ee9-095b" hidden="false"/>
    <categoryEntry name="Army Commander" id="704e-91a0-972d-afe2" hidden="false"/>
    <categoryEntry name="Formation Commander" id="29a8-716b-03d0-81b6" hidden="false"/>
    <categoryEntry name="Artillery" id="f103-efbf-613e-703d" hidden="false"/>
  </categoryEntries>
  <forceEntries>
    <forceEntry name="ESR Force" id="esr-force" hidden="false" childForcesLabel="ESR Force">
      <categoryLinks>
        <categoryLink name="Force Commander" hidden="false" id="391e-b38b-7843-5ba8" targetId="b77d-993e-0ee9-095b">
          <constraints>
            <constraint type="min" value="1" field="selections" scope="parent" shared="true" id="8300-0ad4-0649-bb57-min-min"/>
            <constraint type="max" value="1" field="selections" scope="parent" shared="true" id="8300-0ad4-0649-bb57-min-max"/>
          </constraints>
        </categoryLink>
        <categoryLink name="Force Units" hidden="false" id="4ef8-354d-bcdf-287b" targetId="1e1a-f413-82fb-9b4b">
          <constraints>
            <constraint type="min" value="1" field="selections" scope="parent" shared="true" id="4988-3c44-a64c-e0d1"/>
          </constraints>
        </categoryLink>
      </categoryLinks>
    </forceEntry>
    <forceEntry name="ESR Army" id="esr-army" hidden="false" childForcesLabel="ESR Force">
      <categoryLinks>
        <categoryLink name="Army Commander" hidden="false" id="bef0-51c1-f9ab-c70a" targetId="704e-91a0-972d-afe2">
          <constraints>
            <constraint type="min" value="1" field="selections" scope="parent" shared="true" id="f5db-0306-10be-1c47-min"/>
            <constraint type="max" value="1" field="selections" scope="parent" shared="true" id="f5db-0306-10be-1c47-max"/>
          </constraints>
        </categoryLink>
      </categoryLinks>
    </forceEntry>
  </forceEntries>
  <publications>
    <publication name="New Publication" id="0e06-41dc-0230-b188" hidden="false"/>
  </publications>
  <costTypes>
    <costType name="Cohesion" id="5ef7-3935-7fce-e7f4" defaultCostLimit="-1"/>
    <costType name="Threat" id="f92a-621f-b8d3-3020" defaultCostLimit="-1"/>
  </costTypes>
  <profileTypes>
    [
  {
    "parentKey": "profileTypes",
    "characteristicTypes": [
      {
        "name": "AvailabilityFormation",
        "id": "ct-availability-formation"
      },
      {
        "name": "AvailabilityForce",
        "id": "ct-availability-force"
      },
      {
        "name": "AvailabilityArmy",
        "id": "ct-availability-army"
      },
      {
        "name": "Command",
        "id": "ct-command"
      },
      {
        "name": "RangedFar",
        "id": "ct-ranged-far"
      },
      {
        "name": "RangedNear",
        "id": "ct-ranged-near"
      },
      {
        "name": "Contact",
        "id": "ct-contact"
      },
      {
        "name": "Cohesion",
        "id": "ct-cohesion"
      }
    ],
    "name": "Commander",
    "id": "pt-commander",
    "hidden": false,
    "kind": "model"
  },
  {
    "parentKey": "profileTypes",
    "characteristicTypes": [
      {
        "name": "Descriptions",
        "id": "ct-trait-desc",
        "kind": "longText"
      }
    ],
    "name": "Traits",
    "id": "pt-traits",
    "hidden": false,
    "kind": "rule"
  }
]

    <profileType name="Unit" id="e0eb-2d4b-bae2-f65f" hidden="false">
      <characteristicTypes>
        <characteristicType name="Cmd" id="b9be-71aa-da61-8ae2"/>
        <characteristicType name="Ploy" id="5907-b644-bbd5-6d2f"/>
        <characteristicType name="Deploy" id="7cfb-cfb5-b6c6-454c"/>
        <characteristicType name="Thr-LR" id="ecdf-680c-7ca3-fcee"/>
        <characteristicType name="Thr-SR" id="2961-10fa-f20a-2e53"/>
        <characteristicType name="Thr-C" id="43e7-7774-7166-7df0"/>
        <characteristicType name="Coh-O" id="3e56-ee0e-1092-8600"/>
        <characteristicType name="Coh-E" id="2680-db78-89c3-923d"/>
        <characteristicType name="Trait" id="1719-4bbd-9a16-4dd6" kind="longText"/>
      </characteristicTypes>
    </profileType>
    <profileType name="Formation" id="4feb-59f6-c7ed-ccde" hidden="false" sortIndex="1">
      <characteristicTypes>
        <characteristicType name="Trait" id="f101-c743-4d53-896b" kind="longText"/>
      </characteristicTypes>
    </profileType>
    <profileType name="Cmd Unit" id="6987-694f-f295-dfcc" hidden="false">
      <characteristicTypes>
        <characteristicType name="Cmd" id="3f6f-22a9-cefd-3241"/>
        <characteristicType name="Move" id="c8a2-e021-6111-0985"/>
        <characteristicType name="Thr-LR" id="0900-c08b-8d47-0cce"/>
        <characteristicType name="Thr-SR" id="ebdb-1995-0d62-f20c"/>
        <characteristicType name="Thr-C" id="8d4f-1b05-bf2f-5cc8"/>
        <characteristicType name="Coh" id="b551-4153-d995-ab03"/>
        <characteristicType name="Trait" id="41df-24a7-8a0a-76b9" kind="longText"/>
      </characteristicTypes>
    </profileType>
  </profileTypes>
  <sharedRules>
    <rule name="Lights" id="d557-936b-57a3-c4f5" hidden="false">
      <description>Do not halt for dense terrain &amp; Threat is not reduced vs dense terrain.</description>
    </rule>
    <rule name="Sapeurs" id="1155-4386-acc9-f30b" hidden="false">
      <description>Threat vs Built-up-Areas, Strong Points, or Walls at contact is not reduced. Committing to a Threatened Battery recovers -1 Fatigue.</description>
    </rule>
    <rule name="Shock" id="ff54-e2c4-8419-4718" hidden="false">
      <description>Threat is not reduced vs Built-up- Areas, Strong Points, or Walls.</description>
    </rule>
    <rule name="Grand Battery" id="708e-451c-8172-299c" hidden="false">
      <description>May command Grand Batteries.</description>
    </rule>
    <rule name="Charmed Death" id="aa54-af6b-495c-ff26" hidden="false">
      <description>+2 to Leader Fate.</description>
    </rule>
    <rule name="Mass Cavalry" id="853c-a696-ee7b-3b9d" hidden="false">
      <description>May Convert Cavalry Formations in additional Combats.</description>
    </rule>
    <rule name="Flirts with Death" id="df40-fbb5-fd15-e8e1" hidden="false">
      <description>-1 to Leader Fate, +2 if Harmed</description>
    </rule>
    <rule name="A Date with Death" id="1892-f4ae-e81a-5012" hidden="false">
      <description> -2 in Leader Fate (date)</description>
    </rule>
    <rule name="Peerless" id="eee5-e63b-aaf3-e973" hidden="false">
      <description>If present, must be Army Commander (dates)</description>
    </rule>
  </sharedRules>
</gameSystem>
