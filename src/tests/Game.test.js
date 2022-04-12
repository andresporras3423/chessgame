import Game from './../classes/positions/Game';
import Cell from './../classes/positions/Cell';
let game = {};
const no_castling = ()=>{
  no_white_castling();
  no_black_castling();
}
const no_white_castling = ()=>{
  game.positions.white_long_castling = false;
  game.positions.white_short_castling = false;
};
const no_black_castling = ()=>{
  game.positions.black_long_castling = false;
  game.positions.black_short_castling = false;
};
beforeEach(() => {
  game = new Game();
  game.start_game();
});
it('with default settings shows original chess positions', () => {
  expect(game.give_current_board()).toBe("br,bn,bb,bq,bk,bb,bn,br*bp,bp,bp,bp,bp,bp,bp,bp*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*wp,wp,wp,wp,wp,wp,wp,wp*wr,wn,wb,wq,wk,wb,wn,wr");
});
it('with default settings white side has available moves', () => {
  expect(game.white_move()).toBe(true);
});
it('after first white move black side has available moves', () => {
  game.white_move();
  expect(game.black_move()).toBe(true);
});
it('with default settings after white move blacks are in the original position', () => {
  game.white_move();
  game.black_move();
  game.white_move();
  game.black_move();
  expect(game.moves_done).toBe(4);
});
it('with default settings after white move black side is unchanged', () => {
  game.white_move();
  expect(game.give_current_board()).toMatch(/^br,bn,bb,bq,bk,bb,bn,br\*bp,bp,bp,bp,bp,bp,bp,bp\*,,,,,,,\*,,,,,,,\*/);
});
it('with default settings after white and black have move black side is unchanged', () => {
  game.white_move();
  expect(game.give_current_board()).not.toMatch(/\*,,,,,,,\*,,,,,,,\*wp,wp,wp,wp,wp,wp,wp,wp\*wr,wn,wb,wq,wk,wb,wn,wr$/);
});

it('after first move of both sides then both sides has changed from initial position', () => {
  game.white_move();
  game.black_move();
  const current_board = game.give_current_board()
  expect(current_board.match(/\*,,,,,,,\*,,,,,,,\*wp,wp,wp,wp,wp,wp,wp,wp\*wr,wn,wb,wq,wk,wb,wn,wr$/)==null 
  && current_board.match(/^br,bn,bb,bq,bk,bb,bn,br\*bp,bp,bp,bp,bp,bp,bp,bp\*,,,,,,,\*,,,,,,,\*/)==null).toBe(true);
});

it('with default settings after white and black have move black side is unchanged', () => {
  game.positions.last_movement = "wp5,6,4,wp5,4,4,"
  expect(game.last_movement_reduced()).toBe("wp,6,4,wp,4,4,");
});

it('check is it game over when white has to move but there is lack of material because only king on the board', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7)
  };
  expect(game.white_move()).toBe(false);
});

it('check is it game over when black has to move but there is lack of material because only king on the board', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7)
  };
  expect(game.black_move()).toBe(false);
});

