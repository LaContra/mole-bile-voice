const IntentProps = (state = '', action) => {
  // TODO
  switch(action.type) {
    case "UPDATE_INTENT_LABEL":
      console.log("update label in panel");
      return state
    default:
      return state
  }
}

export default IntentProps

    // updateIntentLabel: function(evt) {
    //     console.log("update label in panel: "+evt.target.value);
    //     var updateCyIntentLabel = window.updateCyIntentLabel;
    //     updateCyIntentLabel(evt.target.value);
    // },