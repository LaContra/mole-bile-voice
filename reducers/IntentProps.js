const IntentProps = (state = '', action) => {
  // TODO
  switch(action.type) {
    case "UPDATE_INTENT_LABEL":
      console.log("update label in panel");
      return state
    case "SAVE_INTENT_PROPERTIES":
      console.log("save intent properties");
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

        // TODO
    // modify intent info
    // saveIntentProperties: function() {
    //     var saveCyIntentProperty = window.saveCyIntentProperty;
    //     saveCyIntentProperty();
    // },