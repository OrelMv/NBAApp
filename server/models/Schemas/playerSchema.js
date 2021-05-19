const mongoose = require('mongoose')

const playerSchema = mongoose.Schema

let player = new playerSchema({
    name: String,
    age: Number,
    avgPoints: Number,
    teamId: String
}) 


module.exports = mongoose.model('players', player)