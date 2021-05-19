import React from 'react'
import {GET_TEAM, DELETE_TEAM, GET_TEAMS} from '../Queries/queries'
import {useQuery, useMutation} from '@apollo/client'
import {Link} from 'react-router-dom'

//css
import '../css/TeamData.css'

function TeamData(props) {

    const [initDeleteTeam, {dt}] = useMutation(DELETE_TEAM)

    const {loading, error, data} = useQuery(GET_TEAM, {
        variables: {id: props.match.params.id}
    })

    const saveDataInSessionStorage = () => {
        sessionStorage.setItem('teamName', data.team.name)
        sessionStorage.setItem('teamRecord', data.team.record)
        sessionStorage.setItem('teamTitles', data.team.titles)
    }

    const deleteTeam = () => {
        initDeleteTeam({
            variables: {id: props.match.params.id},
            refetchQueries: [{query: GET_TEAMS}]
        })
        props.history.push('/')
        alert(`${data.team.name} has been deleted`)
    }

    const displayTeamDetails = () => {
        if(loading) return <div>Loading...</div>
        if(error) return <div>Error</div>

        let body = "No Players"
        if(data.team.players.length != 0){
            body = data.team.players.map(player => {
                return (
                    <Link to={`/player/${player.id}`} key={player.id}>
                        <div className="player">{player.name}</div>
                    </Link>
                )
            })
        }
        return (
            <div>
                <div className="team-header">{data.team.name} Details</div> <br />
                Name: {data.team.name} <br />
                Record: {data.team.record} <br />
                Titles: {data.team.titles} <br />
                Players: {body}
                <br />

                <div style={{display: 'flex'}}>

                    <div style={{marginLeft: '10px'}}>
                        <Link to={`/team/${data.team.id}/editTeam`}>
                            <input type="button" value="Edit Team" onClick={saveDataInSessionStorage}/>
                        </Link>
                    </div> 

                    <div style={{marginLeft: '10px'}}>
                        <input type="button" value="Delete Team" onClick={deleteTeam} />
                    </div>

                    <div style={{marginLeft: '10px'}}>
                        <Link to={`/team/${data.team.id}/addPlayer`}>
                            <input type="button" value="Add Player" onClick={saveDataInSessionStorage}/>
                        </Link>
                    </div>

                </div>
            </div>
        )
    }

    return (
        <div className="team-details">
            {displayTeamDetails()}
        </div>
    )
}

export default TeamData
