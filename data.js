/**
 * @file data.js
 * All static hardcoded datasets for the Sanctions Impact Calculator.
 * Declares global constants consumed by calculations.js, render.js, and script.js.
 * No logic, computation, or DOM references belong in this file — only data.
 * Load this file first, before all other app scripts.
 */

'use strict';

// ─── TRADE DATA (36 scenarios) ────────────────────────────────────────────────
const TRADE_DATA = {
  'Iran': {
    'Crude Oil': {
      supplyPct: 3.8,
      importers: [
        { name: 'China', dep: 72 },
        { name: 'India', dep: 14 },
        { name: 'Syria', dep: 9 }
      ],
      priceShock: 18,
      analogue: 'Iranian Oil Embargo (1979)',
      analogueDesc: 'U.S. hostage crisis triggered full Iranian oil embargo; global crude spiked 130% in 18 months, triggering a global recession.',
      threat: 'SEVERE'
    },
    'Natural Gas': {
      supplyPct: 1.2,
      importers: [
        { name: 'Turkey', dep: 18 },
        { name: 'Armenia', dep: 65 },
        { name: 'Iraq', dep: 22 }
      ],
      priceShock: 7,
      analogue: 'US Iran Gas Sanctions (2018)',
      analogueDesc: 'Secondary sanctions curbed Iranian pipeline gas exports; Turkey pivoted to LNG, raising domestic energy costs by 9%.',
      threat: 'ELEVATED'
    },
    'Wheat': {
      supplyPct: 0.9,
      importers: [
        { name: 'Afghanistan', dep: 31 },
        { name: 'Iraq', dep: 8 },
        { name: 'Pakistan', dep: 5 }
      ],
      priceShock: 4,
      analogue: 'Iranian Agricultural Sanctions (2012)',
      analogueDesc: 'Broad-based OFAC sanctions disrupted Iranian wheat imports, not exports; domestic bread prices rose 40% within Iran.',
      threat: 'LOW'
    },
    'Fertilizer': {
      supplyPct: 1.4,
      importers: [
        { name: 'Iraq', dep: 28 },
        { name: 'Afghanistan', dep: 19 },
        { name: 'Pakistan', dep: 12 }
      ],
      priceShock: 6,
      analogue: 'JCPOA Withdrawal Fertilizer Impact (2018)',
      analogueDesc: 'Iranian urea exports halted post-JCPOA exit; regional agricultural output dropped 6–11% in dependent zones.',
      threat: 'ELEVATED'
    },
    'Copper': {
      supplyPct: 1.7,
      importers: [
        { name: 'China', dep: 61 },
        { name: 'Germany', dep: 9 },
        { name: 'South Korea', dep: 7 }
      ],
      priceShock: 5,
      analogue: 'Iranian Metal Sanctions (2019)',
      analogueDesc: 'Treasury Dept expanded Iran sanctions to cover base metals; China absorbed most diverted flows through shadow traders.',
      threat: 'LOW'
    },
    'Lithium': {
      supplyPct: 0.2,
      importers: [
        { name: 'China', dep: 88 },
        { name: 'Japan', dep: 7 },
        { name: 'South Korea', dep: 5 }
      ],
      priceShock: 1,
      analogue: 'Iranian Mineral Freeze (2020)',
      analogueDesc: 'Negligible global lithium impact; Iran holds minor reserves and is not a primary extraction market.',
      threat: 'LOW'
    }
  },

  'Russia': {
    'Crude Oil': {
      supplyPct: 12.1,
      importers: [
        { name: 'Germany', dep: 34 },
        { name: 'China', dep: 16 },
        { name: 'India', dep: 22 }
      ],
      priceShock: 42,
      analogue: 'Russia-Ukraine War Oil Sanctions (2022)',
      analogueDesc: 'G7 price cap on Russian crude caused Brent to spike to $139/bbl in March 2022; global energy inflation lasted 14 months.',
      threat: 'SEVERE'
    },
    'Natural Gas': {
      supplyPct: 17.4,
      importers: [
        { name: 'Germany', dep: 55 },
        { name: 'Italy', dep: 43 },
        { name: 'Austria', dep: 80 }
      ],
      priceShock: 68,
      analogue: 'Nordstream Curtailment (2022)',
      analogueDesc: 'Russia cut pipeline gas to Europe; TTF gas price surged 600% in 2022, triggering energy rationing across 8 EU nations.',
      threat: 'SEVERE'
    },
    'Wheat': {
      supplyPct: 18.6,
      importers: [
        { name: 'Egypt', dep: 71 },
        { name: 'Turkey', dep: 62 },
        { name: 'Bangladesh', dep: 34 }
      ],
      priceShock: 38,
      analogue: 'Black Sea Grain Corridor Collapse (2022–23)',
      analogueDesc: 'Russia withdrawal from UN grain deal sent wheat futures to 14-year highs; food insecurity spiked across 45 nations.',
      threat: 'SEVERE'
    },
    'Fertilizer': {
      supplyPct: 22.3,
      importers: [
        { name: 'Brazil', dep: 27 },
        { name: 'India', dep: 18 },
        { name: 'USA', dep: 9 }
      ],
      priceShock: 55,
      analogue: 'Russian Potash / Urea Sanctions (2022)',
      analogueDesc: 'Sanctions on Belarusian potash (linked to Russia) and Russian urea cut global fertilizer supply 22%; food production costs surged.',
      threat: 'SEVERE'
    },
    'Copper': {
      supplyPct: 3.8,
      importers: [
        { name: 'Finland', dep: 29 },
        { name: 'Germany', dep: 12 },
        { name: 'Netherlands', dep: 18 }
      ],
      priceShock: 14,
      analogue: 'Norilsk Nickel Copper Disruption (2022)',
      analogueDesc: 'LME ban on Russian metal deliveries reduced traded copper supply; LME copper hit $10,700/t in March 2022.',
      threat: 'CRITICAL'
    },
    'Lithium': {
      supplyPct: 0.5,
      importers: [
        { name: 'Finland', dep: 8 },
        { name: 'Czech Republic', dep: 6 },
        { name: 'Germany', dep: 4 }
      ],
      priceShock: 2,
      analogue: 'Russian Lithium Export Freeze (2022)',
      analogueDesc: 'Russia contributes minimally to global lithium supply; alternative sources in Australia and Chile absorbed any shortfall quickly.',
      threat: 'LOW'
    }
  },

  'China': {
    'Crude Oil': {
      supplyPct: 0.5,
      importers: [
        { name: 'South Korea', dep: 3 },
        { name: 'Japan', dep: 2 },
        { name: 'Philippines', dep: 4 }
      ],
      priceShock: 2,
      analogue: 'Daqing Field Output Reduction (2016)',
      analogueDesc: 'China is a net crude importer; domestic Daqing output decline had negligible global impact as China increased Saudi/UAE imports.',
      threat: 'LOW'
    },
    'Natural Gas': {
      supplyPct: 2.1,
      importers: [
        { name: 'Japan', dep: 5 },
        { name: 'South Korea', dep: 4 },
        { name: 'Taiwan', dep: 6 }
      ],
      priceShock: 5,
      analogue: 'Chinese LNG Re-export Halt (2021)',
      analogueDesc: 'China restricted LNG re-exports during its domestic winter demand peak; Asian spot LNG hit $59/MMBtu — a record high.',
      threat: 'ELEVATED'
    },
    'Wheat': {
      supplyPct: 16.8,
      importers: [
        { name: 'Indonesia', dep: 12 },
        { name: 'Philippines', dep: 9 },
        { name: 'Malaysia', dep: 7 }
      ],
      priceShock: 22,
      analogue: 'Chinese Wheat Export Restriction (hypothetical)',
      analogueDesc: 'China holds ~51% of global wheat reserves; any export ban would critically destabilize Asian food markets within 60 days.',
      threat: 'CRITICAL'
    },
    'Fertilizer': {
      supplyPct: 31.0,
      importers: [
        { name: 'India', dep: 28 },
        { name: 'Brazil', dep: 19 },
        { name: 'Australia', dep: 14 }
      ],
      priceShock: 72,
      analogue: 'Chinese Phosphate Export Ban (2021–22)',
      analogueDesc: 'China banned phosphate exports in Oct 2021 citing domestic demand; global DAP fertilizer prices jumped 80% within two quarters.',
      threat: 'SEVERE'
    },
    'Copper': {
      supplyPct: 8.6,
      importers: [
        { name: 'Japan', dep: 19 },
        { name: 'South Korea', dep: 14 },
        { name: 'Germany', dep: 11 }
      ],
      priceShock: 31,
      analogue: 'Chinese Copper Refining Sanctions (hypothetical)',
      analogueDesc: 'China refines ~40% of global copper; sanctions on smelting capacity would create immediate shortage across EV and grid sectors.',
      threat: 'SEVERE'
    },
    'Lithium': {
      supplyPct: 14.5,
      importers: [
        { name: 'Japan', dep: 33 },
        { name: 'South Korea', dep: 41 },
        { name: 'USA', dep: 22 }
      ],
      priceShock: 88,
      analogue: 'Chinese Rare Earth / Lithium Export Controls (2023)',
      analogueDesc: 'China restricted gallium and germanium exports in 2023; EV battery manufacturers began emergency diversification of supply.',
      threat: 'SEVERE'
    }
  },

  'Saudi Arabia': {
    'Crude Oil': {
      supplyPct: 11.2,
      importers: [
        { name: 'China', dep: 16 },
        { name: 'Japan', dep: 38 },
        { name: 'South Korea', dep: 28 }
      ],
      priceShock: 44,
      analogue: 'Arab Oil Embargo (1973)',
      analogueDesc: 'OAPEC embargo cut supply 5 million BPD; U.S. crude prices quadrupled in 5 months, triggering global stagflation.',
      threat: 'SEVERE'
    },
    'Natural Gas': {
      supplyPct: 2.7,
      importers: [
        { name: 'Bahrain', dep: 80 },
        { name: 'United Arab Emirates', dep: 12 },
        { name: 'Kuwait', dep: 9 }
      ],
      priceShock: 9,
      analogue: 'Saudi Gas Pricing Shift (2020)',
      analogueDesc: 'Saudi Aramco restructured domestic gas pricing; regional LNG contract renegotiations increased Bahraini energy costs ~15%.',
      threat: 'ELEVATED'
    },
    'Wheat': {
      supplyPct: 0.4,
      importers: [
        { name: 'Yemen', dep: 22 },
        { name: 'Jordan', dep: 8 },
        { name: 'Lebanon', dep: 6 }
      ],
      priceShock: 3,
      analogue: 'Saudi Wheat Production Exit (2013)',
      analogueDesc: 'Saudi Arabia halted domestic wheat farming to preserve aquifer water; shifted to full importation with negligible global impact.',
      threat: 'LOW'
    },
    'Fertilizer': {
      supplyPct: 4.8,
      importers: [
        { name: 'India', dep: 12 },
        { name: 'Pakistan', dep: 9 },
        { name: 'Egypt', dep: 14 }
      ],
      priceShock: 16,
      analogue: 'SABIC Urea Sanctions Scenario (2019)',
      analogueDesc: 'During Khashoggi crisis, EU debated SABIC trade restrictions; fertilizer markets pre-empted sanctions with 14% price premium.',
      threat: 'CRITICAL'
    },
    'Copper': {
      supplyPct: 0.3,
      importers: [
        { name: 'United Arab Emirates', dep: 6 },
        { name: 'Egypt', dep: 4 },
        { name: 'Pakistan', dep: 3 }
      ],
      priceShock: 1,
      analogue: "Ma'aden Copper Curtailment (2020)",
      analogueDesc: "Saudi Arabia holds limited copper reserves; Ma'aden production cuts had negligible global market impact.",
      threat: 'LOW'
    },
    'Lithium': {
      supplyPct: 0.1,
      importers: [
        { name: 'United Arab Emirates', dep: 2 },
        { name: 'Japan', dep: 1 },
        { name: 'South Korea', dep: 1 }
      ],
      priceShock: 0.5,
      analogue: 'Saudi Mineral Diversification (2023)',
      analogueDesc: 'Saudi VISION 2030 seeks lithium extraction deals; current output is near-zero — sanctions would have negligible global impact.',
      threat: 'LOW'
    }
  },

  'Venezuela': {
    'Crude Oil': {
      supplyPct: 2.1,
      importers: [
        { name: 'China', dep: 14 },
        { name: 'Cuba', dep: 68 },
        { name: 'India', dep: 7 }
      ],
      priceShock: 8,
      analogue: 'PDVSA Sanctions (2019)',
      analogueDesc: 'U.S. Treasury sanctioned PDVSA; Venezuelan exports collapsed 65%; China absorbed remaining flow through shadow fleet.',
      threat: 'ELEVATED'
    },
    'Natural Gas': {
      supplyPct: 0.8,
      importers: [
        { name: 'Colombia', dep: 31 },
        { name: 'Trinidad and Tobago', dep: 14 },
        { name: 'Brazil', dep: 6 }
      ],
      priceShock: 5,
      analogue: 'Venezuela Gas Infrastructure Collapse (2019)',
      analogueDesc: 'U.S. sanctions compounded infrastructure decay; cross-border gas to Colombia fell 70%, triggering localized shortfalls.',
      threat: 'ELEVATED'
    },
    'Wheat': {
      supplyPct: 0.2,
      importers: [
        { name: 'Colombia', dep: 4 },
        { name: 'Trinidad and Tobago', dep: 6 },
        { name: 'Brazil', dep: 3 }
      ],
      priceShock: 1,
      analogue: 'Venezuelan Food Export Collapse (2017)',
      analogueDesc: 'Hyperinflation and sanctions ended Venezuelan agricultural exports; minimal global impact as output was already near-zero.',
      threat: 'LOW'
    },
    'Fertilizer': {
      supplyPct: 1.1,
      importers: [
        { name: 'Brazil', dep: 5 },
        { name: 'Colombia', dep: 14 },
        { name: 'Ecuador', dep: 9 }
      ],
      priceShock: 4,
      analogue: 'FERROMINERA Sanctions Impact (2019)',
      analogueDesc: 'Sanctions on Venezuelan state mining companies reduced regional fertilizer input supply; Colombia absorbed costs with Chilean imports.',
      threat: 'LOW'
    },
    'Copper': {
      supplyPct: 0.4,
      importers: [
        { name: 'Colombia', dep: 7 },
        { name: 'Brazil', dep: 4 },
        { name: 'USA', dep: 2 }
      ],
      priceShock: 2,
      analogue: 'Venezuelan Mining Halt (2018)',
      analogueDesc: 'OFAC sanctions on gold and base metals effectively halted Venezuelan copper exports; minimal global price impact.',
      threat: 'LOW'
    },
    'Lithium': {
      supplyPct: 0.05,
      importers: [
        { name: 'USA', dep: 1 },
        { name: 'Brazil', dep: 1 },
        { name: 'China', dep: 2 }
      ],
      priceShock: 0.2,
      analogue: 'Venezuelan Lithium Exploration (2022)',
      analogueDesc: 'Venezuela announced lithium deposits in 2022; extraction infrastructure is undeveloped — current export volume is negligible.',
      threat: 'LOW'
    }
  },

  'North Korea': {
    'Crude Oil': {
      supplyPct: 0.0,
      importers: [
        { name: 'China', dep: 99 },
        { name: 'Russia', dep: 1 },
        { name: '---', dep: 0 }
      ],
      priceShock: 0.1,
      analogue: 'DPRK Oil Import Restrictions (2017)',
      analogueDesc: 'UN Security Council capped North Korean oil imports; DPRK is purely an oil importer — sanctions affect internal logistics only.',
      threat: 'LOW'
    },
    'Natural Gas': {
      supplyPct: 0.0,
      importers: [
        { name: 'China', dep: 100 },
        { name: '---', dep: 0 },
        { name: '---', dep: 0 }
      ],
      priceShock: 0.1,
      analogue: 'DPRK Gas Dependency (2017)',
      analogueDesc: 'North Korea has no meaningful natural gas export capacity; all energy is imported from China or domestically from anthracite coal.',
      threat: 'LOW'
    },
    'Wheat': {
      supplyPct: 0.1,
      importers: [
        { name: 'China', dep: 8 },
        { name: '---', dep: 0 },
        { name: '---', dep: 0 }
      ],
      priceShock: 0.2,
      analogue: 'North Korean Food Sanctions (2017)',
      analogueDesc: 'UN Resolution 2397 cut food aid; DPRK produced 4.5M tons domestically — export capability is negligible, crisis is internal.',
      threat: 'LOW'
    },
    'Fertilizer': {
      supplyPct: 0.2,
      importers: [
        { name: 'China', dep: 31 },
        { name: 'Vietnam', dep: 7 },
        { name: 'Cambodia', dep: 4 }
      ],
      priceShock: 1,
      analogue: 'DPRK Chemical Export Sanctions (2017)',
      analogueDesc: 'UN banned DPRK chemical fertilizer exports under Resolution 2375; China quickly substituted supply from domestic producers.',
      threat: 'LOW'
    },
    'Copper': {
      supplyPct: 1.1,
      importers: [
        { name: 'China', dep: 98 },
        { name: 'Russia', dep: 2 },
        { name: '---', dep: 0 }
      ],
      priceShock: 3,
      analogue: 'DPRK Mineral Export Ban (2017)',
      analogueDesc: 'UN banned North Korean copper, iron, and lead exports in 2017; China rerouted through shadow networks with minimal price impact.',
      threat: 'LOW'
    },
    'Lithium': {
      supplyPct: 0.3,
      importers: [
        { name: 'China', dep: 97 },
        { name: 'Russia', dep: 3 },
        { name: '---', dep: 0 }
      ],
      priceShock: 1,
      analogue: 'DPRK Rare Mineral Sanctions (2017)',
      analogueDesc: 'DPRK lithium deposits exist but extraction is primitive; exports flow exclusively to China under barter agreements.',
      threat: 'LOW'
    }
  }
};

