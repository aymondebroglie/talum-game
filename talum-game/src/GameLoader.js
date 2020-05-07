import React from 'react';
import './App.css';
import Game from "./Game";
import openSocket from "socket.io-client";


const socket = openSocket("http://localhost:5000")

class GameLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {gameId: ""}
        fetch(`/create_game?playerId=${socket.id}`, {
                method: "Post"
            }
        ).then(r => r.json()).then(r => this.setState({gameId: r.gameId}))
    }


    render() {
        if (this.state.gameId === "") {
            return (<div>"Game is Loading" </div>)
        } else {
            return (
                <Game gameId={this.state.gameId} socket={socket}/>)
        }
    }
}

export default GameLoader;
