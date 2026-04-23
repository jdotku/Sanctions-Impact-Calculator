/**
 * @file calculations.js
 * All business logic and mathematical operations for the Sanctions Impact Calculator.
 * Exposes the SanctionsAnalysis class for per-scenario computation and standalone
 * helper functions used by render.js and script.js for map styling and display formatting.
 * Depends on: data.js (TRADE_DATA, COUNTRY_EXPOSURE, GEO_NAME_MAP), logger.js (Logger).
 */

'use strict';

// ─── NAMED CONSTANTS ──────────────────────────────────────────────────────────

/**
 * The maximum global supply percentage used as the denominator when scaling
 * the supply-at-risk bar to 100% width. A scenario at this percentage fills
 * the bar completely; values above it are clamped.
 */
const SUPPLY_BAR_SCALE_MAX_PCT = 35;

/**
 * Price shock values strictly below this threshold are rendered with one decimal
 * place (e.g. 0.5%); values at or above it are rounded to the nearest integer.
 */
const PRICE_SHOCK_DECIMAL_THRESHOLD = 1;

/**
 * Ordered array of threat level strings from lowest to highest severity.
 * Used both for segment bar rendering and for converting a level to its index.
 */
const THREAT_LEVELS = ['LOW', 'ELEVATED', 'CRITICAL', 'SEVERE'];

// ─── SanctionsAnalysis CLASS ──────────────────────────────────────────────────

/**
 * Encapsulates all analysis computation for a single nation/commodity scenario.
 * Instantiate once per user-triggered analysis; call getAnalysisResults() to
 * retrieve all computed values as a single flat object for the render layer.
 */
class SanctionsAnalysis {

  /**
   * Creates a SanctionsAnalysis instance and performs the initial data lookup.
   * @param {string} targetNation - The display name of the sanctioned nation (e.g. 'Iran').
   * @param {string} commodity - The display name of the commodity (e.g. 'Crude Oil').
   */
  constructor(targetNation, commodity) {
    this.targetNation = targetNation;
    this.commodity    = commodity;
    this._data = (TRADE_DATA[targetNation] && TRADE_DATA[targetNation][commodity]) || null;
    Logger.log('SanctionsAnalysis: init', targetNation, '/', commodity, '| data found:', !!this._data);
  }

  /**
   * Reports whether valid trade data exists for this nation/commodity pair.
   * Call this before getAnalysisResults() to guard against missing data entries.
   * @returns {boolean} True if data is available; false if the pair is not in TRADE_DATA.
   */
  isValid() {
    return this._data !== null;
  }

  /**
   * Returns the percentage of global supply at risk if this nation is sanctioned.
   * @returns {number} Global supply percentage at risk (e.g. 3.8 for 3.8%).
   */
  calculateSupplyRisk() {
    var result = this._data ? this._data.supplyPct : 0;
    Logger.log('calculateSupplyRisk ->', result + '%');
    return result;
  }

  /**
   * Returns the list of nations most exposed to this sanctions scenario.
   * @returns {Array<{name: string, dep: number}>} Importer nation objects with dependency percentages.
   */
  getExposedNations() {
    var nations = this._data ? this._data.importers : [];
    Logger.log('getExposedNations ->', nations.length, 'importers');
    return nations;
  }

  /**
   * Returns the estimated commodity spot-price shock percentage based on historical analogues.
   * @returns {number} Estimated percentage price increase (e.g. 42 for +42%).
   */
  calculatePriceShock() {
    var result = this._data ? this._data.priceShock : 0;
    Logger.log('calculatePriceShock ->', '+' + result + '%');
    return result;
  }

  /**
   * Returns the most comparable historical event for this sanctions scenario.
   * @returns {{event: string, description: string}} Object with the event name and a one-sentence description.
   */
  getHistoricalAnalogue() {
    if (!this._data) return { event: '', description: '' };
    return { event: this._data.analogue, description: this._data.analogueDesc };
  }

  /**
   * Returns the threat level classification string for this scenario.
   * @returns {string} One of: 'LOW', 'ELEVATED', 'CRITICAL', 'SEVERE'.
   */
  getThreatLevel() {
    var level = this._data ? this._data.threat : 'LOW';
    Logger.log('getThreatLevel ->', level);
    return level;
  }

  /**
   * Runs all calculations and returns every result in a single flat object,
   * ready to be passed directly to renderOutput().
   * @returns {{supplyPct: number, importers: Array<{name: string, dep: number}>, priceShock: number, analogueEvent: string, analogueDesc: string, threat: string}} Complete analysis results.
   */
  getAnalysisResults() {
    Logger.log('SanctionsAnalysis: compiling all results');
    var analogue = this.getHistoricalAnalogue();
    var results = {
      supplyPct:    this.calculateSupplyRisk(),
      importers:    this.getExposedNations(),
      priceShock:   this.calculatePriceShock(),
      analogueEvent: analogue.event,
      analogueDesc:  analogue.description,
      threat:       this.getThreatLevel()
    };
    Logger.log('SanctionsAnalysis: results compiled', results);
    return results;
  }
}

