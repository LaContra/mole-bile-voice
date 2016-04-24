import React, { PropTypes } from 'react'

const ResponseProperty = ({ panel, onSaveResponsePropertiesClick, onResponseChange, onActionChange }) => (
  <form id="response_info" 
    action="#" 
    hidden={ panel.hideProperty }
    onSubmit={e => {
      e.preventDefault(); 
      onSaveResponsePropertiesClick(panel.selectedNode, e.target.response.value, e.target.action.value);
    }} >
    <label>Response</label>
    <textarea 
      className="form-control" 
      name="response" 
      rows={ panel.text.split("\n").length }
      value={ panel.text }
      onChange={e => onResponseChange(e.target.value)} />
    <label>Action</label>
    <input type="text"
      placeholder="action"
      className="form-control" 
      name="action" 
      value={ panel.action }
      onChange={e => onActionChange(e.target.value)} />
    <button className="btn btn-default" type="submit">Save</button>
  </form>
)

ResponseProperty.propTypes = {
  panel: PropTypes.shape({
    hideProperty: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    selectedNode: PropTypes.number.isRequired,
    action: PropTypes.string.isRequired
  }).isRequired,
  onSaveResponsePropertiesClick: PropTypes.func.isRequired,
  onResponseChange: PropTypes.func.isRequired,
  onActionChange: PropTypes.func.isRequired
}

export default ResponseProperty