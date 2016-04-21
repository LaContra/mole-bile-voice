import { connect } from 'react-redux'
import { saveUserSaysProperties, changeUserSaysField, chnageResponseField, showHideIntentProperties } from '../actions'
import UserSaysProperty from '../components/UserSaysProperty'

const mapStateToProps = (state) => { 
  return {
    userSaysPropertyPanel: state.userSaysPropertyPanel
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
    onResponseChange: (value) => {
      dispatch(chnageResponseField(value))
    }
  }
}

const UserSaysPropertyControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSaysProperty)

export default UserSaysPropertyControl