it('check is it game over when white has to move but there is lack of material because only kings and one bishop per player', () => {
  no_castling();
  game.positions.cells = [["bk","bb1","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","wb1","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bb1: new Cell(0, 1)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wb1: new Cell(7, 6)
  };
  expect(game.white_move()).toBe(false);
});

it('check is it game over when black has to move but there is lack of material because only kings and one bishop per player', () => {
  no_castling();
  game.positions.cells = [["bk","bb1","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","wb1","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bb1: new Cell(0, 1)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wb1: new Cell(7, 6)
  };
  expect(game.black_move()).toBe(false);
});

it('check is it game over when white has to move but there is lack of material because only kings and same color bishops per player', () => {
  no_castling();
  game.positions.cells = [["bk","bb1","","bb2","","bb3","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","wb3","","wb2","","wb1","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bb1: new Cell(0, 1),
    bb2: new Cell(0, 3),
    bb3: new Cell(0, 5)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wb1: new Cell(7, 6),
    wb2: new Cell(7, 4),
    wb3: new Cell(7, 2)
  };
  expect(game.white_move()).toBe(false);
});

it('check is it game over when black has to move but there is lack of material because only kings and same color bishops per player', () => {
  no_castling();
  game.positions.cells = [["bk","bb1","","bb2","","bb3","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","wb3","","wb2","","wb1","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bb1: new Cell(0, 1),
    bb2: new Cell(0, 3),
    bb3: new Cell(0, 5)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wb1: new Cell(7, 6),
    wb2: new Cell(7, 4),
    wb3: new Cell(7, 2)
  };
  expect(game.black_move()).toBe(false);
});

it('check is it game over when white has to move but there is lack of material because only a couple of knights per player', () => {
  no_castling();
  game.positions.cells = [["bk","bn1","","bn2","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","wn2","","wn1","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bn1: new Cell(0, 1),
    bn2: new Cell(0, 3)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wn1: new Cell(7, 6),
    wn2: new Cell(7, 4)
  };
  expect(game.white_move()).toBe(false);
});

it('check is it game over when white has to move but there is lack of material because only a couple of knights per player', () => {
  no_castling();
  game.positions.cells = [["bk","bn1","","bn2","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","wn2","","wn1","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bn1: new Cell(0, 1),
    bn2: new Cell(0, 3)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wn1: new Cell(7, 6),
    wn2: new Cell(7, 4)
  };
  expect(game.black_move()).toBe(false);
});

it('check is it game over when white has to move but it is on checkmate', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","wp7","wp8"],
  ["br1","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    br1: new Cell(7, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wp7: new Cell(6, 6),
    wp8: new Cell(6, 7)
  };
  expect(game.white_move()).toBe(false);
});

it('check is it game over when black has to move but it is on checkmate', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","","wr1"],
  ["bp1","bp2","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bp1: new Cell(1, 0),
    bp2: new Cell(1, 1)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wr1: new Cell(0,7)
  };
  expect(game.black_move()).toBe(false);
});

it('check is it game over when white has to move but it is on stalemate', () => {
  no_castling();
  game.positions.cells = [["","","","","","bk","","wk"],
  ["","","","","","","","wp8"],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""]];
  game.positions.black_pieces = {
    bk: new Cell(0, 5)
  };
  game.positions.white_pieces = {
    wk: new Cell(0, 7),
    wp8: new Cell(1,7)
  };
  expect(game.white_move()).toBe(false);
});

it('check is it game over when black has to move but it is on stalemate', () => {
  no_castling();
  game.positions.cells = [["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["bp1","","","","","","",""],
  ["bk","","wk","","","","",""]];
  game.positions.black_pieces = {
    bk: new Cell(7, 0),
    bp1: new Cell(6,0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 2)
  };
  expect(game.black_move()).toBe(false);
});

it('black can play, game is not over because there is a black queen', () => {
  no_castling();
  game.positions.cells = [["bk","bq1","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bq1: new Cell(0,1)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7)
  };
  expect(game.black_move()).toBe(true);
});

it('white can play, game is not over because there is a black queen', () => {
  no_castling();
  game.positions.cells = [["bk","bq1","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bq1: new Cell(0,1)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7)
  };
  expect(game.white_move()).toBe(true);
});

it('black can play, game is not over because there is a white queen', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","wq1","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wq1: new Cell(7,6)
  };
  expect(game.black_move()).toBe(true);
});

it('white can play, game is not over because there is a white queen', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","wq1","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wq1: new Cell(7,6)
  };
  expect(game.white_move()).toBe(true);
});

it('black can play, game is not over because there is a black rock', () => {
  no_castling();
  game.positions.cells = [["bk","br1","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    br1: new Cell(0,1)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7)
  };
  expect(game.black_move()).toBe(true);
});

it('white can play, game is not over because there is a black rock', () => {
  no_castling();
  game.positions.cells = [["bk","br1","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    br1: new Cell(0,1)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7)
  };
  expect(game.white_move()).toBe(true);
});

it('black can play, game is not over because there is a white rock', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","wr1","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wr1: new Cell(7,6)
  };
  expect(game.black_move()).toBe(true);
});

it('white can play, game is not over because there is a white rock', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","wr1","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wr1: new Cell(7,6)
  };
  expect(game.white_move()).toBe(true);
});

