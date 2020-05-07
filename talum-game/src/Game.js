import React from "react";
import CardDisplayer from "./CardDisplayer";
import GameRunner from "./GameRunner";

const GAME_STATE = {
    GAME_NOT_BEGUN: "GAME_NOT_BEGUN",
    VIEW_CARDS: "VIEW_CARDS",
    GAME_RUNNING: "GAME_RUNNING",
    GAME_OVER: "GAME_OVER"
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameState: GAME_STATE.GAME_NOT_BEGUN,
            cards: [],
        }
    }

    componentDidMount() {
        this.props.socket.on('stateUpdate', newState => this.setState({gameState: newState}))
        this.props.socket.on("cardUpdate", newCards => this.setState({cards: newCards}))
    }

    render() {
        switch (this.state.gameState) {
            case GAME_STATE.GAME_NOT_BEGUN:
                return (<div>
                    <div> "Hello you're are about to start game : {this.props.gameId}"</div>
                    <button onClick={() => this.start_game()}> Start the game</button>
                </div>)
            case GAME_STATE.VIEW_CARDS:
                return (<CardDisplayer mode="VIEW_CARDS" cards={this.state.cards} socket={this.props.socket}
                                       gameId={this.props.gameId}/>)
            case GAME_STATE.GAME_RUNNING:
                return (<GameRunner socket={this.props.socket} gameId={this.props.gameId}
                                    cards={this.state.cards}/>)


        }
        return (<div> The game state is {this.state.gameState}</div>)
    }

    start_game() {
        fetch(`/start_game?gameId=${this.props.gameId}`, {
            method: "POST"
        })
    }
}

export default Game;
