import React from 'react'
import { connect } from 'react-redux'
import LocalStorage from '../../utils/LocalStorage'
import { addEdge, showHideIntentProperties } from '../../common/actions'
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
    this.cy.on('cxtdrag', 'node.response', this.dragNode);
    this.cy.on('cxtdragover', 'node.user_says', this.dragOverNode);
    this.cy.on('cxtdragout', 'node.user_says', this.dragOutNode);
    this.cy.on('cxttapend', 'node.response', this.tapEndNode);

    // save elements to local storage
    this.cy.on('position', this.saveToLocalStorage);

    // show or hide intent info editor
    this.cy.on('select, unselect', 'node', this.showHideIntentProperties);

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

  showHideIntentProperties: function() {
    const selectedUserSays = this.cy.$("node:selected");
    let targetNode = null, type = null;
    if (selectedUserSays.length == 1) {
      targetNode = selectedUserSays[0].json();
      type = selectedUserSays[0].hasClass("user_says")? "userSays": "response"
    }
    this.props.showHideIntentProperties(targetNode, type);
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
    }
  }
}

const CyReact = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cy)

export default CyReact