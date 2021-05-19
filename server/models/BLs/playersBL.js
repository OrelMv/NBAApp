const Player = require('../Schemas/playerSchema')

let getAllPlayers = function(){
    return new Promise((resolve, reject) => {
        Player.find({}, (err, players) => {
            if(err){
                reject(err)
            }
            else{
                resolve(players)
            }
        })
    })
}


let getPlayerById = function(id){
    return new Promise((resolve, reject) => {
        Player.findById(id, (err, player) => {
            if(err){
                reject(err)
            }
            else{
                resolve(player)
            }
        })
    })
}


let addPlayer = function(playerObj){
    return new Promise((resolve, reject) => {
        let player = new Player({
            name: playerObj.name,
            age: playerObj.age,
            avgPoints: playerObj.avgPoints,
            teamId: playerObj.teamId
        })

        player.save((err) => {
            if(err){
                reject(err)
            }
            else{
                resolve(player)
            }
        })
    })
}

let updatePlayer = function(id, playerObj){
    return new Promise((resolve, reject) => {
        Player.findByIdAndUpdate((id), {
            name: playerObj.name,
            age: playerObj.age,
            avgPoints: playerObj.avgPoints,
            teamId: playerObj.teamId
        }, async(err) => {
            if(err){
                reject(err)
            }
            else{
                let player = await getPlayerById(id)
                resolve(player)
            }
        })
    })
}

let deletePlayer = function(id){
    return new Promise((resolve, reject) => {
        Player.findByIdAndDelete(id, err => {
            if(err){
                reject(err)
            } else {
                resolve("player deleted")
            }
        })
    })
}

module.exports = {getAllPlayers, getPlayerById, addPlayer, updatePlayer, deletePlayer}

