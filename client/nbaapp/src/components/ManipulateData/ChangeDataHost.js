import React from 'react'
import {Switch, Route} from 'react-router-dom'

//css
import '../../css/ChangeDataHost.css'

//components
import DefaultPage from './DefaultPage'
import AddTeam from './AddTeam'
import EditTeam from './EditTeam'
import AddPlayer from './AddPlayer'
import EditPlayer from './EditPlayer'
import Trade from './Trade'

function ChangeDataHost() {
    return (
        <div>
            <div className="form-container">
                <Switch>
                    <Route path="/team/:teamId/editTeam" component={EditTeam}></Route>

                    <Route path="/addTeam" component={AddTeam}></Route>

                    <Route path="/team/:teamId/addPlayer" component={AddPlayer}></Route>

                    <Route path="/player/:playerId/editPlayer" component={EditPlayer}></Route>

                    <Route path="/player/:playerId/tradePlayer" component={Trade}></Route>
                    
                    <Route path="/" component={DefaultPage}></Route>
                </Switch>
            </div>
        </div>
    )
}

export default ChangeDataHost
