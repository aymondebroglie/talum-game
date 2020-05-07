import React from "react";
import Card from "./Card";

class CardDisplayer extends React.Component {


    render() {
        if (this.props.mode === "VIEW_CARDS") {
            return (
                <div>
                    <Card hidden={false} color={this.props.cards[0].color}
                          value={this.props.cards[0].value}/>
                    <Card hidden={false} color={this.props.cards[0].color}
                          value={this.props.cards[1].value}/>
                    <Card hidden={true} color={this.props.cards[0].color}
                          value={this.props.cards[2].value}/>
                    <Card hidden={true} color={this.props.cards[0].color}
                          value={this.props.cards[3].value}/>
                    <button onClick={() => this.done_viewing_card()}> Done viewing cards</button>
                </div>)
        } else {
            const elements = [];
            for (let i = 0; i < this.props.cards.length; i++) {
                elements.push(<Card hiden={true} color={this.props.cards[i].color} value={this.props.cards[i].value}/>);
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