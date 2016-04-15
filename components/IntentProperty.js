import React, { PropTypes } from 'react'

const IntentProperty = ({ onSaveIntentPropertiesClick }) => (
  <form id="intent_info" action="#" hidden onSubmit={e => {e.preventDefault(); onSaveIntentPropertiesClick();}}>
    <label>Intent Info</label>
    <div className="input-group">
      <span className="input-group-addon">User Says</span>
      <input id="user_says" type="text" className="form-control" placeholder="Hi" aria-describedby="basic-addon1" />
    </div>
    <div className="input-group">
      <span className="input-group-addon">Response</span>
      <input id="response" type="text" className="form-control" placeholder="How are you?" aria-describedby="basic-addon1" />
    </div>
    <button className="btn btn-default" type="submit">Save</button>
  </form>
)

IntentProperty.propTypes = {
  onSaveIntentPropertiesClick: PropTypes.func.isRequired
}

export default IntentProperty