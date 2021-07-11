import React from 'react';

const cardValue = [{ card: "2", value: 0, points: 0 }, { card: "3", value: 1, points: 0 }, { card: "4", value: 2, points: 0 }, { card: "5", value: 3, points: 0 },
{ card: "6", value: 4, points: 0 }, { card: "Q", value: 6, points: 2 }, { card: "J", value: 5, points: 3 }, { card: "K", value: 7, points: 4 },
{ card: "7", value: 8, points: 10 }, { card: "A", value: 9, points: 11 }];

const cardTypes = ["D", "C", "S", "H"];

class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            players: [{ cards: [], selectedCard: "" }, { cards: [], selectedCard: "" }, { cards: [], selectedCard: "" }, { cards: [], selectedCard: "" }],
            allCards: [],
            actualPlayerToPlay: 3,
            mainCard: {},
            suit: "",
            myTeam: 0,
            oppositeTeam: 0,
            roundEnd: false
        };
    }


    componentDidMount() {
        this.setState({ allCards: this.setAllCards() });
    }

    componentDidUpdate() {
        if (this.state.actualPlayerToPlay === 1) {
            this.playCard(true);
            this.setState({ actualPlayerToPlay: 0 }, console.log("played 1"));
        }
        if (this.state.actualPlayerToPlay === 0) {
            this.playCard(true);
            this.setState({ actualPlayerToPlay: 2 }, console.log("played 0"));
        }
        if (this.state.actualPlayerToPlay === 2) {
            this.playCard(true);
            this.setState({ actualPlayerToPlay: 3 }, console.log("played 2"));
        }
        //console.log(this.state, "avaliação final");
        if (this.state.players[0].selectedCard !== "" && this.state.players[1].selectedCard !== "" && this.state.players[2].selectedCard !== "" && this.state.players[3].selectedCard !== "" && !this.state.roundEnd) {
            this.setState({ roundEnd: true });
            setTimeout(() => {
                console.log(this.state, "final da ronda");
                this.getWinner();
                this.restartRound();

            }, 3000);
        }
        if (this.state.players[0].selectedCard !== "" && this.state.players[0].cards.length === 0 && this.state.players[1].cards.length === 0
            && this.state.players[2].cards.length === 0 && this.state.players[3].cards.length === 0) {
            this.restartGame();
        }
    }

    restartGame = () => {
        this.restartRound();
        this.setState({myTeam: 0, oppositeTeam: 0});
        this.giveCards();
    }

    restartRound = () => {
        let players = [...this.state.players];
        players.forEach(player => {
            player.selectedCard = "";
        });

        //está a dar erro por causa do update na ultima condição
        this.setState({ mainCard: {}, suit: "", players: players, roundEnd: false });
    }

    setAllCards = () => {
        let allCards = [];

        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 11; j++) {
                if (j === 1) {
                    allCards.push({ value: "A", type: cardTypes[i] })
                }
                else if (j === 8) {
                    allCards.push({ value: "Q", type: cardTypes[i] })
                }
                else if (j === 9) {
                    allCards.push({ value: "J", type: cardTypes[i] })
                }
                else if (j === 10) {
                    allCards.push({ value: "K", type: cardTypes[i] })
                }
                else {
                    allCards.push({ value: j.toString(), type: cardTypes[i] });
                }
            }
        }
        return allCards;
    }

    giveCards = () => {
        let players = [];
        let tempAllCardsArray = [...this.state.allCards];
        let suit = cardTypes[Math.floor(Math.random() * (3 - 0)) + 0];
        for (let i = 0; i < 4; i++) {
            let playerCardsTemp = [];
            for (let j = 0; j < 10; j++) {
                let randomNum = Math.floor(Math.random() * tempAllCardsArray.length);
                playerCardsTemp.push(tempAllCardsArray.splice(randomNum, 1)[0]);
            }
            players.push({ pName: "player" + (i + 1), cards: playerCardsTemp, selectedCard: "" });
        }
        this.setState({ players: players, suit: suit }, () => console.log(this.state));
    }

    getCardValue = (card) => {
        console.log(card);
        for (let i = 0; i < cardValue.length; i++) {
            if (cardValue[i].card === card) {
                return cardValue[i].value;
            }
        }
    }

    getCardPoints = (card) => {
        console.log(card);
        for (let i = 0; i < cardValue.length; i++) {
            if (cardValue[i].card === card) {
                return cardValue[i].points;
            }
        }
    }

    playCard = (auto, e) => {

        if (auto === false) {
            let players = [...this.state.players];
            players[3].selectedCard = e.target.id;
            this.removeCardFromDeck(this.state.players[this.state.actualPlayerToPlay], e.target.id);
            this.setState({ players: players, mainCard: e.target.id, actualPlayerToPlay: 1 });
        }
        else {
            //selectCard
            let cardId = this.selectCard();
            if (this.state.p2SelectedCard === "" && this.state.p3SelectedCard === "" && this.state.p4SelectedCard === "" && this.state.p1SelectedCard === "") {
                this.setState({ mainCard: cardId });
            }
            if (this.state.actualPlayerToPlay === 0) {
                let players = [...this.state.players];
                players[0].selectedCard = cardId;
                this.setState({ players: players });

            }
            if (this.state.actualPlayerToPlay === 1) {
                let players = [...this.state.players];
                players[1].selectedCard = cardId;
                this.setState({ players: players });
            }
            if (this.state.actualPlayerToPlay === 2) {
                let players = [...this.state.players];
                players[2].selectedCard = cardId;
                this.setState({ players: players });
            }
            this.removeCardFromDeck(this.state.players[this.state.actualPlayerToPlay], cardId);
        }
    }

    selectHighestCard = (cards) => {
        console.log(cards);
        let highCard = { type: "", value: "" };
        for (let i = 0; i < cards.length; i++) {

            if (highCard.value === "") {
                highCard = cards[0];
            }
            else {
                if (this.getCardValue(cards[i].value) > this.getCardValue(highCard.value)) {
                    highCard = cards[i];
                }
            }
        }
        console.log({ highCard: highCard });
        return highCard;
    }

    selectCard = () => {
        console.log(this.state.players[this.state.actualPlayerToPlay].cards);
        let playerCards = this.state.players[this.state.actualPlayerToPlay].cards;
        let cardsFromSuit = [];
        for (let i = 0; i < playerCards.length; i++) {
            if (playerCards[i].type === this.state.mainCard[1]) {
                cardsFromSuit.push(playerCards[i]);
            }
        }

        if (cardsFromSuit.length === 0) {
            let cardIndex = Math.floor(Math.random() * playerCards.length);
            return this.state.players[this.state.actualPlayerToPlay].cards[cardIndex].value + this.state.players[this.state.actualPlayerToPlay].cards[cardIndex].type;
        }
        else {
            if (this.state.actualPlayerToPlay === 0) {
                console.log(this.state.players[1].selectedCard[0]);
                for (let j = 0; j < cardsFromSuit.length; j++) {
                    if (this.getCardValue(cardsFromSuit[j].value) > this.getCardValue(this.state.players[1].selectedCard[0])) {
                        let highCard = this.selectHighestCard(cardsFromSuit);
                        return highCard.value + highCard.type;
                    }
                    else {
                        //assistir do mesmo naipe mas mais baixa
                    }
                }
            }
            return cardsFromSuit[0].value + cardsFromSuit[0].type;
        }

    }

    removeCardFromDeck = (playerCards, cardToRemove) => {
        for (let i = 0; i < playerCards.cards.length; i++) {
            if (playerCards.cards[i].value === cardToRemove[0] && playerCards.cards[i].type === cardToRemove[1]) {
                playerCards.cards.splice(i, 1);
            }
        }
    }

    getWinner = () => {
        let cards = [];
        this.state.players.forEach(player => {
            console.log(player);
            if (player.selectedCard[1] === this.state.mainCard[1]) {
                cards.push({ value: player.selectedCard[0], type: player.selectedCard[1] });

            }
            //    if(){
            //        
            //    }
        });
        //console.log(cards);
        let winnerCard = this.selectHighestCard(cards);
        let winningPoints = 0;
        let winnerTeam = "";
        this.state.players.forEach(player => {

            if (player.selectedCard[0] === winnerCard.value && player.selectedCard[1] === winnerCard.type) {
                if (player.pName === "player2" || player.pName === "player3") {
                    winnerTeam = "oppositeTeam";
                }
                else {
                    winnerTeam = "myTeam";
                }
                console.log({ "Vencedor": player });

            }
            winningPoints += this.getCardPoints(player.selectedCard[0]);
        });
        this.setState({ [winnerTeam]: this.state[winnerTeam] + winningPoints });
        console.log({ GetWinner: this.selectHighestCard(cards) });

    }



    render() {

        let players = [];

        this.state.players.forEach((player, index) => {
            let tempPlayer = { cards: [] };
            if (index !== 3) {
                for (let i = 0; i < player.cards.length; i++) {
                    tempPlayer.cards.push(<img id={player.cards[i].value + player.cards[i].type} className="card" src={require('../images/card.jpg')} alt="Logo" />);
                }
            }
            else {

                for (let i = 0; i < player.cards.length; i++) {
                    let cardId = player.cards[i].value + player.cards[i].type;
                    tempPlayer.cards.push(<img id={cardId} onClick={(e) => this.playCard(false, e)} className="card" src={require('../images/' + player.cards[i].value + player.cards[i].type + '.png')} alt="Logo" />);
                }
            }
            players.push(tempPlayer);
        });


        return (
            <div id="table">
                <div>
                    <span className="team-points">Your Team: {this.state.myTeam}</span>
                    <span className="opposite-points">Opposite Team: {this.state.oppositeTeam}</span>
                </div>
                <div id="player1">{players[0] ? players[0].cards : ""}<div>player 1</div></div>
                <div id="player2">{players[1] ? players[1].cards : ""}<div>player 2</div></div>
                <div id="player3">{players[2] ? players[2].cards : ""}<div>player 3</div></div>
                <div id="player4">{players[3] ? players[3].cards : ""}<div>player 4</div></div>

                <div id="play1">{this.state.players[0].selectedCard !== "" ? <img key="play1" className="card" src={require('../images/' + this.state.players[0].selectedCard + '.png')} alt="Logo" /> : ""}</div>
                <div id="play2">{this.state.players[1].selectedCard !== "" ? <img key="play2" className="card" src={require('../images/' + this.state.players[1].selectedCard + '.png')} alt="Logo" /> : ""}</div>
                <div id="play3">{this.state.players[2].selectedCard !== "" ? <img key="play3" className="card" src={require('../images/' + this.state.players[2].selectedCard + '.png')} alt="Logo" /> : ""}</div>
                <div id="play4">{this.state.players[3].selectedCard !== "" ? <img key="play4" className="card" src={require('../images/' + this.state.players[3].selectedCard + '.png')} alt="Logo" /> : ""}</div>
                <button onClick={() => this.giveCards()}>iniciar jogo</button>
            </div>
        )
    }
}

export default Table;