// ─── PURE CALCULATION HELPERS ─────────────────────────────────────────────────

/**
 * Converts a raw global supply percentage into a 0–100 bar fill width percentage.
 * Scales the value relative to SUPPLY_BAR_SCALE_MAX_PCT so that scenarios at
 * the upper range visually fill the bar rather than all appearing near-empty.
 * @param {number} supplyPct - Raw global supply percentage at risk.
 * @returns {number} Bar fill width clamped to a maximum of 100.
 */
function calculateSupplyBarWidth(supplyPct) {
  return Math.min(supplyPct * (100 / SUPPLY_BAR_SCALE_MAX_PCT), 100);
}

/**
 * Formats a raw price shock number into a display string with leading sign and percent symbol.
 * Values below PRICE_SHOCK_DECIMAL_THRESHOLD are shown with one decimal place for precision.
 * @param {number} priceShock - Raw estimated price shock percentage (e.g. 42 or 0.5).
 * @returns {string} Formatted string such as '+42%' or '+0.5%'.
 */
function formatPriceShockDisplay(priceShock) {
  var val = priceShock < PRICE_SHOCK_DECIMAL_THRESHOLD
    ? priceShock.toFixed(1)
    : String(Math.round(priceShock));
  return '+' + val + '%';
}

/**
 * Returns the zero-based numeric index of a threat level within THREAT_LEVELS.
 * Used to determine how many segment cells to activate in the threat bar.
 * @param {string} level - Threat level string ('LOW', 'ELEVATED', 'CRITICAL', 'SEVERE').
 * @returns {number} Zero-based index; returns 0 if the level string is not recognised.
 */
function threatIndex(level) {
  var idx = THREAT_LEVELS.indexOf(level);
  return idx === -1 ? 0 : idx;
}

/**
 * Resolves the exposure level of a single country within the active sanctions scenario.
 * Checks both the exact raw GeoJSON name and the normalised name from GEO_NAME_MAP.
 * @param {string} rawName - The ADMIN property from the GeoJSON feature (e.g. 'Russian Federation').
 * @param {string} nation - The sanctioned nation identifier (e.g. 'Russia').
 * @param {string} commodity - The commodity identifier (e.g. 'Natural Gas').
 * @returns {string} One of: 'target', 'high', 'medium', 'low', 'none'.
 */
function getExposureLevel(rawName, nation, commodity) {
  var name           = GEO_NAME_MAP[rawName] || rawName;
  var targetGeoName  = Object.keys(GEO_NAME_MAP).find(function (k) {
    return GEO_NAME_MAP[k] === nation;
  }) || nation;
  if (rawName === targetGeoName || rawName === nation) return 'target';
  var exposureMap = (COUNTRY_EXPOSURE[nation] && COUNTRY_EXPOSURE[nation][commodity]) || {};
  return exposureMap[name] || 'none';
}

/**
 * Returns the Leaflet path style object for a country based on its calculated exposure level.
 * Delegates level resolution to getExposureLevel() to keep styling and logic separated.
 * @param {string} rawName - The ADMIN property from the GeoJSON feature.
 * @param {string} nation - The sanctioned nation identifier.
 * @param {string} commodity - The commodity identifier.
 * @returns {{fillColor: string, fillOpacity: number, color: string, weight: number, opacity: number, className?: string}} Leaflet path style object.
 */
function getCountryStyle(rawName, nation, commodity) {
  var level = getExposureLevel(rawName, nation, commodity);
  if (level === 'target') return { fillColor: '#cc1a1a', fillOpacity: 0.6,  color: '#ff3333', weight: 1.5, opacity: 0.9, className: 'target-country-path' };
  if (level === 'high')   return { fillColor: '#00ff41', fillOpacity: 0.42, color: '#00ff41', weight: 1.0, opacity: 0.85 };
  if (level === 'medium') return { fillColor: '#00aa22', fillOpacity: 0.30, color: '#00aa22', weight: 0.8, opacity: 0.75 };
  if (level === 'low')    return { fillColor: '#005510', fillOpacity: 0.22, color: '#0a2a0a', weight: 0.5, opacity: 0.6  };
  return { fillColor: '#050f05', fillOpacity: 0.55, color: '#1a3a1a', weight: 0.5, opacity: 0.7 };
}
