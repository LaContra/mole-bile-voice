const intentControlPanel = (state = {
  selectedElements: []
}, action) => {
  switch(action.type) {
    case 'SELECT_ELEMENTS':
      return Object.assign({}, state, {
        selectedElements: action.elements,
      })

    default:
      return state
  }
}

export default intentControlPanel