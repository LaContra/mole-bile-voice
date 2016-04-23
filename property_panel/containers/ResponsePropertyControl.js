import { connect } from 'react-redux'
import { saveResponseProperties, changeResponseField, showHideIntentProperties } from '../../common/actions'
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
      dispatch(changeResponseField(value))
    },
  }
}

const ResponsePropertyControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResponseProperty)

export default ResponsePropertyControl