import React from 'react'
import { connect } from 'react-redux'
import LocalStorage from '../utils/LocalStorage'
import { addEdge, showHideIntentProperty } from '../actions'

const Cy = React.createClass({
  componentDidMount: function() {
    this.createCy();
  },

  componentDidUpdate: function() {
    this.updateCy();
    this.saveToLocalStorage();
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return (!(nextProps.graph.elements === this.props.graph.elements) ||
      !(nextProps.graph.style === this.props.graph.style))
  },

  updateCy: function () {
    this.cy.remove("node");
    this.cy.add(this.props.graph.elements);
    this.cy.style(this.props.graph.style);
  },

  createCy: function() {
    this.cy = cytoscape({
      container: document.getElementById(this.props.containerId),

      boxSelectionEnabled: false,
      selectionType: 'additive',
      autounselectify: false,
      minZoom: 1,
      maxZoom: 10,

      style: this.props.graph.style,
      elements: this.props.graph.elements,
      layout: {
        name: 'preset',
        padding: 5
      }
    });

    console.log("created cy");

    this.setEventListner();
    this.showHideIntentProperty();
  },

  setEventListner: function() {
    this._cxtdragStart = false;
    this._edgeFrom = null;
    this._edgeTo = null;

    /* Edge control */
    this.cy.on('cxtdrag', 'node', this.dragNode);
    this.cy.on('cxtdragover', 'node', this.dragOverNode);
    this.cy.on('cxtdragout', 'node', this.dragOutNode);
    this.cy.on('cxttapend', 'node', this.tapEndNode);

    // save elements to local storage
    this.cy.on('remove, position, data', this.saveToLocalStorage);

    // show or hide intent info editor
    this.cy.on('select, unselect', 'node, edge', this.showHideIntentProperty);

    // TODO
    // delete intent or edge
    // $('body').keydown(function(event) {
    //     if ($("input[type='text']:focus").length > 0) {
    //         return;
    //     }
    //     var key = event.which || event.keyCode; // event.keyCode is used for IE8 and earlier
    //     if (key == 8) {
    //         this.cy.$(':selected').unselect().remove();
    //     }
    // })
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

    this.props.addEdge(this._edgeFrom.id(), this._edgeTo.id());
    this._edgeTo = null;
  },

  showHideIntentProperty: function() {
    const selectedElements = this.cy.$(":selected");
    const selectedNodes = this.cy.$("node:selected");
    let targetNode = null
    if (selectedNodes !== undefined && selectedNodes.length == 1)
      targetNode = selectedNodes[0].json()
    this.props.showHideIntentProperty(targetNode);
  },

  saveToLocalStorage: function() {
    LocalStorage.saveElements([...this.cy.nodes().jsons(), ...this.cy.edges().jsons()])
  },

  render: function(){
    return (
      <div id="react" className="cy_container"></div>
    )
  }
});

const mapStateToProps = (state) => {
  return {
    graph: {elements: state.cyElements, style: state.cyStyle}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addEdge: (source, target) => {
      dispatch(addEdge(source, target));
    },
    showHideIntentProperty: (targetNode) => {
      dispatch(showHideIntentProperty(targetNode));
    }
  }
}

const CyReact = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cy)

export default CyReact