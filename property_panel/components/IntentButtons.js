import React, { PropTypes } from 'react'

const IntentButtons = ({ onClearIntentsClick, onAddIntentClick, onAddUserSaysClick }) => (
  <div>
    <div>
      <button id="clear_btn" 
        className="btn btn-default" 
        onClick={() => onClearIntentsClick()}>Clear
      </button>
    </div>
    <div>
      <button id="add_intent_btn" 
        className="btn btn-default"
        onClick={() => onAddIntentClick()}>Create Intent
      </button>
    </div>
    <div>
      <button
        className="btn btn-default"
        onClick={() => onAddUserSaysClick()}>Create User Says
      </button>
    </div>
  </div>
)

IntentButtons.propTypes = {
  onClearIntentsClick: PropTypes.func.isRequired,
  onAddIntentClick: PropTypes.func.isRequired,
  onAddUserSaysClick: PropTypes.func.isRequired,
}

export default IntentButtons