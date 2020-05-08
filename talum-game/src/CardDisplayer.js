import React from "react";
import PlayingCard from "./Cards/PlayingCard";
import './CardDisplayer.css'

class CardDisplayer extends React.Component {


    render() {
        const cardElements = [];
        for (let i = 0; i < this.props.cards.length; i++) {
            cardElements.push(<div
                style={{'gridColumn': i % 2 + 1, 'gridRow': Math.floor(i / 2) + 1}}>
                < PlayingCard flipped={true} card={this.props.cards[i]}/></div>);
        }

        if (this.props.mode === "VIEW_CARDS") {
            return (
                <div>
                    <div className="Card-Displayer">
                        {cardElements}
                    </div>
                    <button className={"viewCardButton"} onClick={() => this.done_viewing_card()}> Done viewing
                        cards
                    </button>
                </div>
            )
        } else {
            const elements = [];
            for (let i = 0; i < this.props.cards.length; i++) {
                elements.push(<PlayingCard position={i} flipped={true} card={this.props.cards[i]}/>);
            }
            return (<div>{elements}</div>)
        }
    }

    done_viewing_card() {
        fetch(`/done_viewing_card?playerId=${this.props.socket.id}&gameId=${this.props.gameId}`,
            {method: 'POST'})
    }
}

export default CardDisplayer;