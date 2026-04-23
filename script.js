'use strict';

// ─── TRADE DATA ────────────────────────────────────────────────────────────────
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
        { name: 'UAE', dep: 12 },
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
        { name: 'UAE', dep: 6 },
        { name: 'Egypt', dep: 4 },
        { name: 'Pakistan', dep: 3 }
      ],
      priceShock: 1,
      analogue: 'Ma\'aden Copper Curtailment (2020)',
      analogueDesc: 'Saudi Arabia holds limited copper reserves; Ma\'aden production cuts had negligible global market impact.',
      threat: 'LOW'
    },
    'Lithium': {
      supplyPct: 0.1,
      importers: [
        { name: 'UAE', dep: 2 },
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
        { name: 'Trinidad', dep: 14 },
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
        { name: 'Caribbean', dep: 6 },
        { name: 'Trinidad', dep: 8 }
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
// Maps country name → exposure level per scenario
// exposure: 'high' | 'medium' | 'low' | 'none'
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
    'Natural Gas':  { Colombia: 'high', Trinidad: 'medium', Brazil: 'low' },
    'Wheat':        { Colombia: 'low', Trinidad: 'low' },
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

// Popup notes per exposed country (first-match wins)
const POPUP_NOTES = {
  // Importers / generic notes
  'China':        'Largest shadow-market absorber; state-owned entities insulate domestic pricing through strategic reserves.',
  'India':        'Relies on discounted sanctioned-nation crude; sanctions disrupt refinery feedstock mix.',
  'Germany':      'High pipeline dependency; LNG terminal buildout underway but 2–3 year gap remains.',
  'Japan':        'Critical energy importer; near-zero domestic fossil fuel reserves heighten exposure.',
  'South Korea':  'Major petrochemical refinery hub; commodity shocks pass through to export manufacturing.',
  'Italy':        'Southern European gas anchor; Eni pipeline contracts span multiple decades.',
  'Austria':      'Highest EU gas dependency on Russia; OMV contract dispute unresolved.',
  'Turkey':       'Straddles East-West pipelines; leverages exposure as geopolitical bargaining chip.',
  'Egypt':        'Largest wheat importer in the world; food subsidy program feeds 70M+ citizens.',
  'Brazil':       'Global soy and grain powerhouse but depends on sanctioned-nation fertilizers.',
  'Indonesia':    'Urbanizing food market with rising per-capita wheat consumption; limited domestic production.',
  'Philippines':  'Import-dependent archipelago; commodity shock transmits directly to retail prices.',
  'Bangladesh':   'Dense population with thin fiscal buffers; grain shock triggers humanitarian risk.',
  'Finland':      'Heavily exposed to Russian copper and nickel; industrial transition ongoing.',
  'Australia':    'Dependent on Chinese fertilizer and lithium processing; diplomatic leverage limited.',
  'Cuba':         'Oil lifeline from Venezuela; sanctions cause fuel rationing across island.',
  'Colombia':     'Gas pipeline from Venezuela crosses key border corridor; has partial LNG backup.',
  'Armenia':      'Landlocked; near-total dependence on Iranian gas with no viable alternative.',
  'Iraq':         'Imports Iranian gas and fertilizer despite ongoing sanctions exposure.',
  'Pakistan':     'Food and fertilizer importer under fiscal stress; sanctions amplify existing crisis.',
  'Yemen':        'Conflict-fragile nation; any commodity shock risks immediate humanitarian collapse.',
  'Malaysia':     'Regional commodity trader; supply shocks strain government price controls.',
  'Vietnam':      'Fertilizer importer pivoting away from DPRK supply under UN resolutions.',
  'Netherlands':  'Rotterdam hub nation; commodity re-routing creates short-term congestion.',
  'Hungary':      'EU exempted from Russian oil ban; tightened sanctions would directly impact Mol refineries.',
  'Slovakia':     'Druzhba pipeline terminus; most exposed Central European economy.',
  'Singapore':    'Trading hub; commodity price shock flows through entrepôt to regional buyers.',
  'France':       'Diversified supply mix; moderate exposure through spot market price effects.',
  'Sudan':        'Receives discounted Russian wheat; sanctions remove this subsidy immediately.',
  'Ethiopia':     'Under food stress; Russian wheat sanctions compound existing Tigray-era shortfalls.',
  'Nigeria':      'Wheat import dependent; sanctions-driven price spike will hit urban bread prices.',
  'Canada':       'Net fertilizer exporter; benefits from reduced competition in the short term.',
  'Argentina':    'Agricultural powerhouse; commodity shock may create export windfall opportunity.',
  'Thailand':     'Regional fertilizer transit hub; prices pass through to rice sector.',
  'Bahrain':      'Near-total gas dependency on Saudi pipeline; no LNG import infrastructure.',
  'United Arab Emirates': 'Gulf energy hub; sanctions disrupt transit and re-export routes.',
  'Kuwait':       'GCC energy importer; insulated by sovereign wealth fund but exposed to spot prices.',
  'Jordan':       'Jordan imports most wheat; relies on humanitarian grain programs.',
  'Lebanon':      'Fiscally collapsed state; any commodity shock has immediate food crisis implications.',
  'Syria':        'Iranian oil lifeline via Alawite-aligned route; sanctions deepen existing shortfall.',
  'Afghanistan':  'Landlocked humanitarian crisis zone; fertilizer and wheat shocks are life-threatening.',
  'Ecuador':      'Agricultural economy exposed to fertilizer cost spikes from sanctioned exporters.',
  'Cambodia':     'Small fertilizer import dependency on DPRK; easily substituted from Thai market.',
  'Russia':       'Countersanctions and energy self-sufficiency insulate partially from DPRK copper sanctions.',
  'Trinidad':     'Energy twin with Venezuela; gas corridor disruption affects petrochemical exports.',
  'Taiwan':       'High LNG import dependency; Chinese gas sanctions create immediate industrial exposure.',
  'Poland':       'Completed pipeline independence from Russia; moderate residual supply exposure.',
};

// Map from GeoJSON country name variants to our exposure map keys
const GEO_NAME_MAP = {
  'United States of America': 'United States of America',
  'Russian Federation': 'Russia',
  'Iran (Islamic Republic of)': 'Iran',
  "Democratic People's Republic of Korea": 'North Korea',
  'Republic of Korea': 'South Korea',
  'Bolivia (Plurinational State of)': 'Bolivia',
  'Venezuela (Bolivarian Republic of)': 'Venezuela',
  'Syrian Arab Republic': 'Syria',
  'United Arab Emirates': 'United Arab Emirates',
  'China': 'China',
  'Saudi Arabia': 'Saudi Arabia',
  'Trinidad and Tobago': 'Trinidad and Tobago',
};

// ─── TYPEWRITER UTILITY ────────────────────────────────────────────────────────
function typewrite(el, text, speed = 28, onDone) {
  el.textContent = '';
  let i = 0;
  function tick() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(tick, speed);
    } else if (onDone) {
      onDone();
    }
  }
  tick();
}

