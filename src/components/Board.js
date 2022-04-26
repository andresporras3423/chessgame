import React from 'react';
import { nanoid } from 'nanoid';
import Cell from './Cell';
import BoardData from './../classes/BoardData';
import Modal from './Modal';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      promotionCell: null,
      // update modalOpen which determina if the modal is open
      setModalOpen: (nModalOpen, newPromotionValue="")=>{
        this.setState({
          modalOpen: nModalOpen
        })
        // newPromotionValue is assigned when user click a promotion piece in the modal and then the modal is closed
        if(newPromotionValue!==""){
          this.state.boardData.updateBoardAfterValidMove(this.state.promotionCell, newPromotionValue);
          this.state.updateBoard();
        }
      },
      playWithWhite: true,
      boardData : new BoardData(),
      // flip board to change perspective, default is white
        updateHumanColor: ()=>{
          this.setState({
            playWithWhite: !this.state.playWithWhite
          });
        },
        // first argument indicates white perspective
        // second argument assigns gameMessage
        // allow select pieces by setting "Game started" as initial message
        // a different message blocks selection of any piece
        startGame: ()=>{
          this.setState({
            boardData: new BoardData(this.state.playWithWhite, "Game started")
          });
        },
        clickCell: (cell)=>{
          // If message is empty then games hasn't started yet and user shouldn't been able todo any move
          if(this.state.boardData.gameMessage!=="Game started") return;
          // id this is a promotion move then extra steps, otherwise the board was already updated and just need to re-render the view
          const doPromotion = this.state.boardData.selectPiece(cell);
          if(doPromotion){
            this.setState({
              promotionCell: cell
            });
            this.state.setModalOpen(true);
          }
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
          <h3>{this.state.boardData.gameMessage}</h3>
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
      {this.state.modalOpen && <Modal setModalOpen={this.state.setModalOpen} color={this.state.promotionCell.y===0 ? 'white': 'black'}></Modal>}
    </div>;
  }
}

export default Board;