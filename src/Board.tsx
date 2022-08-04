import React from 'react'
import { Square } from './Square';


export const Board = (props: any): JSX.Element => {

    const renderSquare = (piece: string, index: Array<any>): JSX.Element => {
        return <Square piece={piece}
            onClick={() => props.onClick(index)} />;
    }

    const makeBoard = (boardState: Array<Array<string>>): Array<Array<JSX.Element>> => {
        var boardRows: any[] = new Array(8);
        for (let i = 0; i < 8; i++) {
            var row: any[] = new Array(8);
            for (let j = 0; j < 8; j++) {
                row.push(renderSquare(boardState[i][j], [i, j]));
            }
            boardRows.push(
                <div>
                    {row}
                </div>
            )
        }
        return boardRows;
    }


    return (
        <div className="board">
            {makeBoard(props.boardState)}
        </div>
    );
}
