/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/
/**
 * @class draw2d.policy.canvas.WheelZoomPolicy
 * Zoom support for a canvas. Use the mouse wheel and the shift key to zoom in/out.
 *
 *
 * 
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.CanvasPolicy
 * @since 5.8.0
 */
draw2d.policy.canvas.WheelZoomPolicy = draw2d.policy.canvas.ZoomPolicy.extend({

    NAME : "draw2d.policy.canvas.WheelZoomPolicy",
    
    /**
     * @constructor 
     */
    init: function(){
        this._super();
    },

    onInstall: function(canvas)
    {
        this._super(canvas);
        canvas.setZoom(1);
        canvas.__wheelZoom = 1;
    },

    onUninstall: function(canvas)
    {
        this._super(canvas);

        // cleanup the canvas object and remove custom properties
        //
        delete canvas.__wheelZoom;
    },


    /**
     * @method
     * called if the user uses the mouse wheel.
     *
     *
     * @param wheelDelta
     * @param {Number} x the x coordinate of the event
     * @param {Number} y the y coordinate of the event
     * @param shiftKey
     * @param ctrlKey
     * @since 5.8.0
     * @template
     * @return {Boolean} return <b>false</b> to preven tthe default event operation (e.g. scrolling)
     */
    onMouseWheel: function(wheelDelta, x, y, shiftKey, ctrlKey)
    {
        // mouse wheel is only supported if the user presses the shift key.
        // normally the canvas scrolls during mouseWheel usage.
        //
        if(shiftKey ===false){
            return true;
        }

        wheelDelta = wheelDelta/2048;

        var newZoom = ((Math.min(5,Math.max(0.1,this.canvas.zoomFactor+wheelDelta))*100)|0)/100;

        this._zoom(newZoom,x,y);

        return false;
    },

    /**
     * @method
     * Set the new zoom level of the canvas.
     *
     * @param zoomFactor
     * @param animated
     */
    setZoom:function( zoomFactor, animated){

        // determine the center of the current canvas. We try to keep the
        // current center during zoom operation
        //
        var scrollTop   = this.canvas.getScrollTop();
        var scrollLeft  = this.canvas.getScrollLeft();
        var scrollWidth = this.canvas.getScrollArea().width();
        var scrollHeight= this.canvas.getScrollArea().width();
        var centerY = scrollTop+(scrollHeight/2)*this.canvas.zoomFactor;
        var centerX = scrollLeft+(scrollWidth/2)*this.canvas.zoomFactor;

        var _this = this;
        if(animated){
            var myTweenable = new Tweenable();
            myTweenable.tween({
                from:     { 'x': this.canvas.zoomFactor  },
                to:       { 'x': zoomFactor },
                duration: 300,
                easing : "easeOutSine",
                step: function (params) {
                    _this._zoom(params.x, centerX, centerY);
                }
            });
        }
        else{
            this._zoom(zoomFactor, centerX, centerY);
        }

    },

    /**
     * @method
     *
     * @param zoom
     * @param centerX
     * @param centerY
     * @private
     */
     _zoom : function(zoom, centerX, centerY){
         var canvas = this.canvas;
         var coordsBefore = this.canvas.fromCanvasToDocumentCoordinate(centerX,centerY);

         //
         // Beachten!!:
         //   Der Zoomfaktor in raphael ist das Verhältnis von canvas Größe zur viewBox.
         //   Vergrößert man das Canvas mit "zoomFactor" und die viewBox gleichzeitig mit
         //   mit "zoomFactor", so hat man ein tatsächlichen Zoomfaktor von "zoomFactor*zoomFactor"
         //   eingestellt, da sich canvas UND viewBox entgegengesetzt verändert haben.
         //
         //
         canvas.__wheelZoom= Math.sqrt(zoom);
         canvas.zoomFactor=zoom;

         canvas.paper.setViewBox(0, 0, canvas.initialWidth*canvas.__wheelZoom, canvas.initialHeight*canvas.__wheelZoom);
         canvas.paper.setSize(canvas.initialWidth/canvas.__wheelZoom, canvas.initialHeight/canvas.__wheelZoom);

         var coordsAfter = canvas.fromCanvasToDocumentCoordinate(centerX,centerY);


         var diffCoordinate =coordsBefore.subtract(coordsAfter);
         canvas.scrollTo(this.canvas.getScrollTop()-diffCoordinate.y, canvas.getScrollLeft()-diffCoordinate.x);

         canvas.fireEvent("zoom", {factor:canvas.zoomFactor});
    }
});
