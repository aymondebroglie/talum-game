import React from "react";
import CardDisplayer from "./CardDisplayer";


class GameRunner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentCard: "", isYourTurn: false}
    }

    render() {
        const main_block = []
        main_block.push(<CardDisplayer cards={this.props.cards}/>)
        return (<div>The game is running </div>)
    }
}

export default GameRunner;