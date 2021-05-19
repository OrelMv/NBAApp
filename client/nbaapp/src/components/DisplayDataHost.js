import React from 'react'
import {Switch, Route} from 'react-router-dom'

//components
import TeamData from './TeamData'
import PlayerData from './PlayerData'

//css
import '../css/DisplayDataHost.css'

function DisplayDataHost() {
    return (
        <div className="team-player-details">
            <Switch>
                <Route path="/team/:id" component={TeamData}></Route>
                <Route path="/player/:id" component={PlayerData}></Route>
            </Switch>
        </div>
    )
}

export default DisplayDataHost
