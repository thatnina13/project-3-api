// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const Flamingo = require('../models/flamingo')

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
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /examples
router.get('/flamingo', (req, res, next) => {
  Flamingo.find()
    .then(flamingo => {
      return flamingo.map(flamingo => flamingo.toObject())
    })
    .then(flamingo => {
      res.json({ flamingo })
    })
    .catch(next)
})

// CREATE
// POST /examples
router.post('/flamingo', requireToken, (req, res, next) => {
  // set owner of new example to be current user
  req.body.flamingo.user = req.user.id

  Flamingo.create(req.body.flamingo)
    // respond to succesful `create` with status 201 and JSON of new "example"
    .then(example => {
      res.status(201).json({ flamingo: example.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// SHOW
router.get('/flamingo/:id', (req, res, next) => {
  Flamingo.findById(req.params.id)
    .then(handle404)
    .then(flamingo => res.status(200).json({flamingo: flamingo.toObject()}))
    .catch(next)
})

// DESTROY
// DELETE /examples/5a7db6c74d55bc51bdf39793
router.delete('/flamingo/:id', requireToken, (req, res, next) => {
  Flamingo.findById(req.params.id)
    .then(handle404)
    .then(flamingo => {
      // throw an error if current user doesn't own `example`
      requireOwnership(req, flamingo)
      // delete the example ONLY IF the above didn't throw
      flamingo.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// UPDATE
router.patch('/flamingo/:id', requireToken, (req, res, next) => {
  delete req.body.flamingo.owner

  Flamingo.findById(req.params.id)
    .then(handle404)
    .then(flamingo => {
      requireOwnership(req, flamingo)

      return flamingo.updateOne(req.body.flamingo)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
module.exports = router
