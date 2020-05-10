import React from "react";
import openSocket from "socket.io-client";
import Game from "./Game";

const GAME_STATE = {
    GAME_STARTED: 1,
    GAME_NO_STARTED: 0,
    JOINING_GAME: 3
};

const socket = openSocket("http://localhost:5000")

class Welcome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {game_state: GAME_STATE.GAME_NO_STARTED, gameId: ""}
        this.start_new_game = this.start_new_game.bind(this);
    }

    start_new_game() {
        fetch(`/create_game?playerId=${socket.id}`, {
                method: "Post"
            }
        ).then(r => r.json()).then(r => this.setState({
            gameId: r.gameId,
            game_state: GAME_STATE.GAME_STARTED
        }))
    }

    render() {
        switch (this.state.game_state) {
            case GAME_STATE.GAME_NO_STARTED:
                return (
                    <div>
                        <button onClick={this.start_new_game}> Start a
                            new
                            game
                        </button>
                        <button onClick={() => this.join_game()}>Join a game
                        </button>
                    </div>)
            case GAME_STATE.JOINING_GAME:
                return (<div><p> Pleas enter the gameId </p>
                    <input type={'text'}
                           name="gameId"
                           value={this.state.gameId}
                           onChange={game => this.handleGameIdInput(game)}/>
                    <button onClick={() => this.submitJoinGame()}> Join game
                    </button>
                </div>)
            case GAME_STATE.GAME_STARTED:
                return (
                    <Game socket={socket} gameId={this.state.gameId}/>
                )
        }
    }

    join_game() {
        this.setState({game_state: GAME_STATE.JOINING_GAME})
    }

    handleGameIdInput(game) {
        this.setState({gameId: game.target.value})
    }

    submitJoinGame() {
        fetch(`/join_game?playerId=${socket.id}&gameId=${this.state.gameId} `, {
                method: "Post"
            }
        ).then(r => r.json())
            .then(r => this.setState({
                gameId: r.gameId,
                game_state: GAME_STATE.GAME_STARTED
            }))
    }
}

export default Welcome;