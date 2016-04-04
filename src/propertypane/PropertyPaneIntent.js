function intentReadOnlyRenderer(instance, td, row, col, prop, value, cellProperties) {
    
    if(typeof value!=="undefined" && value!==null && value !==""){
        td.innerHTML = value;
        td.className="htDimmed";
    }
    else{
        td.innerHTML="";
    }
    return td;
}


example.propertypane.PropertyPaneIntent = Class.extend({
	
	init:function(stateFigure){
	    // selected figure
	    this.figure = stateFigure;
	    
	    // all activities provided by the backend
	    this.activities = null;
	    
	},
	
	injectPropertyView: function( domId)
	{
		app.getBackend().getActivities($.proxy(function(activities){
		    this.activities = activities;
		    
		    var templ= "<form class='form-horizontal'>"+
                    '<div>'+
                    "    <div class='span6'>"+
		            "       <div class='control-group'>"+
		            "          <label class='control-label' for='stateNameProperty'>Name </label>"+
		            "          <div class='controls'>"+
		            "             <input id='intentNameProperty' class='span4' type='text' value='{{label}}'/>"+
		            "          </div>"+
		            "       </div>"+
		            "		<div class='control-group'>"+
		            "          <label class='control-label' for='stateUtteranceProperty'>Utterance</label>"+
		            "          <div class='controls'>"+
		            "             <input id='intentUtteranceProperty' class='span4' type='text'/>"+
		            "          </div>"+
		            "       </div>"+
		            "		<div class='control-group'>"+
		            "          <label class='control-label' for='stateUtteranceProperty'>Response</label>"+
		            "          <div class='controls'>"+
		            "             <input id='intentResponseProperty' class='span4' type='text'/>"+
		            "          </div>"+
		            "       </div>"+
                    "    </div>"+
                    "    <div class='span6'>"+
                    "       <div class='control-group' id='intentParameterMapping' style='min-height:200px'>"+
                    "       </div>"+
                    "    </div>"+
					"</div>"+
		            "</form>";
		    
		    
			 var compiled = Hogan.compile(templ);
			 var view   = $(compiled.render({label:this.figure.getLabel(), activities:activities}));
             view.submit(function(e){
                 return false;
             });
			 
			 // The "Label"
			 // install Events for the label of the figure for
			 //
			 var input = view.find("#intentNameProperty");
			 var handler =$.proxy(function(e){
			     // provide undo/redo for the label field
			     app.executeCommand(new example.command.CommandSetLabel(this.figure, input.val()));
			 },this);
			 input.change(handler);
			 		
			 this.intentSelect = view.find("#intentPaneActionSelect");
			 this.intentSelect.change($.proxy(function(){
                 this._onIntentSelect(this.intentSelect.val()[0],false);
			 },this));
			 domId.append(view);
			 
			 $("#intentParameterMapping").handsontable({
			     data: [],
		         minRows:0,
		         manualColumnResize: true,
		         rowHeaders: false,
                 minSpareRows: 0,
 	             stretchH: 'last',
			     colHeaders: ["Parameter Name", "Value"],
			     afterSelectionEnd: $.proxy(function(row, column){
			        if(column==1){
	                    var data =this.figure.getUserData();
	                    if(this.figure.getIntent().intent ==="TextResponse_FreeMarker"){
                            (new example.dialog.FreeMarkerEditorDialog(this.figure,data.mapping[row])).show();
	                    }
	                    else{
	                        (new example.dialog.IntentVariableEditorDialog(this.figure,data.mapping[row])).show();
	                    }
			        }
			     },this),
			     columns: [
			       {data:"parameterName"  , type:{renderer: intentReadOnlyRenderer}, readOnly:true },
			       {data:"value",           type:{renderer: intentReadOnlyRenderer}, readOnly:true }
			     ]
			   });
			 
             this._onIntentSelect(this.figure.getIntent().intent,true);
		},this));

	},

	/**
	 * @method
	 * Called by this pane if the user select another intent in the select box.
	 * What must happen here:
	 *   update the figure
	 *   update the parameter mapping table
	 *   
	 * @parameter {String} intentId the id of the selected intent
	 */
	_onIntentSelect: function(intentId, initialCall){
	       
        // get the selected intent with corresponding settings
        //
        var intentDef = $.grep(this.activities, function(e){ return e.id===intentId;})[0];
        
        if(typeof intentDef ==="undefined"){
            return;
        }
       
	    // select the correct entry in the lsitbox for the first call     
	    if(initialCall===true){
	        this.intentSelect.val(intentId);
	    }
	    // otherwise we must update the figure itself because the user select another
	    // intentDef
	    else{
	        app.executeCommand(new example.command.CommandSetIntentDef(this.figure,{intent:intentId, mapping:intentDef.parameters.input} ));
	    }
               
	    // rerender the mapping table
        $('#intentParameterMapping').handsontable('loadData',this.figure.getIntent().mapping);
        if(intentDef.parameters.input.length!=0){
            $('#intentParameterMapping').show();
        }
        else{
            $('#intentParameterMapping').hide();
        }
	},
	
    /**
     * @method
     * called by the framework if the pane has been resized. This is a good moment to adjust the layout if
     * required.
     * 
     */
    onResize: function()
    {
    },
    

    /**
     * @method
     * called by the framework before the pane will be removed from the DOM tree
     * 
     */
    onHide: function()
    {
    }
    



});

