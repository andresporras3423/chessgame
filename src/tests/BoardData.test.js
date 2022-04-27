import BoardData from './../classes/BoardData';
let boardData = {};
function foolMate(){
  boardData.selectPiece(boardData.objectCells[6][5]);
  boardData.selectPiece(boardData.objectCells[5][5]);
  boardData.selectPiece(boardData.objectCells[1][4]);
  boardData.selectPiece(boardData.objectCells[2][4]);
  boardData.selectPiece(boardData.objectCells[6][6]);
  boardData.selectPiece(boardData.objectCells[4][6]);
  boardData.selectPiece(boardData.objectCells[0][3]);
  boardData.selectPiece(boardData.objectCells[4][7]);
}
function scholarMate(){
  boardData.selectPiece(boardData.objectCells[6][4]);
  boardData.selectPiece(boardData.objectCells[4][4]);
  boardData.selectPiece(boardData.objectCells[1][4]);
  boardData.selectPiece(boardData.objectCells[3][4]);
  boardData.selectPiece(boardData.objectCells[7][5]);
  boardData.selectPiece(boardData.objectCells[4][2]);
  boardData.selectPiece(boardData.objectCells[0][1]);
  boardData.selectPiece(boardData.objectCells[2][2]);
  boardData.selectPiece(boardData.objectCells[7][3]);
  boardData.selectPiece(boardData.objectCells[3][7]);
  boardData.selectPiece(boardData.objectCells[0][6]);
  boardData.selectPiece(boardData.objectCells[2][5]);
  boardData.selectPiece(boardData.objectCells[3][7]);
  boardData.selectPiece(boardData.objectCells[1][5]);
}
function clearBoard(){
  boardData.objectCells[1][0].piece="";
  boardData.objectCells[1][1].piece="";
  boardData.objectCells[1][2].piece="";
  boardData.objectCells[1][3].piece="";
  boardData.objectCells[1][4].piece="";
  boardData.objectCells[1][5].piece="";
  boardData.objectCells[1][6].piece="";
  boardData.objectCells[1][7].piece="";
  boardData.objectCells[0][0].piece="";
  boardData.objectCells[0][1].piece="";
  boardData.objectCells[0][2].piece="";
  boardData.objectCells[0][3].piece="";
  boardData.objectCells[0][5].piece="";
  boardData.objectCells[0][6].piece="";
  boardData.objectCells[0][7].piece="";
  boardData.objectCells[6][0].piece="";
  boardData.objectCells[6][1].piece="";
  boardData.objectCells[6][2].piece="";
  boardData.objectCells[6][3].piece="";
  boardData.objectCells[6][4].piece="";
  boardData.objectCells[6][5].piece="";
  boardData.objectCells[6][6].piece="";
  boardData.objectCells[6][7].piece="";
  boardData.objectCells[7][0].piece="";
  boardData.objectCells[7][1].piece="";
  boardData.objectCells[7][2].piece="";
  boardData.objectCells[7][3].piece="";
  boardData.objectCells[7][5].piece="";
  boardData.objectCells[7][6].piece="";
  boardData.objectCells[7][7].piece="";
  boardData.blackLongCastling = false;
  boardData.blackShortCastling = false;
  boardData.whiteLongCastling = false;
  boardData.whiteShortCastling = false;
  // next line runs the method that pass to boardData.game.position the next info:
  // current board, last move and castling availables
  // all available moves for the current board are returned as a list of strings
  // further board details in boardData.game.board 
  boardData.getAllAvailableMoves();
}
beforeEach(() => {
  boardData = new BoardData(true, "Game started");
});
it('with default settings shows original chess position', () => {
  expect(boardData.game.give_current_board()).toBe("br,bn,bb,bq,bk,bb,bn,br*bp,bp,bp,bp,bp,bp,bp,bp*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*wp,wp,wp,wp,wp,wp,wp,wp*wr,wn,wb,wq,wk,wb,wn,wr");
});
it('with default settings white plays first', () => {
  expect(boardData.whitePlaying).toBe(true);
});
// game message show the status of the game, some other gameMessage values include: black wins, white wins, draw by stalemate...
it('with default settings gameMessage says "Game started"', () => {
  expect(boardData.gameMessage).toBe("Game started");
});
it('after move e4 update in the board', () => {
  boardData.selectPiece(boardData.objectCells[6][4]);
  boardData.selectPiece(boardData.objectCells[4][4]);
  expect(boardData.game.give_current_board()).toBe("br,bn,bb,bq,bk,bb,bn,br*bp,bp,bp,bp,bp,bp,bp,bp*,,,,,,,*,,,,,,,*,,,,wp,,,*,,,,,,,*wp,wp,wp,wp,,wp,wp,wp*wr,wn,wb,wq,wk,wb,wn,wr");
});
it('after move e4 gameMessage says "Game started"', () => {
  boardData.selectPiece(boardData.objectCells[6][4]);
  boardData.selectPiece(boardData.objectCells[4][4]);
  expect(boardData.gameMessage).toBe("Game started");
});
it('after move e4 black has to play', () => {
  boardData.selectPiece(boardData.objectCells[6][4]);
  boardData.selectPiece(boardData.objectCells[4][4]);
  expect(boardData.whitePlaying).toBe(false);
});
it('after move e4 black plays e5 and board is updated', () => {
  boardData.selectPiece(boardData.objectCells[6][4]);
  boardData.selectPiece(boardData.objectCells[4][4]);
  boardData.selectPiece(boardData.objectCells[1][4]);
  boardData.selectPiece(boardData.objectCells[3][4]);
  expect(boardData.game.give_current_board()).toBe("br,bn,bb,bq,bk,bb,bn,br*bp,bp,bp,bp,,bp,bp,bp*,,,,,,,*,,,,bp,,,*,,,,wp,,,*,,,,,,,*wp,wp,wp,wp,,wp,wp,wp*wr,wn,wb,wq,wk,wb,wn,wr");
});
it('after move e4 black plays e5 gameMessage says "Game started"', () => {
  boardData.selectPiece(boardData.objectCells[6][4]);
  boardData.selectPiece(boardData.objectCells[4][4]);
  boardData.selectPiece(boardData.objectCells[1][4]);
  boardData.selectPiece(boardData.objectCells[3][4]);
  expect(boardData.gameMessage).toBe("Game started");
});
it('after move e4 black plays e5 and white has to play', () => {
  boardData.selectPiece(boardData.objectCells[6][4]);
  boardData.selectPiece(boardData.objectCells[4][4]);
  boardData.selectPiece(boardData.objectCells[1][4]);
  boardData.selectPiece(boardData.objectCells[3][4]);
  expect(boardData.whitePlaying).toBe(true);
});
it('after fools checkmate, check valid position in the board', () => {
  foolMate();
  expect(boardData.game.give_current_board()).toBe("br,bn,bb,,bk,bb,bn,br*bp,bp,bp,bp,,bp,bp,bp*,,,,bp,,,*,,,,,,,*,,,,,,wp,bq*,,,,,wp,,*wp,wp,wp,wp,wp,,,wp*wr,wn,wb,wq,wk,wb,wn,wr");
});
it('after fools checkmate gameMesage is "black wins"', () => {
  foolMate();
  expect(boardData.gameMessage).toBe("black wins");
});
it('after fools checkmate, even if white tries to make a move, board stays unchanged', () => {
  foolMate();
  boardData.selectPiece(boardData.objectCells[6][0]);
  boardData.selectPiece(boardData.objectCells[4][0]);
  expect(boardData.game.give_current_board()).toBe("br,bn,bb,,bk,bb,bn,br*bp,bp,bp,bp,,bp,bp,bp*,,,,bp,,,*,,,,,,,*,,,,,,wp,bq*,,,,,wp,,*wp,wp,wp,wp,wp,,,wp*wr,wn,wb,wq,wk,wb,wn,wr");
});
it('after fools checkmate, even if white tries to make a move, gameMessage remains the same', () => {
  foolMate();
  boardData.selectPiece(boardData.objectCells[6][0]);
  boardData.selectPiece(boardData.objectCells[4][0]);
  expect(boardData.gameMessage).toBe("black wins");
});

