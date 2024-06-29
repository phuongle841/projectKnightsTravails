class vertex {
  label;
  wasVisited;
  constructor(lab) {
    this.label = lab;
    this.wasVisited = false;
  }
}
module.exports.vertex = vertex;
