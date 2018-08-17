import React, { Component } from 'react';
import { Game, GAMESTATE } from './Game';
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

  render() {
    const boxes = this.state.game.getGrid().map((cell, index) => <Box markCell={this.markCell.bind(this, index)} key={index} id={index} cell={cell} > </Box>);

    return (
      <div className="game-grid">
        { boxes }
      </div>
    );
  }
}

export default App;
