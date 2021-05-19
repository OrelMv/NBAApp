const playersBL = require('../models/BLs/playersBL')
const teamsBL = require('../models/BLs/teamBL')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLList,
    GraphQLSchema
} = require('graphql')

const TeamType = new GraphQLObjectType({
    name: "Team",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        record: { type: GraphQLString },
        titles: { type: GraphQLInt },
        players: {
            type: new GraphQLList(PlayerType),
            async resolve(parent, args){
                let players = await playersBL.getAllPlayers()
                let currentTeamPlayers = players.filter(player => player.teamId == parent.id)
                return currentTeamPlayers
            }
        }
    })
})

const PlayerType = new GraphQLObjectType({
    name: "Player",
    fields: () => ({
        id:{ type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        avgPoints: {type: GraphQLFloat},
        teamId: { type: GraphQLString },

        team: {
            type: TeamType,
            async resolve(parent, args){
                let teams = await teamsBL.getAllTeams()
                let index = teams.findIndex(team => team._id == parent.teamId)
                return teams[index]
            }
        },
        
        otherTeams: {
            type: new GraphQLList(TeamType),
            async resolve(parent, args){
                let teams = await teamsBL.getAllTeams()
                let others = teams.filter(team => team._id != parent.teamId)
                return others
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        team: {
            type: TeamType,
            args: {id: {type: GraphQLID}},
            async resolve(parent, args){
                let team = await teamsBL.getTeamById(args.id)
                return team
            }
        },

        player: {
            type: PlayerType,
            args: {id: {type: GraphQLID}},
            async resolve(parent, args){
                let player = await playersBL.getPlayerById(args.id)
                return player
            }
        },

        teams: {
            type: new GraphQLList(TeamType),
            async resolve(parent, args){
                let teams = await teamsBL.getAllTeams()
                return teams
            }
        },

        players: {
            type: new GraphQLList(PlayerType),
            async resolve(parent, args){
                let players = await playersBL.getAllPlayers()
                return players
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        //------------------ Players -------------------------
        addPlayer: {
            type: PlayerType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
                avgPoints: {type: new GraphQLNonNull(GraphQLFloat)},
                teamId: {type: new GraphQLNonNull(GraphQLID)}
            },
            async resolve(parent, args){
                let addedPlayer = await playersBL.addPlayer(args)
                return addedPlayer;
            }
        },

        updatePlayer: {
            type: PlayerType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
                avgPoints: {type: new GraphQLNonNull(GraphQLFloat)},
                teamId: {type: new GraphQLNonNull(GraphQLID)}
            }, 
            async resolve(parent, args){
                let playerObj = {
                    name: args.name,
                    age: args.age,
                    avgPoints: args.avgPoints,
                    teamId: args.teamId
                }

                let updatedPlayer = await playersBL.updatePlayer(args.id, playerObj)
                return updatedPlayer
            }
        },

        deletePlayer:{
            type: PlayerType,
            args: {id: {type: new GraphQLNonNull(GraphQLID)}},
            async resolve(parent, args){
                let resp = await playersBL.deletePlayer(args.id)
                return resp
            }
        },
        //------------------ Players -------------------------

        //------------------ Teams --------------------------
        addTeam: {
            type: TeamType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                record: {type: new GraphQLNonNull(GraphQLString)},
                titles: {type: new GraphQLNonNull(GraphQLInt)}
            },

            async resolve(parent, args){
                let addedTeam = await teamsBL.addTeam(args)
                return addedTeam
            }
        },

        updateTeam: {
            type: TeamType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: new GraphQLNonNull(GraphQLString)},
                record: {type: new GraphQLNonNull(GraphQLString)},
                titles: {type: new GraphQLNonNull(GraphQLInt)}
            },

            async resolve(parent, args){
                let teamObj = {
                    name: args.name,
                    record: args.record,
                    titles: args.titles
                }
                let updatedTeam = await teamsBL.updateTeam(args.id, teamObj)
                return updatedTeam
            }
        },

        deleteTeam: {
            type: TeamType,
            args: {id: {type: new GraphQLNonNull(GraphQLID)}},

            async resolve(parent, args){
                let resp = await teamsBL.deleteTeam(args.id)
                return resp
            }
        }
        //------------------ Teams --------------------------
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})