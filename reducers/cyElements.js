import LocalStorage from '../utils/LocalStorage'
import $ from 'jquery'

const unselectElement = (element) => {
  return Object.assign({}, element, {selected: false})
}

const modifyElement = (element, targetId, userSays, response) => {
  if (element.data.id !== targetId) {
    return element
  }
  return Object.assign({}, element, {data: {USER_SAYS: userSays, RESPONSE: response, id: targetId}})
}

const filterNode = (element) => {
  return element.group == "nodes"
}

const filterEdge = (element) => {
  return element.group == "edges"
}

const getContextNameFromEdge = (edge) => {
  return edge.data.source + "_to_" + edge.data.target
}

const getEdgesIn = (node, elements) => {
  return elements.filter(filterEdge).filter(e => { 
      return e.data.target == node.data.id
  })
}

const getEdgesOut = (node, elements) => {
  return elements.filter(filterEdge).filter(e => { 
      return e.data.source == node.data.id
  })
}

const getEdgesBetween = (nodeFromId, nodeToId, elements) => {
  return elements.filter(filterEdge).filter(edge => {
    return edge.data.source == nodeFromId && edge.data.target == nodeToId
  })
}

const buildIntentsDataFromCyElements = (state) => {
  // for every nodes
  return state.filter(filterNode).map(node => {
    const contextsIn = getEdgesIn(node, state).map(getContextNameFromEdge)
    const contextsOut = getEdgesOut(node, state).map(getContextNameFromEdge)

    console.log(contextsIn)
    console.log(contextsOut)

    return {
      name: node.data.id,
      contexts: contextsIn,
      templates: [node.data.USER_SAYS],
      responses: [
        {
          speech: node.data.RESPONSE,
          affectedContexts: contextsOut
        }
      ]
    }
  })
}

const sendCreateIntentRequest = (intentData) => {
  $.ajax({
      url: "https://api.api.ai/v1/intents?v=20160416",
      beforeSend: function (request) {
          request.setRequestHeader("Authorization", "Bearer key");
      },
      type: "POST",
      data: JSON.stringify(intentData),
      contentType: "application/json",
      complete: function(e) { console.log(e)}
  })
}

const cyElements = (state, action) => {
  if (typeof state === 'undefined') {
    const localState = LocalStorage.getElements();
    console.log(localState)
    return localState == null? []: localState
  }

  switch(action.type) {
    /* panel control */
    case 'CLEAR_INTENTS':
      console.log('clear intents');
      return []

    case 'ADD_INTENT':
      return [ ...state.map(t => unselectElement(t)), {
          group: "nodes",
          data: { user_says: "", id: action.id-3 },
          classes: "user_says",
          position: {x: 100, y: 100},
        },
        {
          group: "nodes",
          data: { response: "", id: action.id-2 },
          classes: "response",
          position: {x: 140, y: 100},
        },
        {
          group: "edges",
          data: {source: action.id-3, target: action.id-2, id: action.id-1},
          classes: "us2r",
        }
      ]
      // TODO: position
      // position: { x: -this.state.cy.viewport().pan().x / this.state.cy.zoom() + 40, y: -this.state.cy.viewport().pan().y / this.state.cy.zoom() + 40 }

    case 'ADD_EDGE':
      console.log("add edge");
      // FIXME: temporarily avoid cycle in one intent
      if (getEdgesBetween(action.target, action.source, state).length > 0) {
        return state.map(t => unselectElement(t))
      }
      return [ ...state.map(t => unselectElement(t)), {
          group: "edges",
          data: {source: action.source, target: action.target, id: action.id},
          classes: "r2us",
      }]
    
    case "SAVE_INTENT_PROPERTIES":
      console.log("save intent properties");
      return state.map(t => modifyElement(unselectElement(t), action.nodeId, action.userSays, action.response))

    // create intent 
    case 'SEND_CREATE_INTENT_REQUEST':
      console.log("send create intent request");
      buildIntentsDataFromCyElements(state).forEach(sendCreateIntentRequest)
      return state

    default:
      return state
  }
}

export default cyElements
