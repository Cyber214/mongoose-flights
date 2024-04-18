import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

// GET localhost:3000/flights
router.get('/', flightsCtrl.index)

// GET localhost:3000/flights/new
router.get('/new', flightsCtrl.new)

// GET localhost:3000/flights/:flightId
router.get('/:flightId', flightsCtrl.show)

// GET localhost:3000/flights/:flightId/edit
router.get('/:flightId/edit', flightsCtrl.edit)

// GET localhost:3000/flights
router.post('/', flightsCtrl.create)

// POST localhost:3000/flights/:flightId/tickets
router.post('/:flightId/tickets', flightsCtrl.createTicket)

// POST localhost:3000/flights/:flightId/meals
router.post('/:flightId/meals', flightsCtrl.addToMeal)

// DELETE localhost:3000/flights/:flightId
router.delete('/:flightId', flightsCtrl.delete)

// PUT localhost:3000/flights/:flightId
router.put('/:flightId', flightsCtrl.update)

export { router }
