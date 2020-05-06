import React from "react";
import openSocket from 'socket.io-client'

const GAME_STATE = {
    GAME_NOT_BEGUN: "GAME_NOT_BEGUN",
    VIEW_CARDS: "VIEW CARDS",
    GAME_RUNNING: "GAME_RUNNING",
    GAME_OVER: "GAME_OVER"
}
const socket = openSocket("http://localhost:5000")

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameState: GAME_STATE.GAME_NOT_BEGUN,
            cards: {}
        }
    }

    componentDidMount() {
        socket.on('stateUpdate', new_state => this.setState({gameState: new_state}))
    }

    render() {
        if (this.state.gameState === GAME_STATE.GAME_NOT_BEGUN) {
            return (<div>
                <div> "Hello you're are about to start game : {this.props.gameId}"</div>
                <button onClick={() => this.start_game()}> Start the game</button>
            </div>)
        } else {
            return <div> "The game state is {this.state.gameState}"</div>
        }
    }

    start_game() {
        fetch(`/start_game?gameId=${this.props.gameId}`, {
            method: "POST"
        })
    }
}

export default Game;
