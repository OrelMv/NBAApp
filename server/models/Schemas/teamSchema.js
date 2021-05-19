const mongoose = require('mongoose')

const teamSchema = mongoose.Schema

let team = new teamSchema({
    name: String,
    record: String,
    titles: Number
}) 


module.exports = mongoose.model('teams', team)