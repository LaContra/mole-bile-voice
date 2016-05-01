import LocalStorage from '../../utils/LocalStorage'

const APIKeys = (state, action) => {
  if (typeof state === 'undefined') {
    const devKey = LocalStorage.getDevKey();
    const clientKey = LocalStorage.getClientKey();
    return {
      devKey: devKey == null ? '': devKey,
      clientKey: clientKey == null ? '': clientKey
    }
  }

  switch(action.type) {
    case 'CHANGE_DEV_KEY':
      return Object.assign({}, state, { devKey: action.key})
    case 'CHANGE_CLIENT_KEY':
      return Object.assign({}, state, { clientKey: action.key})
    case 'SAVE_KEYS':
      LocalStorage.saveKeys(state.devKey, state.clientKey)
      return state
    default:
      return state
  }
}

export default APIKeys