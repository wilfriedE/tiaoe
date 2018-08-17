import React, { Component } from 'react';
import { Game, PLAYER1, PLAYER2 } from './Game';
import './App.css';
import { Box, MessageBoard, PlayerStats } from './GameComponents';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {game: new Game()};
  }

  /**
   * 
   * @param {Number} id the box to mark in the game 
   */
  markCell(id){
    this.state.game.mark(id);
    this.setState({game:  this.state.game});
  }

  startNewGame(){
    this.state.game.startNewGame();
    this.setState({game:  this.state.game});
  }

  render() {
    const boxes = this.state.game.getGrid().map((cell, index) => <Box markCell={this.markCell.bind(this, index)} key={index} id={index} cell={cell} game={this.state.game} > </Box>);

    return (
      <div>
        <div className="game-grid">
          { boxes }
        </div>

        <div className="stats-grid">
            <PlayerStats key={PLAYER1} player={PLAYER1} players={this.state.game.players} ></PlayerStats>
            <MessageBoard game={this.state.game} startNewGame={this.startNewGame.bind(this)} ></MessageBoard>
            <PlayerStats key={PLAYER2} player={PLAYER2} players={this.state.game.players} ></PlayerStats>
        </div>
      </div>
    );
  }
}

export default App;
