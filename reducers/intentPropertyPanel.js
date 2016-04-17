const intentPropertyPanel = (state = {hideProperty: true, userSays: '', response: '', selectedNode: -1}, action) => {
  switch(action.type) {
    case 'SHOW_HIDE_INTENT_PROPERTY':
      if (action.targetNode !== null) {
        return { hideProperty: false, 
          userSays: action.targetNode.data.USER_SAYS,
          response: action.targetNode.data.RESPONSE,
          selectedNode: action.targetNode.data.id
        }
      }
      return Object.assign({}, state, {hideProperty: true})
    case 'CHANGE_USER_SAYS_FIELD':
      return Object.assign({}, state, {userSays: action.value})
    case 'CHANGE_RESPONSE_FIELD':
      return Object.assign({}, state, {response: action.value})
    default:
      return state
  }
}

export default intentPropertyPanel