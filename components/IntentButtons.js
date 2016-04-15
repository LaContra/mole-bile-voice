import React, { PropTypes } from 'react'

const IntentButtons = ({ onClearIntentsClick, onAddIntentClick }) => (
  <div>
    <div>
      <button 
        id="clear_btn" 
        className="btn btn-default" 
        onClick={() => onClearIntentsClick()}>Clear
      </button>
    </div>
    <div>
      <button 
        id="add_intent_btn" 
        className="btn btn-default"
        onClick={() => onAddIntentClick()}>Create Intent
      </button>
    </div>
  </div>
)

IntentButtons.propTypes = {
  onClearIntentsClick: PropTypes.func.isRequired,
  onAddIntentClick: PropTypes.func.isRequired
}

export default IntentButtons