import { connect } from 'react-redux'
import { saveResponseProperties, chnageResponseField, showHideIntentProperties } from '../actions'
import ResponseProperty from '../components/ResponseProperty'

const mapStateToProps = (state) => { 
  return {
    panel: state.intentPropertiesPanel.response
  } 
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveResponsePropertiesClick: (nodeId, response) => {
      dispatch(saveResponseProperties(nodeId, response))
      dispatch(showHideIntentProperties(null))
    },
    onResponseChange: (value) => {
      dispatch(chnageResponseField(value))
    },
  }
}

const ResponsePropertyControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResponseProperty)

export default ResponsePropertyControl