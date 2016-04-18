import React, { PropTypes } from 'react'
import $ from 'jquery'

const IntentProperty = ({ intentPropertyPanel, onSaveIntentPropertiesClick, onUserSaysChange, onResponseChange }) => (
  <form id="intent_info" 
    action="#" 
    hidden={ intentPropertyPanel.hideProperty }
    onSubmit={e => {
      e.preventDefault(); 
      onSaveIntentPropertiesClick(intentPropertyPanel.selectedNode, $("#user_says").val(), $("#response").val());
    }}>
    <label>Intent Info</label>
    <div className="input-group">
      <span className="input-group-addon">User Says</span>
      <input id="user_says" 
        type="text" 
        className="form-control" 
        placeholder="Hi" 
        value= { intentPropertyPanel.userSays }
        aria-describedby="basic-addon1"
        onChange={e => onUserSaysChange(e.target.value)} />
    </div>
    <div className="input-group">
      <span className="input-group-addon">Response</span>
      <input id="response" 
        type="text" 
        className="form-control" 
        placeholder="How are you?" 
        value={ intentPropertyPanel.response }
        aria-describedby="basic-addon1" 
        onChange={e => onResponseChange(e.target.value)} />
    </div>
    <button className="btn btn-default" type="submit">Save</button>
  </form>
)

IntentProperty.propTypes = {
  intentPropertyPanel: PropTypes.objectOf(PropTypes.shape({
    hideProperty: PropTypes.bool.isRequired,
    userSays: PropTypes.string.isRequired,
    response: PropTypes.string.isRequired,
    selectedNode: PropTypes.number.isRequired
  }).isRequired).isRequired,
  onSaveIntentPropertiesClick: PropTypes.func.isRequired,
  onUserSaysChange: PropTypes.func.isRequired,
  onResponseChange: PropTypes.func.isRequired
}

export default IntentProperty