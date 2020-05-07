import React from "react";
import Card from "./Card";
import CardDisplayer from "./CardDisplayer";


class GameRunner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentCard: "", isYourTurn: false}
    }

    render() {
        const main_block = []
        main_block.push(<Card hidden={false} value={this.state.currentCard.value}
                              color={this.state.currentCard.color}/>)
        main_block.push(<CardDisplayer cards={this.props.cards}/>)
        return (<div>The game is running </div>)
    }
}

export default GameRunner;