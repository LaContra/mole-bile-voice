import React from 'react'
import IntentDeleteControl from '../containers/IntentDeleteControl'
import IntentControl from '../containers/IntentControl'
import UserSaysPropertyControl from '../containers/UserSaysPropertyControl'
import ResponsePropertyControl from '../containers/ResponsePropertyControl'
import IntentRequest from '../containers/IntentRequest'
import APIKeySection from '../containers/APIKeySection'


const Panel = () => (
  <div className="base_panel">
    <IntentDeleteControl />
    <UserSaysPropertyControl />
    <ResponsePropertyControl />
    <IntentControl />
    <IntentRequest />
    <APIKeySection />
  </div>
)

export default Panel