const { graph } = require("./graph");
class buildScript {
  run(coordinateX, coordinateY) {
    let x = this.unTranslator(coordinateX);
    let y = this.unTranslator(coordinateY);
    const myGraph = new graph();
    for (let i = 0; i < 64; i++) {
      myGraph.addVertex(i);
    }
    for (let i = 0; i < 64; i++) {
      let adjList = this.genAdjVertexes(this.translator(i));
      adjList.forEach((Des) => {
        myGraph.addEdge(i, this.unTranslator(Des), 1);
      });
    }
    myGraph
      .path(x, y)
      .reverse()
      .forEach((value) => {
        console.log(this.translator(value));
      });
  }
  translator(number) {
    return [number % 8, (number - (number % 8)) / 8];
  }
  unTranslator(coordinate) {
    return 8 * coordinate[1] + coordinate[0];
  }
  genAdjVertexes(coordinate) {
    let n = [coordinate[0] + 1, coordinate[1] + 2];
    let s = [coordinate[0] - 1, coordinate[1] - 2];
    let w = [coordinate[0] - 2, coordinate[1] + 1];
    let e = [coordinate[0] + 2, coordinate[1] - 1];
    let ne = [coordinate[0] + 2, coordinate[1] + 1];
    let se = [coordinate[0] + 1, coordinate[1] - 2];
    let sw = [coordinate[0] - 2, coordinate[1] - 1];
    let nw = [coordinate[0] - 1, coordinate[1] + 2];
    let procedure = [];
    procedure.push(n, s, w, e, ne, se, sw, nw);
    let res = procedure.filter((coordinate) => this.testCoord(coordinate));
    return res;
  }
  testCoord(coordinate) {
    return (
      coordinate[0] > -1 &&
      coordinate[0] < 8 &&
      coordinate[1] > -1 &&
      coordinate[1] < 8
    );
  }
}

module.exports.buildScript = buildScript;