// ─── MAP EXPOSURE DATA ─────────────────────────────────────────────────────────
const COUNTRY_EXPOSURE = {
  'Iran': {
    'Crude Oil':    { China: 'high', India: 'medium', Turkey: 'low', Syria: 'high', Iraq: 'medium' },
    'Natural Gas':  { Turkey: 'high', Armenia: 'high', Iraq: 'medium' },
    'Wheat':        { Afghanistan: 'high', Iraq: 'low', Pakistan: 'low' },
    'Fertilizer':   { Iraq: 'high', Afghanistan: 'medium', Pakistan: 'low' },
    'Copper':       { China: 'high', Germany: 'low', 'South Korea': 'low' },
    'Lithium':      { China: 'low' }
  },
  'Russia': {
    'Crude Oil':    { Germany: 'high', China: 'medium', India: 'medium', Poland: 'medium', Finland: 'low', Netherlands: 'low' },
    'Natural Gas':  { Germany: 'high', Italy: 'high', Austria: 'high', Hungary: 'medium', Slovakia: 'medium', France: 'low', Finland: 'low' },
    'Wheat':        { Egypt: 'high', Turkey: 'high', Bangladesh: 'high', Sudan: 'medium', Ethiopia: 'medium', Indonesia: 'medium', Pakistan: 'medium', Nigeria: 'low' },
    'Fertilizer':   { Brazil: 'high', India: 'high', 'United States of America': 'medium', Canada: 'low', Argentina: 'medium' },
    'Copper':       { Finland: 'high', Germany: 'medium', Netherlands: 'medium', 'South Korea': 'low' },
    'Lithium':      { Finland: 'low', 'Czech Republic': 'low', Germany: 'low' }
  },
  'China': {
    'Crude Oil':    { 'South Korea': 'low', Japan: 'low', Philippines: 'low' },
    'Natural Gas':  { Japan: 'medium', 'South Korea': 'medium', Taiwan: 'medium' },
    'Wheat':        { Indonesia: 'high', Philippines: 'high', Malaysia: 'high', Vietnam: 'medium', Thailand: 'low' },
    'Fertilizer':   { India: 'high', Brazil: 'high', Australia: 'high', 'United States of America': 'medium', Argentina: 'medium', Thailand: 'medium' },
    'Copper':       { Japan: 'high', 'South Korea': 'high', Germany: 'high', 'United States of America': 'medium', Australia: 'low' },
    'Lithium':      { Japan: 'high', 'South Korea': 'high', 'United States of America': 'high', Germany: 'medium', Australia: 'low' }
  },
  'Saudi Arabia': {
    'Crude Oil':    { China: 'medium', Japan: 'high', 'South Korea': 'high', India: 'high', Philippines: 'medium', Malaysia: 'medium', Singapore: 'medium', France: 'low' },
    'Natural Gas':  { Bahrain: 'high', 'United Arab Emirates': 'medium', Kuwait: 'medium' },
    'Wheat':        { Yemen: 'high', Jordan: 'medium', Lebanon: 'medium' },
    'Fertilizer':   { India: 'medium', Pakistan: 'medium', Egypt: 'high' },
    'Copper':       { 'United Arab Emirates': 'low', Egypt: 'low', Pakistan: 'low' },
    'Lithium':      {}
  },
  'Venezuela': {
    'Crude Oil':    { China: 'medium', Cuba: 'high', India: 'low', Colombia: 'medium', 'Trinidad and Tobago': 'medium' },
    'Natural Gas':  { Colombia: 'high', 'Trinidad and Tobago': 'medium', Brazil: 'low' },
    'Wheat':        { Colombia: 'low', 'Trinidad and Tobago': 'low' },
    'Fertilizer':   { Brazil: 'low', Colombia: 'medium', Ecuador: 'medium' },
    'Copper':       { Colombia: 'low', Brazil: 'low' },
    'Lithium':      {}
  },
  'North Korea': {
    'Crude Oil':    { China: 'low' },
    'Natural Gas':  { China: 'low' },
    'Wheat':        { China: 'low' },
    'Fertilizer':   { China: 'medium', Vietnam: 'low', Cambodia: 'low' },
    'Copper':       { China: 'medium', Russia: 'low' },
    'Lithium':      { China: 'low', Russia: 'low' }
  }
};

