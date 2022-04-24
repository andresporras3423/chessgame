import React from 'react';
import bp from "../assets/black-pawn.svg";
import bn from "../assets/black-knight.svg";
import bb from "../assets/black-bishop.svg";
import br from "../assets/black-rook.svg";
import bq from "../assets/black-queen.svg";
import bk from "../assets/black-king.svg";
import wp from "../assets/white-pawn.svg";
import wn from "../assets/white-knight.svg";
import wb from "../assets/white-bishop.svg";
import wr from "../assets/white-rook.svg";
import wq from "../assets/white-queen.svg";
import wk from "../assets/white-king.svg";


class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: {"bp": bp,
      "bn": bn,
      "bb": bb,
      "br": br,
      "bq": bq,
      "bk": bk,
      "wp": wp,
      "wn": wn,
      "wb": wb,
      "wr": wr,
      "wq": wq,
      "wk": wk,
      "": ""},
     }
    };

  render() {
    return (
    <div className={`cell-properties ${this.props.cell.currentColor()}`} onClick={()=>this.props.clickCell(this.props.cell)}>
      <img src={this.state.images[this.props.cell.piece]} className={"cell-size "+(this.props.cell.piece==="" ? "invisible" : "")} />
    </div>
    );
  }
}

export default Cell;