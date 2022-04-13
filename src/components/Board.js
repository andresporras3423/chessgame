import React from 'react';
import { nanoid } from 'nanoid';

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
      firstCell: null,
      secondCell: null,
      selectCell: (i, j)=>{
        if(this.firstCell==null){
          this.setState({
            firstCell: this.state.cells[i][j]
          });
        }
      },
      selectedColor: "white",
      updateColorToPlay: ()=>{
        let reverseCells = [];
        this.state.cells.reverse().forEach(row => {
          reverseCells.push(row.reverse());
        });
        this.setState({
         cells: reverseCells,
         selectedColor: this.state.selectedColor==="white" ? "black" : "white"
       });

     }
    };
  }

  displayContent = ()=>{
      return (
        <div className="boardContent">
          <div className="form-check">
            <div>
            <input type="radio" value="white" name="color" className="form-check-input"
            checked={this.state.selectedColor === "white"}
              onChange={this.state.updateColorToPlay} /> 
              <label className="form-check-label">Play with white</label>
            </div>
            <div>
            <input type="radio" value="black" name="color" className="form-check-input"
            checked={this.state.selectedColor === "black"}
            onChange={this.state.updateColorToPlay}  /> 
            <label className="form-check-label">Play with black</label>
            </div>
          </div>
          <div className="board">
            {
              this.state.cells.map(
                (row, i)=>{
                  return(
                    <div className="rowBoard" key={nanoid()}>
                      {
                        row.map(
                          (cell, j)=>{
                            return(
                              <div className={"cell-properties "+this.state.cellColor[(i+j)%2]} key={nanoid()} onClick={()=>this.selectCell(i,j)}>
                                <img src={this.state.pieces[cell]} height="40px" width="40px" className={cell==="" ? "invisible" : ""} />
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
        </div>
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