import React from 'react'
import { connect } from 'react-redux'
import { sendCreateIntentRequest } from '../../common/actions'

let IntentRequest = ({ dispatch }) => (
  <div>
    <button id="submit_btn" 
      className="btn btn-default" 
      onClick={() => dispatch(sendCreateIntentRequest())}>Submit
    </button>
  </div>
)

IntentRequest = connect()(IntentRequest)

export default IntentRequest

