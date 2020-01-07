const mongoose = require('mongoose')

const resSchema = new mongoose.Schema({
  attendees: {
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

module.exports = mongoose.model('Res', resSchema)
