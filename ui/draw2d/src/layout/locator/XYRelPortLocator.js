/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************//**
 * @class draw2d.layout.locator.XYRelPortLocator
 * 
 * Create a locator for a relative x/y coordinate position. The coordinates are named in percentage 
 * relative to the top/left corner of the parent node.<br>
 * <br>
 * <br>
 * Resize the shape in the example to see what happens.
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var figure =  new draw2d.shape.node.End({x:130,y:30,width:100,height:50});
 *     figure.add(new draw2d.shape.basic.Label({text:"x"}), new draw2d.layout.locator.XYRelPortLocator(20,20));
 *     
 *     canvas.add(figure);
 *     
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.PortLocator
 * @since 4.0.0
 */
draw2d.layout.locator.XYRelPortLocator = draw2d.layout.locator.PortLocator.extend({
    NAME : "draw2d.layout.locator.XYRelPortLocator",
     
    /**
     * @constructor
     * 
     * 
     * @param {Number} xPercentage the x coordinate in percent of the port relative to the left of the parent
     * @param {Number} yPercentage the y coordinate in percent of the port relative to the top of the parent
     */
    init:function(xPercentage ,yPercentage ){
      this._super();
      
      this.x = xPercentage;
      this.y = yPercentage;
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
    relocate:function(index, figure){
        var node = figure.getParent();
        var x = node.getWidth()/100 * this.x;
        var y = node.getHeight()/100  * this.y;

        this.applyConsiderRotation( figure, x, y);
    }
    
});



