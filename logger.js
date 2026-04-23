/**
 * @file logger.js
 * Provides the Logger utility object, the UTC system clock, and the page-entry
 * flicker animation trigger. Must be loaded before all other app scripts so that
 * Logger is available throughout the codebase.
 */

'use strict';

// ─── CONFIGURATION ────────────────────────────────────────────────────────────

/** Set to false to silence Logger.log() calls in production environments. */
const DEBUG_MODE = true;

/** Duration of the CSS page-entry flicker animation in milliseconds. */
const PAGE_FLICKER_DURATION_MS = 450;

/** Interval at which the system clock element is refreshed in milliseconds. */
const CLOCK_UPDATE_INTERVAL_MS = 1000;

// ─── LOGGER OBJECT ────────────────────────────────────────────────────────────

/**
 * Centralised application logger with debug-mode gating.
 * Use Logger.log() for informational trace messages and Logger.error() for faults.
 * @namespace Logger
 */
const Logger = {

  /**
   * Logs a timestamped message to the console only when DEBUG_MODE is true.
   * @param {string} message - The primary message to log.
   * @param {...*} args - Additional values appended to the log line.
   * @returns {void}
   */
  log: function (message) {
    if (!DEBUG_MODE) return;
    var args = Array.prototype.slice.call(arguments, 1);
    var ts   = new Date().toISOString().slice(11, 23);
    console.log.apply(console, ['[SIC ' + ts + ']', message].concat(args));
  },

  /**
   * Logs a timestamped error to the console unconditionally, ignoring DEBUG_MODE.
   * @param {string} message - The error message to log.
   * @param {...*} args - Additional values appended to the error line.
   * @returns {void}
   */
  error: function (message) {
    var args = Array.prototype.slice.call(arguments, 1);
    var ts   = new Date().toISOString().slice(11, 23);
    console.error.apply(console, ['[SIC ERR ' + ts + ']', message].concat(args));
  }

};

// ─── SYSTEM CLOCK ─────────────────────────────────────────────────────────────

/**
 * Reads the current UTC time and writes it to the #sys-time element if it exists.
 * Designed to be called both immediately and on an interval.
 * @returns {void}
 */
function updateClock() {
  var el = document.getElementById('sys-time');
  if (!el) return;
  var now = new Date();
  var h   = String(now.getUTCHours()).padStart(2, '0');
  var m   = String(now.getUTCMinutes()).padStart(2, '0');
  var s   = String(now.getUTCSeconds()).padStart(2, '0');
  el.textContent = h + ':' + m + ':' + s + ' UTC';
}

updateClock();
setInterval(updateClock, CLOCK_UPDATE_INTERVAL_MS);

// ─── PAGE FLICKER ─────────────────────────────────────────────────────────────

/**
 * Adds the page-entry CSS class to .page-content on DOMContentLoaded, then
 * removes it after PAGE_FLICKER_DURATION_MS so the animation can fire again on
 * the next navigation.
 * @returns {void}
 */
function triggerPageFlicker() {
  var wrapper = document.querySelector('.page-content');
  if (!wrapper) return;
  wrapper.classList.add('page-enter');
  setTimeout(function () {
    wrapper.classList.remove('page-enter');
  }, PAGE_FLICKER_DURATION_MS);
}

document.addEventListener('DOMContentLoaded', triggerPageFlicker);
