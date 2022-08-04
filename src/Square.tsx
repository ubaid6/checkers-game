import React from 'react';


export class Square extends React.Component<any, any> {

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