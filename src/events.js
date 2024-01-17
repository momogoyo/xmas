import EventEmitter from 'eventemitter3'

export const createEvents = () => {
  const events = new EventEmitter()

  return {
    on: events.on.bind(events),
    off: events.off.bind(events),
    once: events.once.bind(events),
    emit: events.emit.bind(events),
    removeListener: events.removeListener.bind(events)
  }
}
