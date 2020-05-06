import React from "react";
import GameLoader from "./GameLoader";

const GAME_STATE = {GAME_STARTED: 1, GAME_NO_STARTED: 0};
const playerId = Math.random().toString(36).substring(2, 15)
    + Math.random().toString(36).substring(2, 15);

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
            <button onClick={this.start_new_game}> "Start a
              new
              game"
            </button>)
      case GAME_STATE.GAME_STARTED:
        return (
            <div>
              <div className={"GameLoader"}><GameLoader playerId={playerId}/></div>
            </div>
        )
    }
  }
}

export default Welcome;