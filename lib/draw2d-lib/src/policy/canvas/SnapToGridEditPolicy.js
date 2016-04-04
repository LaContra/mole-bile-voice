/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/
/**
 * @class draw2d.policy.canvas.SnapToGridEditPolicy
 * 
 * A helper used to perform snapping to a grid, which is specified on the canvas via the various 
 * properties defined in this class. 
 * 
 * 
 * @author Andreas Herz
 * 
 * @extends draw2d.policy.canvas.SnapToEditPolicy
 */
draw2d.policy.canvas.SnapToGridEditPolicy = draw2d.policy.canvas.SnapToEditPolicy.extend({

    NAME : "draw2d.policy.canvas.SnapToGridEditPolicy",
    
    GRID_COLOR  : "#e0e0f0",
    GRID_WIDTH  : 10,
    
    /**
     * @constructor 
     * Creates a new constraint policy for snap to grid
     * 
     * @param {Number} grid the grid width of the canvas
     */
    init: function( grid)
    {
        this.color = new draw2d.util.Color(this.GRID_COLOR);

        this._super();

        
        if(typeof grid ==="undefined"){
            this.grid = this.GRID_WIDTH;
        }
        else{
            this.grid = grid;
        }
 
        this.generateBackgroundImage(this.grid, this.color);
	},
	
	onInstall: function(canvas)
	{
        this._super(canvas);
	    this.oldBg =  this.canvas.html.css("background-image");
	    $(canvas.paper.canvas).css({"background-image": "url('"+this.imageDataURL+"')"});
	},
	
	onUninstall: function(canvas)
	{
        this._super(canvas);
	    $(canvas.paper.canvas).css({"background-image": this.oldBg});
	},
	
    /**
     * @method
     * Set the grid color 
     * 
     * @param {draw2d.util.Color|String} color a color object or the CSS string declarion for a color
     * @since 5.0.3
     */
    setGridColor: function(color)
    {
        this.color=new draw2d.util.Color(color);
        this.generateBackgroundImage(this.grid, this.color);
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
        this.generateBackgroundImage(this.grid, this.color);
        if(this.canvas!==null){
            $(this.canvas.paper.canvas).css({"background-image": "url('"+this.imageDataURL+"')"});
        }
    },
    

    /**
     * @method
     * Applies a snapping correction to the given result. 
     * 
     * @param figure
     * @param {draw2d.geo.Point} pos
     * @returns {draw2d.geo.Point} the contraint position of the figure
     * @since 2.3.0
     */
    snap: function(canvas, figure, pos)
    {
        
        var snapPoint = figure.getSnapToGridAnchor();

        pos.x= pos.x+snapPoint.x;
        pos.y= pos.y+snapPoint.y;

       
        pos.x = this.grid*Math.floor(((pos.x + this.grid/2.0) / this.grid));
        pos.y = this.grid*Math.floor(((pos.y + this.grid/2.0) / this.grid));
        
        pos.x= pos.x-snapPoint.x;
        pos.y= pos.y-snapPoint.y;
        
        return pos;
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