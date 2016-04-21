import React, { PropTypes } from 'react'

const UserSaysProperty = ({ userSaysPropertyPanel, onSaveUserSaysPropertiesClick, onUserSaysChange, onResponseChange }) => (
  <form id="user_says_info" 
    action="#" 
    hidden={ userSaysPropertyPanel.hideProperty }
    onSubmit={e => {
      e.preventDefault(); 
      onSaveUserSaysPropertiesClick(userSaysPropertyPanel.selectedNode, e.target.user_says.value);
    }} >
    <label>User Says</label>
    <textarea 
      className="form-control" 
      name="user_says" 
      rows={ userSaysPropertyPanel.userSays.split("\n").length }
      value={ userSaysPropertyPanel.userSays }
      onChange={e => onUserSaysChange(e.target.value)} />
    <button className="btn btn-default" type="submit">Save</button>
  </form>
)

UserSaysProperty.propTypes = {
  userSaysPropertyPanel: PropTypes.shape({
    hideProperty: PropTypes.bool.isRequired,
    userSays: PropTypes.string.isRequired,
    selectedNode: PropTypes.number.isRequired
  }).isRequired,
  onSaveUserSaysPropertiesClick: PropTypes.func.isRequired,
  onUserSaysChange: PropTypes.func.isRequired,
  onResponseChange: PropTypes.func.isRequired
}

export default UserSaysProperty