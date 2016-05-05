import React from 'react'
import { connect } from 'react-redux'
import LocalStorage from '../../utils/LocalStorage'
import { addEdge, showHideIntentProperties, selectElements } from '../../common/actions'
import cytoscape from 'cytoscape'


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

    this.setEventListner();
    this.showHideIntentProperties();
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
    this.cy.on('position', this.saveToLocalStorage);

    // show or hide intent info editor
    this.cy.on('select, unselect', 'node', this.showHideIntentProperties);

    this.cy.on('select, unselect', '', this.selectedElementsChanged);

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

  showHideIntentProperties: function() {
    const selectedUserSays = this.cy.$("node:selected");
    let targetNode = null, type = null;
    if (selectedUserSays.length == 1) {
      targetNode = selectedUserSays[0].json();
      type = selectedUserSays[0].hasClass("user_says")? "userSays": "response"
    }
    this.props.showHideIntentProperties(targetNode, type);
  },

  selectedElementsChanged: function() {
    this.props.selectElements(this.cy.$(":selected").jsons());
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
    showHideIntentProperties: (targetNode, nodeType) => {
      dispatch(showHideIntentProperties(targetNode, nodeType));
    },
    selectElements: (elements) => {
      dispatch(selectElements(elements));
    }
  }
}

const CyReact = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cy)

export default CyReact