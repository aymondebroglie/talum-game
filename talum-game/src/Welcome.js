import React from "react";
import GameLoader from "./GameLoader";

const GAME_STATE = {GAME_STARTED: 1, GAME_NO_STARTED: 0, JOINING_GAME: 3};

class Welcome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {game_state: GAME_STATE.GAME_NO_STARTED}
        this.start_new_game = this.start_new_game.bind(this);
    }

    start_new_game() {
        // get GameLoader id from python and start a new GameLoader
        this.setState({game_state: GAME_STATE.GAME_STARTED})
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
                        <button onClick={() => this.join_game()}>Join a game</button>
                    </div>)
            case GAME_STATE.GAME_STARTED:
                return (
                    <div>
                        <div className={"GameLoader"}><GameLoader/></div>
                    </div>
                )
        }
    }

    join_game() {
        this.setState({game_state: GAME_STATE.JOINING_GAME})
    }
}

export default Welcome;