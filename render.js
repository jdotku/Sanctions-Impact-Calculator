/**
 * @file render.js
 * All DOM manipulation and UI rendering for the Sanctions Impact Calculator.
 * Each exported function has exactly one rendering responsibility. The top-level
 * orchestrator renderOutput() calls each sub-renderer in sequence.
 * Depends on: calculations.js (calculateSupplyBarWidth, formatPriceShockDisplay,
 *             threatIndex, THREAT_LEVELS), logger.js (Logger).
 */

'use strict';

// ─── RENDER TIMING CONSTANTS ──────────────────────────────────────────────────

/** Milliseconds between each nation row appearing (stagger effect). */
const NATION_ROW_STAGGER_MS = 300;

/** Delay before the price shock typewriter begins, in milliseconds. */
const PRICE_SHOCK_RENDER_DELAY_MS = 200;

/** Delay before the historical analogue typewriter begins, in milliseconds. */
const ANALOGUE_RENDER_DELAY_MS = 300;

/** Delay before the threat level typewriter begins, in milliseconds. */
const THREAT_RENDER_DELAY_MS = 400;

/** Delay between the supply stat typewriter starting and the bar animating, in milliseconds. */
const SUPPLY_BAR_ANIMATE_DELAY_MS = 600;

/** Milliseconds between characters for fast typewriter text (labels, metadata). */
const TYPEWRITER_SPEED_FAST = 16;

/** Milliseconds between characters for standard typewriter text (stat values). */
const TYPEWRITER_SPEED_MED = 28;

/** Milliseconds between characters for slow typewriter text (large emphasis numbers). */
const TYPEWRITER_SPEED_SLOW = 35;

/** Milliseconds between characters for the threat level large-text typewriter. */
const TYPEWRITER_SPEED_THREAT = 60;

/** Milliseconds between characters for the analogue description paragraph typewriter. */
const TYPEWRITER_SPEED_PARAGRAPH = 10;

/** Duration of the nation dependency bar CSS width transition, in milliseconds. */
const NATION_BAR_TRANSITION_MS = 1100;

/** Duration of the select-flash error indicator, in milliseconds. */
const SELECT_FLASH_DURATION_MS = 700;

// ─── TEXT UTILITY ─────────────────────────────────────────────────────────────

/**
 * Types text into a DOM element one character at a time at the given speed.
 * @param {HTMLElement} el - The DOM element whose textContent will be updated.
 * @param {string} text - The full string to type out.
 * @param {number} speed - Milliseconds to wait between each character.
 * @param {Function} [onDone] - Optional callback invoked when typing is complete.
 * @returns {void}
 */
