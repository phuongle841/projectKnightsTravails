const { vertex } = require("./vertex");
const { DistPar } = require("./DistPar");

class graph {
  maxVertex = 20;
  vertexList; // list of vertexes
  adjMat; // adjacency matrix
  nVertex; // current number of vertices
  nTree;
  sPath;
  currentVert;
  startToCurrent;
  constructor() {
    this.vertexList = [];
    this.adjMat = [];
    this.nVertex = 0;
    this.nTree = 0;

    for (let i = 0; i < this.maxVertex; i++) {
      this.adjMat[i] = [];
      for (let j = 0; j < this.maxVertex; j++) {
        this.adjMat[i].push([]);
        this.adjMat[i][j] = Infinity;
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
    this.adjMat[start][end] = weight;
    // this is for un-direction
    this.adjMat[start][end] = weight;
  }
  path(start, end) {
    let startTree = start;
    this.vertexList[startTree].isInTree = true;
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
      this.adjust_sPath();
    }
    this.displayPaths(start, end);
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
    return indexMin;
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
  displayPaths(start, end) {
    console.log(this.sPath);
    for (let i = 0; i < this.nVertex; i++) {
      let parent = this.vertexList[this.sPath[i].parentVert].number;
      console.log(this.vertexList[i].number, this.sPath[i].distance, parent);
    }
    let res = [];
    let parent = end;
    while (parent != start) {
      res.push(parent);
      parent = this.sPath[parent].parentVert;
    }
    res.push(start);
    console.log(res);
  }
}
module.exports.graph = graph;
