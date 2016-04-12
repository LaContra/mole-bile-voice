var React = require('react');
var ReactDOM = require('react-dom');
var LocalStorage = require('./LocalStorage');

var CyReact = React.createClass({
  componentWillMount: function() {
    //FIXME
    window.removeIntents = this.removeIntents;
    window.unselectElements = this.unselectElements;
    window.saveCyIntentProperty = this.saveCyIntentProperty;
    window.updateCyIntentLabel = this.updateCyIntentLabel;
    window.sendCreateCyIntentRequest = this.sendCreateCyIntentRequest;
  },

  getInitialState: function() {
    this._cxtdragStart = false;
    this._edgeFrom = null;
    this._edgeTo = null;

    var elements = LocalStorage.getElements();

    var cy = cytoscape({
        container: document.getElementById(this.props.containerId),

        boxSelectionEnabled: false,
        selectionType: 'additive',
        autounselectify: false,
        minZoom: 1,
        maxZoom: 10,

        style: [{
        selector: 'node',
        css: {
            'label': 'data(user_says)',
            'text-valign': 'center',
            'text-halign': 'center',
            'color': 'white',
            'text-outline-width': 2,
            'text-outline-color': '#888',
            'shape': 'rectangle',
        }
        }, {
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
        }, {
            selector: 'edge',
            css: {
                'target-arrow-shape': 'triangle',
                // 'content': 'data(id)'
            }
        }, {
            selector: ':selected',
            css: {
                'background-color': 'black',
                'line-color': 'black',
                'target-arrow-color': 'black',
                'source-arrow-color': 'black',
                'text-outline-color': 'black',
            }
        }],
        elements: elements,
        layout: {
            name: 'preset',
            padding: 5
        }
    });

    /* Edge control */
    cy.on('cxtdrag', 'node', this.dragNode);
    cy.on('cxtdragover', 'node', this.dragOverNode);
    cy.on('cxtdragout', 'node', this.dragOutNode);
    cy.on('cxttapend', 'node', this.tapEndNode);

    // save elements to localstorage
    cy.on('add, remove, position, data', this.saveToLocalStorage);

    // show or hide intent info editor
    cy.on('select, unselect', 'node, edge', this.showHideIntentProperty);

    // TODO
    // delete intent or edge
    $('body').keydown(function(event) {
        if ($("input[type='text']:focus").length > 0) {
            return;
        }
        var key = event.which || event.keyCode; // event.keyCode is used for IE8 and earlier
        if (key == 8) {
            cy.$(':selected').unselect().remove();
        }
    })

    return {cy: cy};
  },

  //TODO
  removeIntents: function() {
    this.state.cy.elements().remove();
  },

  // TODO
  unselectElements: function() {
    this.state.cy.$(":selected").unselect();
    this.state.cy.add({
        group: "nodes",
        data: { user_says: "", response: "" },
        position: { x: -this.state.cy.viewport().pan().x / this.state.cy.zoom() + 40, y: -this.state.cy.viewport().pan().y / this.state.cy.zoom() + 40 }
    }).select();
  },

  // TODO
  saveCyIntentProperty: function() {
    this.state.cy.$("node:selected").data({
      user_says: $("#intent_info #user_says").val(),
      response: $("#intent_info #response").val()
    }).unselect();
  },

  saveToLocalStorage: function (evt) {
    // saveElements();
    LocalStorage.saveElements(this.state.cy.json().elements);
  },

  // TODO
  showHideIntentProperty: function(evt) {
    if (this.state.cy.$(":selected").length == 1 && this.state.cy.$("node:selected").length == 1) {
        var node = this.state.cy.$("node:selected")[0];
        $("#intent_info #user_says").val(node.data("user_says"));
        $("#intent_info #response").val(node.data("response"));
        $("#intent_info").show();
    }
    else {
        $("#intent_info").hide();
    }
  },

  // TODO
  updateCyIntentLabel: function(value) {
    this.state.cy.style().selector('node').style("label", "data(" + value + ")").update();
    console.log("update label in cyreact: "+value);
  },

  // TODO
  sendCreateCyIntentRequest: function() {
    this.state.cy.nodes().map(function(node) {
        console.log("submit " + node.data("user_says"));
        // var data = {};
        // data['name'] = node.id();
        // data['templates'] = [node.data("user_says")];
        // data['responses'] = [{'speech': node.data("response")}];

        // $.ajax({
        //     url: "https://api.api.ai/v1/intents?v=20160403",
        //     beforeSend: function (request) {
        //         request.setRequestHeader("Authorization", "Bearer key");
        //     },
        //     type: "POST",
        //     data: JSON.stringify(data),
        //     contentType: "application/json",
        //     complete: function(e) { console.log(e)}
        // });
    });
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

module.exports = CyReact;