const intentPropertiesPanel = (state = {
  userSays: {
    hideProperty: true,
    text: '', 
    selectedNode: -1
  },
  response: {
    hideProperty: true,
    text: '', 
    selectedNode: -1,
    action: ''
  }
}, action) => {
  switch(action.type) {
    case 'SHOW_HIDE_INTENT_PROPERTY':
      if (action.targetNode !== null) {
        return { 
          userSays: {
            hideProperty: action.nodeType != 'userSays',
            text: action.targetNode.data.user_says || "", 
            selectedNode: parseInt(action.targetNode.data.id)
          },
          response: {
            hideProperty: action.nodeType != 'response',
            text: action.targetNode.data.response || "", 
            selectedNode: parseInt(action.targetNode.data.id),
            action: action.targetNode.data.action
          }
        }
      }
      return Object.assign({}, state, {
        userSays: Object.assign({}, state.userSays, {hideProperty: true}),
        response: Object.assign({}, state.response, {hideProperty: true}),
      })
    case 'CHANGE_USER_SAYS_FIELD':
      return Object.assign({}, state, {
        userSays: Object.assign({}, state.userSays, {text: action.value}),
      })
    case 'CHANGE_RESPONSE_FIELD':
      return Object.assign({}, state, {
        response: Object.assign({}, state.response, {text: action.value}),
      })
    case 'CHANGE_ACTION_FIELD':
      return Object.assign({}, state, {
        response: Object.assign({}, state.response, {action: action.action}),
      })
    default:
      return state
  }
}

export default intentPropertiesPanel