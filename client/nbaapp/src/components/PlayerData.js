import React from 'react'
import {useQuery, useMutation} from '@apollo/client'
import {GET_PLAYER, DELETE_PLAYER, GET_TEAM} from '../Queries/queries'
import {Link} from 'react-router-dom'

function PlayerData(props) {

    const {loading, error, data} = useQuery(GET_PLAYER, {
        variables: {id: props.match.params.id}
    })

    const [initDeletePlayer, {dt}] = useMutation(DELETE_PLAYER)

    const saveDataInSessionStg = () => {
        sessionStorage.setItem('playerName', data.player.name)
        sessionStorage.setItem('playerAge', data.player.age)
        sessionStorage.setItem('playerAvgPoints', data.player.avgPoints)
        sessionStorage.setItem('playerTeamId', data.player.teamId)
    }

    const deletePlayer = () => {
        initDeletePlayer({
            variables: {id: data.player.id},
            refetchQueries: [{query: GET_TEAM, variables: {id: data.player.teamId} }]
        })
        alert(`${data.player.name} has been deleted`)
    }

    const displayPlayerData = () => {
        if(loading) return <div>Loading...</div>
        if(error) return <div>Error - {console.log(error.message)}</div>

        return (
            <div>
                Name: {data.player.name} <br />
                Age: {data.player.age} <br />
                Average Points: {data.player.avgPoints} <br />
                Team: {data.player.team.name} <br />

                <div style={{display: 'flex'}}>

                <div style={{marginLeft: '10px'}}>
                    <Link to={`/player/${data.player.id}/editPlayer`}>
                        <input type="button" value="Edit Player" onClick={saveDataInSessionStg} />
                    </Link> 
                </div>

                <div style={{marginLeft: '10px'}}>
                    <Link to={`/player/${data.player.id}/tradePlayer`}>
                        <input type="button" value= "Trade Player" />
                    </Link> 
                </div>

                <div style={{marginLeft: '10px'}}>
                    <Link to={`/team/${data.player.teamId}`}>
                        <input type="button" value="Delete Player" onClick={deletePlayer} />
                    </Link>
                </div>


                </div>

            </div>
        )

    }

    return (
        <div style={{fontSize: '23px'}}>

            {
                data? 
                <Link to={`/team/${data.player.teamId}`}>
                    <input type="button" value="GO BACK" />
                </Link>: ""
            }

            {displayPlayerData()}
        </div>
    )
}

export default PlayerData
