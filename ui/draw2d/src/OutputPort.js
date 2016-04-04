/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************//**
 * @class draw2d.OutputPort
 * A OutputPort is the start anchor for a {@link draw2d.Connection}.
 * 
 * @author Andreas Herz
 * @extends draw2d.Port
 */ 
draw2d.OutputPort = draw2d.Port.extend({

    NAME : "draw2d.OutputPort",

    /**
     * @constructor
     * Create a new OutputPort element
     * 
     * @param {Object} [attr] the configuration of the shape
     */
    init: function(attr, setter, getter)
    {
        this._super(attr);
       
        // responsive for the arrangement of the port 
        // calculates the x/y coordinates in relation to the parent node
        this.locator=new draw2d.layout.locator.OutputPortLocator();
    },

    
    /**
     * @inheritdoc
     * 
     */
    onDragLeave:function( figure)
    {
	  // Ports accepts only InputPorts as DropTarget
	  //
      if(figure instanceof draw2d.InputPort){
        this._super( figure);
      }
      else if(figure instanceof draw2d.HybridPort){
        this._super( figure);
      }
    },

    /**
     * @inheritdoc
     */
    createCommand:function(request)
    {
       // Connect request between two ports
       //
       if(request.getPolicy() === draw2d.command.CommandType.CONNECT){
           return new draw2d.command.CommandConnect(request.canvas,request.target,request.source, request.source);
       }
    
       // ...else call the base class
       return this._super(request);
    }
});