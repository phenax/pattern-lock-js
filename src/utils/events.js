
export default (function EventBus() {
    this.events = {};
});

EventBus.prototype = {
    on: function on(event, cb) {
        event = this.events[event] = this.events[event] || [];
        event.push(cb);
        return () => this.off(event, cb);
    },
    off: function off(event, cb) {
        event = this.events[event] = this.events[event] || [];
        event.splice(event.indexOf(cb) >>> 0, 1);
    },
    emit: function emit(event) {
        const list = this.events[event];
        if (!list || !list[0]) return;
        const args = list.slice.call(arguments, 1);
        list.slice().map(i => i.apply(this, args));
    },
};