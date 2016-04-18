var React = require('react');
var ReactDOM = require('react-dom');

var LocalStorage = React.createClass({
  statics: {
    saveElements: function(elements) {
      let elementId = 0
      if (elements !== undefined) {
          elementId = parseInt(elements.reduce((previous, current) => {
          if (parseInt(current.data.id) !== NaN && current.data.id > previous) {
            return current.data.id
          }
          return previous
        }, 0)) + 1;
      }

      localStorage.setItem("elementId", elementId);
      localStorage.setItem("elements", JSON.stringify(elements));
    },
    getElements: function(key) {
      if (key == null) {
        var elements = localStorage.getItem("elements");
        if (elements && elements != "{}") {
          return JSON.parse(elements);
        }
        else {
          return null;
        }
      }
      else {
        return localStorage.getItem(key)
      }
    }
  },
  render: function(){}
});

module.exports = LocalStorage;