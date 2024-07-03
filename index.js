const { graph } = require("./graph");
class buildScript {
  run() {
    const myGraph = new graph();
    myGraph.addVertex("A");
    myGraph.addVertex("B");
    myGraph.addVertex("C");
    myGraph.addVertex("D");
    myGraph.addVertex("E");
    myGraph.addVertex("F");
    myGraph.addVertex("G");
    myGraph.addVertex("H");
    myGraph.addVertex("I");

    myGraph.addEdge(0, 7, 1);
    myGraph.addEdge(0, 5, 1);
    myGraph.addEdge(1, 6, 1);
    myGraph.addEdge(1, 8, 1);
    myGraph.addEdge(2, 7, 1);
    myGraph.addEdge(2, 3, 1);
    myGraph.addEdge(3, 8, 1);
    myGraph.addEdge(3, 2, 1);
    myGraph.addEdge(5, 6, 1);
    myGraph.addEdge(5, 0, 1);
    myGraph.addEdge(6, 1, 1);
    myGraph.addEdge(6, 5, 1);
    myGraph.addEdge(7, 0, 1);
    myGraph.addEdge(7, 2, 1);
    myGraph.addEdge(8, 1, 1);
    myGraph.addEdge(8, 3, 1);

    // find path from D
    myGraph.path(1, 2);
  }
}
let script = new buildScript();
script.run();
// there is two path to go:
// the first one is using coordinate and object to store the adjMax
// the second is using the number then translate that number back to coordinate later
