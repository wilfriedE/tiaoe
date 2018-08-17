import React, { Component } from 'react';
import {GAMESTATE, } from './Game';

class Box extends Component {

  cellContent(){
    let cell =  this.props.cell;
    if(['-','|', '/', '\\'].includes(cell)){
      return this.props.game.getPlayers()[this.props.game.getWinner()].mark;
    } else {
      return cell;
    }
  }

  render() {
    return (
      <div id={this.props.id} className={"box " + this.cellContent() + " box-"+this.props.id + " " + (['-','|', '/', '\\'].includes(this.props.cell) ? 'highlight' : '') } onClick={ this.props.markCell } > </div>
    );
  }
}

class MessageBoard extends Component {
    
    /**
     * Format the message for player's turn
     */
    playerTurn(){
      if(this.props.game.getGameState() !== GAMESTATE["ENDED"] ){
        return <h2>{"Player " + this.props.game.currentPlayer() + "'s turn!"}</h2>;
      }
      return '';
    }

    /**
     * Formats the message to show the users.
     */
    gameMessage(){
      let game = this.props.game;
      let message = '';
      if(game.getGameState() === GAMESTATE["INITIALIZED"] || game.getGameState() === GAMESTATE["STARTED"]){
        message = <p>Select a box to start.</p>;
      } else if(game.getGameState() === GAMESTATE["ENDED"] && game.getWinner() === undefined) {
        message = <p>That was a tie! Click below to start a new game.</p>;
      } else if(game.getGameState() === GAMESTATE["ENDED"] ){
        message = <p>Game is over. <h2> Player {game.getWinner()} is the winner! </h2></p>;
      }
      return message;
    }

    render() {
      return (
        <div>
          {this.playerTurn()}
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
          <h4>Wins : {this.props.players[this.props.player].wins } </h4>
          <h4>Losses : {this.props.players[this.props.player].losts }  </h4>
        </div>
      );
    }
}

export { Box, MessageBoard, PlayerStats };