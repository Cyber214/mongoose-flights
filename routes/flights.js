import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

// // GET localhost:3000/flights
// router.get('/', flightsCtrl.index)

// GET localhost:3000/flights/new
router.get('/new', flightsCtrl.new)

// GET localhost:3000/flights/new
router.get('/', flightsCtrl.create)

export { router }
