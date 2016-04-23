import React from 'react'
import IntentControl from '../containers/IntentControl'
import UserSaysPropertyControl from '../containers/UserSaysPropertyControl'
import ResponsePropertyControl from '../containers/ResponsePropertyControl'
import IntentRequest from '../containers/IntentRequest'

const Panel = () => (
  <div className="base_panel">
    <IntentControl />
    <UserSaysPropertyControl />
    <ResponsePropertyControl />
    <IntentRequest />
  </div>
)

export default Panel