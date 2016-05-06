import React from 'react'
import { connect } from 'react-redux'
import { changeDevKey, changeClientKey, saveKeys } from '../../common/actions'

let APIKeySection = ({keys, onDevKeyChange, onClientKeyChange, onSaveKeysClick}) => (
  <div className="panel-section">
    <h4>Keys</h4>
    <div className="form-inline">
      <div className="form-group">
        <label>Dev Key</label>
        <input type="text" 
          className="form-control item-space" 
          placeholder="Developer Key"
          value={ keys.devKey }
          onChange={e => onDevKeyChange(e.target.value)}/>
      </div>
    </div>
    <div className="form-inline element-section">
      <div className="form-group">
        <label class="">Client Key</label>
        <input type="text" 
          className="form-control item-space" 
          placeholder="Client Key"
          value={ keys.clientKey }
          onChange={e => onClientKeyChange(e.target.value)}/>
      </div>
    </div>
    <button className="btn btn-default element-section"
      onClick={() => onSaveKeysClick()}>Save Keys
    </button>
  </div>
)

const mapStateToProps = (state) => {
  return {
    keys: state.APIKeys
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDevKeyChange: (key) => {
      dispatch(changeDevKey(key))
    },
    onClientKeyChange: (key) => {
      dispatch(changeClientKey(key))
    },
    onSaveKeysClick: () => {
      dispatch(saveKeys())
    }
  }
}

APIKeySection = connect(
  mapStateToProps,
  mapDispatchToProps
)(APIKeySection)

export default APIKeySection