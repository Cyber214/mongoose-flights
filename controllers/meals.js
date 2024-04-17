import { Meal } from "../models/meal.js"

function newMeal(req, res) {
  // find all the meals
  Meal.find({})
  .then(meals => {
    // pass them (with a title) to the meals/new view
    res.render('meals/new', {
      meals: meals,
      title: 'Add meal'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flight')
  })
}

function create(req, res) {
  // use form data (req.body) to create a meal
  Meal.create(req.body)
  .then(meal => {
    // redirect back to /meals/new
    res.redirect('/meals/new')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flight')
  })
}

export {
  newMeal as new,
  create
}