import React, { Component } from 'react';
import {GAMESTATE} from './Game';

class Box extends Component {
  render() {
    return (
      <div id={this.props.id} className={"box " + this.props.cell} onClick={ this.props.markCell } > </div>
    );
  }
}

class MessageBoard extends Component {
    gameMessage(){
      let game = this.props.game;
      let message = '';
      if(game.getGameState() === GAMESTATE["INITIALIZED"] || game.getGameState() === GAMESTATE["STARTED"]){
        message = <p>Select a box to start.</p>;
      } else if(game.getGameState() === GAMESTATE["ENDED"] && game.getWinner() === undefined) {
        message = <p>That was a tie! Click below to Start a new game.</p>;
      } else if(game.getGameState() === GAMESTATE["ENDED"] ){
        message = <p>Game is over. <strong>Player {game.getWinner()} is the winner! </strong></p>;
      }
      return message;
    }

    render() {
      return (
        <div>
          <h4>{"Player " + this.props.game.currentPlayer() + "'s turn!"}</h4>
          {this.gameMessage()}
          <h4 className="btn" onClick={ this.props.startNewGame }>Start New Game</h4>
        </div>
      );
    }
}

class PlayerStats extends Component {
    render() {
      return (
        <div>
          <h4>Player {this.props.player} ( {this.props.players[this.props.player].mark } )</h4>
          <h4>Wins/Losts: {this.props.players[this.props.player].wins } / {this.props.players[this.props.player].losts }  </h4>
        </div>
      );
    }
}

export { Box, MessageBoard, PlayerStats };