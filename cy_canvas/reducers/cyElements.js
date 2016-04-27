import LocalStorage from '../../utils/LocalStorage'
import { unselectElement, getEdgesBetween,
  filterEdgeOut, modifyElement, getId,
  filterNode, getSourceId, getTargetId
} from '../helper'

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
      )
    default:
      return state
  }
}

export default cyElements
