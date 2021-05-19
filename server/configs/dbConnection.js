const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/teamsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})