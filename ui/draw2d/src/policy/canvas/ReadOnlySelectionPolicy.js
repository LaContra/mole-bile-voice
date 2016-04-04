/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/
/**
 * @class draw2d.policy.canvas.ReadOnlySelectionPolicy
 * 
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.SelectionPolicy
 */
draw2d.policy.canvas.ReadOnlySelectionPolicy = draw2d.policy.canvas.SelectionPolicy.extend({

    NAME : "draw2d.policy.canvas.ReadOnlySelectionPolicy",
    
    /**
     * @constructor 
     * Creates a new Router object
     */
    init: function()
    {
        this._super();
    },
    
    /**
     * @method
     * Called by the host if the policy has been installed.
     * 
     * @param {draw2d.Canvas/draw2d.Canvas} canvas
     */
    onInstall: function(canvas)
    {
        this._super(canvas);
        canvas.getAllPorts().each(function(i,port){
            port.setVisible(false);
        });
    },
    
    /**
     * @method
     * Called by the host if the policy has been uninstalled.
     * 
     * @param {draw2d.Canvas/draw2d.Canvas} canvas
     */
    onUninstall: function(canvas)
    {
        canvas.getAllPorts().each(function(i,port){
            port.setVisible(true);
        });

        this._super(canvas);
    },
    
    /**
     * @method
     * 
     * @param {draw2d.Canvas} canvas
     * @param {Number} dx The x diff between start of dragging and this event
     * @param {Number} dy The y diff between start of dragging and this event
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     * @template
     */
    onMouseDrag:function(canvas, dx, dy, dx2, dy2)
    {
        var area = canvas.getScrollArea();
        area.scrollTop(area.scrollTop()-dy2);
        area.scrollLeft(area.scrollLeft()-dx2);
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
    }
});
