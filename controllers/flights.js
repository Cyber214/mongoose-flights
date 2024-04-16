import { Flight } from "../models/flight.js"

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'Add Flight',
  })
}

function create(req, res) {
  // remove empty properties on req.body
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  // use Movie model to create movie
  Flight.create(req.body)
  .then(flight => {
    // redirect somewhere
    res.redirect('/flight')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights/new')
  })
}

export {
  newFlight as new,
  create,
}