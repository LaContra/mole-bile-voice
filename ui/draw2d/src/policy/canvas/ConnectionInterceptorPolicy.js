/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************//**
 * @class draw2d.policy.canvas.ConnectionInterceptorPolicy
 * Connection interceptors are basically event handlers from which you can return a value 
 * that tells draw2d to abort what it is that it was doing.<br>
 * <br>
 * Interceptors can be registered via the registerEditPolicy method on the draw2d canvas just like any other 
 * edit policies.<br>
 * <br>
 * The <b>delegateDrop</b> method is responsible for all drop event especially to all connection and port handlings.
 * 
 * 
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.CanvasPolicy
 * @since 5.0.0
 */
draw2d.policy.canvas.ConnectionInterceptorPolicy = draw2d.policy.canvas.CanvasPolicy.extend({

    NAME : "draw2d.policy.canvas.ConnectionInterceptorPolicy",
    
    /**
     * @constructor 
     * 
     */
    init: function()
    {
        this._super();
    },
    

    /**
     * @method
     * Called if the user want drop a port over any draw2d.Figure.<br>
     * Return a non <b>null</b> value if the interceptor accept the drop event.<br>
     * <br>
     * It is possible to delegate the drop event to another figure if the policy
     * returns another figure. This is usefull if a figure want to accept a port 
     * drop event and delegates this drop event to another port.<br>
     * 
     * 
     * @param {draw2d.Figure} draggedFigure the dragged figure
     * @param {draw2d.Figure} dropTarget the potential drop target determined by the framework
     */
    delegateDrop: function(draggedFigure, dropTarget)
    {
        // a composite accept any kind of figures exceptional ports
        //
    	if(!(draggedFigure instanceof draw2d.Port) && dropTarget instanceof draw2d.shape.composite.StrongComposite){
    		return dropTarget;
    	}
    	
    	// Ports accepts only Ports as DropTarget
    	//
    	if(!(dropTarget instanceof draw2d.Port) || !(draggedFigure instanceof draw2d.Port)){
    		return null;
    	}
 
    	// consider the max possible connections for this port
    	//
    	if(dropTarget.getConnections().getSize() >= dropTarget.getMaxFanOut()){
    	    return null;
    	}

        // It is not allowed to connect two output ports
        if (draggedFigure instanceof draw2d.OutputPort && dropTarget instanceof draw2d.OutputPort) {
            return null;
        }
        
        // It is not allowed to connect two input ports
        if (draggedFigure instanceof draw2d.InputPort && dropTarget instanceof draw2d.InputPort) {
            return null;
        }

        // It is not possible to create a loop back connection at the moment.
        // Reason: no connection router implemented for this case
        if((draggedFigure instanceof draw2d.Port) && (dropTarget instanceof draw2d.Port)){
	        if(draggedFigure.getParent() === dropTarget.getParent()){
	            return null;
	         }
        }
        
        // return the dropTarget determined by the framework or delegate it to another
        // figure.
        return dropTarget;
    }
    
});
