import React, { PropTypes } from 'react'

const IntentButtons = ({ selectedElements, onAddIntentClick, onAddUserSaysClick, onAddResponseClick, onAddConversationComponent }) => (
  <div>
    <div className='panel-section'>
      <h4>Basic Elements</h4>
      <div className="element-section">
        <button
          className="btn btn-default"
          onClick={() => onAddUserSaysClick()}>Create User Says
        </button>
      </div>
      <div className="element-section">
        <button
          className="btn btn-default"
          onClick={() => onAddResponseClick()}>Create Response
        </button>
      </div>
      <div className="element-section">
        <button id="add_intent_btn" 
          className="btn btn-default"
          onClick={() => onAddIntentClick()}>Create Intent
        </button>
      </div>
    </div>

    <div className='panel-section'>
      <h4>Conversation Components</h4>
      <div className="element-section">
        <button
          className="btn btn-default"
          onClick={() => onAddConversationComponent(1)}>Yes-No Questions
        </button>
      </div>
      <div className="element-section">
        <button
          className="btn btn-default"
          onClick={() => onAddConversationComponent(2)}>Wh-Questions
        </button>
      </div>
      <div className="element-section">
        <button
          className="btn btn-default"
          onClick={() => onAddConversationComponent(3)}>Choice Questions
        </button>
      </div>
    </div>
  </div>
)

IntentButtons.propTypes = {
  onAddIntentClick: PropTypes.func.isRequired,
  onAddUserSaysClick: PropTypes.func.isRequired,
  onAddResponseClick: PropTypes.func.isRequired,
  onAddConversationComponent: PropTypes.func.isRequired,
}

export default IntentButtons