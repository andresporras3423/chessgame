import React from 'react';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: {"bp": "/assets/black-pawn.svg",
      "bn": "/assets/black-knight.svg",
      "bb": "/assets/black-bishop.svg",
      "br": "/assets/black-rook.svg",
      "bq": "/assets/black-queen.svg",
      "bk": "/assets/black-king.svg",
      "wp": "/assets/white-pawn.svg",
      "wn": "/assets/white-knight.svg",
      "wb": "/assets/white-bishop.svg",
      "wr": "/assets/white-rook.svg",
      "wq": "/assets/white-queen.svg",
      "wk": "/assets/white-king.svg",
      "": ""},
     }
    };

  render() {
    return (
    <div className={`cell-properties ${this.props.cell.currentColor()}`} onClick={()=>this.props.clickCell(this.props.cell)}>
      <img src={this.state.images[this.props.cell.piece]} height="40px" width="40px" className={this.props.cell.piece==="" ? "invisible" : ""} />
    </div>
    );
  }
}

export default Cell;