import LocalStorage from '../../utils/LocalStorage'
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

const filterEdgeOut = (element, nodeId) => {
  return filterEdge(element) && element.data.source == nodeId
}

const filterEdgeIn = (element, nodeId) => {
  return filterEdge(element) && element.data.target == nodeId
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

const verifyAndGetIntents = (elements) => {
  return elements.filter(filterNodeUserSays).map(userSaysNode => {
    const responseNodeIds = elements.filter(e => filterEdgeOut(e, userSaysNode.data.id)).map(getTargetId)

    if (responseNodeIds.length == 0) {
      return null
    }

    const responseNode = elements.filter(e => e.data.id == responseNodeIds[0])[0]

    return {
      userSaysId: userSaysNode.data.id,
      responseId: responseNodeIds[0],
      userSayses: userSaysNode.data.user_says.split("\n"),
      responses: responseNode.data.response.split("\n"),
      action: responseNode.data.action,
    }
  })
}

const assignIntentName = (intent) => {
  return Object.assign({}, intent, {
    name: `${intent.userSaysId}: ${intent.userSayses[0]}+${intent.responses[0]}`,
  })
}

const assignInOutEdges = (intent, elements) => {
  return Object.assign({}, intent, {
    edgesIn: elements.filter(e => filterEdgeIn(e, intent.userSaysId)),
    edgesOut: elements.filter(e => filterEdgeOut(e, intent.responseId)),
  })
}

const getSourceIntent = (edge, intents) => {
  return intents.filter(intent => 
    intent.responseId == edge.data.source
  )[0]
}

const getTargetIntent = (edge, intents) => {
  return intents.filter(intent =>
    intent.userSaysId == edge.data.target
  )[0]
}

const getContextName = (fromIntent, toIntent) => {
  return `${fromIntent.name}_${toIntent.name}`.replace(/ /g, '')
}

const assignContextName = (intent, intents) => {
  return Object.assign({}, intent, {
    contextsIn: intent.edgesIn.map(e => getSourceIntent(e, intents)).map(i => getContextName(i, intent)),
    contextsOut: intent.edgesOut.map(e => getTargetIntent(e, intents)).map(i => getContextName(intent, i)),
  })
}

const buildApiData = (intent) => {
  return {
    name: intent.name,
    contexts: intent.contextsIn,
    templates: intent.userSayses,
    responses: [
      {
        action: intent.action,
        speech: intent.responses,
        affectedContexts: intent.contextsOut
      }
    ]
  }
}

const buildIntentsDataFromCyElements = (elements) => {
  let intents = verifyAndGetIntents(elements)

  if (intents.indexOf(null) >= 0) {
    alert("Error: there is lonely user says, find it out!")
    return []
  }

  return intents.map(assignIntentName).map(i => assignInOutEdges(i, elements))
        .map(i => assignContextName(i, intents)).map(buildApiData)
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
  // console.log(intentData)
}

const cyElements = (state, action) => {
  if (typeof state === 'undefined') {
    const localState = LocalStorage.getElements();
    return localState == null? []: localState
  }

  switch(action.type) {
    /* panel control */
    case 'CLEAR_INTENTS':
      return []

    case 'ADD_INTENT':
      return [ ...state.map(t => unselectElement(t)), {
          group: "nodes",
          data: { user_says: "", id: action.id },
          classes: "user_says",
          position: {x: 100, y: 100},
        },
        {
          group: "nodes",
          data: { response: "", id: action.id+1, action: "" },
          classes: "response",
          position: {x: 140, y: 100},
        },
        {
          group: "edges",
          data: {source: action.id, target: action.id+1, id: action.id+2},
          classes: "us2r",
          selectable: false,
        }
      ]
      // TODO: position
      // position: { x: -this.state.cy.viewport().pan().x / this.state.cy.zoom() + 40, y: -this.state.cy.viewport().pan().y / this.state.cy.zoom() + 40 }

    case 'ADD_USER_SAYS':
      return [ ...state.map(t => unselectElement(t)), {
          group: "nodes",
          data: { user_says: "", id: action.id },
          classes: "user_says",
          position: {x: 100, y: 100},
        }
      ]

    case 'ADD_EDGE':
      // FIXME: temporarily avoid cycle in one intent
      if (getEdgesBetween(action.target, action.source, state).length > 0) {
        return state.map(t => unselectElement(t))
      }
      // avoid adding repeat edge
      if (getEdgesBetween(action.source, action.target, state).length > 0) {
        return state.map(t => unselectElement(t))
      }
      if (action.edgeType == "us2r" && state.filter(t => filterEdgeOut(t, action.source)).length > 0) {
        return state.map(t => unselectElement(t))
      }
      return [ ...state.map(t => unselectElement(t)), {
        group: "edges",
        data: {source: action.source, target: action.target, id: action.id},
        classes: action.edgeType,
        selectable: false,
      }]
    
    case "SAVE_USER_SAYS_PROPERTIES":
      return state.map(t => modifyElement(unselectElement(t), action.nodeId, {
        user_says: action.userSays
      }))

    case "SAVE_RESPONSE_PROPERTIES":
      return state.map(t => modifyElement(unselectElement(t), action.nodeId, {
        response: action.response,
        action: action.action
      }))

    // create intent 
    case 'SEND_CREATE_INTENT_REQUEST':
      buildIntentsDataFromCyElements(state).forEach(sendCreateIntentRequest)
      return state

    default:
      return state
  }
}

export default cyElements
