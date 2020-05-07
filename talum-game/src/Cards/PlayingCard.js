import React, {Component} from 'react';
import './PlayingCard.css';
import PlayingCardsList from './PlayingCardsList';


class PlayingCard extends Component {
    constructor(props) {
        super(props);
    }

    onClick() {
        this.props.onClick(this.props.card);
        console.log('position: ',)
    }

    render() {

        return (
            <img ref={this.props.card}
                 style={this.props.style}
                 height={this.props.height}
                 className='Playing-card'
                 src={this.props.flipped === true ? PlayingCardsList.flipped : PlayingCardsList[this.props.card]}
                 alt={this.props.flipped === true ? 'Hidden Card' : PlayingCardsList[this.props.card]}
                 onClick={this.onClick.bind(this)}
            />
        );
    }
}

export default PlayingCard;