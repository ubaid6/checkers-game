import React from 'react';
import './Game.css';
import Draggable from 'react-draggable';



class Square extends React.Component<any, any> {

  render() {
    if (this.props.piece === "null")
      return (
        <div className="square white"></div>
      )
    
    if (this.props.piece === "white")
        return (
          <div className="square black">
            <Draggable>
              <div className="piece white"></div>
            </Draggable>
          </div>
        )
    
    if (this.props.piece === "red") {
      return (
        <div className="square black">
          <Draggable>
            <div className="piece red"></div>
          </Draggable>
        </div>
      )
    }

    return (
      <div className="square black"></div>
    )
  }
}

class Board extends React.Component<any, any> {




  renderSquare(piece:string) {
    return <Square piece={piece}/>;
  }

  makeBoard(boardState:Array<Array<string>>) {
    var boardRows:any[] = new Array(8);
    for (let i=0; i<8; i++) {
      var row:any[] = new Array(8);
      for (let j=0; j<8; j++) {
        if (boardState[i][j] === "null")
          row.push(this.renderSquare("null"));
        else
          row.push(this.renderSquare("red"));
      }
      boardRows.push(
        <div>
          {row}
        </div>
      )
    }

    return boardRows;

  }

  render() {
    // console.log(this.props.boardState);
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
      boardState: [],
      isBoardInitialized: false
    }
  }

  initializeBoardState() {
    var board:Array<Array<string>> = Array(8);
    var isNull:boolean = true;

    for (let i=0; i<8; i++) {
      board[i] = new Array(8);
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

    this.setState({boardState:board});
    this.setState({isBoardInitialized:true});
  }

  render() {
    if (!this.state.isBoardInitialized) {
      this.initializeBoardState();
      console.log(this.state.isBoardInitialized);
      console.log(this.state.boardState);
    }

    else
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
