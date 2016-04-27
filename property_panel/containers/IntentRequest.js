import React from 'react'
import { connect } from 'react-redux'
import { submitIntents } from '../../common/actions'

let IntentRequest = ({ dispatch }) => (
  <div>
    <button id="submit_btn" 
      className="btn btn-default" 
      onClick={() => dispatch(submitIntents())}>Submit
    </button>
  </div>
)

IntentRequest = connect()(IntentRequest)

export default IntentRequest

