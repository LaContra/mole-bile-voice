import React, { PropTypes } from 'react'

const IntentDeleteButtons = ({ selectedElements, onClearIntentsClick, onDeleteClick }) => (
  <div className='panel-section'>
    <button id="clear_btn" 
      className="btn btn-default" 
      onClick={() => onClearIntentsClick()}>Clear Canvas
    </button>
    <button
      className="btn btn-default item-space"
      onClick={() => onDeleteClick(selectedElements)}>Delete
    </button>
  </div>
)

IntentDeleteButtons.propTypes = {
  onClearIntentsClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
}

export default IntentDeleteButtons