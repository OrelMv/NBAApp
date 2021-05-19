import {gql} from '@apollo/client'

export const GET_TEAMS = gql`
{
    teams{
        id
        name
        record
        titles
    }
}
`

export const ADD_TEAM = gql`
    mutation addTeam($name: String!, $record: String!, $titles: Int!){
        addTeam(name: $name, record: $record, titles: $titles){
            id
            name
            record
        }
    }
`

export const GET_TEAM = gql`
    query team($id: ID!){
        team(id: $id){
            id
            name
            record
            titles
            players{
                id
                name
                age
                avgPoints
            }
        }
    }
`

export const GET_PLAYER = gql`
    query player($id: ID!){
        player(id: $id){
            id
            name
            age
            avgPoints
            teamId
            team {
                id
                name
            }
            otherTeams{
               id 
               name
           }
        }
    }

`

export const EDIT_TEAM = gql`

    mutation updateTeam($id: ID!, $name: String!, $record: String!, $titles: Int!){
        updateTeam(id: $id, name: $name, record: $record, titles: $titles){
            id
            name
            record 
            titles
        }
    }

`

export const ADD_PLAYER = gql`
    mutation addPlayer($name: String!, $age: Int!, $avgPoints: Float!, $teamId: ID!){
        addPlayer(name: $name, age: $age, avgPoints: $avgPoints, teamId: $teamId){
            id
            name
            age
            avgPoints
            teamId
        }
    }
`

export const DELETE_TEAM = gql`
    mutation deleteTeam($id: ID!){
        deleteTeam(id: $id){
            name
        }
    }
`

export const EDIT_PLAYER = gql`
    mutation updatePlayer($id: ID!, $name: String!, $age: Int!, $avgPoints: Float!, $teamId: ID!){
        updatePlayer(id: $id, name: $name, age: $age, avgPoints: $avgPoints, teamId: $teamId){
            id
            name
            age
            avgPoints
            teamId
        }
    }
`

export const DELETE_PLAYER = gql`
    mutation deletePlayer($id: ID!){
        deletePlayer(id: $id){
            id 
            name
        }
    }
`
 