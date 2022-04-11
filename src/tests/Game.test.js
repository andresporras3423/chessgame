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

it('spot out precisely the only unique white king move', () => {
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

it('spot out precisely the only unique white king move and update after that move', () => {
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