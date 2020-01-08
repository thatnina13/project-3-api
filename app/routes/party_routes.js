// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const Party = require('../models/party')
// const User = require('../models/user.js')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
// const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
router.get('/party', (req, res, next) => {
  Party.find()
    .then(party => {
      return party.map(party => party.toObject())
    })
    .then(party => {
      res.json({ party })
    })
    .catch(next)
})

// INDEX for get my parties.
// function to get parties
// function getUserWithParties(user) {
//   // .findOne may not be applicable as we need to find many parties?
//   return User.findOne({ user: user })
//     .populate('parties').exec((err, parties) => {
//       // console log only used for testing purposes, will later be replaced with showing all the parties (using handlebars/jquery?)
//       console.log("Populated User " + parties);
//       })
router.get('/myparty/:id', (req, res, next) => {
  const userId = req.user
  Party.find(userId)
    .then(party => {
      return party.map(party => party.toObject())
    })
    .then(party => {
      res.json({ party })
    })
    .catch(next)
})

// CREATE
router.post('/party', requireToken, (req, res, next) => {
  // set owner of new example to be current user
  req.body.party.owner = req.user.id

  Party.create(req.body.party)
    // respond to succesful `create` with status 201 and JSON of new "example"
    .then(example => {
      res.status(201).json({ party: example.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// SHOW
router.get('/party/:id', (req, res, next) => {
  Party.findById(req.params.id)
    .then(handle404)
    .then(party => res.status(200).json({party: party.toObject()}))
    .catch(next)
})

// DELETE
router.delete('/party/:id', requireToken, (req, res, next) => {
  Party.findById(req.params.id)
    .then(handle404)
    .then(party => {
      requireOwnership(req, party)
      party.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// UPDATE
router.patch('/party/:id', requireToken, (req, res, next) => {
  delete req.body.party.owner

  Party.findById(req.params.id)
    .then(handle404)
    .then(party => {
      requireOwnership(req, party)

      return party.updateOne(req.body.party)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
