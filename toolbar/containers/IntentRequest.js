import React from 'react'
import { connect } from 'react-redux'
import { submitIntents } from '../../common/actions'

let IntentRequest = ({ dispatch }) => (
  <button id="submit_btn" 
    className="btn btn-default pull-right" 
    onClick={() => dispatch(submitIntents())}>
    <h5>Submit to API.AI</h5>
  </button>
)

IntentRequest = connect()(IntentRequest)

export default IntentRequest

