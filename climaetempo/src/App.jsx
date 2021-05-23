import React from 'react';
import Home from './views/Home';
import {Switch,Route} from 'react-router-dom';


function App(props){
    return(
        <Switch>
            <Route exact path='/' component={Home}/>
        </Switch>
    )
}

export default App;