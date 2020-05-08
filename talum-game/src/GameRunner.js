import React from "react";
import PlayingCard from "./Cards/PlayingCard";
import CardDisplayer from "./CardDisplayer";


const MODE = {
    NOT_YOUR_TURN: "NOT_YOUR_TURN",
    YOUR_TURN: "DRAWING_CARD",
    CARD_DRAWN: "CARD_DRAWNN",
}

class GameRunner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentCard: "", mode: "NOT_YOUR_TURN", cardDrawn: "", selectedFromHand: -1}
    }

    render() {
        const elements = []
        if (this.state.mode === MODE.YOUR_TURN) {
            elements.push(<button onClick={() => this.drawCard()}> Draw a card ! </button>)
            elements.push(<button onClick={() => this.taloum()}> Taloum ! </button>)
        }
        if (this.state.mode === MODE.CARD_DRAWN) {
            elements.push(<PlayingCard selected={false} onClick={() => this.onClickCardDrawn()} flipped={false}
                                       card={this.state.cardDrawn}/>)
        }
        elements.push(
            <PlayingCard selected={false} onclick={() => this.onClickCurrentCard()} className='currentCard'
                         flipped={false}
                         card={this.state.currentCard}/>)

        elements.push(<CardDisplayer selected={this.state.selectedFromHand} onClick={pos => this.onClickInHand(pos)}
                                     cards={this.props.cards}/>)
        return (
            <div>
                {elements}
            </div>
        )
    }

    componentDidMount() {
        this.props.socket.on("newTurn", currentPlayer =>
            this.handleNewTurn(currentPlayer))
        this.props.socket.on('cardDrawn', cardDrawn => this.handleCardDraw(cardDrawn))
    }

    handleNewTurn(currentPlayer) {
        if (this.props.socket.id === currentPlayer) {
            this.setState({mode: MODE.YOUR_TURN});
        }
    }

    drawCard() {
        fetch(`/draw_card?playerId=${this.props.socket.id}&gameId=${this.props.gameId}`, {method: 'POST'})
    }

    taloum() {
        return undefined;
    }

    handleCardDraw(cardDrawn) {
        this.setState({mode: MODE.CARD_DRAWN, cardDrawn: cardDrawn})
    }

    onClickCardDrawn() {

    }

    onClickInHand(pos) {
        if (this.state.selectedFromHand === pos) {
            this.setState({selectedFromHand: -1})
        } else {
            this.setState({selectedFromHand: pos})
        }
    }

    onClickCurrentCard() {

    }
}

export default GameRunner;