import React from 'react';
import './Game.css';
import Draggable from 'react-draggable';



class Square extends React.Component<any, any> {
  constructor (props:any) {
    super(props);
    this.state = {
      piece: "empty",
      color: "null"
    };
  }

  render() {
    return (
      // <button className={this.props.className}></button>
      <div className={this.props.className}>
      </div>

    )
  }
}

class Board extends React.Component<any, any> {




  renderSquare(color:string, piece:string) {
    return <Square className={color}/>;
  }

  makeBoard(boardState:array) {
    var boardRows:any[] = new Array(8);
    for (let i=0; i<8; i++) {
      var row:any[] = new Array(8);
      for (let j=0; j<8; j++) {
        if (boardState[i][j])
          row.push(this.renderSquare("square white"));
        else
          row.push(this.renderSquare("square black"));
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
        <div className="board">
          {this.makeBoard(this.props.boardState)}
        </div>
    );
  }
}



class Game extends React.Component<any, any> {

  constructor(props:any) {
    super(props);
    this.state = {
      boardState: null
    }
  }

  initializeBoardState() {
    var board:Array<Array<string>> = Array(8);
    var isNull:boolean = true;

    for (let i=0; i<8; i++) {
      board.push(Array(8));
    }

    for (let i=0; i<3; i++) {
      for (let j=0; j<8; j++) {
        if (isNull) board[i][j] = "null";
        else board[i][j] = "red";
        isNull = !isNull;
      }
      isNull = !isNull;
    }

    for (let i=3; i<5; i++) {
      for (let j=0; j<8; j++) {
        if (isNull) board[i][j] = "null";
        else board[i][j] = "empty";
        isNull = !isNull;
      }
      isNull = !isNull;
    }

    for (let i=5; i<8; i++) {
      for (let j=0; j<8; j++) {
        if (isNull) board[i][j] = "null";
        else board[i][j] = "white";
        isNull = !isNull;
      }
      isNull = !isNull;
    } 

    this.setState({boardState:[...board]})
  }

  render() {
    return (
      <div className="game">
        <Board
          boardState = {this.state.boardState}
        />
      </div>
    );
  }
}

export default Game;
