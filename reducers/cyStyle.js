import DefaultVisualStyle from '../css/DefaultVisualStyle'

const cyStyle = (state = DefaultVisualStyle, action) => {
  // TODO
  switch(action.type) {
    case "UPDATE_INTENT_LABEL":
      console.log("update label in panel");
      console.log(state);
      return state.map(s => {
        if (s.selector == 'node') {
          s.css.label = 'data(' + action.value + ')';
        }
        return s
      })
    default:
      return state;
  }
}

export default cyStyle