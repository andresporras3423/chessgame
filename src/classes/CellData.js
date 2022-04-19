import Colors from './Colors.js';

// properties info about each board cell
// PROPERTIES
// y= row value, start by 0, 0 and 1 rows are initial black pieces, 6 and 7 rows are for white pieces
// x= column value, start by 0
// example 1: y=0, x=0 is the initial position for the black rock of long castling
// example 2: y=7, x=7 is the initial position for the white rock of short castling
// piece=piece name
// list of color for the piece
class CellData{
  constructor(y, x, piece){
    this.y=y;
    this.x=x;
    this.piece=piece;
    this.colors={};
    this.initialColors();
  }

  initialColors = ()=>{
    const castlings = ["00","07","70","77"];
    if((this.y+this.x)%2==0) this.colors["white"] = Colors["white"];
    else this.colors["black"] = Colors["black"];
    if(castlings.includes(`${this.y}${this.x}`)) this.colors["castling-available"] = Colors["castling-available"];
  }

  currentColor =()=>{
    const color =Object.values(this.colors).reduce((maxColor, nColor)=>{
      if(maxColor["value"]>nColor["value"]) return maxColor;
      return nColor;
    },{"value": 0});
    return color["class"];
  }

  removeColor =(newColor)=>{
    delete this.colors[newColor];
  }

  addColor =(newColor)=>{
    this.colors[newColor] = Colors[newColor];
  }
}
export default CellData;