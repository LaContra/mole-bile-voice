import $ from 'jquery'

export const unselectElement = (element) => {
  return Object.assign({}, element, {selected: false})
}

export const modifyElement = (element, targetId, data) => {
  if (element.data.id != targetId) {
    return element
  }
  return Object.assign({}, element, { data: Object.assign({}, data, { id: targetId })} )
}

export const filterNode = (element) => {
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

export const filterEdgeOut = (element, nodeId) => {
  return filterEdge(element) && element.data.source == nodeId
}

const filterEdgeIn = (element, nodeId) => {
  return filterEdge(element) && element.data.target == nodeId
}

export const getId = (element) => {
  return element.data.id
}

export const getTargetId = (edge, elements) => {
  return edge.data.target
}

export const getSourceId = (edge, elements) => {
  return edge.data.source
}

export const getEdgesBetween = (nodeFromId, nodeToId, elements) => {
  return elements.filter(filterEdge).filter(edge => {
    return edge.data.source == nodeFromId && edge.data.target == nodeToId
  })
}

const verifyUserSayses = (elements) => {
  return !elements.filter(filterNodeUserSays).map(node =>
    elements.filter(e => filterEdgeOut(e, node.data.id)).length
  ).includes(0)
}

const verifyResponses = (elements) => {
  return !elements.filter(filterNodeResponse).map(node =>
    elements.filter(e => filterEdgeIn(e, node.data.id)).length
  ).includes(0)
}


const getIntents = (elements) => {
  return elements.filter(filterNodeUserSays).map(userSaysNode => {
    const responseNodeId = elements.filter(e => filterEdgeOut(e, userSaysNode.data.id)).map(getTargetId)[0]
    const responseNode = elements.filter(e => e.data.id == responseNodeId)[0]
    const edge = elements.filter(e => filterEdgeOut(e, userSaysNode.data.id) && filterEdgeIn(e, responseNodeId))[0]

    return {
      userSaysId: userSaysNode.data.id,
      responseId: responseNodeId,
      edgeId: getId(edge),
      userSayses: userSaysNode.data.user_says.split("\n"),
      responses: responseNode.data.response.split("\n"),
      action: responseNode.data.action,
    }
  })
}

const assignIntentName = (intent) => {
  return Object.assign({}, intent, {
    name: `${intent.userSaysId}:${intent.userSayses[0]}+${intent.edgeId}:e+${intent.responseId}:${intent.responses[0]}`,
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
  ).map(intent => Object.assign({}, intent, {edge: edge}))[0]
}

const getTargetIntent = (edge, intents) => {
  return intents.filter(intent =>
    intent.userSaysId == edge.data.target
  ).map(intent => Object.assign({}, intent, {edge: edge}))[0]
}

const getContextName = (fromIntent, toIntent, contextType) => {
  let intentWithEdge = contextType == "incoming" ? fromIntent : toIntent
  return `${intentWithEdge.edge.data.id}_${fromIntent.name}_${toIntent.name}`.replace(/ /g, '')
}

const assignContextName = (intent, intents) => {
  return Object.assign({}, intent, {
    contextsIn: intent.edgesIn.map(e => getSourceIntent(e, intents)).map(i => getContextName(i, intent, "incoming")),
    contextsOut: intent.edgesOut.map(e => getTargetIntent(e, intents)).map(i => getContextName(intent, i, "outgoing")),
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

export const buildIntentsDataFromCyElements = (elements) => {
  if (!verifyUserSayses(elements)) {
    alert("Error: there is lonely user says, find it out!")
    return []
  }

  if (!verifyResponses(elements)) {
    alert("Error: there is lonely response, find it out!")
    return []
  }

  const intents = getIntents(elements).map(assignIntentName)
  return intents.map(i => assignInOutEdges(i, elements))
        .map(i => assignContextName(i, intents)).map(buildApiData)
}