function typewrite(el, text, speed, onDone) {
  if (speed === undefined) speed = TYPEWRITER_SPEED_MED;
  el.textContent = '';
  var i = 0;
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

// ─── INPUT FEEDBACK ───────────────────────────────────────────────────────────

/**
 * Briefly applies a red border and glow to a select element to indicate a missing value.
 * @param {string} id - The DOM element ID of the select input to flash.
 * @returns {void}
 */
function flashSelect(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.style.borderColor = '#ff3333';
  el.style.boxShadow   = '0 0 8px rgba(255,51,51,0.5)';
  setTimeout(function () {
    el.style.borderColor = '';
    el.style.boxShadow   = '';
  }, SELECT_FLASH_DURATION_MS);
}

// ─── OUTPUT PANEL VISIBILITY ──────────────────────────────────────────────────

/**
 * Hides the empty-state placeholder and reveals the results panel.
 * @returns {void}
 */
function showOutputPanel() {
  document.getElementById('output-placeholder').style.display = 'none';
  document.getElementById('output-results').style.display = 'block';
}

// ─── INDIVIDUAL CARD RENDERERS ────────────────────────────────────────────────

/**
 * Renders the Global Supply at Risk card: types the percentage stat and animates the fill bar.
 * @param {number} supplyPct - Global supply percentage at risk (e.g. 3.8).
 * @param {string} nation - Sanctioned nation name shown in the sub-label.
 * @param {string} commodity - Commodity name shown in the sub-label.
 * @returns {void}
 */
function renderSupplyRisk(supplyPct, nation, commodity) {
  Logger.log('renderSupplyRisk: start', supplyPct + '%');
  typewrite(document.getElementById('supply-pct'), supplyPct.toFixed(1) + '%', TYPEWRITER_SPEED_MED);
  setTimeout(function () {
    var fillWidth = calculateSupplyBarWidth(supplyPct);
    document.getElementById('supply-bar').style.width = fillWidth + '%';
    document.getElementById('supply-bar-label').textContent = supplyPct.toFixed(1) + '%';
  }, SUPPLY_BAR_ANIMATE_DELAY_MS);
  typewrite(
    document.getElementById('supply-volume'),
    'TARGET: ' + nation.toUpperCase() + '  |  COMMODITY: ' + commodity.toUpperCase(),
    TYPEWRITER_SPEED_FAST
  );
  Logger.log('renderSupplyRisk: complete');
}

/**
 * Renders the Top Exposed Nations card with staggered typewriter rows and animated dependency bars.
 * @param {Array<{name: string, dep: number}>} importers - Array of importer nation objects.
 * @returns {void}
 */
function renderExposedNations(importers) {
  Logger.log('renderExposedNations: start,', importers.length, 'nations');
  var nationsList = document.getElementById('nations-list');
  nationsList.innerHTML = '';

  importers.forEach(function (importer, index) {
    if (importer.name === '---') return;

    var row     = document.createElement('div'); row.className     = 'nation-row';
    var nameEl  = document.createElement('div'); nameEl.className  = 'nation-name';
    var barWrap = document.createElement('div'); barWrap.className = 'nation-bar-wrap';
    var barFill = document.createElement('div'); barFill.className = 'nation-bar-fill';
    var pctEl   = document.createElement('div'); pctEl.className   = 'nation-pct';

    barFill.style.width = '0%';
    barWrap.appendChild(barFill);
    row.appendChild(nameEl);
    row.appendChild(barWrap);
    row.appendChild(pctEl);
    nationsList.appendChild(row);

    setTimeout(function () {
      typewrite(nameEl, importer.name.toUpperCase(), TYPEWRITER_SPEED_MED, function () {
        typewrite(pctEl, importer.dep + '%', TYPEWRITER_SPEED_SLOW);
        barFill.style.transition = 'width ' + (NATION_BAR_TRANSITION_MS / 1000) + 's ease';
        barFill.style.width = Math.min(importer.dep, 100) + '%';
      });
    }, index * NATION_ROW_STAGGER_MS);
  });

  Logger.log('renderExposedNations: complete');
}

/**
 * Renders the Projected Price Shock card with a formatted typewriter value in amber.
 * @param {number} priceShock - Raw estimated price shock percentage (e.g. 42).
 * @returns {void}
 */
function renderPriceShock(priceShock) {
  Logger.log('renderPriceShock: start', priceShock);
  var formatted = formatPriceShockDisplay(priceShock);
  setTimeout(function () {
    typewrite(document.getElementById('price-shock'), formatted, TYPEWRITER_SPEED_SLOW);
  }, PRICE_SHOCK_RENDER_DELAY_MS);
  typewrite(
    document.getElementById('price-context'),
    'EST. SPOT PRICE INCREASE — BASED ON HISTORICAL ANALOGUES',
    TYPEWRITER_SPEED_FAST - 3
  );
  Logger.log('renderPriceShock: complete');
}

/**
 * Renders the Historical Analogue card with staggered event title and description typewriters.
 * @param {string} eventName - The name of the comparable historical event.
 * @param {string} description - One sentence describing the event's market impact.
 * @returns {void}
 */
function renderHistoricalAnalogue(eventName, description) {
  Logger.log('renderHistoricalAnalogue: start', eventName);
  setTimeout(function () {
    typewrite(
      document.getElementById('analogue-event'),
      '» ' + eventName.toUpperCase(),
      18,
      function () {
        typewrite(document.getElementById('analogue-desc'), description, TYPEWRITER_SPEED_PARAGRAPH);
      }
    );
  }, ANALOGUE_RENDER_DELAY_MS);
  Logger.log('renderHistoricalAnalogue: complete');
}

/**
 * Builds and renders the threat severity segment bar inside the Threat Assessment card.
 * Activates segment cells from left up to the current threat level's position.
 * @param {string} threat - Threat level string ('LOW', 'ELEVATED', 'CRITICAL', 'SEVERE').
 * @returns {void}
 */
function renderThreatSegments(threat) {
  var activeIdx = threatIndex(threat);
  var barRow    = document.getElementById('threat-bar-row');
  barRow.innerHTML = '';
  THREAT_LEVELS.forEach(function (level, index) {
    var seg = document.createElement('div');
    seg.className = 'threat-seg';
    if (index <= activeIdx) seg.classList.add('active-' + threat);
    barRow.appendChild(seg);
  });
}

/**
 * Renders the Threat Assessment card: types the colour-coded level label and draws the segment bar.
 * @param {string} threat - Threat level string ('LOW', 'ELEVATED', 'CRITICAL', 'SEVERE').
 * @returns {void}
 */
function renderThreatAssessment(threat) {
  Logger.log('renderThreatAssessment: start', threat);
  var threatEl = document.getElementById('threat-level');
  threatEl.className = 'threat-level';
  setTimeout(function () {
    threatEl.classList.add(threat);
    typewrite(threatEl, threat, TYPEWRITER_SPEED_THREAT);
    renderThreatSegments(threat);
  }, THREAT_RENDER_DELAY_MS);
  Logger.log('renderThreatAssessment: complete');
}

// ─── POPUP CONTENT BUILDER ────────────────────────────────────────────────────

/**
 * Builds the inner HTML string for a Leaflet country popup.
 * Produces different markup depending on whether the country is the sanctions target.
 * @param {string} displayName - The country name to display in the popup header.
 * @param {boolean} isTarget - True if this country is the primary sanctions target.
 * @param {string|null} dep - Dependency percentage string (e.g. '72%'); null when isTarget is true.
 * @param {string} level - Exposure level string ('high', 'medium', 'low', or 'target').
 * @param {string|null} note - One-line contextual impact note; null when isTarget is true.
 * @param {number|null} globalShare - Global supply share percentage; only used when isTarget is true.
 * @returns {string} HTML markup string for use inside L.popup().setContent().
 */
function buildCountryPopupHtml(displayName, isTarget, dep, level, note, globalShare) {
  if (isTarget) {
    return '<div class="popup-country">&#9670; ' + displayName.toUpperCase() + ' &nbsp;[TARGET]</div>' +
           '<div class="popup-dep">GLOBAL SUPPLY SHARE: ' + globalShare + '%</div>' +
           '<div class="popup-note">DESIGNATION: PRIMARY SANCTIONS TARGET — all exports subject to full interdiction.</div>';
  }
  return '<div class="popup-country">&#9670; ' + displayName.toUpperCase() + '</div>' +
         '<div class="popup-dep">IMPORT DEPENDENCY: ' + dep + ' &nbsp;|&nbsp; EXPOSURE: ' + level.toUpperCase() + '</div>' +
         '<div class="popup-note">' + note + '</div>';
}

// ─── MAIN OUTPUT ORCHESTRATOR ─────────────────────────────────────────────────

/**
 * Reveals the output panel and delegates each card to its dedicated renderer.
 * Accepts the flat results object produced by SanctionsAnalysis.getAnalysisResults().
 * @param {{supplyPct: number, importers: Array<{name: string, dep: number}>, priceShock: number, analogueEvent: string, analogueDesc: string, threat: string}} results - Complete analysis result object.
 * @param {string} nation - The sanctioned nation name (passed through to renderSupplyRisk).
 * @param {string} commodity - The commodity name (passed through to renderSupplyRisk).
 * @returns {void}
 */
function renderOutput(results, nation, commodity) {
  Logger.log('renderOutput: start', { nation: nation, commodity: commodity });
  showOutputPanel();
  renderSupplyRisk(results.supplyPct, nation, commodity);
  renderExposedNations(results.importers);
  renderPriceShock(results.priceShock);
  renderHistoricalAnalogue(results.analogueEvent, results.analogueDesc);
  renderThreatAssessment(results.threat);
  Logger.log('renderOutput: complete');
}
