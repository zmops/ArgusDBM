export default {
  handlers: {},
  $on: function(event, type, func) {
    if (!this.handlers[event]) {
      this.handlers[event] = {}
    }
    this.handlers[event][type] = func
  },
  $emit: function(event, type, params) {
    (this.handlers[event] && this.handlers[event][type]) && this.handlers[event][type](params && params)
  },
  $remove: function(event) {
    this.handlers[event] && delete this.handlers[event]
  }
}
