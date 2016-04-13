var React = require('react');

var Panel = React.createClass({
    render: function() {
        return (
            <div id="panel">
                <IntentButtons />
                <IntentDisplayedFields />
                <IntentProperty />
            </div>
        );
    }
});

var IntentButtons = React.createClass({
    // TODO
    /* panel control */
    clearIntents: function() {
        if (confirm("Are you sure you want to clear all elements?")) {
            // cy.elements().remove();
            var removeIntents = window.removeIntents;
            removeIntents();
        }
    },

    // TODO
    // add intent
    addIntents: function() {
        var unselectElements = window.unselectElements;
        unselectElements();
    },

    render: function() {
        return (
            <div>
                <div>
                    <button id="clear_btn" className="btn btn-default" onClick={this.clearIntents}>Clear</button>
                </div>
                <div>
                    <button id="add_intent_btn" className="btn btn-default" onClick={this.addIntents}>Create Intent</button>
                </div>
            </div>
        );
    }
});

var IntentDisplayedFields = React.createClass({

    // TODO
    updateIntentLabel: function(evt) {
        console.log("update label in panel: "+evt.target.value);
        var updateCyIntentLabel = window.updateCyIntentLabel;
        updateCyIntentLabel(evt.target.value);
    },

    render: function() {
        return (
            <div class="input-group">
                <span className="input-group-addon">Displayed Field</span>
                <select id="displayed_field" className="form-control" onChange={this.updateIntentLabel}>
                    <option value="user_says">User says</option>
                    <option value="response">Response</option>
                    <option value="combine">Combine</option>
                </select>
            </div>
        );
    }
});



var IntentProperty = React.createClass({

    // TODO
    // modify intent info
    saveIntentProperties: function() {
        var saveCyIntentProperty = window.saveCyIntentProperty;
        saveCyIntentProperty();
    },

    // TODO
    sendCreateIntentRequest:function(){
        var sendCreateCyIntentRequest = window.sendCreateCyIntentRequest;
        sendCreateCyIntentRequest();
    },

    render: function() {
        return (
            <div>
                <div>
                    <form id="intent_info" action="#" hidden onSubmit={this.saveIntentProperties}>
                        <label>Intent Info</label>
                        <div className="input-group">
                            <span className="input-group-addon">User Says</span>
                            <input id="user_says" type="text" className="form-control" placeholder="Hi" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group">
                            <span className="input-group-addon">Response</span>
                            <input id="response" type="text" className="form-control" placeholder="How are you?" aria-describedby="basic-addon1" />
                        </div>
                        <button className="btn btn-default" type="submit">Save</button>
                    </form>
                </div>
                <div>
                    <button id="submit_btn" className="btn btn-default" onClick={this.sendCreateIntentRequest}>Submit</button>
                </div>
            </div>
        );
    }
});

module.exports = Panel;