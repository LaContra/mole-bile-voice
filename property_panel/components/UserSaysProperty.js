import React, { PropTypes } from 'react'

const UserSaysProperty = ({ panel, onSaveUserSaysPropertiesClick, onUserSaysChange }) => (
  <form id="user_says_info" 
    className="panel-section"
    action="#" 
    hidden={ panel.hideProperty }
    onSubmit={e => {
      e.preventDefault(); 
      onSaveUserSaysPropertiesClick(panel.selectedNode, e.target.user_says.value.replace(/;/g, "\n"));
    }} >
    <label>User Says</label>
    <input 
      className="form-control" 
      name="user_says" 
      placeholder="Use ; to separate user says"
      // rows={ panel.text.split("\n").length }
      value={ panel.text.replace(/\n/g, ";") }
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