// ─── POPUP NOTES ──────────────────────────────────────────────────────────────
const POPUP_NOTES = {
  'China':               'Largest shadow-market absorber; state-owned entities insulate domestic pricing through strategic reserves.',
  'India':               'Relies on discounted sanctioned-nation crude; sanctions disrupt refinery feedstock mix.',
  'Germany':             'High pipeline dependency; LNG terminal buildout underway but 2–3 year gap remains.',
  'Japan':               'Critical energy importer; near-zero domestic fossil fuel reserves heighten exposure.',
  'South Korea':         'Major petrochemical refinery hub; commodity shocks pass through to export manufacturing.',
  'Italy':               'Southern European gas anchor; Eni pipeline contracts span multiple decades.',
  'Austria':             'Highest EU gas dependency on Russia; OMV contract dispute unresolved.',
  'Turkey':              'Straddles East-West pipelines; leverages exposure as geopolitical bargaining chip.',
  'Egypt':               'Largest wheat importer in the world; food subsidy program feeds 70M+ citizens.',
  'Brazil':              'Global soy and grain powerhouse but depends on sanctioned-nation fertilizers.',
  'Indonesia':           'Urbanizing food market with rising per-capita wheat consumption; limited domestic production.',
  'Philippines':         'Import-dependent archipelago; commodity shock transmits directly to retail prices.',
  'Bangladesh':          'Dense population with thin fiscal buffers; grain shock triggers humanitarian risk.',
  'Finland':             'Heavily exposed to Russian copper and nickel; industrial transition ongoing.',
  'Australia':           'Dependent on Chinese fertilizer and lithium processing; diplomatic leverage limited.',
  'Cuba':                'Oil lifeline from Venezuela; sanctions cause fuel rationing across island.',
  'Colombia':            'Gas pipeline from Venezuela crosses key border corridor; has partial LNG backup.',
  'Armenia':             'Landlocked; near-total dependence on Iranian gas with no viable alternative.',
  'Iraq':                'Imports Iranian gas and fertilizer despite ongoing sanctions exposure.',
  'Pakistan':            'Food and fertilizer importer under fiscal stress; sanctions amplify existing crisis.',
  'Yemen':               'Conflict-fragile nation; any commodity shock risks immediate humanitarian collapse.',
  'Malaysia':            'Regional commodity trader; supply shocks strain government price controls.',
  'Vietnam':             'Fertilizer importer pivoting away from DPRK supply under UN resolutions.',
  'Netherlands':         'Rotterdam hub nation; commodity re-routing creates short-term congestion.',
  'Hungary':             'EU exempted from Russian oil ban; tightened sanctions would directly impact Mol refineries.',
  'Slovakia':            'Druzhba pipeline terminus; most exposed Central European economy.',
  'Singapore':           'Trading hub; commodity price shock flows through entrepôt to regional buyers.',
  'France':              'Diversified supply mix; moderate exposure through spot market price effects.',
  'Sudan':               'Receives discounted Russian wheat; sanctions remove this subsidy immediately.',
  'Ethiopia':            'Under food stress; Russian wheat sanctions compound existing Tigray-era shortfalls.',
  'Nigeria':             'Wheat import dependent; sanctions-driven price spike will hit urban bread prices.',
  'Canada':              'Net fertilizer exporter; benefits from reduced competition in the short term.',
  'Argentina':           'Agricultural powerhouse; commodity shock may create export windfall opportunity.',
  'Thailand':            'Regional fertilizer transit hub; prices pass through to rice sector.',
  'Bahrain':             'Near-total gas dependency on Saudi pipeline; no LNG import infrastructure.',
  'United Arab Emirates':'Gulf energy hub; sanctions disrupt transit and re-export routes.',
  'Kuwait':              'GCC energy importer; insulated by sovereign wealth fund but exposed to spot prices.',
  'Jordan':              'Jordan imports most wheat; relies on humanitarian grain programs.',
  'Lebanon':             'Fiscally collapsed state; any commodity shock has immediate food crisis implications.',
  'Syria':               'Iranian oil lifeline via Alawite-aligned route; sanctions deepen existing shortfall.',
  'Afghanistan':         'Landlocked humanitarian crisis zone; fertilizer and wheat shocks are life-threatening.',
  'Ecuador':             'Agricultural economy exposed to fertilizer cost spikes from sanctioned exporters.',
  'Cambodia':            'Small fertilizer import dependency on DPRK; easily substituted from Thai market.',
  'Russia':              'Countersanctions and energy self-sufficiency partially insulate from DPRK mineral sanctions.',
  'Trinidad and Tobago': 'Energy twin with Venezuela; gas corridor disruption affects petrochemical exports.',
  'Taiwan':              'High LNG import dependency; Chinese gas sanctions create immediate industrial exposure.',
  'Poland':              'Completed pipeline independence from Russia; moderate residual supply exposure.',
};

