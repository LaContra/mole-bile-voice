import { unselectElement, getEdgesBetween,
  filterEdgeOut, modifyElement, getId,
  filterNode, getSourceId, getTargetId
} from '../helper'
import SessionStorage from '../../utils/SessionStorage'

Array.prototype.average = function() {
  var sum = this.reduce(function(result, currentValue) {
    return result + parseInt(currentValue)
  }, 0);
  if (this.length == 0) {
    return 0
  }
  return sum / this.length;
};

const getAvgPos = (elements) => {
  const nodes = elements.filter(filterNode)
  return {
    x: nodes.map(n => n.position.x).average(),
    y: nodes.map(n => n.position.y).average(),
  }
}

const getConversationComponent = (type, id, position) => {
  switch(type) {
    case 0:
      return [{
        group: "nodes",
        data: { response: "welcome!", id: id },
        classes: "response",
        // position: {x: 100, y: 100}
      }]
    case 1:
      return [{
        group: "nodes",
        data: { response: "Do you want to ...?", id: id },
        classes: "response",
        position: position,
        selected: true,
      }, {
        group: "nodes",
        data: { user_says: "Yes", id: id+1 },
        classes: "user_says",
        position: { x: position.x-25, y: position.y+50 },
        selected: true,
      }, {
        group: "nodes",
        data: { user_says: "No", id: id+2 },
        classes: "user_says",
        position: { x: position.x+25, y: position.y+50 },
        selected: true,
      }, {
        group: "edges",
        data: {source: id, target: id+1, id: id+3},
        classes: "r2us",
      }, {
        group: "edges",
        data: {source: id, target: id+2, id: id+4},
        classes: "r2us",
      }]

    case 2:
      return [{
        group: "nodes",
        data: { response: "What's your address?", id: id },
        classes: "response",
        position: position,
        selected: true,
      }, {
        group: "nodes",
        data: { user_says: "@sys.address:address", id: id+1 },
        classes: "user_says",
        position: { x: position.x, y: position.y+50 },
        selected: true,
      }, {
        group: "nodes",
        data: { response: "Did you say $address ?", id: id+2 },
        classes: "response",
        position: { x: position.x, y: position.y+100 },
        selected: true,
      }, {
        group: "nodes",
        data: { user_says: "Yes", id: id+3 },
        classes: "user_says",
        position: { x: position.x-25, y: position.y+150 },
        selected: true,
      }, {
        group: "nodes",
        data: { user_says: "No", id: id+4 },
        classes: "user_says",
        position: { x: position.x+25, y: position.y+150 },
        selected: true,
      }, {
        group: "edges",
        data: {source: id, target: id+1, id: id+5},
        classes: "r2us",
      }, {
        group: "edges",
        data: {source: id+1, target: id+2, id: id+6},
        classes: "us2r",
      }, {
        group: "edges",
        data: {source: id+2, target: id+3, id: id+7},
        classes: "r2us",
      }, {
        group: "edges",
        data: {source: id+2, target: id+4, id: id+8},
        classes: "r2us",
      }]

    case 3:
      return [{
        group: "nodes",
        data: { response: "Do you want A or B?", id: id },
        classes: "response",
        position: position,
        selected: true,
      }, {
        group: "nodes",
        data: { user_says: "A", id: id+1 },
        classes: "user_says",
        position: { x: position.x-25, y: position.y+50 },
        selected: true,
      }, {
        group: "nodes",
        data: { user_says: "B", id: id+2 },
        classes: "user_says",
        position: { x: position.x+25, y: position.y+50 },
        selected: true,
      }, {
        group: "edges",
        data: {source: id, target: id+1, id: id+3},
        classes: "r2us",
      }, {
        group: "edges",
        data: {source: id, target: id+2, id: id+4},
        classes: "r2us",
      }]
  }
}


