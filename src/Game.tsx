import React from 'react';
import './App.css';



class Square extends React.Component<any> {

  render() {
    return (
      <button className={this.props.className}>{this.props.value}</button>
    )
  }
}

class Board extends React.Component {
  render() {
    return (
      <div>
        <Square className="black-square" value="Square" />
        <Square value="Square" />
        <Square value="Square" />
        <Square value="Square" />
        <Square value="Square" />
        <Square value="Square" />
      </div>
    )
  }
}



class Game extends React.Component {

  render() {
    return (
      <div className="App">
        <Board></Board>
      </div>
    );
  }
}

export default Game;
