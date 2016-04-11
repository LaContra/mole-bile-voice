var React = require('react');
var ReactDOM = require('react-dom');

var CyReact = React.createClass({

  getInitialState: function() {
    return {cxtdragStart: '', edgeFrom:'', edgeTo:''};
  },

  selectNode: function(evt) {
    var node = evt.cyTarget;
    console.log('select ' + node.id());
  },

  selectEdge: function(evt) {
    var edge = evt.cyTarget;
    console.log('select ' + edge.id());
  },

  dragNode: function(evt) {
    var node = evt.cyTarget;
    console.log( 'cxtdrag ' + node.id() );
    this.setState({cxtdragStart: 'start'});
    this.setState({edgeFrom: node});
  },

  dragOverNode: function(evt) {
    var node = evt.cyTarget;
    console.log( 'cxtdragover ' + node.id() );
    if (this.state.cxtdragStart == '' || node == this.state.edgeFrom) {
      return;
    }
    this.setState({edgeTo: node});
  },

  dragOutNode: function(evt) {
    var node = evt.cyTarget;
    console.log( 'cxtdragout ' + node.id() );
    if (this.state.cxtdragStart == '' || node != this.state.edgeTo) {
      return
    }
    this.setState({edgeTo: ''});
  },

  tapEndNode: function(evt) {
    var node = evt.cyTarget;
    console.log( 'cxttapend ' + node.id() );
    if (this.state.cxtdragStart == '') {
      return
    }
    this.setState({cxtdragStart: ''});
    if (this.state.edgeTo == '') {
      return
    }
    console.log(this.state.edgeFrom.id(), this.state.edgeTo.id());
    this.state.cy.add({
      group: "edges",
      data: {
        source: this.state.edgeFrom.id(),
        target: this.state.edgeTo.id()
      }
    });
    this.setState({edgeTo: ''});
  },

  render: function() {
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
          { data: { id: 'aaaaaaa', yaya: 'test', name: 'syayayaya' }, position: { x: 215, y: 85 } },
          { data: { id: 'c', name: 'yy' }, position: { x: 300, y: 85 } },
          { data: { id: 'd' }, position: { x: 215, y: 175 } },
          { data: { id: 'f' }, position: { x: 300, y: 175 } }
        ],
        edges: [
          { data: { id: 'ad', source: 'aaaaaaa', target: 'd' } }
          // { data: { id: 'eb', source: 'e', target: 'b' } }
        ],
      },

      layout: {
        name: 'preset',
        padding: 5
      }
    });

    this.setState({cy: cy});

    cy.on('select', 'node', this.selectNode);
    cy.on('select', 'edge', this.selectEdge);
    cy.on('cxtdrag', 'node', this.dragNode);
    cy.on('cxtdragover', 'node', this.dragOverNode);
    cy.on('cxtdragout', 'node', this.dragOutNode);
    cy.on('cxttapend', 'node', this.tapEndNode);
    console.log("bind event");
  }
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