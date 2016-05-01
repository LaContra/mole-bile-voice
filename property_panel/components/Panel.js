import React from 'react'
import IntentControl from '../containers/IntentControl'
import UserSaysPropertyControl from '../containers/UserSaysPropertyControl'
import ResponsePropertyControl from '../containers/ResponsePropertyControl'
import IntentRequest from '../containers/IntentRequest'
import APIKeySection from '../containers/APIKeySection'


const Panel = () => (
  <div className="base_panel">
    <IntentControl />
    <UserSaysPropertyControl />
    <ResponsePropertyControl />
    <IntentRequest />
    <APIKeySection />
  </div>
)

export default Panel