import React, { PropTypes } from 'react'
import $ from 'jquery'

const UserSaysProperty = ({ userSaysPropertyPanel, onSaveUserSaysPropertiesClick, onUserSaysChange, onResponseChange }) => (
  <form id="intent_info" 
    action="#" 
    hidden={ userSaysPropertyPanel.hideProperty }
    onSubmit={e => {
      e.preventDefault(); 
      onSaveUserSaysPropertiesClick(userSaysPropertyPanel.selectedNode, $("#user_says").val());
    }}>
    <label>Intent Info</label>
    <div className="input-group">
      <span className="input-group-addon">User Says</span>
      <input id="user_says" 
        type="text" 
        className="form-control" 
        placeholder="Hi" 
        value= { userSaysPropertyPanel.userSays }
        aria-describedby="basic-addon1"
        onChange={e => onUserSaysChange(e.target.value)} />
    </div>
    <button className="btn btn-default" type="submit">Save</button>
  </form>
)

UserSaysProperty.propTypes = {
  userSaysPropertyPanel: PropTypes.objectOf(PropTypes.shape({
    hideProperty: PropTypes.bool.isRequired,
    userSays: PropTypes.string.isRequired,
    response: PropTypes.string.isRequired,
    selectedNode: PropTypes.number.isRequired
  }).isRequired).isRequired,
  onSaveUserSaysPropertiesClick: PropTypes.func.isRequired,
  onUserSaysChange: PropTypes.func.isRequired,
  onResponseChange: PropTypes.func.isRequired
}

export default UserSaysProperty