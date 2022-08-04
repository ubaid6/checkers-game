import React from 'react'
import {Square} from './Square';


export class Board extends React.Component<any, any> {

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
  