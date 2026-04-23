/**
 * @file script.js
 * Application bootstrap for the Analysis page (index.html).
 * Initialises the Leaflet map, loads world GeoJSON, binds UI event listeners,
 * and orchestrates the analysis flow by delegating to SanctionsAnalysis,
 * renderOutput(), and refreshMap(). All heavy logic lives in calculations.js
 * and render.js; this file is the wiring layer only.
 * Depends on: data.js, logger.js, calculations.js, render.js, Leaflet.
 */

'use strict';

// ─── MAP CONFIGURATION CONSTANTS ─────────────────────────────────────────────

/** Default zoom level when the map first renders. */
const MAP_DEFAULT_ZOOM = 2;

/** Minimum zoom level — prevents zooming out beyond a full world view. */
const MAP_MIN_ZOOM = 2;

/** Maximum zoom level — limits detail to a broad regional scale. */
const MAP_MAX_ZOOM = 6;

/** Latitude component of the map's initial centre coordinate. */
const MAP_CENTER_LAT = 20;

/** Longitude component of the map's initial centre coordinate. */
const MAP_CENTER_LNG = 10;

/** Southern latitude boundary clamped so the map cannot pan past Antarctica. */
const MAP_BOUNDS_SOUTH = -85;

/** Northern latitude boundary clamped so the map cannot pan past the Arctic. */
const MAP_BOUNDS_NORTH = 85;

/** Western longitude boundary — hard world edge, prevents infinite horizontal scroll. */
const MAP_BOUNDS_WEST = -180;

/** Eastern longitude boundary — hard world edge, prevents infinite horizontal scroll. */
const MAP_BOUNDS_EAST = 180;

/** How tightly the map snaps back when the user tries to pan beyond maxBounds (0–1). */
const MAP_BOUNDS_VISCOSITY = 1.0;

// ─── APPLICATION CONSTANTS ────────────────────────────────────────────────────

/** Duration of the fake processing animation before results are rendered, in milliseconds. */
const ANALYSIS_PROCESSING_DELAY_MS = 900;

/** Duration of the select-flash error indicator reset, in milliseconds. */
const SELECT_FLASH_RESET_MS = 700;

/** CDN URL for the world GeoJSON country boundaries dataset. */
const GEOJSON_URL = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson';

// ─── MODULE STATE ─────────────────────────────────────────────────────────────

/** @type {L.GeoJSON|null} The active GeoJSON layer rendered on the map. */
var geojsonLayer = null;

/** @type {Object|null} The raw world GeoJSON feature collection once loaded. */
var worldGeoJSON = null;

/** @type {L.Map} The Leaflet map instance shared across all map functions. */
var map;

// ─── MAP INITIALISATION ───────────────────────────────────────────────────────

/**
 * Creates and configures the Leaflet map instance bound to the #map element.
 * Sets strict world bounds to prevent infinite horizontal panning.
 * @returns {L.Map} The configured Leaflet map instance.
 */
function initMap() {
  Logger.log('initMap: creating Leaflet instance');
  return L.map('map', {
    center:              [MAP_CENTER_LAT, MAP_CENTER_LNG],
    zoom:                MAP_DEFAULT_ZOOM,
    minZoom:             MAP_MIN_ZOOM,
    maxZoom:             MAP_MAX_ZOOM,
    maxBounds:           L.latLngBounds(L.latLng(MAP_BOUNDS_SOUTH, MAP_BOUNDS_WEST), L.latLng(MAP_BOUNDS_NORTH, MAP_BOUNDS_EAST)),
    maxBoundsViscosity:  MAP_BOUNDS_VISCOSITY,
    zoomControl:         true,
    attributionControl:  true
  });
}

/**
 * Attaches the CartoDB dark-matter tile layer to the provided map instance.
 * noWrap prevents tiles from repeating beyond the world bounds.
 * @param {L.Map} mapInstance - The Leaflet map to attach the tile layer to.
 * @returns {void}
 */
function addTileLayer(mapInstance) {
  Logger.log('addTileLayer: adding CartoDB dark tiles');
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors',
    subdomains:  'abcd',
    maxZoom:     19,
    noWrap:      true
  }).addTo(mapInstance);
}

/**
 * Fetches the world GeoJSON from GEOJSON_URL and renders it as a country layer.
 * Attaches onCountryClick to each feature and applies the default baseline style.
 * @param {L.Map} mapInstance - The Leaflet map to attach the GeoJSON layer to.
 * @returns {void}
 */
function loadWorldGeoJSON(mapInstance) {
  Logger.log('loadWorldGeoJSON: fetching', GEOJSON_URL);
  fetch(GEOJSON_URL)
    .then(function (response) { return response.json(); })
    .then(function (data) {
      Logger.log('loadWorldGeoJSON: loaded', data.features.length, 'country features');
      worldGeoJSON = data;
      geojsonLayer = L.geoJSON(data, {
        style:          function ()        { return getCountryStyle('__none__', '', ''); },
        onEachFeature:  function (feature, layer) { layer.on({ click: onCountryClick }); }
      }).addTo(mapInstance);
      Logger.log('loadWorldGeoJSON: GeoJSON layer added to map');
    })
    .catch(function (err) {
      Logger.error('loadWorldGeoJSON: fetch failed', err);
      var statusEl = document.getElementById('map-status');
      if (statusEl) statusEl.textContent = 'GEOJSON LOAD ERROR';
    });
}

