import { connect } from 'react-redux'
import { saveUserSaysProperties, changeUserSaysField, showHideIntentProperties } from '../../common/actions'
import UserSaysProperty from '../components/UserSaysProperty'

const mapStateToProps = (state) => { 
  return {
    panel: state.intentPropertiesPanel.userSays
  } 
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveUserSaysPropertiesClick: (nodeId, userSays) => {
      dispatch(saveUserSaysProperties(nodeId, userSays))
      dispatch(showHideIntentProperties(null))
    },
    onUserSaysChange: (value) => {
      dispatch(changeUserSaysField(value))
    },
  }
}

const UserSaysPropertyControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSaysProperty)

export default UserSaysPropertyControl