// ─── GeoJSON NAME MAP ──────────────────────────────────────────────────────────
const GEO_NAME_MAP = {
  'United States of America': 'United States of America',
  'Russian Federation':       'Russia',
  'Iran (Islamic Republic of)': 'Iran',
  "Democratic People's Republic of Korea": 'North Korea',
  'Republic of Korea':        'South Korea',
  'Bolivia (Plurinational State of)': 'Bolivia',
  'Venezuela (Bolivarian Republic of)': 'Venezuela',
  'Syrian Arab Republic':     'Syria',
  'United Arab Emirates':     'United Arab Emirates',
  'China':                    'China',
  'Saudi Arabia':             'Saudi Arabia',
  'Trinidad and Tobago':      'Trinidad and Tobago',
};

// ─── CONFLICT TIMELINE EVENTS (sorted most-recent first) ─────────────────────
const TIMELINE_EVENTS = [
  {
    date: '2025-03-15',
    title: 'U.S. Navy Intercepts Houthi Anti-Ship Ballistic Missile',
    description: 'USS Gravely shoots down Houthi ballistic missile in southern Red Sea targeting commercial vessel. Shipping diversion rates via Cape of Good Hope reach 68% of pre-crisis levels as insurers maintain war-risk premium.',
    category: 'SHIPPING',
    marketResponse: { label: 'SHIPPING', change: 5.2 }
  },
  {
    date: '2025-01-18',
    title: 'Gaza Ceasefire Temporarily Halts Houthi Red Sea Strikes',
    description: "Houthi faction announces temporary pause in attacks following Phase 1 ceasefire in Gaza. Lloyd's of London begins reassessing war-risk premium rates for Bab el-Mandeb corridor; container spot rates ease.",
    category: 'SHIPPING',
    marketResponse: { label: 'SHIPPING', change: -8.4 }
  },
  {
    date: '2024-10-26',
    title: 'Israel Conducts Precision Strikes on Iranian Military Sites',
    description: 'IDF strikes Iranian air defense radar and missile production infrastructure near Isfahan. Iran signals proportional response within 72 hours; Strait of Hormuz tanker traffic down 9% on risk aversion.',
    category: 'OIL',
    marketResponse: { label: 'OIL', change: 4.1 }
  },
  {
    date: '2024-08-04',
    title: 'Hamas Political Chief Haniyeh Assassinated in Tehran',
    description: 'Ismail Haniyeh killed in precision strike inside IRGC compound. Event elevates Iran-Israel direct conflict risk to highest level since 2019; energy risk premium spikes as traders price in Hormuz closure scenario.',
    category: 'OIL',
    marketResponse: { label: 'OIL', change: 3.2 }
  },
  {
    date: '2024-04-14',
    title: 'Iran Launches 300+ Drones and Missiles at Israel',
    description: 'First direct Iranian military strike on Israeli territory — 170 drones, 120 ballistic missiles, 30 cruise missiles launched. Israel and allies intercept over 99%; Strait of Hormuz tanker traffic drops 12% within 48 hours.',
    category: 'OIL',
    marketResponse: { label: 'OIL', change: 3.5 }
  },
  {
    date: '2024-01-12',
    title: 'U.S. and U.K. Launch Operation Poseidon Archer Against Houthis',
    description: 'Coordinated strikes target Houthi missile storage, launch sites, and radar facilities across Yemen. Houthis vow escalation; 15 of the top 20 container shipping lines divert around Cape of Good Hope.',
    category: 'SHIPPING',
    marketResponse: { label: 'SHIPPING', change: 18.3 }
  },
  {
    date: '2023-12-18',
    title: 'Maersk and Hapag-Lloyd Suspend Red Sea Transit Indefinitely',
    description: "Two of the world's largest container lines halt all Red Sea routing after Houthi attacks on MSC Palatium III. Triggers the beginning of a 340% container rate surge from October 2023 lows.",
    category: 'SHIPPING',
    marketResponse: { label: 'SHIPPING', change: 12.1 }
  },
  {
    date: '2023-10-07',
    title: 'Hamas Launches Cross-Border Attack — Israel Declares War',
    description: 'Hamas assault kills 1,200 Israelis and takes 250 hostages. Israel formally declares war three days later. Energy traders immediately begin pricing Strait of Hormuz disruption risk premium.',
    category: 'OIL',
    marketResponse: { label: 'OIL', change: 6.2 }
  },
  {
    date: '2023-07-17',
    title: 'Russia Terminates Black Sea Grain Initiative',
    description: 'Moscow withdraws from UN-brokered grain corridor citing sanctions on Rosselkhozbank. Ukrainian grain exports drop 50% in August; global wheat futures surge to 5-month highs within days of announcement.',
    category: 'WHEAT',
    marketResponse: { label: 'WHEAT', change: 8.5 }
  },
  {
    date: '2023-02-06',
    title: 'Turkey-Syria Earthquake Forces Ceyhan Export Terminal Shutdown',
    description: '7.8-magnitude earthquake forces 72-hour shutdown of the Ceyhan oil terminal handling 1M BPD of Iraqi and Azerbaijani crude. Pipeline inspection delays extend disruption to 11 full days.',
    category: 'OIL',
    marketResponse: { label: 'OIL', change: 2.1 }
  },
  {
    date: '2022-09-26',
    title: 'Nordstream 1 & 2 Pipelines Sabotaged Underwater in Baltic',
    description: 'Four ruptures detected across both Baltic Sea pipelines in international waters; European gas supply capacity reduced by 35 BCM annually. Germany accelerates emergency LNG terminal construction.',
    category: 'GAS',
    marketResponse: { label: 'GAS', change: 28.4 }
  },
  {
    date: '2022-06-15',
    title: 'Russia Cuts Nordstream 1 Flow to 40% Capacity',
    description: 'Gazprom cites turbine maintenance dispute with Siemens Energy as justification. Germany activates Gas Emergency Plan Level 2; European TTF futures hit €170/MWh, an all-time record at the time.',
    category: 'GAS',
    marketResponse: { label: 'GAS', change: 19.7 }
  },
  {
    date: '2022-03-08',
    title: 'United States Bans All Russian Oil, Gas, and Coal Imports',
    description: 'Biden executive order prohibits Russian energy imports; EU announces two-thirds reduction target by year-end. Brent crude exceeds $130/bbl — the highest price since 2008 financial crisis peak.',
    category: 'OIL',
    marketResponse: { label: 'OIL', change: 8.6 }
  },
  {
    date: '2022-02-24',
    title: 'Russia Invades Ukraine — Full-Scale War Begins',
    description: 'Russian forces cross Ukrainian border in a multi-front assault triggering an unprecedented Western sanctions campaign. Oil futures spike 10.8% on open; wheat surges 15.2% as the two nations account for 28% of global exports.',
    category: 'WHEAT',
    marketResponse: { label: 'WHEAT', change: 15.2 }
  },
  {
    date: '2021-10-15',
    title: 'China Imposes Phosphate Fertilizer Export Restrictions',
    description: 'Beijing bans phosphate fertilizer exports to ensure domestic agricultural supply amid national energy rationing crisis. Global DAP prices rise 40% within six weeks; India, Brazil, and Australia most exposed.',
    category: 'WHEAT',
    marketResponse: { label: 'WHEAT', change: 4.1 }
  },
  {
    date: '2021-03-23',
    title: 'MV Ever Given Runs Aground — Suez Canal Blocked for Six Days',
    description: 'Container ship Ever Given grounds in the Suez Canal, blocking $9.6 billion in daily trade. 369 vessels queue on both ends; rerouting via Cape of Good Hope adds 9 days average transit and strains global supply chains.',
    category: 'SHIPPING',
    marketResponse: { label: 'SHIPPING', change: 8.7 }
  }
];