// ─── MAP INTERACTION ──────────────────────────────────────────────────────────

/**
 * Resolves the display name and dependency information for a clicked country
 * and delegates popup HTML construction to buildCountryPopupHtml().
 * @param {L.LeafletMouseEvent} e - The Leaflet click event from the GeoJSON layer.
 * @returns {void}
 */
function onCountryClick(e) {
  var feature   = e.target.feature;
  var rawName   = feature.properties.ADMIN || feature.properties.name || '';
  var name      = GEO_NAME_MAP[rawName] || rawName;
  var nation    = document.getElementById('target-nation').value;
  var commodity = document.getElementById('commodity').value;

  if (!nation || !commodity) return;

  var level = getExposureLevel(rawName, nation, commodity);
  if (level === 'none') return;

  Logger.log('onCountryClick:', name, '| level:', level);

  var popupHtml;
  if (level === 'target') {
    var tradeData = TRADE_DATA[nation] && TRADE_DATA[nation][commodity];
    if (!tradeData) return;
    popupHtml = buildCountryPopupHtml(name, true, null, level, null, tradeData.supplyPct);
  } else {
    var importerEntry = ((TRADE_DATA[nation] && TRADE_DATA[nation][commodity] &&
                          TRADE_DATA[nation][commodity].importers) || [])
                        .find(function (im) { return im.name === name; });
    var dep  = importerEntry ? importerEntry.dep + '%' :
               (level === 'high' ? '>30%' : level === 'medium' ? '10–30%' : '<10%');
    var note = POPUP_NOTES[name] || name + ' has ' + level + ' exposure to ' + nation + ' ' + commodity + ' disruption.';
    popupHtml = buildCountryPopupHtml(name, false, dep, level, note, null);
  }

  L.popup().setLatLng(e.latlng).setContent(popupHtml).openOn(map);
}

/**
 * Re-styles every country on the GeoJSON layer to reflect the active sanctions scenario.
 * Updates the map-status label to show the current nation and commodity.
 * @param {string} nation - The sanctioned nation identifier.
 * @param {string} commodity - The commodity identifier.
 * @returns {void}
 */
function refreshMap(nation, commodity) {
  Logger.log('refreshMap: start', nation, '/', commodity);
  if (!worldGeoJSON || !geojsonLayer) {
    Logger.log('refreshMap: GeoJSON not yet loaded — skipping restyle');
    return;
  }
  geojsonLayer.eachLayer(function (layer) {
    var rawName = layer.feature.properties.ADMIN || layer.feature.properties.name || '';
    layer.setStyle(getCountryStyle(rawName, nation, commodity));
  });
  var statusEl = document.getElementById('map-status');
  if (statusEl) statusEl.textContent = 'ACTIVE: ' + nation.toUpperCase() + ' / ' + commodity.toUpperCase();
  Logger.log('refreshMap: complete');
}

// ─── ANALYSIS ORCHESTRATION ───────────────────────────────────────────────────

/**
 * Sets the run button into its processing state for the animation window.
 * @param {HTMLButtonElement} btn - The run button element to update.
 * @returns {void}
 */
function setButtonProcessing(btn) {
  btn.classList.add('running');
  btn.querySelector('.btn-text').textContent = '■ PROCESSING...';
}

/**
 * Resets the run button back to its idle state after processing completes.
 * @param {HTMLButtonElement} btn - The run button element to reset.
 * @returns {void}
 */
function setButtonIdle(btn) {
  btn.classList.remove('running');
  btn.querySelector('.btn-text').textContent = '► RUN ANALYSIS';
}

/**
 * Reads the selected nation and commodity, validates input, instantiates
 * SanctionsAnalysis, waits for the processing animation, then triggers
 * renderOutput() and refreshMap() with the computed results.
 * @returns {void}
 */
function runAnalysis() {
  var nation    = document.getElementById('target-nation').value;
  var commodity = document.getElementById('commodity').value;

  if (!nation)    flashSelect('target-nation');
  if (!commodity) flashSelect('commodity');
  if (!nation || !commodity) return;

  Logger.log('runAnalysis: start', { nation: nation, commodity: commodity });

  var analysis = new SanctionsAnalysis(nation, commodity);
  if (!analysis.isValid()) {
    Logger.error('runAnalysis: no trade data found for', nation, commodity);
    return;
  }

  var btn = document.getElementById('run-btn');
  setButtonProcessing(btn);

  setTimeout(function () {
    setButtonIdle(btn);

    Logger.log('runAnalysis: calculating results');
    var results = analysis.getAnalysisResults();

    Logger.log('runAnalysis: rendering output');
    renderOutput(results, nation, commodity);

    Logger.log('runAnalysis: refreshing map');
    refreshMap(nation, commodity);

    Logger.log('runAnalysis: complete');
  }, ANALYSIS_PROCESSING_DELAY_MS);
}

// ─── BOOTSTRAP ────────────────────────────────────────────────────────────────

map = initMap();
addTileLayer(map);
loadWorldGeoJSON(map);

document.getElementById('run-btn').addEventListener('click', runAnalysis);
Logger.log('script.js: bootstrap complete — Analysis page ready');
