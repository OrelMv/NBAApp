import React, {useState, useEffect} from 'react'
import {useQuery, useMutation} from '@apollo/client'
import {GET_PLAYER, GET_TEAM, EDIT_PLAYER} from '../../Queries/queries'

//css
import '../../css/Trade.css'

function Trade(props) {

    const [selectedTeamId, setSelectedTeamId] = useState('')
    const [selectedPlayerData, setSelectedPlayerData] = useState({name: ''})

    const {loading: loadingPlayerData, error: errorInPlayerData, data: playerData} = useQuery(GET_PLAYER, {
        variables: {id: props.match.params.playerId}
    })

    const {loading: loadingTeamData, error: errorInTeamData, data: selectedTeamData} = useQuery(GET_TEAM,{
        variables: {id: selectedTeamId}
    })

    const [initPlayersTrade, {dataReturned}] = useMutation(EDIT_PLAYER)


    const changeSelectedTeamIdState = (e) => {
        setSelectedTeamId(e.target.value)
        if(e.target.value == ''){
            setSelectedPlayerData({name: ''})
        }
    }

    const getSelectedPlayerData = (e) => {
        if(e.target.value != ''){
            let selectedPlayer = selectedTeamData.team.players.filter(player => player.id == e.target.value)
            setSelectedPlayerData(selectedPlayer[0])
        } else {
            setSelectedPlayerData({name: ''})
        }
        
    }

    const displayTradeSection = () => {
        if(loadingPlayerData) return <div>Loading...</div>
        if(errorInPlayerData) return <div>Error</div>

        return (
            <div style={{display: 'flex'}}>
                <div>
                    <label>{playerData.player.team.name}</label> <br />
                    <label>{playerData.player.name} </label>
                </div>

                <div className="arrows">
                     {'-->'} <br />
                     {'<--'}
                </div>

                <div>
                    <select onChange={changeSelectedTeamIdState} className="select-team">
                        <option value="">Select Team</option>
                        {
                            playerData.player.otherTeams.map(team => {
                                return <option key={team.id} value={team.id} >
                                    {team.name}
                                </option>
                            })

                        }
                    </select> <br />

                    {
                        selectedTeamId == ""? "": 
                            selectedTeamData? <select onChange={getSelectedPlayerData}
                                 className="select-player">
                                <option value="">Select Player</option>
                                {
                                    selectedTeamData.team.players.map(player => {
                                        return <option key={player.id} value={player.id}>
                                            {player.name}
                                        </option>
                                    })
                                }
                            </select> : ""
                    }
                        
                </div>
            </div>
        )
    }

    

    const tradePlayers = () => {

        if(selectedTeamId != '' && selectedPlayerData){

            let firstPlayerObj = {
                id: playerData.player.id,
                name: playerData.player.name,
                age: playerData.player.age,
                avgPoints: playerData.player.avgPoints,
                teamId: selectedTeamId
            }

            let selectedPlayerObj = {
                id: selectedPlayerData.id,
                name: selectedPlayerData.name,
                age: selectedPlayerData.age,
                avgPoints: selectedPlayerData.avgPoints,
                teamId: playerData.player.teamId
            }

            initPlayersTrade({
                variables: firstPlayerObj, 
                refetchQueries: [{query: GET_PLAYER, variables: {id: firstPlayerObj.id}}, 
                    {query: GET_TEAM, variables: {id: firstPlayerObj.teamId}}]
            })

            initPlayersTrade({
                variables: selectedPlayerObj, 
                refetchQueries: [{query: GET_PLAYER, variables: {id: selectedPlayerData.id}}, 
                    {query: GET_TEAM, variables: {id: selectedPlayerObj.teamId}}]
            })

            props.history.push(`/player/${props.match.params.playerId}`)

            alert("players Traded")

        }
        else {
            alert('please select a palyer to trade for')
        }

    }

    const comparePlayers = () => {
        if(selectedPlayerData.name != ''){
            return (
            <div>
                <label className="comparison-header">Comparison</label>    
                <table>
                    <tr>
                        <td>Player</td>
                        <td>{playerData.player.name}</td>
                        <td>{selectedPlayerData.name}</td>
                    </tr>
    
                    <tr className="age-col">
                        <td>Age</td>
                        <td>{playerData.player.age}</td>
                        <td>{selectedPlayerData.age}</td>
                    </tr>
    
                    <tr className="avgPoints-col">
                        <td>Avg Points</td>
                        <td>{playerData.player.avgPoints}</td>
                        <td>{selectedPlayerData.avgPoints}</td>
                    </tr>
                </table>
            </div>
            )
        }   
    }

    return (
        <div>
            <span className="trade-header">Trade Player</span> <br />
            {displayTradeSection()} 
            {comparePlayers()}
            <input type="button" value="TRADE" onClick={tradePlayers} className="trade-btn"/>
        </div>
    )
}

export default Trade
