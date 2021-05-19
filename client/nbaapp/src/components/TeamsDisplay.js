import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import {GET_TEAMS} from '../Queries/queries'
import {Link} from 'react-router-dom'

//css
import '../css/TeamsDisplay.css'

//components
import DisplayDataHost from './DisplayDataHost'


function TeamsDisplay() {

    const MapAllMovies = () => {
        const { loading, error, data } = useQuery(GET_TEAMS);
        if(loading){
            return <div>Loading...</div>
        }
        else if(error){
            console.log(error)
        } 
        else if(data){
            let teamsItems = data.teams.map(team => {
                return <Link to={`/team/${team.id}`} key={team.id}>
                    <div className="team">
                        {team.name}
                    </div>
                </Link>
            })
            return teamsItems
        }
    }
    

    return (
        <div>
            <Link to="/addTeam">
                <input type="button" value="ADD NEW TEAM" /> 
            </Link> <br />

            <div className="team-list">
                {MapAllMovies()}
            </div>

            <DisplayDataHost />
        
        </div>
    )
}


export default TeamsDisplay
