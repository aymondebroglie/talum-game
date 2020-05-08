import React from "react";


class GameRunner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentCard: "", isYourTurn: false}
    }

    render() {
        return (
            <div>
                Hello
            </div>
        )
    }
}

export default GameRunner;