const cyElements = (state = [], action) => {
  const avgPos = getAvgPos(state)
  const undoSupportTypes = ['CLEAR_INTENTS', 'ADD_INTENT', 'ADD_USER_SAYS', 'ADD_RESPONSE', 
    'ADD_CONVERSATION_COMPONENT', 'ADD_EDGE', 'SAVE_USER_SAYS_PROPERTIES', 'SAVE_RESPONSE_PROPERTIES', 'DELETE_ELEMENTS']

  if (undoSupportTypes.indexOf(action.type) > -1) {
    SessionStorage.addState(state)
    SessionStorage.savePreviousAction(action)
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
          position: avgPos, 
          selected: true,
        },
        {
          group: "nodes",
          data: { response: "", id: action.id+1, action: "" },
          classes: "response",
          position: { x: avgPos.x, y: avgPos.y+50 },
          selected: true,
        },
        {
          group: "edges",
          data: {source: action.id, target: action.id+1, id: action.id+2},
          classes: "us2r",
        }
      ]
      // TODO: position
      // position: { x: -this.state.cy.viewport().pan().x / this.state.cy.zoom() + 40, y: -this.state.cy.viewport().pan().y / this.state.cy.zoom() + 40 }
    case 'ADD_INTENT_WITH_DATA':
      return state.concat(action.intent)

    case 'ADD_USER_SAYS':
      return [ ...state.map(t => unselectElement(t)), {
          group: "nodes",
          data: { user_says: "", id: action.id },
          classes: "user_says",
          position: avgPos, 
          selected: true,
        }
      ]

    case 'ADD_RESPONSE':
      return [ ...state.map(t => unselectElement(t)), {
          group: "nodes",
          data: { response: "", id: action.id, action: "" },
          classes: "response",
          position: avgPos, 
          selected: true,
        }
      ]

    case 'ADD_CONVERSATION_COMPONENT':
      return [...state.map(unselectElement), ...getConversationComponent(action.cType, action.id, avgPos)]

    case 'ADD_EDGE':
      const sourceClass = state.filter(e => e.data.id == action.source)[0].classes
      const targetClass = state.filter(e => e.data.id == action.target)[0].classes
      let edgeType = ""
      if (sourceClass == "user_says" && targetClass == "response") {
        edgeType = "us2r"
      }
      else if (sourceClass == "response" && targetClass == "user_says") {
        edgeType = "r2us"
      }
      else if (sourceClass == "user_says" && targetClass == "user_says") {
        alert("Oops! Can’t connect two user says together. Try connecting a user says to a response instead.")
        return state.map(t => unselectElement(t))
      }
      else {
        alert("Uh-oh… Can’t connect two responses together. Try connecting a response to a user says instead.")
        return state.map(t => unselectElement(t))
      }
      // avoid cycle in one intent
      if (getEdgesBetween(action.target, action.source, state).length > 0) {
        alert("Uh-oh… The doggie is chasing its tail! Sorry we can’t handle cycle connections.")
        return state.map(t => unselectElement(t))
      }
      // avoid adding repeat edge
      if (getEdgesBetween(action.source, action.target, state).length > 0) {
        alert("Oops! This connection already exists, no need to connect again.")
        return state.map(t => unselectElement(t))
      }
      if (edgeType == "us2r" && state.filter(t => filterEdgeOut(t, action.source)).length > 0) {
        alert("Uh-oh… This user says is already connected to a response. Try deleting the existing connection first.")
        return state.map(t => unselectElement(t))
      }
      return [ ...state.map(t => unselectElement(t)), {
        group: "edges",
        data: {source: action.source, target: action.target, id: action.id},
        classes: edgeType,
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

    case "DELETE_ELEMENTS":
      const deletedIds = action.elements.map(getId)
      const remain = state.filter(t => 
        !deletedIds.includes(t.data.id)
      )
      const remainNodeIds = remain.filter(filterNode).map(getId)
      // if node deleted, edges linked to it deleted as well
      return remain.filter(t => 
        filterNode(t) || remainNodeIds.includes(getSourceId(t)) 
                      && remainNodeIds.includes(getTargetId(t))
      ).map(t => unselectElement(t))
    case "UNSELECT_ELEMENTS_EXCEPT":
      return state.map(t => {
        return t.data.id == action.element.data.id ? Object.assign({}, t, {selected: true}) : unselectElement(t)
      })
    case "UNDO":
      return SessionStorage.popState()
    case "COPY":
      SessionStorage.saveCopiedNodes(action.elements)
      return state
    case "PASTE":
      return [...state.map(t => unselectElement(t))].concat(action.elements)
    default:
      return state
  }
}

export default cyElements
