const jsonFile = require('jsonfile')
const Player = require('./models/Schemas/playerSchema')
const Team = require('./models/Schemas/teamSchema')
require('./configs/dbConnection')

jsonFile.readFile('./Data/data.json', (err, data) => {
    if(err){
        console.log(err)
    } else {
        const teams = data.teams
        const players = data.players
        let startingNumber = 0
        let stoppingNumber = 3
        for(let i = 0; i < teams.length; i++) {
            let team = new Team({
                name: teams[i].name,
                record: teams[i].record,
                titles: teams[i].titles
            })
            team.save(err => {
                if(err){
                    console.log(err)
                } else {
                    for(let x = startingNumber; x <= stoppingNumber; x++){
                        let player = new Player({
                            name: players[x].name,
                            age: players[x].age,
                            avgPoints: players[x].avgPoints,
                            teamId: team._id
                        })
                        player.save(err => {
                            if(err){
                                console.log(err)
                            }
                        }) 
                    }
                    startingNumber+=4
                    stoppingNumber+=4
                   
                }
            })
            
        }
    }
})
console.log("ok")