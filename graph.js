const { vertex } = require("./vertex");
const { DistPar } = require("./DistPar");

class graph {
  maxVertex = 9;
  INFINITY = Infinity;
  vertexList; // list of vertexes
  adjMat; // adjacency matrix
  nVertex; // current number of vertices
  nTree;
  sPath;
  currentVert;
  startToCurrent;
  constructor() {
    this.vertexList = [];
    this.nVertex = 0;
    this.adjMat = [];
    this.nTree = 0;

    for (let i = 0; i < this.maxVertex; i++) {
      this.adjMat[i] = [];
      for (let j = 0; j < this.maxVertex; j++) {
        this.adjMat[i].push([]);
        this.adjMat[i][j] = 0;
      }
    }
    this.sPath = [];
  }
  displayMatrix() {
    console.log(this.adjMat);
  }
  addVertex(lab) {
    this.vertexList[this.nVertex++] = new vertex(lab);
  }
  addEdge(start, end, weight) {
    this.adjMat[(start, end)] = weight;
    // this is for un-direction
    // this.adjMat[(start, end)] = weight;
  }
  path() {
    let startTree = 0;
    this.vertexList[startTree].isInTree = true;
    console.log(this.vertexList[startTree]);
    this.nTree = 1;
    for (let j = 0; j < this.nVertex; j++) {
      let tempDist = this.adjMat[startTree][j];
      this.sPath[j] = new DistPar(startTree, tempDist);
    }
    while (this.nTree < this.nVertex) {
      let indexMin = this.getMin();
      let minDist = this.sPath[indexMin].distance;

      if (minDist == Infinity) {
        console.log("there is unreachable leave");
        break;
      } else {
        this.currentVert = indexMin;
        this.startToCurrent = this.sPath[indexMin].distance;
      }
      this.vertexList[this.currentVert].isInTree = true;
      this.nTree++;
    }
    this.nTree = 0;
    for (let i = 0; i < this.nVertex; i++) {
      this.vertexList[i].isInTree = false;
    }
  }
  getMin() {
    let minDist = Infinity;
    let indexMin = 0;
    for (let i = 0; i < this.nVertex; i++) {
      if (!this.vertexList[i].isInTree && this.sPath[i].distance < minDist) {
        minDist = this.sPath[i].distance;
        indexMin = i;
      }
    }
    return minDist;
  }
  adjust_sPath() {
    let column = 1;
    while (column < this.nVertex) {
      if (this.vertexList[column].isInTree) {
        column++;
        continue;
      }
      let currentToFringe = this.adjMat[this.currentVert][column];
      let startToFringe = this.startToCurrent + currentToFringe;
      let sPathDist = this.sPath[column].distance;
      if (startToFringe < sPathDist) {
        this.sPath[column].parentVert = this.currentVert;
        this.sPath[column].distance = startToFringe;
      }
      column++;
    }
  }
  displayPaths() {
    console.log(this.vertexList);
    for (let i = 0; i < this.nVertex; i++) {
      // console.log(this.vertexList[i] + " =");
      // if (this.sPath[i].distance == Infinity) {
      //   console.log("inf");
      // } else {
      //   console.log(this.sPath[i].distance);
      // }
    }
    console.log();
  }
}
const myGraph = new graph();
myGraph.addVertex("A");
myGraph.addVertex("B");
myGraph.addVertex("C");
myGraph.addVertex("D");
myGraph.addVertex("E");

myGraph.addEdge(0, 1, 1);
myGraph.addEdge(0, 3, 1);
myGraph.addEdge(1, 2, 1);
myGraph.addEdge(1, 3, 1);
myGraph.addEdge(2, 4, 1);
myGraph.addEdge(3, 2, 1);
myGraph.addEdge(3, 4, 1);
myGraph.addEdge(4, 1, 1);

myGraph.displayPaths();
// there is two path to go:
// the first one is using coordinate and object to store the adjMax
// the second is using the number then translate that number back to coordinate later
