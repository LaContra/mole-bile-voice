/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/
/**
 * @class draw2d.policy.canvas.SelectionPolicy
 * 
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.CanvasPolicy
 */
draw2d.policy.canvas.SelectionPolicy = draw2d.policy.canvas.CanvasPolicy.extend({

    NAME : "draw2d.policy.canvas.SelectionPolicy",
    
    /**
     * @constructor 
     * Creates a new selection policy
     */
    init: function(){
        this._super();
    },
 

    /**
     * @method
     * Unselect the given figure in the canvas and remove all resize handles
     * 
     * @param {draw2d.Canvas} canvas
     * @param {draw2d.Figure} figure
     */
    unselect: function(canvas, figure){
        canvas.getSelection().remove(figure);

        figure.unselect();

        canvas.fireEvent("select",null);
   },

    /**
     * @method
     * Called by the canvas if the user click on a figure.
     *
     * @param {draw2d.Figure} the figure under the click event. Can be null
     * @param {Number} mouseX the x coordinate of the mouse during the click event
     * @param {Number} mouseY the y coordinate of the mouse during the click event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     *
     * @since 3.0.0
     *
     * @template
     */
    onClick: function(figure, mouseX, mouseY, shiftKey, ctrlKey)
    {
        if(figure!==null){
            figure.fireEvent("click", {x:mouseX, y:mouseY, shiftKey:shiftKey, ctrlKey:ctrlKey});
            figure.onClick();
        }
    },

    /**
     * @method
     * Called by the canvas if the user double click on a figure.
     *
     * @param {draw2d.Figure} the figure under the double click event. Can be null
     * @param {Number} mouseX the x coordinate of the mouse during the click event
     * @param {Number} mouseY the y coordinate of the mouse during the click event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     *
     * @since 4.1.0
     *
     * @template
     */
    onDoubleClick: function(figure, mouseX, mouseY, shiftKey, ctrlKey)
    {
        if(figure!==null){
            figure.fireEvent("dblclick", {x:mouseX, y:mouseY, shiftKey:shiftKey, ctrlKey:ctrlKey});
            figure.onDoubleClick();
        }
    }

});





