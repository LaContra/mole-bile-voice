import { connect } from 'react-redux'
import { saveUserSaysProperties, changeUserSaysField, chnageResponseField, showHideUserSaysProperty } from '../actions'
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
      dispatch(showHideUserSaysProperty(null))
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

const UserSaysPropertyControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSaysProperty)

export default UserSaysPropertyControl