it('after scholar checkmate, check valid position in the board', () => {
  scholarMate();
  expect(boardData.game.give_current_board()).toBe("br,,bb,bq,bk,bb,,br*bp,bp,bp,bp,,wq,bp,bp*,,bn,,,bn,,*,,,,bp,,,*,,wb,,wp,,,*,,,,,,,*wp,wp,wp,wp,,wp,wp,wp*wr,wn,wb,,wk,,wn,wr");
});
it('after scholar checkmate gameMesage is "white wins"', () => {
  scholarMate();
  expect(boardData.gameMessage).toBe("white wins");
});
it('after scholar checkmate, even if black tries to make a move, board stays unchanged', () => {
  scholarMate();
  boardData.selectPiece(boardData.objectCells[0][4]);
  boardData.selectPiece(boardData.objectCells[1][5]);
  expect(boardData.game.give_current_board()).toBe("br,,bb,bq,bk,bb,,br*bp,bp,bp,bp,,wq,bp,bp*,,bn,,,bn,,*,,,,bp,,,*,,wb,,wp,,,*,,,,,,,*wp,wp,wp,wp,,wp,wp,wp*wr,wn,wb,,wk,,wn,wr");
});
it('after scholar checkmate, even if black tries to make a move, gameMessage remains the same', () => {
  scholarMate();
  boardData.selectPiece(boardData.objectCells[0][4]);
  boardData.selectPiece(boardData.objectCells[1][5]);
  expect(boardData.gameMessage).toBe("white wins");
});
it('if board is clear and only have the kings, game is over because of lack of pieces', () => {
  clearBoard();
  boardData.selectPiece(boardData.objectCells[7][4]);
  boardData.selectPiece(boardData.objectCells[6][4]);
  expect(boardData.gameMessage).toBe("draw because of lack of pieces");
});
it('if black has to move but it doesnt have available moves the game is over because of stalemate', () => {
  clearBoard();
  boardData.objectCells[7][4].piece="";
  boardData.objectCells[3][4].piece="wk";
  boardData.objectCells[1][4].piece="wp";
  boardData.getAllAvailableMoves();
  boardData.selectPiece(boardData.objectCells[3][4]);
  boardData.selectPiece(boardData.objectCells[2][4]);
  expect(boardData.gameMessage).toBe("draw because of stalemate");
});
it('if white has to move but it doesnt have available moves the game is over because of stalemate', () => {
  clearBoard();
  boardData.lastMovementCoordinates="bk,4,4,bk,5,4";
  boardData.objectCells[0][4].piece="";
  boardData.objectCells[5][4].piece="bk";
  boardData.objectCells[6][4].piece="bp";
  boardData.getAllAvailableMoves();
  expect(boardData.gameMessage).toBe("draw because of stalemate");
});