class vertex {
  number;
  isInTree;
  constructor(number) {
    this.number = number;
    this.isInTree = false;
  }
  translateToCoord() {
    this.number -= 1;
    let X = this.number % 8;
    let Y = (this.number - X) / 8;
    return [X, Y];
  }
}
module.exports.vertex = vertex;
