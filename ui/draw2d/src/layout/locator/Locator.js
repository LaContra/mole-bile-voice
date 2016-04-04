/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************//**
 * @class draw2d.layout.locator.Locator
 * 
 * Controls the location of an IFigure. 
 *
 * @author Andreas Herz
 */
draw2d.layout.locator.Locator= Class.extend({
    NAME : "draw2d.layout.locator.Locator",
   
    /**
     * @constructor
     * Initial Constructor
     * 
     */
    init:function( )
    {
    },
    

    /**
     * @method
     * Controls the location of an I{@link draw2d.Figure} 
     *
     * @param {Number} index child index of the figure
     * @param {draw2d.Figure} figure the figure to control
     * 
     * @template
     **/
    relocate:function(index, figure)
    {	
    },
    
    /**
     * @method
     * Return a clone of the locator object
     * 
     * @returns
     */
    clone : function()
    {
        return eval("new "+this.NAME+"()");
    }
});