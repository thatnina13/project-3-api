// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const Rsvp = require('../models/rsvp')

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
router.get('/rsvp', (req, res, next) => {
  Rsvp.find()
    // .populate('event')
    .then(rsvps => {
      return rsvps.map(rsvp => rsvp.toObject())
    })
    .then(rsvps => {
      res.json({ rsvps })
    })
    .catch(next)
})

// CREATE
router.post('/rsvp', requireToken, (req, res, next) => {
  // set owner of new example to be current user
  req.body.rsvp.user = req.user.id

  Rsvp.create(req.body.rsvp)
    // respond to succesful `create` with status 201 and JSON of new "example"
    .then(rsvp => {
      res.status(201).json({ rsvp: rsvp.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// SHOW
router.get('/rsvp/:id', (req, res, next) => {
  Rsvp.findById(req.params.id)
    .then(handle404)
    .then(res => res.status(200).json({res: res.toObject()}))
    .catch(next)
})

// DELETE
router.delete('/rsvp/:id', requireToken, (req, res, next) => {
  Rsvp.findById(req.params.id)
    .then(handle404)
    .then(rsvp => {
      requireOwnership(req, rsvp)
      rsvp.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// UPDATE
router.patch('/rsvp/:id', requireToken, (req, res, next) => {
  delete req.body.res.owner

  Rsvp.findById(req.params.id)
    .then(handle404)
    .then(res => {
      requireOwnership(req, res)

      return res.updateOne(req.body.res)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
