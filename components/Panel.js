import React from 'react'
import IntentControl from '../containers/IntentControl'
import IntentNameDisplay from '../containers/IntentNameDisplay'
import UserSaysPropertyControl from '../containers/UserSaysPropertyControl'
import ResponsePropertyControl from '../containers/ResponsePropertyControl'
import IntentRequest from '../containers/IntentRequest'

const Panel = () => (
  <div id="panel">
    <IntentControl />
    <IntentNameDisplay />
    <UserSaysPropertyControl />
    <ResponsePropertyControl />
    <IntentRequest />
  </div>
)

export default Panel