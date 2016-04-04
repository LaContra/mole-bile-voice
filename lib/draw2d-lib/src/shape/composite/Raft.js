/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************//**
 * @class draw2d.shape.composite.Raft
 * Raft figures are shapes, which aggregate multiple figures. It works like a real raft. Aboard figures are 
 * moved if the raft figures moves.
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var rect1 =  new draw2d.shape.composite.Raft({width:200, height:100});
 *     var rect2 =  new draw2d.shape.basic.Rectangle({width:50, height:50});
 *     
 *     canvas.add(rect1,10,10);
 *     canvas.add(rect2,20,20);
 *     
 *     rect2.attr({bgColor:"#f0f000", width:50, height:50, radius:10});
 *     
 *     canvas.setCurrentSelection(rect1);
 *     
 * @author Andreas Herz
 * @extends draw2d.shape.composite.WeakComposite
 * @since 4.7.0
 */
draw2d.shape.composite.Raft = draw2d.shape.composite.WeakComposite.extend({
    NAME : "draw2d.shape.composite.Raft",

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     * 
     * @param {Object} [attr] the configuration of the shape
     */
    init: function( attr, setter, getter) {
       
      this.aboardFigures = new draw2d.util.ArrayList();
      
      this._super($.extend({bgColor:"#f0f0f0", color:"#1B1B1B"},attr), setter, getter);
   },
    

    /**
     * @method
     * Will be called if the drag and drop action begins. You can return [false] if you
     * want avoid that the figure can be move.
     * 
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * 
     * @return {boolean} true if the figure accepts dragging
     **/
    onDragStart : function(x, y, shiftKey, ctrlKey ){
        this._super(x,y,shiftKey,ctrlKey);
        
        this.aboardFigures=new draw2d.util.ArrayList();
        // force the recalculation of the aboard figures if the shape is in a drag&drop operation
        this.getAboardFigures(this.isInDragDrop);
    },
    
    /**
     * @method
     * Set the position of the object.
     *
     * @param {Number/draw2d.geo.Point} x The new x coordinate of the figure
     * @param {Number} [y] The new y coordinate of the figure 
     **/
    setPosition : function(x, y) {
        var oldX = this.x;
        var oldY = this.y;
        
        // we need the figures before the composite has moved. Otherwise some figures are fall out of the raft
        // 
        var aboardedFigures =this.getAboardFigures(this.isInDragDrop===false);
        
        this._super(x,y);
        
        var dx = this.x-oldX;
        var dy = this.y-oldY;
        
        if(dx ===0 && dy===0 ){
            return this;
        }

        aboardedFigures.each(function(i,figure){
            figure.translate(dx,dy);
        });
        
        return this;
    },
    
    /**
     * @method
     * Return all figures which are aboard of this shape. These shapes are moved as well if the raft
     * is moving.
     * 
     * @returns {draw2d.util.ArrayList}
     */
    getAboardFigures: function(recalculate){
        if(recalculate===true && this.canvas !==null){
            var raftBoundingBox = this.getBoundingBox();
            var zIndex = this.getZOrder();
            this.aboardFigures=new draw2d.util.ArrayList();
            
            var _this = this;
            this.getCanvas().getFigures().each(function(i,figure){
                if(figure !==_this && figure.isSelectable() === true && figure.getBoundingBox().isInside(raftBoundingBox)){
                    // Don't add the figure if it is already catched by another composite with a higher z-index
                    //
                    if(_this.getNextComposite(figure)!==_this){
                        return;
                    }
                    // only add the shape if it is in front of the raft
                    if(figure.getZOrder()> zIndex){
                        _this.aboardFigures.add(figure);
                    }
                }
            });
        }
        return this.aboardFigures;
    },
    
    /**
     * @method
     * return the next potential composite parent figure
     * 
     * @param figureToTest
     * @returns
     */
    getNextComposite: function(figureToTest){
        var nextComposite = null;
        this.getCanvas().getFigures().each(function(i, figure){
            if(figureToTest === figure){
                return;
            }
            if(figure instanceof draw2d.shape.composite.Composite){
                if(nextComposite!==null && nextComposite.getZOrder() > figure.getZOrder()){
                    return;
                }
                
                if(figure.getBoundingBox().contains(figureToTest.getBoundingBox())){
                    nextComposite = figure;
                }
            }
        });
        
        return nextComposite;
    }
});






