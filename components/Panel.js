import React from 'react'
import IntentControl from '../containers/IntentControl'
import IntentNameDisplay from '../containers/IntentNameDisplay'
import IntentPropertyControl from '../containers/IntentPropertyControl'
import IntentRequest from '../containers/IntentRequest'

const Panel = () => (
  <div id="panel">
    <IntentControl />
    <IntentNameDisplay />
    <IntentPropertyControl />
    <IntentRequest />
  </div>
)

export default Panel