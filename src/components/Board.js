import React from 'react';
import { nanoid } from 'nanoid';
import Cell from './Cell';
import BoardData from './../classes/BoardData';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playWithWhite: true,
      boardData : new BoardData(),
        updateHumanColor: ()=>{
          this.setState({
            playWithWhite: !this.state.playWithWhite
          });
        },
        startGame: ()=>{
          this.setState({
            boardData: new BoardData(this.state.playWithWhite)
          });
        },
        clickCell: (cell)=>{
          this.state.boardData.selectPiece(cell);
          this.state.updateBoard();
        },
        updateBoard: ()=>{
          this.setState({
            boardData: this.state.boardData
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
            checked={this.state.playWithWhite}
              onChange={()=>this.state.updateHumanColor()} /> 
              <label className="form-check-label">Play with white</label>
            </div>
            <div>
            <input type="radio" value="black" name="color" className="form-check-input"
            checked={!this.state.playWithWhite}
            onChange={()=>this.state.updateHumanColor()}  /> 
            <label className="form-check-label">Play with black</label>
            </div>
            <div className="margin-start-button">
            <button
            data-testid="button-start"
            className="btn btn-primary"
            onClick={()=> this.state.startGame()}
          >
            start
          </button>
            </div>
          </div>
          <div className="board">
            {
              this.state.boardData.arrayCells.map(
                (row)=>{
                  return(
                    <div className="rowBoard" key={nanoid()}>
                      {
                        row.map(
                          (cell)=>{
                            return(
                              <Cell key={nanoid()} cell={cell} clickCell={this.state.clickCell}></Cell>
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