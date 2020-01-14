const mongoose = require('mongoose')

const flamingoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  talent: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Flamingo', flamingoSchema)
