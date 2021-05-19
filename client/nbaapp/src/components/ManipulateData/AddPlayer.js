import React, {useState} from 'react'
import {useMutation} from '@apollo/client'
import {ADD_PLAYER, GET_TEAM} from '../../Queries/queries'

function AddPlayer(props) {

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [avgPoints, setAvgPoints] = useState('')
    const [initAddPlayer, {data}] = useMutation(ADD_PLAYER)

    const addPlayer = (e) => {
        e.preventDefault()
        if(name != '' && age != '' && avgPoints != ''){

            let playerObj = {
                name: name,
                age: parseInt(age),
                avgPoints: parseFloat(avgPoints),
                teamId: props.match.params.teamId
            }

            initAddPlayer({
                variables: playerObj,
                refetchQueries: [{query: GET_TEAM, variables: {id: props.match.params.teamId}}]
            })
            alert(`${name} has been added to the ${sessionStorage.getItem('teamName')}`)
        } else {
            console.log("fields are empty");
        }
    }

    return (
        <form onSubmit={addPlayer}>
            <label>Add Player to - {sessionStorage.getItem('teamName')}</label> <br />
            Name: <input type="text" onChange={(e) => setName(e.target.value)} /> <br />
            Age: <input type="text" onChange={(e) => setAge(e.target.value)} /> <br />
            avg points: <input type="text" onChange={(e) => setAvgPoints(e.target.value)} /> <br />
            <input type="submit" value="Add" />
        </form>
    )
}

export default AddPlayer
