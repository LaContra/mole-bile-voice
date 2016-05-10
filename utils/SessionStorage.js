import React from 'react'
import ReactDOM from 'react-dom'

const SessionStorage = React.createClass({
  statics: {
    getStates: () => {
      const states = JSON.parse(sessionStorage.getItem("STATES"))
      return (states == null || states == "") ? [] : states   
    },
    setStates: (states) => {
      sessionStorage.setItem("STATES", JSON.stringify(typeof states == "undefined" ? [] : states))
    },
    addState: (state) => {
      const states = SessionStorage.getStates()
      states.push(state)
      sessionStorage.setItem("STATES", JSON.stringify(states))
    },
    popState: () => {
      const states = SessionStorage.getStates()
      let newState = states.pop()
      SessionStorage.setStates(states)
      return typeof newState == 'undefined' ? [] : newState
    },
    savePreviousAction: (action) => {
      sessionStorage.setItem("PREVIOUS_ACTION_TYPE", JSON.stringify(action))
    },
    lastAction: () => {
      const action = JSON.parse(sessionStorage.getItem("PREVIOUS_ACTION_TYPE"))
      return action == null ? {} : action
    },
    saveCopiedNodes: (elements) => {
      sessionStorage.setItem("COPIED_NODES", JSON.stringify(elements))
    },
    getCopiedNodes: (elements) => {
      return JSON.parse(sessionStorage.getItem("COPIED_NODES"))
    },
    changeMultiSelectStatus: (allowMultiSelect) => {
      sessionStorage.setItem("ALLOW_MULTI_SELECT", JSON.stringify(allowMultiSelect))
    },
    getMultiSelectStatus: () => {
      const allowMultiSelect = JSON.parse(sessionStorage.getItem("ALLOW_MULTI_SELECT"))
      return  allowMultiSelect == null ? false : allowMultiSelect
    }
  },
  render: function(){}
});

export default SessionStorage