it('black can play, game is not over because there is two black bishops in different color', () => {
  no_castling();
  game.positions.cells = [["bk","bb1","bb2","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bb1: new Cell(0,1),
    bb2: new Cell(0,2)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7)
  };
  expect(game.black_move()).toBe(true);
});

it('white can play, game is not over because there is two black bishops in different color', () => {
  no_castling();
  game.positions.cells = [["bk","bb1","bb2","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bb1: new Cell(0,1),
    bb2: new Cell(0,2)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7)
  };
  expect(game.white_move()).toBe(true);
});

it('black can play, game is not over because there is two white bishops in different color', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","wb2","wb1","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wb1: new Cell(7,6),
    wb2: new Cell(7,5)
  };
  expect(game.black_move()).toBe(true);
});

it('white can play, game is not over because there is two white bishops in different color', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","wb2","wb1","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wb1: new Cell(7,6),
    wb2: new Cell(7,5)
  };
  expect(game.white_move()).toBe(true);
});

it('black can play, game is not over because there is three black knights', () => {
  no_castling();
  game.positions.cells = [["bk","bn1","bn2","bn3","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bn1: new Cell(0,1),
    bn2: new Cell(0,2),
    bn3: new Cell(0,3)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7)
  };
  expect(game.black_move()).toBe(true);
});

it('white can play, game is not over because there is three black knights', () => {
  no_castling();
  game.positions.cells = [["bk","bn1","bn2","bn3","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bn1: new Cell(0,1),
    bn2: new Cell(0,2),
    bn3: new Cell(0,3)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7)
  };
  expect(game.white_move()).toBe(true);
});

it('black can play, game is not over because there is three white knights', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","wn3","wn2","wn1","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wn1: new Cell(7,6),
    wn2: new Cell(7,5),
    wn3: new Cell(7,4)
  };
  expect(game.black_move()).toBe(true);
});
it('white can play, game is not over because there is three white knights', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","wn3","wn2","wn1","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wn1: new Cell(7,6),
    wn2: new Cell(7,5),
    wn3: new Cell(7,4)
  };
  expect(game.white_move()).toBe(true);
});

it('black can play, game is not over because black has a knight and a bishop', () => {
  no_castling();
  game.positions.cells = [["bk","bn1","bb1","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bn1: new Cell(0,1),
    bb1: new Cell(0,2)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7)
    
  };
  expect(game.black_move()).toBe(true);
});

it('white can play, game is not over because black has a knight and a bishop', () => {
  no_castling();
  game.positions.cells = [["bk","bn1","bb1","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bn1: new Cell(0,1),
    bb1: new Cell(0,2)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7)
    
  };
  expect(game.white_move()).toBe(true);
});

it('black can play, game is not over because white has a knight and a bishop', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","wb1","wn1","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wn1: new Cell(7,6),
    wb1: new Cell(7,5)
    
  };
  expect(game.black_move()).toBe(true);
});

it('white can play, game is not over because white has a knight and a bishop', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","wb1","wn1","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wn1: new Cell(7,6),
    wb1: new Cell(7,5)
    
  };
  expect(game.white_move()).toBe(true);
});

it('black can play, game is not over because black has a pawn', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","",""],
  ["bp1","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bp1: new Cell(1, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7)
    
  };
  expect(game.black_move()).toBe(true);
});

it('white can play, game is not over because black has a pawn', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","",""],
  ["bp1","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bp1: new Cell(1, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7)
    
  };
  expect(game.white_move()).toBe(true);
});

it('black can play, game is not over because white has a pawn', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wp8"],
  ["","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wp8: new Cell(6, 7)
  };
  expect(game.black_move()).toBe(true);
});

