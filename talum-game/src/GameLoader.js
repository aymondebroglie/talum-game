import React from 'react';
import './App.css';
import Game from "./Game";

class GameLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {gameId: ""}
        fetch(`/create_game?playerId=${this.props.playerId}`, {
                method: "Post"
            }
        ).then(r => r.json()).then(r => this.setState({gameId: r.gameId}))
    }


    render() {
        if (this.state.gameId === "") {
            return (<div>"Game is Loading" </div>)
        } else {
            return (
                <Game gameId={this.state.gameId} playerId={this.props.playerId}/>)
        }
    }
}

export default GameLoader;
