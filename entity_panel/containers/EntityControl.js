import React from 'react'
import { connect } from 'react-redux'
import { addEntity, submitEntities } from '../../common/actions'
let EntityControl = ({ dispatch }) => (
  <div className="panel-section element-section">
    <button className="btn btn-default"
      onClick={() => dispatch(addEntity())}>Add Entity
    </button>
    <button className="btn btn-default item-space"
      onClick={() => dispatch(submitEntities())}>Save Entity
    </button>
  </div>
)

EntityControl = connect()(EntityControl)

export default EntityControl