it('white can play, game is not over because white has a pawn', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wp8"],
  ["","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wp8: new Cell(6, 7)
  };
  expect(game.white_move()).toBe(true);
});

it('spot out precisely the unique white king move', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","wp7",""],
  ["br1","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    br1: new Cell(7, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wp7: new Cell(6, 6)
  };
  game.add_recent_board("white")
  expect(game.board.print_info()).toBe(
`
current board: bk,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,wp,*br,,,,,,,wk
total black pieces: 2
total white pieces: 2
total pieces: 4
black long castling: false
black short castling: false
white long castling: false
white short castling: false
most recent movement: ,,,,,,
total movements available: 1
next_player: white
`
  );
});

it('spot out precisely the unique white king move and update after that move', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","wp7",""],
  ["br1","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    br1: new Cell(7, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wp7: new Cell(6, 6)
  };
  game.white_move();
  game.add_recent_board("black");
  expect(game.board.print_info()).toBe(
`
current board: bk,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,wp,wk*br,,,,,,,
total black pieces: 2
total white pieces: 2
total pieces: 4
black long castling: false
black short castling: false
white long castling: false
white short castling: false
most recent movement: wk,7,7,wk,6,7,
total movements available: 16
next_player: black
`
  );
});

it('spot out precisely the unique black king move', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","","wr1"],
  ["bp1","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bp1: new Cell(1, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wr1: new Cell(0, 7)
  };
  game.add_recent_board("black")
  expect(game.board.print_info()).toBe(
`
current board: bk,,,,,,,wr*bp,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,wk
total black pieces: 2
total white pieces: 2
total pieces: 4
black long castling: false
black short castling: false
white long castling: false
white short castling: false
most recent movement: ,,,,,,
total movements available: 1
next_player: black
`
  );
});

it('spot out precisely the unique black king move and update after that move', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","","wr1"],
  ["bp1","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bp1: new Cell(1, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wr1: new Cell(0, 7)
  };
  game.black_move();
  game.add_recent_board("white");
  expect(game.board.print_info()).toBe(
`
current board: ,,,,,,,wr*bp,bk,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,wk
total black pieces: 2
total white pieces: 2
total pieces: 4
black long castling: false
black short castling: false
white long castling: false
white short castling: false
most recent movement: bk,0,0,bk,1,1,
total movements available: 16
next_player: white
`
  );
});

it('spot out precisely the unique white pawn move', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wp8"],
  ["br2","","","","","","",""],
  ["br1","","","","","","wn1","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    br1: new Cell(7, 0),
    br2: new Cell(6, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wn1: new Cell(7, 6),
    wp8: new Cell(5,7)
  };
  game.add_recent_board("white")
  expect(game.board.print_info()).toBe(
`
current board: bk,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,wp*br,,,,,,,*br,,,,,,wn,wk
total black pieces: 3
total white pieces: 3
total pieces: 6
black long castling: false
black short castling: false
white long castling: false
white short castling: false
most recent movement: ,,,,,,
total movements available: 1
next_player: white
`
  );
});

it('spot out precisely the unique white pawn move and update after that move', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wp8"],
  ["br2","","","","","","",""],
  ["br1","","","","","","wn1","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    br1: new Cell(7, 0),
    br2: new Cell(6, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wn1: new Cell(7, 6),
    wp8: new Cell(5,7)
  };
  game.white_move();
  game.add_recent_board("black");
  expect(game.board.print_info()).toBe(
`
current board: bk,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,wp*,,,,,,,*br,,,,,,,*br,,,,,,wn,wk
total black pieces: 3
total white pieces: 3
total pieces: 6
black long castling: false
black short castling: false
white long castling: false
white short castling: false
most recent movement: wp,5,7,wp,4,7,
total movements available: 21
next_player: black
`
  );
});

