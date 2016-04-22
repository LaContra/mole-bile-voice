import LocalStorage from '../utils/LocalStorage'
import $ from 'jquery'

const unselectElement = (element) => {
  return Object.assign({}, element, {selected: false})
}

const modifyElement = (element, targetId, data) => {
  if (element.data.id != targetId) {
    return element
  }
  return Object.assign({}, element, { data: Object.assign({}, data, { id: targetId })} )
}

const filterNode = (element) => {
  return element.group == "nodes"
}

const filterEdge = (element) => {
  return element.group == "edges"
}

const filterNodeUserSays = (element) => {
  return filterNode(element) && element.classes == "user_says"
}

const filterNodeResponse = (element) => {
  return filterNode(element) && element.classes == "response"
}

const filterEdgeOut = (edge, node) => {
  return edge.data.source == node.data.id
}

const filterEdgeIn = (edge, node) => {
  return edge.data.target == node.data.id
}

const getTargetId = (edge, elements) => {
  return edge.data.target
}

const getSourceId = (edge, elements) => {
  return edge.data.source
}

const getEdgesBetween = (nodeFromId, nodeToId, elements) => {
  return elements.filter(filterEdge).filter(edge => {
    return edge.data.source == nodeFromId && edge.data.target == nodeToId
  })
}

const getIntents = (elements) => {
  return elements.filter(filterNodeUserSays).map(userSaysNode => {
    const responseNodeId = elements.filter(e => filterEdgeOut(e, userSaysNode)).map(getTargetId)[0]
    const responseNode = elements.filter(e => e.data.id == responseNodeId)[0]

    return {
      userSaysNode: userSaysNode,
      responseNode: responseNode,
    }
  })
}

const assignInOutEdges = (intent, elements) => {
  return Object.assign({}, intent, {
    edgesIn: elements.filter(e => filterEdgeIn(e, intent.userSaysNode)),
    edgesOut: elements.filter(e => filterEdgeOut(e, intent.responseNode))
  })
}

const getContextNameFromEdge = (edge, elements) => {
  const source = elements.filter(e => e.data.id == edge.data.source)[0].data.response.split("\n")[0]
  const target = elements.filter(e => e.data.id == edge.data.target)[0].data.user_says.split("\n")[0]
  return `${source}_${target}`.replace(/ /g, '')
}

const assignContextName = (intent, elements) => {
  return Object.assign({}, intent, {
    contextsIn: intent.edgesIn.map(e => getContextNameFromEdge(e, elements)),
    contextsOut: intent.edgesOut.map(e => getContextNameFromEdge(e, elements))
  })
}

const buildApiData = (intent) => {
  const userSayses = intent.userSaysNode.data.user_says.split("\n")
  const responses = intent.responseNode.data.response.split("\n")

  return {
    name: `${intent.userSaysNode.data.id}: ${userSayses[0]}+${responses[0]}`,
    contexts: intent.contextsIn,
    templates: userSayses,
    responses: [
      {
        speech: responses,
        affectedContexts: intent.contextsOut
      }
    ]
  }
}

const buildIntentsDataFromCyElements = (elements) => {
  return getIntents(elements)
    .map(i => assignInOutEdges(i, elements))
    .map(i => assignContextName(i, elements))
    .map(buildApiData)
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
  console.log(JSON.stringify(intentData))
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
          selectable: false,
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
        selectable: false,
      }]
    
    case "SAVE_USER_SAYS_PROPERTIES":
      return state.map(t => modifyElement(unselectElement(t), action.nodeId, {
        user_says: action.userSays
      }))

    case "SAVE_RESPONSE_PROPERTIES":
      return state.map(t => modifyElement(unselectElement(t), action.nodeId, {
        response: action.response
      }))

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
