const {Router} = require('express')
const Todo = require('../models/todo')
const router = Router()

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll()
    res.status(200).json({todos})
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: "Server error"
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      done: false
    })
    res.status(201).json({todo})
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: "Server error"
    })
  }
})

router.put('/:id', (req, res) => {
  try {

  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: "Server error"
    })
  }
})

router.delete('/', (req, res) => {
  try {

  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: "Server error"
    })
  }
})

module.exports = router