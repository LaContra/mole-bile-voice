import React from 'react'
import { connect } from 'react-redux'
import EntityControl from './EntityControl'
import EntityList from '../components/EntityList'

let EntityPanel = ({ entities }) => (
  <div className="right_panel">
    <EntityControl />
    <EntityList entities={entities}/>
  </div>
)

const mapStateToProps = (state) => {
  return {
    entities: state.entities
  }
}

EntityPanel = connect(
  mapStateToProps
)(EntityPanel)

export default EntityPanel