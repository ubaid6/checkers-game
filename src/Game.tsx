import React from 'react';
import './Game.css';



class Square extends React.Component<any> {

  render() {
    return (
      <button className={this.props.className}></button>
    )
  }
}

class Board extends React.Component<{}, {isWhite:boolean}> {

  // constructor(props:any) {
  //   super(props);
  //   this.state = {
  //     isWhite: true,
  //   };
  // }

  renderSquare(color:string) {
    return <Square className={color}/>;
  }

  makeBoard() {
    var isWhite:boolean = true;
    var boardRows:any[] = new Array(8);
    for (let i=0; i<8; i++) {
      var row:any[] = new Array(8);
      for (let j=0; j<8; j++) {
        if (isWhite)
          row.push(this.renderSquare("white-square"));
        else
          row.push(this.renderSquare("black-square"));
        isWhite = !isWhite;
      }
      isWhite = !isWhite;
      boardRows.push(
        <div>
          {row}
        </div>
      )
    }

    return boardRows;

  }

  render() {
    return (
      <div>
        {this.makeBoard()};
      </div>
    );
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
