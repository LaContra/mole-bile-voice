import React from 'react'
import IntentRequest from '../containers/IntentRequest'
import CreateAndroidProjectBtn from '../containers/CreateAndroidProjectBtn'

const Toolbar = () => (
  <div className="toolbar">
    <img className='logo' src={'/common/images/logo-design-mid-res.png'} />
    <h2 className='web-title'>Mole-bile Voice</h2>
    <IntentRequest/>
    <CreateAndroidProjectBtn/>
  </div>
)


export default Toolbar
