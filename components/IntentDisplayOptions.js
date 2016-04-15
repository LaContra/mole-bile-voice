import React, { PropTypes } from 'react'

const IntentDisplayOptions = ({ onUpdateIntentLabelClick }) => (
  <div class="input-group">
    <span className="input-group-addon">Displayed Field</span>
    <select id="displayed_field" className="form-control" onChange={(event) => onUpdateIntentLabelClick(event)}>
        <option value="user_says">User says</option>
        <option value="response">Response</option>
        <option value="combine">Combine</option>
    </select>
  </div>
)

IntentDisplayOptions.propTypes = {
  onUpdateIntentLabelClick: PropTypes.func.isRequired
}

export default IntentDisplayOptions
