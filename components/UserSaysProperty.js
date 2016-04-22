import React, { PropTypes } from 'react'

const UserSaysProperty = ({ panel, onSaveUserSaysPropertiesClick, onUserSaysChange }) => (
  <form id="user_says_info" 
    action="#" 
    hidden={ panel.hideProperty }
    onSubmit={e => {
      e.preventDefault(); 
      onSaveUserSaysPropertiesClick(panel.selectedNode, e.target.user_says.value);
    }} >
    <label>User Says</label>
    <textarea 
      className="form-control" 
      name="user_says" 
      rows={ panel.text.split("\n").length }
      value={ panel.text }
      onChange={e => onUserSaysChange(e.target.value)} />
    <button className="btn btn-default" type="submit">Save</button>
  </form>
)

UserSaysProperty.propTypes = {
  panel: PropTypes.shape({
    hideProperty: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    selectedNode: PropTypes.number.isRequired
  }).isRequired,
  onSaveUserSaysPropertiesClick: PropTypes.func.isRequired,
  onUserSaysChange: PropTypes.func.isRequired,
}

export default UserSaysProperty