import React from 'react';

class Cell extends React.Component {
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

  render() {
    return (
      <div className={"cell-properties "+this.state.cellColor[(i+j)%2]} key={nanoid()} onClick={()=>this.selectCell(i,j)}>
    <img src={this.state.pieces[cell]} height="40px" width="40px" className={cell==="" ? "invisible" : ""} />
  </div>
    );
  }
}

export default Cell;