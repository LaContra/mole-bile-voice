import React, { PropTypes } from 'react'

const IntentDisplayOptions = ({ onUpdateIntentLabelClick }) => (
  <div class="input-group">
    <span className="input-group-addon">Displayed Field</span>
    <select id="displayed_field" 
      className="form-control" 
      onChange={(e) => onUpdateIntentLabelClick(e.target.value)}>
        <option value="USER_SAYS">User says</option>
        <option value="RESPONSE">Response</option>
    </select>
  </div>
)

IntentDisplayOptions.propTypes = {
  onUpdateIntentLabelClick: PropTypes.func.isRequired
}

export default IntentDisplayOptions
