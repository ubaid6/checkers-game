import React from 'react';
import './Game.css';



class Square extends React.Component<any, any> {

  render() {

    if (this.props.piece === "null")
      return (
        <div
          className="square white"
          onClick={this.props.onClick}
        >
        </div>
      )

    if (this.props.piece === "white")
      return (
        <div
          className="square green"
          onClick={this.props.onClick}
        >
          <div className="piece white"></div>
        </div>
      )

    if (this.props.piece === "red")
      return (
        <div
          className="square green"
          onClick={this.props.onClick}
        >
          <div className="piece red"></div>
        </div>
      )

    if (this.props.piece === "whiteKing")
      return (
        <div
          className="square green"
          onClick={this.props.onClick}
        >
          <div className="piece white king"></div>
        </div>
      )

    if (this.props.piece === "redKing")
      return (
        <div
          className="square green"
          onClick={this.props.onClick}
        >
          <div className="piece red king"></div>
        </div>
      )

    return (
      <div
        className="square green"
        onClick={this.props.onClick}
      ></div>
    )
  }
}

class Board extends React.Component<any, any> {

  renderSquare(piece: string, index: Array<any>) {
    return <Square piece={piece}
      onClick={() => this.props.onClick(index)} />;
  }

  makeBoard(boardState: Array<Array<string>>) {
    var boardRows: any[] = new Array(8);
    for (let i = 0; i < 8; i++) {
      var row: any[] = new Array(8);
      for (let j = 0; j < 8; j++) {
        row.push(this.renderSquare(boardState[i][j], [i, j]));
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
    return (
      <div className="board">
        {this.makeBoard(this.props.boardState)}
      </div>
    );
  }
}



class Game extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      boardState: [],
      isBoardInitialized: false,
      pieceLoaded: "null",
      pieceLoadedCoords: [],
      redPieces: 12,
      whitePieces: 12,
      whiteTurn: true,
      isJumpPossible: false,
      isJumpPossibleCoords: [],
      isJumpPossiblePiece: ""
    }
  }

  checkGameOver(): boolean {
    if (this.state.redPieces === 0 || this.state.whitePieces === 0)
      return true;
    return false;
  }

  getPiece(i: number, j: number): string {
    return this.state.boardState[i][j];
  }

  hasPiece(i: number, j: number): boolean {
    if (this.state.boardState[i][j] === "empty")
      return false;
    else return true;
  }

  removeJumpedPiece(i: number, j: number): any {
    var tempState = [...this.state.boardState];
    tempState[i][j] = "empty";

    this.setState({ boardState: tempState });
    return;
  }

  isJumpPossible(): Array<Array<number>> {
    var jumpCoords: Array<Array<number>> = [];
    if (this.state.whiteTurn) {
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          if (this.getPiece(i, j) === "white") {
            if (this.getPiece(i - 1, j - 1) === "red" && this.getPiece(i - 2, j - 2) === "empty") {
              jumpCoords.push([i, j]);
            }
            if (this.getPiece(i - 1, j + 1) === "red" && this.getPiece(i - 2, j + 2) === "empty") {
              jumpCoords.push([i, j]);
            }
          }
        }
      }
    }

    else {
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          if (this.getPiece(i, j) === "red") {
            if (this.getPiece(i + 1, j - 1) === "white" && this.getPiece(i + 2, j - 2) === "empty") {
              jumpCoords.push([i, j]);
            }
            if (this.getPiece(i + 1, j + 1) === "white" && this.getPiece(i + 2, j + 2) === "empty") {
              jumpCoords.push([i, j]);
            }
          }
        }
      }
    }

    return jumpCoords;

  }

  isValidMove(i: number, j: number): boolean {
    var [iC, jC] = this.state.pieceLoadedCoords;
    var piece = this.state.pieceLoaded;
    var diffI: number = Math.abs(i - iC);
    var diffJ: number = Math.abs(j - jC);

    switch (piece) {
      case "whiteKing":
      case "redKing":
        if (this.hasPiece(i, j)) return false;
        if (diffI !== diffJ) return false;

        // Right down
        var piecesJumped: number = 0;
        var pieceJumpedX: number = 0;
        var pieceJumpedY: number = 0;
        var diffX: number = 0;
        var diffY: number = 0;
        if (i > iC && j > jC) {
          for (let x = i; x > iC; x--) {
            for (let y = j; y > jC; y--) {
              diffX = Math.abs(x - iC);
              diffY = Math.abs(y - jC);
              if (diffX === diffY) {
                if (this.hasPiece(x, y) && this.getPiece(x, y) !== piece) {
                  pieceJumpedX = x;
                  pieceJumpedY = y;
                  piecesJumped += 1;
                }
                if (this.hasPiece(x, y) && this.getPiece(x, y) === piece)
                  return false;
              }
            }
          }
        }

        // Left Down
        if (i > iC && j < jC) {
          for (let x = i; x > iC; x--) {
            for (let y = j; y < jC; y++) {
              diffX = Math.abs(x - iC);
              diffY = Math.abs(y - jC);
              if (diffX === diffY) {
                if (this.hasPiece(x, y) && this.getPiece(x, y) !== piece) {
                  pieceJumpedX = x;
                  pieceJumpedY = y;
                  piecesJumped += 1;
                }
                if (this.hasPiece(x, y) && this.getPiece(x, y) === piece)
                  return false;
              }
            }
          }
        }

        // Right up
        if (i < iC && j > jC) {
          for (let x = i; x < iC; x++) {
            for (let y = j; y > jC; y--) {
              diffX = Math.abs(x - iC);
              diffY = Math.abs(y - jC);
              if (diffX === diffY) {
                if (this.hasPiece(x, y) && this.getPiece(x, y) !== piece) {
                  pieceJumpedX = x;
                  pieceJumpedY = y;
                  piecesJumped += 1;
                }
                if (this.hasPiece(x, y) && this.getPiece(x, y) === piece)
                  return false;
              }
            }
          }
        }

        // Left Up
        if (i < iC && j < jC) {
          for (let x = i; x < iC; x++) {
            for (let y = j; y < jC; y++) {
              diffX = Math.abs(x - iC);
              diffY = Math.abs(y - jC);
              if (diffX === diffY) {
                if (this.hasPiece(x, y) && this.getPiece(x, y) !== piece) {
                  pieceJumpedX = x;
                  pieceJumpedY = y;
                  piecesJumped += 1;
                }
                if (this.hasPiece(x, y) && this.getPiece(x, y) === piece)
                  return false;
              }
            }
          }
        }

        if (piecesJumped > 1) return false;
        if (piecesJumped > 0)
          this.removeJumpedPiece(pieceJumpedX, pieceJumpedY);
        return true;

      case "white":
        if (i > iC) return false;
        if (this.hasPiece(i, j)) return false;
        if (diffI === diffJ && diffI === 1) return true;
        if (diffI === diffJ && diffI === 2) {
          if (j > jC && this.getPiece(i + 1, j - 1) === "red") {
            this.setState({
              redPieces: this.state.redPieces - 1
            }, this.removeJumpedPiece(i + 1, j - 1));
            return true;
          }
          if (j < jC && this.getPiece(i + 1, j + 1) === "red") {
            this.setState({
              redPieces: this.state.redPieces - 1
            }, this.removeJumpedPiece(i + 1, j + 1));
            return true;
          }
        }
        break;

      case "red":
        if (i < iC) return false;
        if (this.hasPiece(i, j)) return false;
        if (diffI === diffJ && diffI === 1) return true;
        if (diffI === diffJ && diffI === 2) {
          if (j > jC && this.getPiece(i - 1, j - 1) === "white") {
            this.setState({
              whitePieces: this.state.whitePieces - 1
            }, this.removeJumpedPiece(i - 1, j - 1));
            return true;
          }
          if (j < jC && this.getPiece(i - 1, j + 1) === "white") {
            this.setState({
              whitePieces: this.state.whitePieces - 1
            }, this.removeJumpedPiece(i - 1, j + 1));
            return true;
          }
        }
        break;

    }

    return false;
  }

  makeMove(i: number, j: number) {

    var tempState: Array<Array<string>> = [...this.state.boardState];
    const piece: string = this.state.pieceLoaded;

    if (this.isValidMove(i, j)) {
      if (piece === "white" && i === 0)
        tempState[i][j] = "whiteKing";
      else if (piece === "red" && i === 7)
        tempState[i][j] = "redKing";
      else
        tempState[i][j] = piece;

      var [iPrev, jPrev] = this.state.pieceLoadedCoords;
      tempState[iPrev][jPrev] = "empty";

      this.setState({
        boardState: [...tempState],
        // whiteTurn: this.state.isJumpPossible ? this.state.whiteTurn : !this.state.whiteTurn
        whiteTurn: !this.state.whiteTurn
      }, () => console.log("moved"));
    }

    this.setState({
      pieceLoaded: "null",
    }, () => console.log("piece unloaded"));

  }


  handleClick(index: Array<number>) {
    const [i, j] = index;
    const piece: string = this.state.boardState[i][j];

    const jumpPossible: Array<Array<number>> = this.isJumpPossible();
    var canJump: boolean = false;

    for (let x = 0; x < jumpPossible.length; x++)
      if (jumpPossible[x][0] === i && jumpPossible[x][1] === j)
        canJump = true;

    if (canJump === false && jumpPossible.length !== 0 && piece !== "empty") {
      console.log("Jump possible");
      return;
    }


    if ((piece === "white" || piece === "whiteKing") && !this.state.whiteTurn) return;
    if ((piece === "red" || piece === "redKing") && this.state.whiteTurn) return;
    if ((piece === "empty" && this.state.pieceLoaded === "null") ||
      piece === "null") return;

    if (this.state.pieceLoaded === "null") {
      this.setState({
        pieceLoaded: piece,
        pieceLoadedCoords: index
      }, () => console.log("loaded"));
    }

    else this.makeMove(i, j);
  }



  initializeBoardState() {
    var board: Array<Array<string>> = Array(8);
    var isNull: boolean = true;

    for (let i = 0; i < 8; i++) {
      board[i] = new Array(8);
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 8; j++) {
        if (isNull) board[i][j] = "null";
        else board[i][j] = "red";
        isNull = !isNull;
      }
      isNull = !isNull;
    }

    for (let i = 3; i < 5; i++) {
      for (let j = 0; j < 8; j++) {
        if (isNull) board[i][j] = "null";
        else board[i][j] = "empty";
        isNull = !isNull;
      }
      isNull = !isNull;
    }

    for (let i = 5; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (isNull) board[i][j] = "null";
        else board[i][j] = "white";
        isNull = !isNull;
      }
      isNull = !isNull;
    }

    this.setState({
      boardState: board,
      isBoardInitialized: true
    });
  }

  render() {
    if (!this.state.isBoardInitialized) {
      this.initializeBoardState();
    }


    else if (this.checkGameOver()) {
      return (
        <div className="game">
          <Board
            boardState={this.state.boardState}
            onClick={() => true}
          />
        </div>
      );
    }

    else
      return (
        <div className="game">
          <Board
            boardState={this.state.boardState}
            onClick={this.handleClick.bind(this)}
          />
        </div>
      );
  }
}

export default Game;
