const { buildScript } = require("./index");
const myScript = new buildScript();
console.log("here is the path to go from 0,0 to 7,7 as a knight piece");
myScript.run([0, 0], [7, 7]);
