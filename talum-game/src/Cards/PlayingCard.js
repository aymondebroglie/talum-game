import React, {Component} from 'react';
import './PlayingCard.css';
import PlayingCardsList from './PlayingCardsList';


class PlayingCard extends Component {
    constructor(props) {
        super(props);
    }

    onClick() {
        if (this.props.card !== "") {
            this.props.onClick();
        }
    }

    render() {
        return (
            <img
                className={`Playing-card ${this.props.selected ? 'selected' : ''}`}
                src={this.props.flipped === true ? PlayingCardsList.flipped : PlayingCardsList[this.props.card]}
                alt={this.props.flipped === true ? 'Hidden Card' : PlayingCardsList[this.props.card]}
                onClick={this.onClick.bind(this)}
            />
        );
    }
}

export default PlayingCard;