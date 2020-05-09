import React from "react";
import PlayingCard from "./Cards/PlayingCard";
import './CardDisplayer.css'

class CardDisplayer extends React.Component {


    render() {
        const cardElements = [];
        for (let i = 0; i < this.props.cards.length; i++) {
            let flipped = this.determineIfFlipped(i);
            let selected = false;
            if (this.props.selected === i)
                selected = true;

            cardElements.push(<div
                style={{
                    'gridRow': i % 2 + 1,
                    'gridColumn': Math.floor(i / 2) + 1
                }}>
                <PlayingCard onClick={() => this.onClickCard(i)}
                             selected={selected} flipped={flipped}
                             card={this.props.cards[i]}/></div>);
        }

        const displayer = []
        displayer.push(
            <div className="Card-Displayer">
                {cardElements}
            </div>)

        if (this.props.mode === "VIEW_CARDS")
            displayer.push(
                <button className={"viewCardButton"}
                        onClick={() => this.doneViewingCard()}> Done viewing
                    cards
                </button>)
        return (
            <div>
                {displayer}
            </div>
        )
    }

    determineIfFlipped(i) {
        let flipped = true;
        if ((this.props.mode === "VIEW_CARDS") && (i === 3 || i === 1
        )) {
            flipped = false;
        }
        if (this.props.mode === "FINISHED")
            flipped = false
        return flipped;
    }

    doneViewingCard() {
        fetch(`/done_viewing_card?playerId=${this.props.socket.id}&gameId=${this.props.gameId}`,
            {method: 'POST'})
    }

    onClickCard(i) {
        this.props.onClick(i)
    }
}

export default CardDisplayer;