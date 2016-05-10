import 'mousetrap'
import React from 'react'
import { connect } from 'react-redux'
import LocalStorage from '../../utils/LocalStorage'
<<<<<<< d723d6acbce216f2bcabe4a19a3b040869307cc8
import SessionStorage from '../../utils/SessionStorage'
=======
>>>>>>> When clicking on one element, all other elements will be unselected.
import { addEdge, showHideIntentProperties, copy, parseAndPaste, undo, redo, deleteElements, unselectElementsExcept } from '../../common/actions'
import cytoscape from 'cytoscape'
import SessionStorage from '../../utils/SessionStorage'


const Cy = React.createClass({
  componentDidMount: function() {
    this.createCy();
    Mousetrap.bind(['command+c', 'ctrl+c'], () => {
      this.props.copy(this.cy.$(":selected").jsons())
    });
    Mousetrap.bind(['command+v', 'ctrl+v'], this.props.paste);
    Mousetrap.bind(['command+z', 'ctrl+z'], this.props.undo);
    Mousetrap.bind(['command+shift+z', 'command+y', 'ctrl+y'], this.props.redo);
    Mousetrap.bind(['del', 'command+del', 'backspace', 'command+backspace'], () => {
      this.props.delete(this.cy.$(":selected").jsons())
    });
    Mousetrap.bind(['shift', 'command'],() => SessionStorage.changeMultiSelectStatus(true), 'keydown');
    Mousetrap.bind(['shift', 'command'],() => SessionStorage.changeMultiSelectStatus(false), 'keyup');
  },

  componentWillUnmount: function() {
    Mousetrap.unbind(['command+c', 'ctrl+c']);
    Mousetrap.unbind(['command+v', 'ctrl+v']);
    Mousetrap.unbind(['command+z', 'ctrl+z']);
    Mousetrap.unbind(['command+shift+z', 'command+y', 'ctrl+y']);
    Mousetrap.unbind(['del', 'command+del', 'backspace', 'command+backspace']);
    Mousetrap.unbind(['shift', 'command']);
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
    this.cy.on('select', '', (e) => {
      if(!SessionStorage.getMultiSelectStatus()) {
        this.props.unselectElementsExcept(e.cyTarget.json())
      }
    });

    this.cy.ready(this.setViewport)
    this.cy.on('pan', this.setViewport)

  },

  setViewport: function(evt) {
    SessionStorage.setViewport({
      x: -evt.cy.pan().x / evt.cy.zoom() + 40,
      y: -evt.cy.pan().y / evt.cy.zoom() + 40,
    })
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
    },
    copy: (selectedElements) => {
      dispatch(copy(selectedElements))
    },
    paste: () => {
      dispatch(parseAndPaste())
    },
    undo: () => {
      dispatch(undo())
    },
    redo: () => {
      dispatch(redo())
    },
    delete: (selectedElements) => {
      dispatch(deleteElements(selectedElements))
      dispatch(showHideIntentProperties())
    },
    unselectElementsExcept: (element) => {
      dispatch(unselectElementsExcept(element))
    }
  }
}

const CyReact = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cy)

export default CyReact