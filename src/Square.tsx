import React from 'react';


export const Square = (props: any): JSX.Element => {

    if (props.piece === "null")
        return (
            <div
                className="square white"
                onClick={props.onClick}
            >
            </div>
        )

    if (props.piece === "white")
        return (
            <div
                className="square green"
                onClick={props.onClick}
            >
                <div className="piece white"></div>
            </div>
        )

    if (props.piece === "red")
        return (
            <div
                className="square green"
                onClick={props.onClick}
            >
                <div className="piece red"></div>
            </div>
        )

    if (props.piece === "whiteKing")
        return (
            <div
                className="square green"
                onClick={props.onClick}
            >
                <div className="piece white king"></div>
            </div>
        )

    if (props.piece === "redKing")
        return (
            <div
                className="square green"
                onClick={props.onClick}
            >
                <div className="piece red king"></div>
            </div>
        )

    return (
        <div
            className="square green"
            onClick={props.onClick}
        ></div>
    )
}