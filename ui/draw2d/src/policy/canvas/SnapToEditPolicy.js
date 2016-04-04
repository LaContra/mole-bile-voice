/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/draw2d.SnapToHelper = {};

draw2d.SnapToHelper.NORTH   =  1;
draw2d.SnapToHelper.SOUTH   =  4;
draw2d.SnapToHelper.WEST    =  8;
draw2d.SnapToHelper.EAST    = 16;
draw2d.SnapToHelper.CENTER_H= 32;
draw2d.SnapToHelper.CENTER_V= 642;

draw2d.SnapToHelper.NORTH_EAST  = draw2d.SnapToHelper.NORTH | draw2d.SnapToHelper.EAST;
draw2d.SnapToHelper.NORTH_WEST  = draw2d.SnapToHelper.NORTH | draw2d.SnapToHelper.WEST;
draw2d.SnapToHelper.SOUTH_EAST  = draw2d.SnapToHelper.SOUTH | draw2d.SnapToHelper.EAST;
draw2d.SnapToHelper.SOUTH_WEST  = draw2d.SnapToHelper.SOUTH | draw2d.SnapToHelper.WEST;
draw2d.SnapToHelper.NORTH_SOUTH = draw2d.SnapToHelper.NORTH | draw2d.SnapToHelper.SOUTH;
draw2d.SnapToHelper.EAST_WEST   = draw2d.SnapToHelper.EAST | draw2d.SnapToHelper.WEST;
draw2d.SnapToHelper.NSEW        = draw2d.SnapToHelper.NORTH_SOUTH | draw2d.SnapToHelper.EAST_WEST;

/**
 * @class draw2d.policy.canvas.SnapToEditPolicy
 * 
 * A helper used by Tools for snapping certain mouse interactions. 
 * 
 * 
 * @author Andreas Herz
 * 
 * @extends draw2d.policy.canvas.CanvasPolicy
 */
draw2d.policy.canvas.SnapToEditPolicy = draw2d.policy.canvas.CanvasPolicy.extend({

    NAME : "draw2d.policy.canvas.SnapToEditPolicy",
    
    /**
     * @constructor 
     * Creates a new constraint policy for snap to grid
     * 
     */
    init: function( attr, setter, getter)
    {
        this._super( attr, setter, getter);
    },


    /**
     * @method
     * Adjust the coordinates to the given constraint of the policy.
     * 
     * @param {draw2d.Canvas} canvas the related canvas
     * @param {draw2d.Figure} figure the figure to adjust
     * @param {draw2d.geo.Point} clientPos
     * @returns {draw2d.geo.Point} the constraint position of the figure
     */
    snap: function(canvas, figure, clientPos)
    {
        return clientPos;
    }
});