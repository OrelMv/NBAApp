import React, {useState} from 'react'
import {useMutation} from '@apollo/client'
import {ADD_TEAM, GET_TEAMS} from '../../Queries/queries'

//css
import '../../css/AddTeam.css'

function AddTeam() {

    const [addNewTeam, {data}] = useMutation(ADD_TEAM)
    const [name, setName] = useState('')
    const [record, setRecord] = useState('')
    const [titles, setTitles] = useState('')

    const addTeam = (e) => {
        e.preventDefault()

        if(name != '' && record != '' && titles != ''){
            let obj = {
                name: name,
                record: record,
                titles: parseInt(titles)
            }
            addNewTeam({
                variables: obj,
                refetchQueries: [{query: GET_TEAMS }]
            })
            setName('')
            setRecord('')
            setTitles('')
            
        } else {
            alert("please fill the fields")
        }
        
    } 

    return (

        <form onSubmit={addTeam}>
            <h3>Add A Team</h3>
            Team Name: <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name..." /> <br /> <br />
            Team Record: <input type="text" value={record} onChange={e => setRecord(e.target.value)} placeholder="Wins-Losses (10-3)" /> <br /> <br />
            Amount Of Titles: <input type="number" value={titles} onChange={e => setTitles(e.target.value)} placeholder="Enter A Number..." /> <br />

            <input type="submit" value="ADD" className="add-btn" />
        </form>

    )
}

export default AddTeam
