import React from 'react'
import { connect } from 'react-redux'
import { createAndroidProject } from '../../common/actions'

let CreateAndroidProjectBtn = ({ dispatch }) => (
  <button id="create_android_project_btn" 
    className="btn btn-default pull-right" 
    onClick={() => dispatch(createAndroidProject())}>
    <h5>Download Android Project</h5>
  </button>
)

CreateAndroidProjectBtn = connect()(CreateAndroidProjectBtn)

export default CreateAndroidProjectBtn

