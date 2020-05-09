import React from "react";
import PlayingCard from "./Cards/PlayingCard";
import CardDisplayer from "./CardDisplayer";
import './GameRunner.css'

const MODE = {
    NOT_YOUR_TURN: "NOT_YOUR_TURN",
    YOUR_TURN: "DRAWING_CARD",
    CARD_DRAWN: "CARD_DRAWNN",
    TALOUM_SAID: "TALOUM_SAID"
}

class GameRunner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCard: "", mode: "NOT_YOUR_TURN",
            cardDrawn: "", selectedFromHand: -1, result: "",
            displayCardMode: ""
        }
    }

    render() {
        const elements = []
        if (this.state.mode === MODE.YOUR_TURN) {
            elements.push(<button onClick={() => this.drawCard()}> Draw a card
                ! </button>)
            if (this.state.currentCard !== "")
                elements.push(<button
                    onClick={() => this.drawCurrentCard()}>Draw
                    current card </button>)
            elements.push(<button onClick={() => this.taloum()}> Taloum
                ! </button>)
        }
        if (this.state.mode === MODE.CARD_DRAWN) {
            elements.push(<div className={'drawnCard'}><PlayingCard
                selected={false}
                onClick={() => this.onClickCardDrawn()}
                flipped={false}
                card={this.state.cardDrawn}/></div>)
            elements.push(<button
                onClick={() => this.passTurn()}> Pass </button>)
        }
        if (this.state.mode === MODE.TALOUM_SAID) {
            elements.push(<div>{this.state.result}</div>)
        }
        elements.push(
            <div className={'currentCard'}>
                <PlayingCard selected={false}
                             onClick={() => this.onClickCurrentCard()}
                             className={'currentCard'}
                             flipped={false}
                             card={this.state.currentCard}/></div>)

        elements.push(<CardDisplayer mode={this.state.displayCardMode}
                                     selected={this.state.selectedFromHand}
                                     onClick={pos => this.onClickInHand(pos)}
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
        this.props.socket.on('updateCurrentCard', currentCard => this.setState({currentCard: currentCard}))
        this.props.socket.on('taloum', result => this.setState({
            result: result,
            mode: MODE.TALOUM_SAID,
            displayCardMode: "FINISHED"
        }))
    }

    handleNewTurn(currentPlayer) {
        if (this.props.socket.id === currentPlayer) {
            this.setState({mode: MODE.YOUR_TURN});
        } else {
            this.setState({mode: MODE.NOT_YOUR_TURN})
        }

    }

    drawCard() {
        fetch(`/draw_card?playerId=${this.props.socket.id}&gameId=${this.props.gameId}`, {method: 'POST'})
    }

    taloum() {
        fetch(`/taloum?playerId=${this.props.socket.id}&gameId=${this.props.gameId}`,
            {method: "POST"})
    }

    handleCardDraw(cardDrawn) {
        this.setState({mode: MODE.CARD_DRAWN, cardDrawn: cardDrawn})
    }

    onClickCardDrawn() {
        if (this.state.selectedFromHand !== -1) {
            fetch(
                `/replace_drawn?playerId=${this.props.socket.id}&gameId=${this.props.gameId}&position=${this.state.selectedFromHand}`
                , {method: 'POST'})
            this.setState({selectedFromHand: -1})
        }
    }

    onClickInHand(pos) {
        if (this.state.selectedFromHand === pos) {
            this.setState({selectedFromHand: -1})
        } else {
            this.setState({selectedFromHand: pos})
        }
    }

    onClickCurrentCard() {
        if (this.state.selectedFromHand !== -1) {
            fetch(
                `/put_on_current_card?playerId=${this.props.socket.id}&gameId=${this.props.gameId}&position=${this.state.selectedFromHand}`
                , {method: 'POST'})
        }
    }

    passTurn() {
        fetch(
            `/pass_turn?playerId=${this.props.socket.id}&gameId=${this.props.gameId}`
            , {method: 'POST'})
    }

    drawCurrentCard() {
        fetch(`/draw_current_card?playerId=${this.props.socket.id}&gameId=${this.props.gameId}`, {method: 'POST'})
    }
}

export default GameRunner;