import React from "react";


class GameRunner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentCard: ""}
    }

    render() {
        return (<div>The game is running </div>)
    }
}

export default GameRunner;