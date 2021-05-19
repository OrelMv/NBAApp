import React, {useEffect, useState} from 'react'
import {useMutation} from '@apollo/client'
import {EDIT_TEAM, GET_TEAM} from '../../Queries/queries'

function EditTeam(props) {

    const [name, setName] = useState('')
    const [record, setRecord] = useState('')
    const [titles, setTitles] = useState('')

    const [initEditTeam, {data}] = useMutation(EDIT_TEAM)

    useEffect(() => {

        setName(sessionStorage.getItem('teamName'))
        setRecord(sessionStorage.getItem('teamRecord'))
        setTitles(sessionStorage.getItem('teamTitles'))

    }, [])

    const editTeam = (e) => {
        e.preventDefault()
        let teamObj = {
            id: props.match.params.teamId,
            name: name,
            record: record,
            titles: parseInt(titles)
        }
        initEditTeam({
            variables: teamObj,
            refetchQueries: [{query: GET_TEAM, variables: {id: props.match.params.teamId}}]
        })

        alert(`${name} has been updated`)
    }

    return (
        <form onSubmit={editTeam}>
            <label>Edit Team - {sessionStorage.getItem('teamName')}</label> <br />
            Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> <br />
            Record: <input type="text" value={record} onChange={(e) => setRecord(e.target.value)}/> <br />
            Titles: <input type="number" value={titles} onChange={(e) => setTitles(e.target.value)}/> <br />

            <input type="submit" value="Edit" />
        </form>
    )
}

export default EditTeam