it('spot out precisely the unique black pawn move', () => {
  no_castling();
  game.positions.cells = [["bk","bn1","","","","","","wr1"],
  ["","","","","","","","wr2"],
  ["bp1","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bn1: new Cell(0, 1),
    bp1: new Cell(2, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wr1: new Cell(0, 7),
    wr2: new Cell(1, 7)
  };
  game.add_recent_board("black")
  expect(game.board.print_info()).toBe(
`
current board: bk,bn,,,,,,wr*,,,,,,,wr*bp,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,wk
total black pieces: 3
total white pieces: 3
total pieces: 6
black long castling: false
black short castling: false
white long castling: false
white short castling: false
most recent movement: ,,,,,,
total movements available: 1
next_player: black
`
  );
});

it('spot out precisely the unique black pawn move and update after that move', () => {
  no_castling();
  game.positions.cells = [["bk","bn1","","","","","","wr1"],
  ["","","","","","","","wr2"],
  ["bp1","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bn1: new Cell(0, 1),
    bp1: new Cell(2, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wr1: new Cell(0, 7),
    wr2: new Cell(1, 7)
  };
  game.black_move();
  game.add_recent_board("white");
  expect(game.board.print_info()).toBe(
`
current board: bk,bn,,,,,,wr*,,,,,,,wr*,,,,,,,*bp,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,wk
total black pieces: 3
total white pieces: 3
total pieces: 6
black long castling: false
black short castling: false
white long castling: false
white short castling: false
most recent movement: bp,2,0,bp,3,0,
total movements available: 21
next_player: white
`
  );
});

it('spot out precisely the unique white knight move', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","","br1"],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["br2","","","","","","",""],
  ["","","","","","","wn1","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    br1: new Cell(0, 7),
    br2: new Cell(6, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wn1: new Cell(7, 6)
  };
  game.add_recent_board("white")
  expect(game.board.print_info()).toBe(
`
current board: bk,,,,,,,br*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*br,,,,,,,*,,,,,,wn,wk
total black pieces: 3
total white pieces: 2
total pieces: 5
black long castling: false
black short castling: false
white long castling: false
white short castling: false
most recent movement: ,,,,,,
total movements available: 1
next_player: white
`
  );
});

it('spot out precisely the unique white knight move and update after that move', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","","br1"],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["br2","","","","","","",""],
  ["","","","","","","wn1","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    br1: new Cell(0, 7),
    br2: new Cell(6, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wn1: new Cell(7, 6)
  };
  game.white_move();
  game.add_recent_board("black");
  expect(game.board.print_info()).toBe(
`
current board: bk,,,,,,,br*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,wn*br,,,,,,,*,,,,,,,wk
total black pieces: 3
total white pieces: 2
total pieces: 5
black long castling: false
black short castling: false
white long castling: false
white short castling: false
most recent movement: wn,7,6,wn,5,7,
total movements available: 27
next_player: black
`
  );
});

it('spot out precisely the unique black knight move', () => {
  no_castling();
  game.positions.cells = [["bk","bn1","","","","","",""],
  ["","","","","","","","wr2"],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["wr1","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bn1: new Cell(0, 1)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wr1: new Cell(7, 0),
    wr2: new Cell(1, 7)
  };
  game.add_recent_board("black")
  expect(game.board.print_info()).toBe(
`
current board: bk,bn,,,,,,*,,,,,,,wr*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*wr,,,,,,,wk
total black pieces: 2
total white pieces: 3
total pieces: 5
black long castling: false
black short castling: false
white long castling: false
white short castling: false
most recent movement: ,,,,,,
total movements available: 1
next_player: black
`
  );
});

it('spot out precisely the unique black knight move and update after that move', () => {
  no_castling();
  game.positions.cells = [["bk","bn1","","","","","",""],
  ["","","","","","","","wr2"],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["wr1","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bn1: new Cell(0, 1)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wr1: new Cell(7, 0),
    wr2: new Cell(1, 7)
  };
  game.black_move();
  game.add_recent_board("white");
  expect(game.board.print_info()).toBe(
`
current board: bk,,,,,,,*,,,,,,,wr*bn,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*wr,,,,,,,wk
total black pieces: 2
total white pieces: 3
total pieces: 5
black long castling: false
black short castling: false
white long castling: false
white short castling: false
most recent movement: bn,0,1,bn,2,0,
total movements available: 27
next_player: white
`
  );
});

it('spot out precisely the unique white bishop move', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","","br1"],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["br2","","","","","","",""],
  ["","","","","","","wb1","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    br1: new Cell(0, 7),
    br2: new Cell(6, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wb1: new Cell(7, 6)
  };
  game.add_recent_board("white")
  expect(game.board.print_info()).toBe(
`
current board: bk,,,,,,,br*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*br,,,,,,,*,,,,,,wb,wk
total black pieces: 3
total white pieces: 2
total pieces: 5
black long castling: false
black short castling: false
white long castling: false
white short castling: false
most recent movement: ,,,,,,
total movements available: 1
next_player: white
`
  );
});

it('spot out precisely the unique white bishop move and update after that move', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","","br1"],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["br2","","","","","","",""],
  ["","","","","","","wb1","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    br1: new Cell(0, 7),
    br2: new Cell(6, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wb1: new Cell(7, 6)
  };
  game.white_move();
  game.add_recent_board("black");
  expect(game.board.print_info()).toBe(
`
current board: bk,,,,,,,br*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*br,,,,,,,wb*,,,,,,,wk
total black pieces: 3
total white pieces: 2
total pieces: 5
black long castling: false
black short castling: false
white long castling: false
white short castling: false
most recent movement: wb,7,6,wb,6,7,
total movements available: 27
next_player: black
`
  );
});

it('spot out precisely the unique black bishop move', () => {
  no_castling();
  game.positions.cells = [["bk","bb1","","","","","",""],
  ["","","","","","","","wr2"],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["wr1","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bb1: new Cell(0, 1)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wr1: new Cell(7, 0),
    wr2: new Cell(1, 7)
  };
  game.add_recent_board("black")
  expect(game.board.print_info()).toBe(
`
current board: bk,bb,,,,,,*,,,,,,,wr*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*wr,,,,,,,wk
total black pieces: 2
total white pieces: 3
total pieces: 5
black long castling: false
black short castling: false
white long castling: false
white short castling: false
most recent movement: ,,,,,,
total movements available: 1
next_player: black
`
  );
});

it('spot out precisely the unique black bishop move and update after that move', () => {
  no_castling();
  game.positions.cells = [["bk","bb1","","","","","",""],
  ["","","","","","","","wr2"],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["wr1","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bb1: new Cell(0, 1)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wr1: new Cell(7, 0),
    wr2: new Cell(1, 7)
  };
  game.black_move();
  game.add_recent_board("white");
  expect(game.board.print_info()).toBe(
`
current board: bk,,,,,,,*bb,,,,,,,wr*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*wr,,,,,,,wk
total black pieces: 2
total white pieces: 3
total pieces: 5
black long castling: false
black short castling: false
white long castling: false
white short castling: false
most recent movement: bb,0,1,bb,1,0,
total movements available: 27
next_player: white
`
  );
});

it('spot out precisely the unique white rock move', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","wr1","",""],
  ["","","","","","","wp7","wp8"],
  ["br1","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    br1: new Cell(7, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wr1: new Cell(5, 5),
    wp7: new Cell(6, 6),
    wp8: new Cell(6, 7)
  };
  game.add_recent_board("white")
  expect(game.board.print_info()).toBe(
`
current board: bk,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,wr,,*,,,,,,wp,wp*br,,,,,,,wk
total black pieces: 2
total white pieces: 4
total pieces: 6
black long castling: false
black short castling: false
white long castling: false
white short castling: false
most recent movement: ,,,,,,
total movements available: 1
next_player: white
`
  );
});

it('spot out precisely the unique white rock move and update after that move', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","wr1","",""],
  ["","","","","","","wp7","wp8"],
  ["br1","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    br1: new Cell(7, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wr1: new Cell(5, 5),
    wp7: new Cell(6, 6),
    wp8: new Cell(6, 7)
  };
  game.white_move();
  game.add_recent_board("black");
  expect(game.board.print_info()).toBe(
`
current board: bk,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,wp,wp*br,,,,,wr,,wk
total black pieces: 2
total white pieces: 4
total pieces: 6
black long castling: false
black short castling: false
white long castling: false
white short castling: false
most recent movement: wr,5,5,wr,7,5,
total movements available: 14
next_player: black
`
  );
});

it('spot out precisely the unique black rock move', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","","wr1"],
  ["bp1","bp2","","","","","",""],
  ["","","br1","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    br1: new Cell(2, 2),
    bp1: new Cell(1, 0),
    bp2: new Cell(1, 1)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wr1: new Cell(0, 7)
  };
  game.add_recent_board("black")
  expect(game.board.print_info()).toBe(
`
current board: bk,,,,,,,wr*bp,bp,,,,,,*,,br,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,wk
total black pieces: 4
total white pieces: 2
total pieces: 6
black long castling: false
black short castling: false
white long castling: false
white short castling: false
most recent movement: ,,,,,,
total movements available: 1
next_player: black
`
  );
});

it('spot out precisely the unique black rock move and update after that move', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","","wr1"],
  ["bp1","bp2","","","","","",""],
  ["","","br1","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    br1: new Cell(2, 2),
    bp1: new Cell(1, 0),
    bp2: new Cell(1, 1)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wr1: new Cell(0, 7)
  };
  game.black_move();
  game.add_recent_board("white");
  expect(game.board.print_info()).toBe(
`
current board: bk,,br,,,,,wr*bp,bp,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,wk
total black pieces: 4
total white pieces: 2
total pieces: 6
black long castling: false
black short castling: false
white long castling: false
white short castling: false
most recent movement: br,2,2,br,0,2,
total movements available: 14
next_player: white
`
  );
});

it('spot out precisely the unique white queen move', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","wq1",""],
  ["","","","","","","wp7","wp8"],
  ["br1","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    br1: new Cell(7, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wq1: new Cell(5, 6),
    wp7: new Cell(6, 6),
    wp8: new Cell(6, 7)
  };
  game.add_recent_board("white")
  expect(game.board.print_info()).toBe(
`
current board: bk,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,wq,*,,,,,,wp,wp*br,,,,,,,wk
total black pieces: 2
total white pieces: 4
total pieces: 6
black long castling: false
black short castling: false
white long castling: false
white short castling: false
most recent movement: ,,,,,,
total movements available: 1
next_player: white
`
  );
});

it('spot out precisely the unique white queen move and update after that move', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","wq1",""],
  ["","","","","","","wp7","wp8"],
  ["br1","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    br1: new Cell(7, 0)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wq1: new Cell(5, 6),
    wp7: new Cell(6, 6),
    wp8: new Cell(6, 7)
  };
  game.white_move();
  game.add_recent_board("black");
  expect(game.board.print_info()).toBe(
`
current board: bk,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,wp,wp*br,,,,wq,,,wk
total black pieces: 2
total white pieces: 4
total pieces: 6
black long castling: false
black short castling: false
white long castling: false
white short castling: false
most recent movement: wq,5,6,wq,7,4,
total movements available: 13
next_player: black
`
  );
});

it('spot out precisely the unique black queen move', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","","wr1"],
  ["bp1","bp2","","","","","",""],
  ["","bq1","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bq1: new Cell(2, 1),
    bp1: new Cell(1, 0),
    bp2: new Cell(1, 1)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wr1: new Cell(0, 7)
  };
  game.add_recent_board("black")
  expect(game.board.print_info()).toBe(
`
current board: bk,,,,,,,wr*bp,bp,,,,,,*,bq,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,wk
total black pieces: 4
total white pieces: 2
total pieces: 6
black long castling: false
black short castling: false
white long castling: false
white short castling: false
most recent movement: ,,,,,,
total movements available: 1
next_player: black
`
  );
});

it('spot out precisely the unique black queen move and update after that move', () => {
  no_castling();
  game.positions.cells = [["bk","","","","","","","wr1"],
  ["bp1","bp2","","","","","",""],
  ["","bq1","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","","wk"]];
  game.positions.black_pieces = {
    bk: new Cell(0, 0),
    bq1: new Cell(2, 1),
    bp1: new Cell(1, 0),
    bp2: new Cell(1, 1)
  };
  game.positions.white_pieces = {
    wk: new Cell(7, 7),
    wr1: new Cell(0, 7)
  };
  game.black_move();
  game.add_recent_board("white");
  expect(game.board.print_info()).toBe(
`
current board: bk,,,bq,,,,wr*bp,bp,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,wk
total black pieces: 4
total white pieces: 2
total pieces: 6
black long castling: false
black short castling: false
white long castling: false
white short castling: false
most recent movement: bq,2,1,bq,0,3,
total movements available: 13
next_player: white
`
  );
});

it('spot out precisely the position and board data for white movement after the next two moves', () => {
  no_castling();
  game.positions.cells = [["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","wr1","","wr2","",""],
  ["","","","","bk","","",""],
  ["","","","br1","","","",""],
  ["","","wb1","","","wp6","wk",""],
  ["br2","","","","","bb1","wn1","wb2"]];
  game.positions.black_pieces = {
    bk: new Cell(4, 4),
    br1: new Cell(5, 3),
    br2: new Cell(7, 0),
    bb1: new Cell(7, 5)
  };
  game.positions.white_pieces = {
    wk: new Cell(6, 6),
    wp6: new Cell(6, 5),
    wr1: new Cell(3, 3),
    wr2: new Cell(3, 5),
    wb1: new Cell(6, 2),
    wb2: new Cell(7, 7),
    wn1: new Cell(7, 6)
  };
  game.white_move();
  game.black_move();
  game.add_recent_board("white");
  expect(game.board.print_info()).toBe(
`
current board: ,,,,,,,*,,,,,,,*,,,,,,,*,,,wr,,wr,,*,,,,bk,,,*,,,br,,,,*,,wb,,,wp,bb,wk*br,,,,,,wn,wb
total black pieces: 4
total white pieces: 7
total pieces: 11
black long castling: false
black short castling: false
white long castling: false
white short castling: false
most recent movement: bb,7,5,bb,6,6,
total movements available: 29
next_player: white
`
  );
});

it('spot out precisely the position and board for black movement data after the next two moves', () => {
  no_castling();
  game.positions.cells = [
  ["bb2","bn1","wb1","","","","","wr1"],
  ["","bk","bp3","","","bb1","",""],
  ["","","","","wr2","","",""],
  ["","","","wk","","","",""],
  ["","","br2","","br1","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""]];
  game.positions.black_pieces = {
    bk: new Cell(1, 1),
    bp3: new Cell(1, 2),
    br1: new Cell(4, 4),
    br2: new Cell(4, 2),
    bb1: new Cell(1, 5),
    bb2: new Cell(0, 0),
    bn1: new Cell(0, 1)
  };
  game.positions.white_pieces = {
    wk: new Cell(3, 3),
    wr1: new Cell(0, 7),
    wr2: new Cell(2, 4),
    wb1: new Cell(0, 2)
  };
  game.black_move();
  game.white_move();
  game.add_recent_board("black");
  expect(game.board.print_info()).toBe(
`
current board: bb,bn,,,,,,wr*bk,wb,bp,,,bb,,*,,,,wr,,,*,,,wk,,,,*,,br,,br,,,*,,,,,,,*,,,,,,,*,,,,,,,
total black pieces: 7
total white pieces: 4
total pieces: 11
black long castling: false
black short castling: false
white long castling: false
white short castling: false
most recent movement: wb,0,2,wb,1,1,
total movements available: 29
next_player: black
`
  );
});