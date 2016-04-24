import { connect } from 'react-redux'
import { saveResponseProperties, changeResponseField, changeActionField, showHideIntentProperties } from '../../common/actions'
import ResponseProperty from '../components/ResponseProperty'

const mapStateToProps = (state) => { 
  return {
    panel: state.intentPropertiesPanel.response
  } 
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveResponsePropertiesClick: (nodeId, response, action) => {
      dispatch(saveResponseProperties(nodeId, response, action))
      dispatch(showHideIntentProperties(null))
    },
    onResponseChange: (value) => {
      dispatch(changeResponseField(value))
    },
    onActionChange: (value) => {
      dispatch(changeActionField(value))
    }
  }
}

const ResponsePropertyControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResponseProperty)

export default ResponsePropertyControl