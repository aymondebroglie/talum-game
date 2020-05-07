import React from "react";

class Card extends React.Component {
    render() {
        if (this.props.hidden) {
            return (<div> Back of card </div>)
        } else {
            return (
                <div>
                    {this.props.value} de {this.props.color}
                </div>
            );
        }
    }
}

export default Card;