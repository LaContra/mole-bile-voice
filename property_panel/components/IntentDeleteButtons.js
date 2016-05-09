import React, { PropTypes } from 'react'

const IntentDeleteButtons = ({ onClearIntentsClick }) => (
  <div className='panel-section'>
    <button id="clear_btn" 
      className="btn btn-default" 
      onClick={() => onClearIntentsClick()}>Clear Canvas
    </button>
  </div>
)

IntentDeleteButtons.propTypes = {
  onClearIntentsClick: PropTypes.func.isRequired
}

export default IntentDeleteButtons