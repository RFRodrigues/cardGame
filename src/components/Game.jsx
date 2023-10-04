import React from 'react';
import Menu from './Menu';
import Table from './Table';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "menu",
            gameStatus: "notStarted",
        };
    }

    showBlurMenu = () => {
        this.state.status === "menu" ? this.setState({status: "blurMenu"}) : this.setState({status: "menu"});
    }

    setGameStatus = (value) => {
        this.setState({gameStatus: value});
    }

    render() {
        return (
            <>
                {console.log(this.state.gameStatus)}
                {console.log(this.state.status)}
                <Table showBlurMenu={this.showBlurMenu} setGameStatus={this.setGameStatus} gameStatus={this.state.gameStatus}/>
                {this.state.gameStatus === "notStarted" || (this.state.gameStatus === "paused" && this.state.status === "blurMenu") ? <Menu showBlurMenu={this.showBlurMenu} setGameStatus={this.setGameStatus} gameStatus={this.state.gameStatus} status={this.state.status}/> : ''}
            </>
        )
    }
}
export default Game;