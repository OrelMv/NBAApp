const Team = require('../Schemas/teamSchema')
const Player = require('../Schemas/playerSchema')
const playersBL = require('./playersBL')

let getAllTeams = function(){
    return new Promise((resolve, reject) => {
        Team.find({}, (err, teams) => {
            if(err){
                reject(err)
            }
            else{
                resolve(teams)
            }
        })
    })
}


let getTeamById = function(id){
    return new Promise((resolve, reject) => {
        Team.findById(id, (err, team) => {
            if(err){
                reject(err)
            }
            else{
                resolve(team)
            }
        })
    })
}


let addTeam = function(teamObj){
    return new Promise((resolve, reject) => {
        let team = new Team({
            name: teamObj.name,
            record: teamObj.record,
            titles: teamObj.titles
        })

        team.save((err) => {
            if(err){
                reject(err)
            }
            else{
                resolve(team)
            }
        })
    })
}

let updateTeam = function(id, teamObj){
    return new Promise((resolve, reject) => {
        Team.findByIdAndUpdate((id), {
            name: teamObj.name,
            record: teamObj.record,
            titles: teamObj.titles
        }, async(err) => {
            if(err){
                reject(err)
            }
            else{
                let team = await getTeamById(id)
                resolve(team)
            }
        })
    })
}

let deleteTeam = function(id){
    return new Promise((resolve, reject) => {
        Team.findByIdAndDelete(id,async err => {
            if(err){
                reject(err)
            } else {
                Player.deleteMany({teamId: id}, (err)=> {
                    if(err){
                        reject(err)
                    } else {
                        resolve("team and players deleted")
                    }
                } )
                
            }
        })
    })
}

module.exports = {getAllTeams, getTeamById, addTeam, updateTeam, deleteTeam}

