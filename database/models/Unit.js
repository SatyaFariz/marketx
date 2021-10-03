const mongoose = require('mongoose')
const { model } = mongoose

const unitSchema = require('../schemas/Unit')

const Unit = model('Unit', unitSchema)

module.exports = Unit