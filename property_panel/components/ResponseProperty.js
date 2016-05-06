import React, { PropTypes } from 'react'

const ResponseProperty = ({ panel, onSaveResponsePropertiesClick, onResponseChange, onActionChange }) => (
  <form id="response_info" 
    className="panel-section"
    action="#" 
    hidden={ panel.hideProperty }
    onSubmit={e => {
      e.preventDefault(); 
      onSaveResponsePropertiesClick(panel.selectedNode, e.target.response.value.replace(/;/g, "\n"), e.target.action.value);
    }} >
    <label>Response</label>
    <input 
      className="form-control" 
      name="response" 
      placeholder="Use ; to separate response"
      // rows={ panel.text.split("\n").length }
      value={ panel.text.replace(/\n/g, ";") }
      onChange={e => onResponseChange(e.target.value)} />
    <label className="element-section">Action</label>
    <input type="text"
      placeholder="action"
      className="form-control" 
      name="action" 
      value={ panel.action }
      onChange={e => onActionChange(e.target.value)} />
    <button className="btn btn-default element-section" type="submit">Save</button>
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