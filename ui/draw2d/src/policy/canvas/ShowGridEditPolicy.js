/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/
/**
 * @class draw2d.policy.canvas.ShowGridEditPolicy
 * 
 * Just to paint a grid in the background. 
 * 
 * 
 * @author Andreas Herz
 * 
 * @extends draw2d.policy.canvas.CanvasPolicy
 */
draw2d.policy.canvas.ShowGridEditPolicy = draw2d.policy.canvas.CanvasPolicy.extend({

    NAME : "draw2d.policy.canvas.ShowGridEditPolicy",
    
    GRID_COLOR  : "#e0e0f0",
    GRID_WIDTH  : 10,
    
    /**
     * @constructor 
     * Creates a new constraint policy for snap to grid
     * 
     * @param {Number} [grid] the grid width of the canvas
     * @param {boolean} [considerCanvasZoom] indicates whenever the grid should be adapted to the canvas zoom factor. default is <code>false</code>
     */
    init: function( grid, considerCanvasZoom)
    {
        this.color = new draw2d.util.Color(this.GRID_COLOR);

        this._super();

        if(typeof grid ==="number"){
            this.grid = grid;
        }
        else{
            this.grid = this.GRID_WIDTH;
        }
        this.zoom=1;
 

        this.generateBackgroundImage(this.grid/this.zoom, this.color);

        if (considerCanvasZoom) {
            this.zoomListener = $.proxy(function(canvas, zoomData){
                this.zoom= zoomData.factor;
                this.setGrid(this.grid);
            },this);
        }
        else{
            this.zoomListener = function(){};
        }
    },
	
	onInstall: function(canvas)
	{
        this._super(canvas);
	    this.zoom = canvas.getZoom();
        this.generateBackgroundImage(this.grid/this.zoom, this.color);
	    this.oldBg =  this.canvas.html.css("background-image");
	    $(canvas.paper.canvas).css({"background-image": "url('"+this.imageDataURL+"')"});
	    canvas.on("zoom", this.zoomListener);
	},
	
	onUninstall: function(canvas)
	{
        this._super(canvas);
        canvas.off(this.zoomListener);
	    $(canvas.paper.canvas).css({"background-image": this.oldBg});
	},
	
	/**
	 * @method
	 * Set the grid color 
	 * 
	 * @param {draw2d.util.Color|String} color a color object or the CSS string declaration for a color
	 * @since 5.0.3
	 */
	setGridColor: function(color)
	{
	    this.color=new draw2d.util.Color(color);
        this.generateBackgroundImage(this.grid/this.zoom, this.color);
        if(this.canvas!==null){
            $(this.canvas.paper.canvas).css({"background-image": "url('"+this.imageDataURL+"')"});
        }
	},
	
	/**
	 * @method
	 * Set a new grid width/height
	 * 
	 * @param {Number} grid
     * @since 5.0.3
	 */
    setGrid: function(grid)
    {
        this.grid = Math.min(200, Math.max(2,grid));
        this.generateBackgroundImage(this.grid/this.zoom, this.color);
        if(this.canvas!==null){
            $(this.canvas.paper.canvas).css({"background-image": "url('"+this.imageDataURL+"')"});
        }
    },
	
    
    /**
     * @method
     * calculate the background image with the given grid width/height
     * 
     * @param {Number} grid the grid width of the background decoration
     * @param {draw2d.util.Color} color the color of the grid lines
     * @private 
     */
    generateBackgroundImage: function(grid, color)
    {
        grid = parseInt(Math.floor(grid));
        // generate the background pattern with an data URL GIF image. This is much faster than draw
        // the pattern via the canvas and the raphael.line method
        //
        var mypixels = Array(grid*grid);
        // set the pixel at the coordinate [0,0] as opaque.       
        for(var x=0; x<grid; x++){
            mypixels[x] = 1;
        }
        for(var y=0; y<(grid*grid); y+=grid){
            mypixels[y] = 1;
        }
        this.imageDataURL = this.createMonochromGif(grid, grid, mypixels,  color.hash());
    }
    
    

});