import { connect } from 'react-redux'
import { saveIntentProperties, changeUserSaysField, chnageResponseField } from '../actions'
import IntentProperty from '../components/IntentProperty'

const mapStateToProps = (state) => { 
  return {
    intentPropertyPanel: state.intentPropertyPanel
  } 
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveIntentPropertiesClick: (nodeId, userSays, response) => {
      dispatch(saveIntentProperties(nodeId, userSays, response))
    },
    onUserSaysChange: (value) => {
      console.log("onUserSaysChange: " + value);
      dispatch(changeUserSaysField(value))
    },
    onResponseChange: (value) => {
      dispatch(chnageResponseField(value))
    }
  }
}

const IntentPropertyControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntentProperty)

export default IntentPropertyControl