// ─── CLOCK ────────────────────────────────────────────────────────────────────
function updateClock() {
  const el = document.getElementById('sys-time');
  if (!el) return;
  const now = new Date();
  const h = String(now.getUTCHours()).padStart(2,'0');
  const m = String(now.getUTCMinutes()).padStart(2,'0');
  const s = String(now.getUTCSeconds()).padStart(2,'0');
  el.textContent = `${h}:${m}:${s} UTC`;
}
updateClock();
setInterval(updateClock, 1000);

// ─── MAP SETUP ────────────────────────────────────────────────────────────────
const map = L.map('map', {
  center: [20, 10],
  zoom: 2,
  minZoom: 1,
  maxZoom: 6,
  zoomControl: true,
  attributionControl: true
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

let geojsonLayer = null;
let worldGeoJSON = null;

const GEOJSON_URL = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson';

fetch(GEOJSON_URL)
  .then(r => r.json())
  .then(data => {
    worldGeoJSON = data;
    geojsonLayer = L.geoJSON(data, {
      style: baseStyle,
      onEachFeature: onEachFeature
    }).addTo(map);
  })
  .catch(() => {
    document.getElementById('map-status').textContent = 'GeoJSON LOAD ERROR';
  });

function baseStyle() {
  return {
    fillColor: '#050f05',
    fillOpacity: 0.6,
    color: '#1a3a1a',
    weight: 0.5,
    opacity: 0.8
  };
}

function onEachFeature(feature, layer) {
  layer.on({ click: onCountryClick });
}

function onCountryClick(e) {
  const feature = e.target.feature;
  const rawName = feature.properties.ADMIN || feature.properties.name || '';
  const name = GEO_NAME_MAP[rawName] || rawName;

  const nation = document.getElementById('target-nation').value;
  const commodity = document.getElementById('commodity').value;

  if (!nation || !commodity) return;

  // Is this the target?
  const targetGeoName = Object.keys(GEO_NAME_MAP).find(k => GEO_NAME_MAP[k] === nation) || nation;
  if (rawName === targetGeoName || rawName === nation || name === nation) {
    const data = TRADE_DATA[nation]?.[commodity];
    if (!data) return;
    L.popup({ className: 'terminal-popup' })
      .setLatLng(e.latlng)
      .setContent(`
        <div class="popup-country">&#9670; ${nation.toUpperCase()} [TARGET]</div>
        <div class="popup-dep">GLOBAL SUPPLY SHARE: ${data.supplyPct}%</div>
        <div class="popup-note">DESIGNATION: PRIMARY SANCTIONS TARGET — all exports subject to full interdiction.</div>
      `)
      .openOn(map);
    return;
  }

  const exposureMap = COUNTRY_EXPOSURE[nation]?.[commodity] || {};
  const exposure = exposureMap[name] || 'none';

  if (exposure === 'none') return;

  const importerEntry = TRADE_DATA[nation]?.[commodity]?.importers?.find(im => im.name === name);
  const dep = importerEntry ? importerEntry.dep + '%' : (exposure === 'high' ? '>30%' : exposure === 'medium' ? '10–30%' : '<10%');
  const note = POPUP_NOTES[name] || `${name} has ${exposure} exposure to ${nation} ${commodity} supply disruption.`;

  L.popup({ className: 'terminal-popup' })
    .setLatLng(e.latlng)
    .setContent(`
      <div class="popup-country">&#9670; ${name.toUpperCase()}</div>
      <div class="popup-dep">IMPORT DEPENDENCY: ${dep} &nbsp;|&nbsp; EXPOSURE: ${exposure.toUpperCase()}</div>
      <div class="popup-note">${note}</div>
    `)
    .openOn(map);
}

function getCountryStyle(rawName, nation, commodity) {
  const name = GEO_NAME_MAP[rawName] || rawName;

  // Is it the target nation?
  const targetGeoName = Object.keys(GEO_NAME_MAP).find(k => GEO_NAME_MAP[k] === nation) || nation;
  if (rawName === targetGeoName || rawName === nation) {
    return {
      fillColor: '#ff2020',
      fillOpacity: 0.55,
      color: '#ff2020',
      weight: 1.5,
      opacity: 0.9,
      className: 'target-country-path'
    };
  }

  const exposureMap = COUNTRY_EXPOSURE[nation]?.[commodity] || {};
  const exposure = exposureMap[name] || 'none';

  if (exposure === 'high')   return { fillColor: '#00ff41', fillOpacity: 0.45, color: '#00ff41', weight: 1.0, opacity: 0.8 };
  if (exposure === 'medium') return { fillColor: '#008f11', fillOpacity: 0.35, color: '#008f11', weight: 0.8, opacity: 0.7 };
  if (exposure === 'low')    return { fillColor: '#004008', fillOpacity: 0.25, color: '#0a2a0a', weight: 0.5, opacity: 0.6 };
  return { fillColor: '#050f05', fillOpacity: 0.55, color: '#1a3a1a', weight: 0.5, opacity: 0.7 };
}

function refreshMap(nation, commodity) {
  if (!worldGeoJSON || !geojsonLayer) return;

  geojsonLayer.eachLayer(layer => {
    const rawName = layer.feature.properties.ADMIN || layer.feature.properties.name || '';
    const style = getCountryStyle(rawName, nation, commodity);
    layer.setStyle(style);
  });

  document.getElementById('map-status').textContent =
    `ACTIVE: ${nation.toUpperCase()} / ${commodity.toUpperCase()}`;
}

// ─── ANALYSIS RUNNER ──────────────────────────────────────────────────────────
document.getElementById('run-btn').addEventListener('click', runAnalysis);

function runAnalysis() {
  const nation = document.getElementById('target-nation').value;
  const commodity = document.getElementById('commodity').value;

  if (!nation || !commodity) {
    flashSelect(!nation ? 'target-nation' : 'commodity');
    return;
  }

  const data = TRADE_DATA[nation]?.[commodity];
  if (!data) return;

  const btn = document.getElementById('run-btn');
  btn.classList.add('running');
  btn.querySelector('.btn-text').textContent = '&#9632; PROCESSING...';

  setTimeout(() => {
    btn.classList.remove('running');
    btn.querySelector('.btn-text').textContent = '&#9658; RUN ANALYSIS';
    renderOutput(data, nation, commodity);
    refreshMap(nation, commodity);
  }, 900);
}

function flashSelect(id) {
  const el = document.getElementById(id);
  el.style.borderColor = '#ff2020';
  el.style.boxShadow = '0 0 8px rgba(255,32,32,0.5)';
  setTimeout(() => {
    el.style.borderColor = '';
    el.style.boxShadow = '';
  }, 700);
}

function renderOutput(data, nation, commodity) {
  document.getElementById('output-placeholder').style.display = 'none';
  const results = document.getElementById('output-results');
  results.style.display = 'block';

  // Supply %
  const supplyPct = document.getElementById('supply-pct');
  const supplyBar = document.getElementById('supply-bar');
  const supplyBarLabel = document.getElementById('supply-bar-label');
  const supplyVolume = document.getElementById('supply-volume');

  typewrite(supplyPct, data.supplyPct.toFixed(1) + '%', 30);
  setTimeout(() => {
    const pct = Math.min(data.supplyPct * (100 / 35), 100);
    supplyBar.style.width = pct + '%';
    supplyBarLabel.textContent = data.supplyPct.toFixed(1) + '%';
  }, 600);
  typewrite(supplyVolume, `SANCTIONS TARGET: ${nation.toUpperCase()} | COMMODITY: ${commodity.toUpperCase()}`, 18);

  // Nations
  const nationsList = document.getElementById('nations-list');
  nationsList.innerHTML = '';
  data.importers.forEach((im, i) => {
    if (im.name === '---') return;
    const row = document.createElement('div');
    row.className = 'nation-row';

    const nameEl = document.createElement('div');
    nameEl.className = 'nation-name';

    const barWrap = document.createElement('div');
    barWrap.className = 'nation-bar-wrap';
    const barFill = document.createElement('div');
    barFill.className = 'nation-bar-fill';
    barFill.style.width = '0%';
    barWrap.appendChild(barFill);

    const pctEl = document.createElement('div');
    pctEl.className = 'nation-pct';

    row.appendChild(nameEl);
    row.appendChild(barWrap);
    row.appendChild(pctEl);
    nationsList.appendChild(row);

    setTimeout(() => {
      typewrite(nameEl, im.name.toUpperCase(), 22, () => {
        typewrite(pctEl, im.dep + '%', 30);
        barFill.style.transition = 'width 1s ease';
        barFill.style.width = Math.min(im.dep, 100) + '%';
      });
    }, i * 280);
  });

  // Price shock
  const priceShock = document.getElementById('price-shock');
  const priceContext = document.getElementById('price-context');
  const shockVal = data.priceShock < 1 ? data.priceShock.toFixed(1) : Math.round(data.priceShock);
  setTimeout(() => typewrite(priceShock, '+' + shockVal + '%', 35), 200);
  typewrite(priceContext, 'EST. SPOT PRICE INCREASE — BASED ON HISTORICAL ANALOGUES', 14);

  // Analogue
  setTimeout(() => {
    typewrite(document.getElementById('analogue-event'), '» ' + data.analogue.toUpperCase(), 20, () => {
      typewrite(document.getElementById('analogue-desc'), data.analogueDesc, 10);
    });
  }, 300);

  // Threat
  const threatEl = document.getElementById('threat-level');
  threatEl.className = 'threat-level';
  setTimeout(() => {
    threatEl.classList.add(data.threat);
    typewrite(threatEl, data.threat, 60);
  }, 400);

  // Threat bar segments
  const levels = ['LOW', 'ELEVATED', 'CRITICAL', 'SEVERE'];
  const activeIdx = levels.indexOf(data.threat);
  const barRow = document.getElementById('threat-bar-row');
  barRow.innerHTML = '';
  levels.forEach((lv, i) => {
    const seg = document.createElement('div');
    seg.className = 'threat-seg';
    if (i <= activeIdx) seg.classList.add('active-' + data.threat);
    barRow.appendChild(seg);
  });
}
