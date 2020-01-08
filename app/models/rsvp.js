const mongoose = require('mongoose')

const rsvpSchema = new mongoose.Schema({
  attendee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Rsvp', rsvpSchema)
