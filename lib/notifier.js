var timers = require('timers')

var oo = require('carbon-io').atom.oo(module)

/*******************************************************************************
 * notifier
 */

module.exports = oo({
  /**********************************************************************
   * constructor
   */
  _C: function() {
    this._done = false
    this._update_interval = 5 * 1000
  },

  _update_arrival_times: function() {
    var self = this
    var _updater = function () {
      if (! self._done) {
        timers.setTimeout(_updater, self._update_interval)
      }
    }
    _updater()
  },

  run: function() {
    this._update_arrival_times()
  }
})

