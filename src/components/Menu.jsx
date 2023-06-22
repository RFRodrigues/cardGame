import React from 'react';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "start",
        };
    }

    render() {

        return (
            <div id="menu" className={this.props.status}>
                {console.log(this.props.gameStatus)}
                {this.props.gameStatus === "notStarted" ? <div class="btnStart" onClick={() => this.props.setGameStatus("started")}><span>Start</span></div> :
                    <div class="winner"><span>{this.state.winner}</span><div onClick={() => {this.props.showBlurMenu();this.props.setGameStatus("started")} } class="btnStart">Restart</div></div>}
            </div>
        )
    }
}
export default Menu;