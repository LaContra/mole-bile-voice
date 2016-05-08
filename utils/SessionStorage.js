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
    }
  },
  render: function(){}
});

export default SessionStorage