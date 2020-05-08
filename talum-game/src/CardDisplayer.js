import React from "react";
import PlayingCard from "./Cards/PlayingCard";
import './CardDisplayer.css'

class CardDisplayer extends React.Component {


    render() {
        const cardElements = [];
        for (let i = 0; i < this.props.cards.length; i++) {
            let flipped = true;
            if ((this.props.mode === "VIEW_CARDS") && (i === 2 || i === 0
            )) {
                flipped = false;
            }

            let selected = false;
            if (this.props.selected === i)
                selected = true;

            cardElements.push(<div
                style={{'gridColumn': i % 2 + 1, 'gridRow': Math.floor(i / 2) + 1}}>
                <PlayingCard onClick={() => this.onClickCard(i)} selected={selected} flipped={flipped}
                             card={this.props.cards[i]}/></div>);
        }

        const displayer = []
        displayer.push(
            <div className="Card-Displayer">
                {cardElements}
            </div>)

        if (this.props.mode === "VIEW_CARDS")
            displayer.push(
                <button className={"viewCardButton"} onClick={() => this.done_viewing_card()}> Done viewing
                    cards
                </button>)
        return (
            <div>
                {displayer}
            </div>
        )
    }

    done_viewing_card() {
        fetch(`/done_viewing_card?playerId=${this.props.socket.id}&gameId=${this.props.gameId}`,
            {method: 'POST'})
    }

    onClickCard(i) {
        this.props.onClick(i)
    }
}

export default CardDisplayer;