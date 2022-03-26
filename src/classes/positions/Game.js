class Game{
  constructor(computerSymbol, humanSymbol){
    this.computerSymbol = computerSymbol;
    this.humanSymbol = humanSymbol;
    this.sols= [{"coords": [[0,0],[0,1],[0,2]], "x": "x_row", "o": "o_row"},
    {"coords": [[1,0],[1,1],[1,2]], "x": "x_row", "o": "o_row"},
    {"coords": [[2,0],[2,1],[2,2]], "x": "x_row", "o": "o_row"},
    {"coords": [[0,0],[1,0],[2,0]], "x": "x_column", "o": "o_column"},
    {"coords": [[0,1],[1,1],[2,1]], "x": "x_column", "o": "o_column"},
    {"coords": [[0,2],[1,2],[2,2]], "x": "x_column", "o": "o_column"},
    {"coords": [[0,0],[1,1],[2,2]], "x": "x_diagonal1", "o": "o_diagonal1"},
    {"coords": [[0,2],[1,1],[2,0]], "x": "x_diagonal2", "o": "o_diagonal2"}]
  }
}
export default Game;