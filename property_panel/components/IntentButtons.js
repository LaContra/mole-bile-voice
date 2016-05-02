import React, { PropTypes } from 'react'

const IntentButtons = ({ selectedElements, onClearIntentsClick, onAddIntentClick, onAddUserSaysClick, onAddResponseClick, onDeleteClick, onAddConversationComponent }) => (
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
    <div>
      <button
        className="btn btn-default"
        onClick={() => onAddResponseClick()}>Create Response
      </button>
    </div>
    <div>
      <button
        className="btn btn-default"
        onClick={() => onDeleteClick(selectedElements)}>Delete
      </button>
    </div>
    <div>
      Conversation Components
      <button
        className="btn btn-default"
        onClick={() => onAddConversationComponent(1)}>Yes-No Questions
      </button>
      <button
        className="btn btn-default"
        onClick={() => onAddConversationComponent(2)}>Wh-Questions
      </button>
      <button
        className="btn btn-default"
        onClick={() => onAddConversationComponent(3)}>Choice Questions
      </button>
    </div>
  </div>
)

IntentButtons.propTypes = {
  onClearIntentsClick: PropTypes.func.isRequired,
  onAddIntentClick: PropTypes.func.isRequired,
  onAddUserSaysClick: PropTypes.func.isRequired,
  onAddResponseClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onAddConversationComponent: PropTypes.func.isRequired,
}

export default IntentButtons