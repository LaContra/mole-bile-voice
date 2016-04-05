// $(function(){ // on dom ready

var cy = cytoscape({
  container: document.getElementById('cy'),
  
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
    }
  ],
  
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
      
    ]
  },
  
  layout: {
    name: 'preset',
    padding: 5
  }
});

cy.on('select', 'node', function(evt){
  var node = evt.cyTarget;
  console.log( 'select ' + node.id() );
});

cy.on('select', 'edge', function(evt){
  var edge = evt.cyTarget;
  console.log( 'select ' + edge.id() );
});


var cxtdragStart = false;
var edgeFrom = null, edgeTo = null;

cy.on('cxtdrag', 'node', function(evt){
  var node = evt.cyTarget;
  // console.log( 'cxtdrag ' + node.id() );
  cxtdragStart = true;
  edgeFrom = node;
});
cy.on('cxtdragover', 'node', function(evt){
  var node = evt.cyTarget;
  // console.log( 'cxtdragover ' + node.id() );
  if (!cxtdragStart || node == edgeFrom) {
    return;
  }
  edgeTo = node;
});
cy.on('cxtdragout', 'node', function(evt){
  var node = evt.cyTarget;
  // console.log( 'cxtdragout ' + node.id() );
  if (!cxtdragStart || node != edgeTo) {
    return
  }
  edgeTo = null;
});
cy.on('cxttapend', 'node', function(evt){
  var node = evt.cyTarget;
  // console.log( 'cxttapend ' + node.id() );
  if (!cxtdragStart) {
    return
  }
  cxtdragStart = false;
  if (edgeTo == null) {
    return
  }
  // console.log(edgeFrom.id(), edgeTo.id());
  cy.add({
    group: "edges",
    data: { source: edgeFrom.id(), target: edgeTo.id() }
  });

  edgeTo = null;
});

$("#add_node_btn").click(function() {
  cy.add({
    group: "nodes",
    data: { name: $("#node_name").val(), position: { x: 0, y: 0 } }
  });
});

$("#export_btn").click(function() {
  console.log(cy.json().elements);
});

// }); // on dom ready