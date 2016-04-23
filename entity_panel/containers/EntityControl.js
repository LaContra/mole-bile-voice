import React from 'react'
import { connect } from 'react-redux'
import { addEntity, saveEntities } from '../../common/actions'
let EntityControl = ({ dispatch }) => (
  <div>
    <button className="btn btn-default"
      onClick={() => dispatch(addEntity())}>Add Entity
    </button>
    <button className="btn btn-default"
      onClick={() => dispatch(saveEntities())}>Save
    </button>
  </div>
)

EntityControl = connect()(EntityControl)

export default EntityControl
