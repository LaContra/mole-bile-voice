var React = require('react');
var ReactDOM = require('react-dom');

var CyReact = React.createClass({

  getInitialState: function() {
    this._cxtdragStart = false;
    this._edgeFrom = null;
    this._edgeTo = null;

    var cy = cytoscape({
      container: document.getElementById(this.props.containerId),

      boxSelectionEnabled: false,
      selectionType: 'single',
      autounselectify: false,
      minZoom: 1,
      maxZoom: 10,

      style: [
      {
        selector: 'node',
        css: {
          'content': 'data(name)',
          'text-valign': 'center',
          'text-halign': 'center'
        }
      },
      {
        selector: '$node > node',
        css: {
          'padding-top': '10px',
          'padding-left': '10px',
          'padding-bottom': '10px',
          'padding-right': '10px',
          'text-valign': 'top',
          'text-halign': 'center',
          'background-color': '#bbb'
        }
      },
      {
        selector: 'edge',
        css: {
          'target-arrow-shape': 'triangle',
          'content': 'data(id)'
        }
      },
      {
        selector: ':selected',
        css: {
          'background-color': 'black',
          'line-color': 'black',
          'target-arrow-color': 'black',
          'source-arrow-color': 'black'
        }
      }],
    
      elements: {
        nodes: [
          { data: { id: 'a', yaya: 'test', name: 'a' }, position: { x: 215, y: 85 } },
          { data: { id: 'b', name: 'b' }, position: { x: 300, y: 85 } },
          { data: { id: 'c', name: 'c' }, position: { x: 215, y: 175 } },
          { data: { id: 'd', name: 'd' }, position: { x: 300, y: 175 } }
        ],
        edges: [
          { data: { id: 'ac', source: 'a', target: 'c' } }
          // { data: { id: 'eb', source: 'e', target: 'b' } }
        ],
      },

      layout: {
        name: 'preset',
        padding: 5
      }
    });

    cy.on('cxtdrag', 'node', this.dragNode);
    cy.on('cxtdragover', 'node', this.dragOverNode);
    cy.on('cxtdragout', 'node', this.dragOutNode);
    cy.on('cxttapend', 'node', this.tapEndNode);

    return {cy: cy};
  },

  addEdge: function(source, target) {
    this.state.cy.add({group: "edges",data: {source: source, target: target}});
  },

  dragNode: function(evt) {
    var node = evt.cyTarget;
    this._cxtdragStart = true;
    this._edgeFrom = node;
  },

  dragOverNode: function(evt) {
    var node = evt.cyTarget;
    if (!this._cxtdragStart || node == this._edgeFrom) {
        return;
    }
    this._edgeTo = node;
  },

  dragOutNode: function(evt) {
    var node = evt.cyTarget;
    if (!this._cxtdragStart || node != this._edgeTo) {
        return
    }
    this._edgeTo = null;
  },

  tapEndNode: function(evt) {
    var node = evt.cyTarget;
    if (!this._cxtdragStart) {
        return
    }
    this._cxtdragStart = false;
    if (this._edgeTo == null) {
        return
    }
    this.addEdge(this._edgeFrom.id(), this._edgeTo.id());
    this._edgeTo = null;
  },

  render: function() { return }
});

ReactDOM.render(
  <CyReact containerId="react"/>,
  document.getElementById("react")
);



// $("#add_node_btn").click(function() {
//   cy.add({
//     group: "nodes",
//     data: {
//       name: $("#node_name").val(),
//       position: {
//         x: 0,
//         y: 0
//       }
//     }
//   });
// });

// $("#export_btn").click(function() {
//   console.log(cy.json().elements);
// });

module.exports = CyReact;