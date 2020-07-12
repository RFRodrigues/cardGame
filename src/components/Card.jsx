import React from 'react';
import cardImage from '../images/card.jpg';

class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = { players: [{cards: [{value: "5", type: "paus"}, {value: "7", type: "copas"},{value: "A", type: "ouros"}]},{cards: 2}] };
    }

    

    render() {

        let cards = [];
        for(let i=0; i<this.state.players[0].cards.length;i++){
            cards.push(<img className="card" src={cardImage} alt="Logo" onClick="" />);
        }

        return (
            <div id="table">
                
                {cards}

            </div>
        )
    }
}

export default Table;