// ─── NATION INTELLIGENCE BRIEFS ───────────────────────────────────────────────
const NATION_INTEL = {
  'Iran': {
    gdp: '$367B (PPP: $1.6T)',
    population: '87.9 Million',
    primaryExports: ['Crude Oil', 'Petrochemicals', 'Natural Gas', 'Steel', 'Pistachios'],
    supplyChainRole: 'Iran is the 4th-largest holder of proven oil reserves and 2nd-largest natural gas reserves globally. It serves as a critical pressure point on the Strait of Hormuz — the chokepoint through which 21% of global oil supply transits daily. Under current U.S. sanctions, Iran maintains shadow export networks primarily routed through China at discounted rates.',
    criticalDependencies: [
      { commodity: 'USD / SWIFT Access', note: 'SWIFT exclusion forces barter and yuan-denominated transactions' },
      { commodity: 'Refined Petroleum Products', note: 'Domestic refinery constraints require gasoline imports despite crude surplus' },
      { commodity: 'Semiconductor Imports', note: 'Advanced chip embargo constrains military and industrial modernization programs' }
    ],
    chokepoints: [
      { name: 'Strait of Hormuz', level: 'HIGH' },
      { name: 'Suez Canal', level: 'MODERATE' },
      { name: 'Red Sea', level: 'LOW' },
      { name: 'Bab el-Mandeb', level: 'LOW' }
    ],
    vulnerabilityScore: 71,
    threatIndicators: [
      'IRGC drone and missile arsenal expanding despite sanctions — estimated 3,000+ ballistic missiles',
      'Shadow oil fleet export volume ~1.4M BPD; sanctions partially circumvented via Chinese buyers',
      'Nuclear enrichment at 60% purity — JCPOA revival negotiations stalled since 2022'
    ]
  },
  'Russia': {
    gdp: '$2.24T (PPP: $5.3T)',
    population: '144.4 Million',
    primaryExports: ['Crude Oil', 'Natural Gas', 'Coal', 'Wheat', 'Fertilizers', 'Metals'],
    supplyChainRole: "Russia is the world's largest natural gas exporter and second-largest crude oil exporter, accounting for roughly 12% of global oil supply. Its pipeline infrastructure spans 170,000 km connecting Europe and Asia. Since 2022 sanctions, Russia has pivoted 70% of oil exports to China and India via a shadow fleet of 600+ vessels.",
    criticalDependencies: [
      { commodity: 'Microelectronics', note: 'Western chip ban has critically degraded precision weapons production capacity' },
      { commodity: 'Foreign Direct Investment', note: 'Capital flight of $200B+ since the 2022 invasion; FDI near zero' },
      { commodity: 'European Gas Revenue', note: 'Loss of primary EU gas market — ~$65B annual revenue pre-war' }
    ],
    chokepoints: [
      { name: 'Strait of Hormuz', level: 'LOW' },
      { name: 'Suez Canal', level: 'MODERATE' },
      { name: 'Red Sea', level: 'LOW' },
      { name: 'Bab el-Mandeb', level: 'LOW' }
    ],
    vulnerabilityScore: 58,
    threatIndicators: [
      'Ruble depreciation 40%+ since 2022; CPI inflation running at 8.6% annually',
      'Defense budget at 7.1% of GDP — highest allocation since Soviet-era Cold War peak',
      'Shadow tanker fleet of 600+ vessels under continuous Western maritime intelligence tracking'
    ]
  },
  'China': {
    gdp: '$17.8T (PPP: $33.0T)',
    population: '1.41 Billion',
    primaryExports: ['Electronics', 'Machinery', 'Rare Earths', 'Lithium Compounds', 'Fertilizers', 'Steel'],
    supplyChainRole: 'China is the dominant node in global manufacturing, accounting for 28.7% of global output. It controls 85% of rare earth processing, 40% of copper refining, and 75% of solar panel production. China functions as the primary consumer of sanctioned-nation commodities — acting as a pressure-relief valve that structurally blunts Western sanctions effectiveness.',
    criticalDependencies: [
      { commodity: 'Crude Oil', note: '73% import dependency; primary suppliers are Saudi Arabia, Russia, and Iraq' },
      { commodity: 'Iron Ore', note: '60% sourced from Australia — bilateral tensions create acute supply concentration risk' },
      { commodity: 'Soy / Food Security', note: 'Import dependency on Brazil and Argentina for livestock feed soy' }
    ],
    chokepoints: [
      { name: 'Strait of Hormuz', level: 'HIGH' },
      { name: 'Suez Canal', level: 'MODERATE' },
      { name: 'Red Sea', level: 'MODERATE' },
      { name: 'Bab el-Mandeb', level: 'MODERATE' }
    ],
    vulnerabilityScore: 44,
    threatIndicators: [
      'Taiwan Strait military tensions at 40-year high; PLA encirclement exercises now quarterly',
      'U.S. semiconductor export controls targeting advanced nodes below 14nm — AI ambitions threatened',
      'Property sector debt crisis — Evergrande and Country Garden defaults threatening banking sector stability'
    ]
  },
  'Saudi Arabia': {
    gdp: '$1.06T (PPP: $2.4T)',
    population: '36.4 Million',
    primaryExports: ['Crude Oil', 'Refined Petroleum', 'Petrochemicals', 'Natural Gas', 'Fertilizers'],
    supplyChainRole: "Saudi Arabia functions as the global oil market's swing producer — the sole nation capable of materially adjusting output within 60 days to stabilize or destabilize prices. Aramco's Ghawar field remains the world's highest-capacity single oil field at 3.8M BPD. VISION 2030 is attempting economic diversification before peak oil demand.",
    criticalDependencies: [
      { commodity: 'Food Imports', note: '80%+ of food imported; water scarcity prevents domestic agriculture at scale' },
      { commodity: 'U.S. Security Umbrella', note: 'CENTCOM and USAF presence underpins regime security against Iranian threats' },
      { commodity: 'Oil Price Floor', note: 'Fiscal breakeven ~$80/bbl; below this level, deficit spending is required' }
    ],
    chokepoints: [
      { name: 'Strait of Hormuz', level: 'HIGH' },
      { name: 'Suez Canal', level: 'MODERATE' },
      { name: 'Red Sea', level: 'HIGH' },
      { name: 'Bab el-Mandeb', level: 'HIGH' }
    ],
    vulnerabilityScore: 47,
    threatIndicators: [
      'Houthi ballistic missile range confirmed over Riyadh and Abqaiq processing facility',
      'Iran-Saudi normalization agreement (2023) under strain following Gaza conflict escalation',
      'OPEC+ cohesion fracturing — UAE and Iraq repeatedly exceeding assigned production quotas'
    ]
  },
  'Venezuela': {
    gdp: '$97.7B (PPP: $203B)',
    population: '28.3 Million',
    primaryExports: ['Crude Oil', 'Petroleum Products', 'Gold', 'Bauxite', 'Steel'],
    supplyChainRole: 'Venezuela holds the world\'s largest proven crude reserves (303 billion barrels) but PDVSA infrastructure collapse reduced output to ~750K BPD from a 1998 peak of 3.2M BPD. The country serves as a test case for sanctions-induced energy sector collapse, with China and Cuba absorbing remaining exports under barter arrangements.',
    criticalDependencies: [
      { commodity: 'USD / Foreign Exchange', note: 'Hyperinflation destroyed the bolivar; dollar economy partially emerged informally' },
      { commodity: 'Diluent for Heavy Crude', note: 'Orinoco belt crude requires naphtha blending to be exportable — imports required' },
      { commodity: 'Chinese Investment', note: 'CNPC and CNOOC debt-for-oil arrangements are the primary financing source' }
    ],
    chokepoints: [
      { name: 'Strait of Hormuz', level: 'LOW' },
      { name: 'Suez Canal', level: 'LOW' },
      { name: 'Red Sea', level: 'LOW' },
      { name: 'Bab el-Mandeb', level: 'LOW' }
    ],
    vulnerabilityScore: 82,
    threatIndicators: [
      'U.S. oil sanctions reimposed October 2023 after Maduro violated electoral reform agreement',
      'Essequibo territorial dispute with Guyana escalating — military buildup on border active',
      'Outward migration exceeds 7.7 million — largest displacement crisis in the Western Hemisphere'
    ]
  },
  'North Korea': {
    gdp: '$17.9B (estimated)',
    population: '25.9 Million',
    primaryExports: ['Coal (sanctioned)', 'Iron Ore (sanctioned)', 'Weapons Systems', 'Cyber Operations'],
    supplyChainRole: 'North Korea has been almost entirely removed from legitimate global supply chains by UN Security Council Resolutions 2371, 2375, and 2397. The DPRK survives through illicit coal and mineral exports via Chinese shadow networks, weapons sales to Russia, and state-sponsored cybercrime estimated to generate $1.5B annually.',
    criticalDependencies: [
      { commodity: 'Chinese Energy Supply', note: 'China supplies ~95% of DPRK fuel at subsidized rates under tacit agreement' },
      { commodity: 'Chinese Food Aid', note: 'WFP estimates 42% of population faces food insecurity — Chinese grain imports critical' },
      { commodity: 'Illicit Financial Networks', note: 'Crypto theft and money laundering finance the weapons and ICBM development program' }
    ],
    chokepoints: [
      { name: 'Strait of Hormuz', level: 'LOW' },
      { name: 'Suez Canal', level: 'LOW' },
      { name: 'Red Sea', level: 'LOW' },
      { name: 'Bab el-Mandeb', level: 'LOW' }
    ],
    vulnerabilityScore: 88,
    threatIndicators: [
      'DPRK deploying 10,000+ troops to support Russian operations in Ukraine per NATO assessment',
      'Hwasong-18 solid-fuel ICBM declared operational April 2023 — first-strike capability assumed',
      'Artillery ammunition exports to Russia estimated 1.5 million rounds in exchange for food and fuel'
    ]
  },
  'Iraq': {
    gdp: '$268B (PPP: $570B)',
    population: '43.5 Million',
    primaryExports: ['Crude Oil', 'Natural Gas (flared)', 'Dates', 'Petrochemicals'],
    supplyChainRole: "Iraq is OPEC's second-largest producer at approximately 4.2M BPD, accounting for ~4% of global oil supply. The Basra oil terminal is the critical southern Persian Gulf export hub. Iraq sits at the intersection of U.S., Iranian, and Saudi influence — its political instability creates periodic supply disruption risk despite substantial reserve strength.",
    criticalDependencies: [
      { commodity: 'Iranian Gas Imports', note: 'Iraq imports 30–40% of its electricity-generating gas from Iran via pipeline' },
      { commodity: 'USD Oil Revenue', note: '90%+ of government budget is funded by crude oil export receipts' },
      { commodity: 'International Security', note: 'U.S. troops and Iranian proxy militias create an unstable dual-dependency structure' }
    ],
    chokepoints: [
      { name: 'Strait of Hormuz', level: 'HIGH' },
      { name: 'Suez Canal', level: 'MODERATE' },
      { name: 'Red Sea', level: 'LOW' },
      { name: 'Bab el-Mandeb', level: 'LOW' }
    ],
    vulnerabilityScore: 63,
    threatIndicators: [
      'Iran-backed PMF militias launched 160+ attacks on U.S. forces at Iraqi bases since October 2023',
      'Kurdish region oil exports halted since March 2023 due to Turkey-Iraq pipeline arbitration dispute',
      'Water scarcity crisis: Tigris and Euphrates flows reduced 40% — threatening agricultural sector viability'
    ]
  },
  'UAE': {
    gdp: '$509B (PPP: $772B)',
    population: '9.8 Million',
    primaryExports: ['Crude Oil', 'Refined Petroleum', 'Gold', 'Natural Gas', 'Aluminum'],
    supplyChainRole: "The UAE — particularly Dubai and Abu Dhabi — functions as the Middle East's primary commodity trading and re-export hub. ADNOC produces 3.2M BPD and is expanding toward a 5M BPD target by 2027. Jebel Ali Port is the region's largest port and a critical transshipment node for Asian-European trade flows.",
    criticalDependencies: [
      { commodity: 'Oil Price Stability', note: 'ADNOC fiscal breakeven ~$65/bbl — more resilient than Saudi Arabia' },
      { commodity: 'Trade Route Security', note: 'Jebel Ali handles $250B in annual trade; Bab el-Mandeb disruption is a direct threat' },
      { commodity: 'Expatriate Labor', note: '88% of UAE population are expatriates — social stability requires economic growth' }
    ],
    chokepoints: [
      { name: 'Strait of Hormuz', level: 'HIGH' },
      { name: 'Suez Canal', level: 'MODERATE' },
      { name: 'Red Sea', level: 'MODERATE' },
      { name: 'Bab el-Mandeb', level: 'HIGH' }
    ],
    vulnerabilityScore: 39,
    threatIndicators: [
      'Houthi missile and drone attacks on UAE territory confirmed January 2022 — Aramco Abu Dhabi targeted',
      'UAE-Iran diplomatic warming ongoing but IRGC naval presence in Strait remains destabilizing factor',
      'F-35 sale with U.S. stalled over Huawei 5G network dispute — defense modernization delayed 3+ years'
    ]
  },
  'Qatar': {
    gdp: '$236B (PPP: $323B)',
    population: '2.7 Million',
    primaryExports: ['LNG', 'Crude Oil', 'Petrochemicals', 'Aluminum', 'Steel'],
    supplyChainRole: "Qatar is the world's largest LNG exporter, supplying roughly 20% of global LNG trade. The North Field — shared with Iran's South Pars — is the world's largest natural gas reservoir. Qatar's LNG contracts span Europe, Japan, South Korea, and India, making it a stabilizing force in global gas markets with 25+ year contract horizons.",
    criticalDependencies: [
      { commodity: 'LNG Shipping via Hormuz', note: 'All LNG transits Strait of Hormuz — the entire export economy has a single chokepoint' },
      { commodity: 'North Field Integrity', note: 'Moratorium on expansion lifted 2017; ambitious 126 MTPA target for 2030 dependent on it' },
      { commodity: 'U.S. Military Presence', note: 'Al-Udeid Air Base hosts 10,000+ U.S. troops and CENTCOM forward headquarters' }
    ],
    chokepoints: [
      { name: 'Strait of Hormuz', level: 'HIGH' },
      { name: 'Suez Canal', level: 'MODERATE' },
      { name: 'Red Sea', level: 'MODERATE' },
      { name: 'Bab el-Mandeb', level: 'HIGH' }
    ],
    vulnerabilityScore: 41,
    threatIndicators: [
      'Qatar hosting Hamas political bureau — status increasingly untenable following October 7 attack',
      'Iran threatens Strait of Hormuz closure if attacked — would strand all Qatari LNG exports immediately',
      'Saudi-Qatar normalization (January 2021) remains fragile; GCC political trust only partially restored'
    ]
  },
  'India': {
    gdp: '$3.55T (PPP: $13.1T)',
    population: '1.44 Billion',
    primaryExports: ['Refined Petroleum', 'Pharmaceuticals', 'IT Services', 'Textiles', 'Rice', 'Steel'],
    supplyChainRole: 'India has emerged as the leading refiner of discounted sanctioned-nation crude, processing Russian Urals and Iranian oil into refined products for global sale. Its pharmaceutical sector supplies 40% of global generic drug production. India\'s strategic autonomy doctrine maintains trade relationships with both sanctioned nations and Western partners simultaneously.',
    criticalDependencies: [
      { commodity: 'Crude Oil', note: '85% import dependency; pivoted heavily to discounted Russian Urals crude since 2022' },
      { commodity: 'Fertilizer Imports', note: 'Heavily dependent on Russian and Chinese fertilizer for 1.4B population food security' },
      { commodity: 'LNG Imports', note: 'Natural gas import dependency rising as domestic coal phase-out accelerates' }
    ],
    chokepoints: [
      { name: 'Strait of Hormuz', level: 'HIGH' },
      { name: 'Suez Canal', level: 'HIGH' },
      { name: 'Red Sea', level: 'HIGH' },
      { name: 'Bab el-Mandeb', level: 'HIGH' }
    ],
    vulnerabilityScore: 52,
    threatIndicators: [
      'Red Sea Houthi attacks adding $450M+ per month in additional shipping costs to Indian import bill',
      'China-India LAC border tensions unresolved — 2020 Galwan Valley clash precedent remains',
      'Pakistan nuclear escalation scenario — both nations nuclear-armed with live disputed border'
    ]
  }
};
