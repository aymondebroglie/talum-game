import React from "react";
import PlayingCard from "./Cards/PlayingCard";
import './CardDisplayer.css'

class CardDisplayer extends React.Component {


    render() {
        if (this.props.mode === "VIEW_CARDS") {
            return (
                <div>
                    <div className="Card-Displayer">
                        <PlayingCard position={0} flipped={false} card={this.props.cards[0]}/>
                        <PlayingCard position={1} flipped={false} card={this.props.cards[1]}/>
                        <PlayingCard position={2} flipped={true} card={this.props.cards[2]}/>
                        <PlayingCard position={3} flipped={true} card={this.props.cards[3]}/>
                    </div>
                    <button onClick={() => this.done_viewing_card()}> Done viewing cards</button>
                </div>)
        } else {
            const elements = [];
            for (let i = 0; i < this.props.cards.length; i++) {
                elements.push(<PlayingCard flipped={true} card={this.props.cards[i]}/>);
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