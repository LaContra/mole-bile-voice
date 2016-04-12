var React = require('react');
var ReactDOM = require('react-dom');

var LocalStorage = React.createClass({
	statics: {
		saveElements: function(elements) {
		    localStorage.setItem("elements", JSON.stringify(elements));
		},
		getElements: function() {
		    var elements = localStorage.getItem("elements");
		    if (elements && elements != "{}") {
		        return JSON.parse(elements);
		    }
		    else {
		        return null;
		    }
		}
	},
	render: function(){}
});

module.exports = LocalStorage;