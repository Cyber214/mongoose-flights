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
  // use flight model to create flight
  Flight.create(req.body)
  .then(flight => {
    // redirect somewhere
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights/new')
  })
}

function index(req, res) {
  // use flight model to search for all flights
  Flight.find({})
  .then(flights => {
    // render a view (flights/index) and pass flights and title 
    res.render('flights/index', {
      flights: flights,
      title: 'All flights'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    res.render('flights/show', {
      flight: flight,
      title: 'Flight Detail'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.flightId)
  .then(flight => {
    // redirect back to index view
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function edit(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    res.render('flights/edit', {
      flight: flight,
      title: 'Edit Flight'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function update(req, res) {
  // checkbox logic
  req.body.nowShowing = !!req.body.nowShowing
  // handle splitting the cast string into an array
  if (req.body.cast) {
    req.body.cast = req.body.cast.split(', ')
  }
  // remove empty properties on req.body
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  // use model to update database
  Flight.findByIdAndUpdate(req.params.flightId, req.body, {new: true})
  .then(flight => {
    // redirect to show view
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function createTicket(req, res) {
  // find the flight (by _id)
  Flight.findById(req.params.flightId)
  .then(flight => {
    // create the ticket (by pushing into tickets array)
    flight.tickets.push(req.body)
    // save the flight document
    flight.save()
    .then(() => {
      // redirect to the show view
      res.redirect(`/flights/${req.params.flightId}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/flights')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function addToMeal(req, res) {
  // find the flight by id
  Flight.findById(req.params.flightId)
  .then(flight => {
    // associate performerId (in req.body) by adding to cast array
    flight.cast.push(req.body.performerId)
    // save the parent document
    flight.save()
    .then(() => {
      // redirect back to flight show view
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/flights')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  update,
  createTicket,
  addToMeal,
}