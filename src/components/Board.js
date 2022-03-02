import React from 'react';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: [["br","bn","bb","bq","bk","bb","bn","br"],
      ["bp","bp","bp","bp","bp","bp","bp","bp"],
      ["","","","","","","",""],
      ["","","","","","","",""],
      ["","","","","","","",""],
      ["","","","","","","",""],
      ["wp","wp","wp","wp","wp","wp","wp","wp"],
      ["wr","wn","wb","wq","wk","wb","wn","wr"]],
      pieces: {"bp": "/assets/black-pawn.svg",
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
      cellColor: ["white-cell", "black-cell"],
      model: "Mustang",
      color: "red",
      year: 1964
    };
  }

  displayContent = ()=>{
      return (
        <>
          <div className="board">
            {
              this.state.cells.map(
                (row, i)=>{
                  return(
                    <div className="rowBoard">
                      {
                        row.map(
                          (cell, j)=>{
                            return(
                              <div className={"cell-properties "+this.state.cellColor[(i+j)%2]}>
                                <img className="" src={this.state.pieces[cell]} height="40px" width="40px" className={cell==="" ? "invisible" : ""} />
                              </div>
                            )
                          }
                        )
                      }
                    </div>
                  )
                }
              )
            }
          </div>
        </>
      )
  }

  render() {
    return <div>
      {this.state.brand}
      {this.displayContent()}
    </div>;
  }
}

export default Board;