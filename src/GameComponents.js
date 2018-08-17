import React, { Component } from 'react';

class Box extends Component {
  render() {
    return (
      <div id={this.props.id} className={"box " + this.props.cell} onClick={ this.props.markCell } > </div>
    );
  }
}

class MessageBoard extends Component {
    render() {
      return (
        ""
      );
    }
}

class PlayerStats extends Component {
    render() {
      return (
        ""
      );
    }
}

export { Box, MessageBoard, PlayerStats };