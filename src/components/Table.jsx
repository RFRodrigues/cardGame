import React from 'react';

class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            players: [{ cards: [] }],
            allCards: [],
            p1SelectedCard: "",
            p2SelectedCard: "",
            p3SelectedCard: "",
            p4SelectedCard: ""
        };
    }


    componentDidMount() {
        this.setState({allCards: this.setAllCards()});
    }

    setAllCards = () => {
        let allCards = [];
        let cardTypes = ["D", "C", "S", "H"];
        for(let i=0; i<4; i++){
            for(let j=1; j<11;j++){
                if(j === 1) {
                    allCards.push({ value: "A", type: cardTypes[i] })
                }
                else if(j === 8) {
                    allCards.push({ value: "Q", type: cardTypes[i] })
                }
                else if(j === 9) {
                    allCards.push({ value: "J", type: cardTypes[i] })
                }
                else if(j === 10) {
                    allCards.push({ value: "K", type: cardTypes[i] })
                }
                else{
                    allCards.push({ value: j.toString(), type: cardTypes[i] });
                }
            }
        }
        return allCards;
    }

    giveCards = () => {
        let players = [];
        let tempAllCardsArray = [...this.state.allCards];
        for(let i=0;i<4;i++){
            let playerCardsTemp = [];
            for(let j = 0; j<10; j++){
                let randomNum = Math.floor(Math.random() * tempAllCardsArray.length);
                playerCardsTemp.push(tempAllCardsArray.splice(randomNum, 1)[0]);
            }
            players.push({cards: playerCardsTemp});
        }
        this.setState({players: players}, ()=> console.log(this.state));
    }

    playCard = (e) => {
        this.setState({p4SelectedCard: e.target.id});
        e.target.style.display = "none";
    }



    render() {

        let players = [];
        this.state.players.forEach((player,index) => {
            let tempPlayer = { cards: [] };
            if(index !== 3){
                for (let i = 0; i < player.cards.length; i++) {
                    tempPlayer.cards.push(<img id={player.cards[i].value+player.cards[i].type} className="card" src={require('../images/card.jpg')} alt="Logo" />);
                }
            }
            else{

                for (let i = 0; i < player.cards.length; i++) {
                    let cardId = player.cards[i].value+player.cards[i].type;
                    tempPlayer.cards.push(<img id={cardId} onClick={(e)=> this.playCard(e)} className="card" src={require('../images/'+player.cards[i].value+player.cards[i].type+'.png')} alt="Logo" />);
                }
            }
            players.push(tempPlayer);
        });


        return (
            <div id="table">
                <div id="player1">{players[0] ? players[0].cards : ""}</div>
                <div id="player2">{players[1] ? players[1].cards : ""}</div>
                <div id="player3">{players[2] ? players[2].cards : ""}</div>
                <div id="player4">{players[3] ? players[3].cards : ""}</div>

                <div id="play1">{this.state.p1SelectedCard ? <img className="card" src={require('../images/'+this.state.p1SelectedCard+'.png')} alt="Logo" /> : ""}</div>
                <div id="play2">{this.state.p2SelectedCard ? <img className="card" src={require('../images/'+this.state.p2SelectedCard+'.png')} alt="Logo" /> : ""}</div>
                <div id="play3">{this.state.p3SelectedCard ? <img className="card" src={require('../images/'+this.state.p3SelectedCard+'.png')} alt="Logo" /> : ""}</div>
                <div id="play4">{this.state.p4SelectedCard ? <img className="card" src={require('../images/'+this.state.p4SelectedCard+'.png')} alt="Logo" /> : ""}</div>
                <button onClick={()=> this.giveCards()}>iniciar jogo</button>
            </div>
        )
    }
}

export default Table;