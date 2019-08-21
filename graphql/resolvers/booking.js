const Event = require('../../models/event')
const Booking = require('../../models/booking')

const { transformEvent, transformBooking } = require('./merge')

module.exports = {
  bookings: async () => {
    try {
      const bookings = await Booking.find()
      return bookings.map(booking => {
        return transformBooking(booking)
      })
    } catch (err) {
      throw err
    }
  },
  bookEvent: async args => {
    try {
      const fetchedEvent = await Event.findOne({_id: args.eventId})
      const booking = new Booking({
        user: '5d5c91446b188e11d907a63f',
        event: fetchedEvent
      })
      const result = await booking.save()
      return transformBooking(result)
    } catch (err) {
      throw err
    }
  },
  cancelBooking: async args => {
    try {
      const booking = await Booking.findById(args.bookingId).populate('event')
      const event = transformEvent(booking.event)
      await Booking.deleteOne({ _id: args.bookingId })
      return event
    } catch (err) {
      throw err
    }
  }
}
