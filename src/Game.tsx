import React, { useState } from 'react';
import './Game.css';
import { Board } from './Board';


export const Game = (props: any): JSX.Element => {

  const [boardState, setBoardState] = useState<Array<Array<string>>>([]);
  const [isBoardInitialized, setIsBoardInitialized] = useState(false);
  const [pieceLoaded, setPieceLoaded] = useState("null");
  const [pieceLoadedCoords, setPieceLoadedCoords] = useState<Array<number>>([]);
  const [redPieces, setRedPieces] = useState(12);
  const [whitePieces, setWhitePieces] = useState(12);
  const [whiteTurn, setWhiteTurn] = useState(true);


  const checkGameOver = (): string => {
    if (redPieces === 0)
      return "White";
    if (whitePieces === 0)
      return "Red";

    return "";
  }

  const getPiece = (i: number, j: number): string => {
    return boardState[i][j];
  }

  const hasPiece = (i: number, j: number): boolean => {
    if (boardState[i][j] === "empty")
      return false;
    else return true;
  }

  const removeJumpedPiece = (i: number, j: number): any => {
    var tempState: Array<Array<string>> = [...boardState];
    tempState[i][j] = "empty";

    setBoardState([...tempState]);
    return;
  }

  const isJumpPossible = (): Array<Array<number>> => {
    var jumpCoords: Array<Array<number>> = [];
    if (whiteTurn) {
      for (let i = 2; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          if (getPiece(i, j) === "white") {
            if (!(j === 1 && i === 2))
              if (getPiece(i - 1, j - 1) === "red" && getPiece(i - 2, j - 2) === "empty")
                jumpCoords.concat([i, j]);

            if (!(j === 7 && i === 2))
              if (getPiece(i - 1, j + 1) === "red" && getPiece(i - 2, j + 2) === "empty")
                jumpCoords.concat([i, j]);
          }
        }
      }
    }

    else {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 7; j++) {
          if (getPiece(i, j) === "red") {
            if (!(j === 0 && i === 5))
              if (getPiece(i + 1, j - 1) === "white" && getPiece(i + 2, j - 2) === "empty")
                jumpCoords.concat([i, j]);

            if (!(j === 6 && i === 5))
              if (getPiece(i + 1, j + 1) === "white" && getPiece(i + 2, j + 2) === "empty")
                jumpCoords.concat([i, j]);
          }
        }
      }
    }

    return jumpCoords;

  }

  const isValidMove = (i: number, j: number): boolean => {
    var [iC, jC] = pieceLoadedCoords;
    var piece = pieceLoaded;
    var diffI: number = Math.abs(i - iC);
    var diffJ: number = Math.abs(j - jC);
    var gPiece: string = "";

    switch (piece) {
      case "whiteKing":
      case "redKing":

        if (hasPiece(i, j)) return false;
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
              if (diffX !== diffY) continue;
              if (piece === "redKing" && (getPiece(x, y) === "red" || getPiece(x, y) === "redKing")) return false;
              if (piece === "whiteKing" && (getPiece(x, y) === "white" || getPiece(x, y) === "whiteKing")) return false;
              if (hasPiece(x, y)) {
                pieceJumpedX = x;
                pieceJumpedY = y;
                piecesJumped += 1;
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
              if (diffX !== diffY) continue;
              if (piece === "redKing" && (getPiece(x, y) === "red" || getPiece(x, y) === "redKing")) return false;
              if (piece === "whiteKing" && (getPiece(x, y) === "white" || getPiece(x, y) === "whiteKing")) return false;
              if (hasPiece(x, y)) {
                pieceJumpedX = x;
                pieceJumpedY = y;
                piecesJumped += 1;
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
              if (diffX !== diffY) continue;
              if (piece === "redKing" && (getPiece(x, y) === "red" || getPiece(x, y) === "redKing")) return false;
              if (piece === "whiteKing" && (getPiece(x, y) === "white" || getPiece(x, y) === "whiteKing")) return false;
              if (hasPiece(x, y)) {
                pieceJumpedX = x;
                pieceJumpedY = y;
                piecesJumped += 1;
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
              if (diffX !== diffY) continue;
              if (piece === "redKing" && (getPiece(x, y) === "red" || getPiece(x, y) === "redKing")) return false;
              if (piece === "whiteKing" && (getPiece(x, y) === "white" || getPiece(x, y) === "whiteKing")) return false;
              if (hasPiece(x, y)) {
                pieceJumpedX = x;
                pieceJumpedY = y;
                piecesJumped += 1;
              }
            }
          }
        }

        if (piecesJumped > 1) return false;
        if (piecesJumped > 0)
          removeJumpedPiece(pieceJumpedX, pieceJumpedY);
          if (piece === "whiteKing")
            setRedPieces(redPieces - 1);
          else
            setWhitePieces(whitePieces - 1);
        return true;

        

      case "white":
        if (i > iC) return false;
        if (hasPiece(i, j)) return false;
        if (diffI === diffJ && diffI === 1) return true;
        if (diffI === diffJ && diffI === 2) {
          gPiece = getPiece(i + 1, j - 1);
          if (j > jC && (gPiece === "red" || gPiece === "redKing")) {
            setRedPieces(redPieces - 1);
            removeJumpedPiece(i + 1, j - 1);
            return true;
          }
          gPiece = getPiece(i + 1, j + 1);
          if (j < jC && (gPiece === "red" || gPiece === "redKing")) {
            setRedPieces(redPieces - 1);
            removeJumpedPiece(i + 1, j + 1);
            return true;
          }
        }
        break;

      case "red":
        if (i < iC) return false;
        if (hasPiece(i, j)) return false;
        if (diffI === diffJ && diffI === 1) return true;
        if (diffI === diffJ && diffI === 2) {
          gPiece = getPiece(i - 1, j - 1);
          if (j > jC && (gPiece === "white" || gPiece === "whiteKing")) {
            setWhitePieces(whitePieces - 1);
            removeJumpedPiece(i - 1, j - 1);
            return true;
          }
          gPiece = getPiece(i - 1, j + 1);
          if (j < jC && (gPiece === "white" || gPiece === "whiteKing")) {
            setWhitePieces(whitePieces - 1);
            removeJumpedPiece(i - 1, j + 1);
            return true;
          }
        }
        break;

    }

    return false;
  }

  const makeMove = (i: number, j: number) => {

    var tempState: Array<Array<string>> = [...boardState];
    const piece: string = pieceLoaded;

    if (isValidMove(i, j)) {
      if (piece === "white" && i === 0)
        tempState[i][j] = "whiteKing";
      else if (piece === "red" && i === 7)
        tempState[i][j] = "redKing";
      else
        tempState[i][j] = piece;

      var [iPrev, jPrev] = pieceLoadedCoords;
      tempState[iPrev][jPrev] = "empty";

      setBoardState([...tempState]);
      setWhiteTurn(!whiteTurn);
    }
    setPieceLoaded("null");
  }


  const handleClick = (index: Array<number>) => {
    const [i, j] = index;
    const piece: string = boardState[i][j];

    const jumpPossible: Array<Array<number>> = isJumpPossible();
    var canJump: boolean = false;

    for (let x = 0; x < jumpPossible.length; x++)
      if (jumpPossible[x][0] === i && jumpPossible[x][1] === j)
        canJump = true;

    if (canJump === false && jumpPossible.length !== 0 && piece !== "empty") {
      console.log("Jump possible");
      return;
    }


    if ((piece === "white" || piece === "whiteKing") && !whiteTurn) return;
    if ((piece === "red" || piece === "redKing") && whiteTurn) return;
    if ((piece === "empty" && pieceLoaded === "null") ||
      piece === "null") return;

    if (pieceLoaded === "null") {
      setPieceLoaded(piece);
      setPieceLoadedCoords(index);
    }

    else makeMove(i, j);
  }



  const initializeBoardState = (): void => {
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

    setBoardState(board);
    setIsBoardInitialized(true);
  }




  if (!isBoardInitialized) {
    initializeBoardState();
  }

  else {
    var clickHandler;
    var turn: string = whiteTurn ? "White" : "Red";

    var gameWinner: string = checkGameOver();
    if (gameWinner.length !== 0) {
      clickHandler = () => true;
    }
    else
      clickHandler = handleClick.bind(this);

    return (
      <div className="game">
        <div>
          Turn: {turn}<br></br>
          Winner: {gameWinner}
        </div>
        <Board
          boardState={boardState}
          onClick={clickHandler}
        />
      </div>
    );
  }

  return (<div></div>);

}

export default Game;
