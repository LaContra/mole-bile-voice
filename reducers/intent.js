const intent = (state = '', action) => {
  switch(action.type) {
    case 'CLEAR_INTENTS':
      console.log('clear intents');
      return state;
    default:
      console.log('default state');
      return state;
  }
}

export default intent