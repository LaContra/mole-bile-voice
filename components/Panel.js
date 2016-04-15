import React from 'react'
import IntentControl from '../containers/IntentControl'
import IntentPropDisplay from '../containers/IntentPropDisplay'

var Panel = React.createClass({
    render: function() {
        return (
            <div id="panel">
                <IntentControl />
                <IntentPropDisplay />
                <IntentProperty />
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