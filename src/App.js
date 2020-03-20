import React, { Component } from 'react';
import './styling/App.css';
import Game from './Game';

class App extends Component {


   
    render() {

        return (
            <div      
            className="App">
                <h1>Corona Quest</h1>
                <Game />
            </div>
        );
    }
}

export default App;
