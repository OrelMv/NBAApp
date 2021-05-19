import React, {useEffect, useState} from 'react'
import {useMutation} from '@apollo/client'
import {EDIT_PLAYER, GET_PLAYER} from '../../Queries/queries'

function EditPlayer(props) {

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [avgPoints, setAvgPoints] = useState('')

    const [initEditPlayer, {data}] = useMutation(EDIT_PLAYER)

    useEffect(() => {

        setName(sessionStorage.getItem('playerName'))
        setAge(sessionStorage.getItem('playerAge'))
        setAvgPoints(sessionStorage.getItem('playerAvgPoints'))
        
    }, [])

    const editPlayer = (e) => {
        e.preventDefault()
        
        let playerObj = {
            id: props.match.params.playerId,
            name: name,
            age: parseInt(age),
            avgPoints: parseFloat(avgPoints),
            teamId: sessionStorage.getItem('playerTeamId')
        }

        initEditPlayer({
            variables: playerObj,
            refetchQueries: [{query: GET_PLAYER, variables: {id: props.match.params.playerId}}]
        })

        alert(`${name} has been updated`)

    }

    return (
        <form onSubmit={editPlayer}>
            <label>Edit Player - {sessionStorage.getItem('playerName')}</label> <br />
            Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> <br />
            Age: <input type="text" value={age} onChange={(e) => setAge(e.target.value)} /> <br />
            avg points: <input type="text" value={avgPoints} onChange={(e) => setAvgPoints(e.target.value)} /> <br />
            <input type="submit" value="Edit" />
        </form>
    )
}

export default EditPlayer
