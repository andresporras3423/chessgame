import React from 'react';
import { nanoid } from 'nanoid';
import Cell from './Cell';
import BoardData from './../classes/BoardData';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardData : new BoardData(),
      turnBoard: ()=>{
        this.state.boardData.turnBoard();
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
            checked={this.state.boardData.playWithWhite}
              onChange={()=>this.state.turnBoard()} /> 
              <label className="form-check-label">Play with white</label>
            </div>
            <div>
            <input type="radio" value="black" name="color" className="form-check-input"
            checked={!this.state.boardData.playWithWhite}
            onChange={()=>this.state.turnBoard()}  /> 
            <label className="form-check-label">Play with black</label>
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
                              <Cell key={nanoid()} cell={cell}></Cell>
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