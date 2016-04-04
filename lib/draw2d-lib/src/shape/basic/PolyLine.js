/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/
/**
 * @class draw2d.shape.basic.PolyLine
 * 
 * A PolyLine is a line with more than 2 points.
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.basic.Line
 */
draw2d.shape.basic.PolyLine = draw2d.shape.basic.Line.extend({
    
	NAME : "draw2d.shape.basic.PolyLine",
	
    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     * 
     * @param {Object} [attr] the configuration of the shape
     */
    init: function( attr, setter, getter ) {
        
      // internal status handling for performance reasons
      //
      this.svgPathString = null;
      this.oldPoint=null;
    
      this.router = null;
      this.routingRequired = true;
      this.lineSegments = new draw2d.util.ArrayList();
  
      this.radius = 2;

      this._super(
         $.extend(
              {router:draw2d.shape.basic.PolyLine.DEFAULT_ROUTER},attr),
         $.extend({},{
             /** @attr {draw2d.layout.connection.ConnectionRouter} the router to use to layout the polyline */
             router : this.setRouter,
             /** @attr {Number} radius the radius to render the line edges */
             radius : this.setRadius
        }, setter),
        $.extend({},{
            router: this.getRouter,
            radius: this.getRadius
        }, getter)
      );
    },
    
    /**
     * @method
     * Sets the corner radius of the edges. 
     * 
     * @param {Number} radius the corner radius
     * @since 4.2.1
     */
     setRadius: function(radius)
     {
        this.radius = radius;
        this.svgPathString =null;
        this.repaint();
        this.fireEvent("change:radius");
        
        return this;
    },
    
    /**
     * @method
     * Get the corner radius of the edges.
     * 
     * @return {Number}
     * @since 4.2.1
     */
    getRadius:function() 
    {
        return this.radius;
    },
    
    
    /**
     * @method
     * Set the start point of the line.
     *
     * @param {Number} x the x coordinate of the start point
     * @param {Number} y the y coordinate of the start point
     **/
    setStartPoint:function( x, y)
    {
        if (this.start.x === x && this.start.y === y) {
			return this;
		}
		this.start.setPosition(x, y);
		this.calculatePath();
		this.repaint();
        var _this = this;
		this.editPolicy.each(function(i, e) {
			if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
				e.moved(_this.canvas, _this);
			}
		});
        this.fireEvent("change:start");
		
		return this;
    },

    /**
     * @method
	 * Set the end point of the line.
	 * 
	 * @param {Number} x the x coordinate of the end point
	 * @param {Number} y the y coordinate of the end point
	 */
    setEndPoint:function(x, y)
    {
        if(this.end.x===x && this.end.y===y){
            return this;
        }

        this.end.setPosition(x, y);
        this.calculatePath();
        this.repaint();

        var _this = this;
        this.editPolicy.each(function(i,e){
            if(e instanceof draw2d.policy.figure.DragDropEditPolicy){
                e.moved(_this.canvas, _this);
            }
        });
        this.fireEvent("change:end");
        
        return this;
    },

    /**
     * @method
     * Inserts the draw2d.geo.Point object into the vertex list of the polyline just after the object with the given index.
     *  
     * @param {Number} index the insert index
     * @param {Number|draw2d.geo.Point} x the x coordinate or the draw2d.geo.Point object
     * @param {Number} [y] the y coordinate or undefined of the second argument is a point
     * 
     * @since 4.0.0
     */
    addVertex:function(x, y) 
    {
        this.vertices.add(new draw2d.geo.Point(x,y));
        
        this.start=this.vertices.first().clone();
        this.end=this.vertices.last().clone();
       
        this.svgPathString = null;
        this.repaint();

        if(!this.selectionHandles.isEmpty()){
            var _this = this;
            this.editPolicy.each(function(i, e) {
                if (e instanceof draw2d.policy.figure.SelectionFeedbackPolicy) {
                    e.onUnselect(_this.canvas, _this);
                    e.onSelect(_this.canvas, _this);
                }
            });
        }
        this.fireEvent("change:vertices");

        return this;
    },

    /**
     * @method
     * Update the vertex at the give position with the new coordinate
     * 
     * @param {Number} index the index of the vertex to update
     * @param {Number|draw2d.geo.Point} x the x coordinate or the draw2d.geo.Point object
     * @param {Number} [y] the y coordinate or undefined of the second argument is a point
     * 
     * @since 4.0.0
     */
    setVertex : function(index, x, y) 
    {
        if(x instanceof draw2d.geo.Point){
            y = x.y;
            x = x.x;
        }
        
        var vertex = this.vertices.get(index);

        // invalid point or nothing to do
        //
        if (vertex === null || (vertex.x === x && vertex.y === y)) {
            return;
        }

        vertex.x = parseFloat(x);
        vertex.y = parseFloat(y);
        
        this.start=this.vertices.first().clone();
        this.end=this.vertices.last().clone();

        this.svgPathString = null;
        this.routingRequired=true;
        this.repaint();

        var _this = this;
        this.editPolicy.each(function(i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.moved(_this.canvas, _this);
            }
        });
        this.fireEvent("change:vertices");

        return this;
    },


    /**
     * @method
     * Inserts the draw2d.geo.Point object into the vertex list of the polyline just after the object with the given index.
     *  
     * @param {Number} index the insert index
     * @param {Number|draw2d.geo.Point} x the x coordinate or the draw2d.geo.Point object
     * @param {Number} [y] the y coordinate or undefined of the second argument is a point
     * 
     * @since 4.0.0
     */
    insertVertexAt:function(index, x, y) 
    {
        var vertex = new draw2d.geo.Point(x,y);

        this.vertices.insertElementAt(vertex,index);

        this.start=this.vertices.first().clone();
        this.end=this.vertices.last().clone();

        this.svgPathString = null;
        this.repaint();

        if(!this.selectionHandles.isEmpty()){
            var _this = this;
	        this.editPolicy.each(function(i, e) {
	            if (e instanceof draw2d.policy.figure.SelectionFeedbackPolicy) {
	                e.onUnselect(_this.canvas, _this);
	                e.onSelect(_this.canvas, _this);
	            }
	        });
        }
        this.fireEvent("change:vertices");

        return this;
    },


    /**
     * @method
     * Remove a vertex from the polyline and return the removed point. The current installed connection router
     * can send an veto for this operation.
     * 
     * @param index
     * @returns {draw2d.geo.Point} the removed point or null of the current router decline this operation
     * @since 4.0.0
     */
    removeVertexAt:function(index) 
    {
        var removedPoint = this.vertices.removeElementAt(index);
        
        this.start=this.vertices.first().clone();
        this.end=this.vertices.last().clone();

        this.svgPathString = null;
        this.repaint();

        if(!this.selectionHandles.isEmpty()){
            var _this = this;
	        this.editPolicy.each(function(i, e) {
	            if (e instanceof draw2d.policy.figure.SelectionFeedbackPolicy) {
	                e.onUnselect(_this.canvas, _this);
	                e.onSelect(_this.canvas, _this);
	            }
	        });
        }
        this.fireEvent("change:vertices");

        return removedPoint;
    },

    
    /**
     * @method
     * Set the router for this connection.
     * 
     * @param {draw2d.layout.connection.ConnectionRouter} [router] the new router for this connection or null if the connection should use the default routing
     **/
    setRouter:function(router)
    {
      if(this.router !==null){
          this.router.onUninstall(this);
      }
      
      if(typeof router ==="undefined" || router===null){
          this.router = new draw2d.layout.connection.DirectRouter();
      }
      else{
          this.router = router;
      }
      
      this.router.onInstall(this);
      
      this.routingRequired =true;
    
      // repaint the connection with the new router
      this.repaint();
      
      this.fireEvent("change:router");

      return this;
    },
    
    /**
     * @method
     * Return the current active router of this connection.
     *
     * @type draw2d.layout.connection.ConnectionRouter
     **/
    getRouter:function()
    {
      return this.router;
    },
    
    /**
     * @method
     * Calculate the path of the polyline
     * 
     * @private
     */
    calculatePath: function()
    {
        
        if(this.shape===null){
            return;
        }
    
        this.svgPathString = null;
        
        var oldVertices = this.vertices;
        
        // cleanup the routing cache
        //
        this.oldPoint=null;
        this.lineSegments = new draw2d.util.ArrayList();
        this.vertices     = new draw2d.util.ArrayList();
    
        // Use the internal router
        //
        this.router.route(this, oldVertices);
        this.routingRequired=false;
        this.fireEvent("routed");
        this.fireEvent("change:route");
     },
    
    /**
     * @inheritdoc
     */
    repaint : function(attributes)
    {
      if(this.repaintBlocked===true || this.shape===null){
          return;
      }

      if(this.svgPathString===null || this.routingRequired===true){
          this.calculatePath();
      }
 
     
      this._super( $.extend( {path:this.svgPathString,"stroke-linecap":"round", "stroke-linejoin":"round"}, attributes));
      
      return this;
    },
    

    /**
     * @method
     * Return all line segments of the polyline.
     * 
     * @returns {draw2d.util.ArrayList}
     */
    getSegments: function()
    {
        return this.lineSegments;
    },
    
    /**
     * @method
     * used for the router to add the calculated points
     * 
     * @private
     *
     **/
    addPoint:function(/*:draw2d.geo.Point*/ p, y)
    {
      if(typeof y!=="undefined"){
          p = new draw2d.geo.Point(p, y);
      }
      this.vertices.add(p);

      if(this.oldPoint!==null){
        // store the painted line segment for the "mouse selection test"
        // (required for user interaction)
        this.lineSegments.add({start: this.oldPoint, end:p});
      }
      this.svgPathString=null;
      this.oldPoint = p;
    },


    /**
     * @method
     * get the best segment of the line which is below the given coordinate or null if
     * all segment are not below the coordinate. <br> 
     * The 'corona' property of the polyline is considered for this test. This means 
     * the point isn't direct on the line. Is it only close to the line!
     *
     * @param {Number} px the x coordinate of the test point
     * @param {Number} py the y coordinate of the test point
     * @return {Object}
     * @since 4.4.0
      **/
     hitSegment:function( px, py)
     {
       for(var i = 0; i< this.lineSegments.getSize();i++){
          var segment = this.lineSegments.get(i);
          if(draw2d.shape.basic.Line.hit(this.corona+this.stroke, segment.start.x,segment.start.y,segment.end.x, segment.end.y, px,py)){
            return {index: i, start:segment.start, end: segment.end};
          }
       }
       return null;
     },

   /**
    * @method
    * Checks if the hands over coordinate close to the line. The 'corona' property of the polyline 
    * is considered for this test. This means the point isn't direct on the line. Is it only close to the
    * line!
    *
    * @param {Number} px the x coordinate of the test point
    * @param {Number} py the y coordinate of the test point
    * @return {boolean}
     **/
    hitTest:function( px, py)
    {
      return this.hitSegment(px,py) !== null;
    },

    /**
     * @inheritdoc
     */
    createCommand:function(request) 
    {
 
      if(request.getPolicy() === draw2d.command.CommandType.DELETE){
        if(this.isDeleteable()===true){
          return new draw2d.command.CommandDelete(this);
        }
      }
      else if(request.getPolicy() === draw2d.command.CommandType.MOVE_VERTEX){
          if(this.isResizeable()===true){
              return new draw2d.command.CommandMoveVertex(this);
            }
      }
      else if(request.getPolicy() === draw2d.command.CommandType.MOVE_VERTICES){
          if(this.isResizeable()===true){
              return new draw2d.command.CommandMoveVertices(this);
            }
      }
    
      return this._super(request);
    },
    
    /**
     * @inheritdoc
     */
    getPersistentAttributes : function()
    {   
        var memento=  $.extend( this._super() ,{
            router : this.router.NAME,
            radius : this.radius
        });
      
        memento = this.router.getPersistentAttributes(this, memento);
        
        return memento;
    },
    
    /**
     * @inheritdoc
     */
    setPersistentAttributes : function(memento)
    {
        this._super(memento);

        if(typeof memento.router !=="undefined"){
            try{
                this.setRouter(eval("new "+memento.router+"()"));
            }
            catch(exc){
                debug.warn("Unable to install router '"+memento.router+"' forced by "+this.NAME+".setPersistendAttributes. Using default");
            }
        }
        
        if(typeof memento.radius !=="undefined"){
            this.setRadius(memento.radius);
        }

        this.router.setPersistentAttributes(this, memento);

        if(this.vertices.getSize()>1) {
            this.start = this.vertices.first().clone();
            this.end = this.vertices.last().clone();
        }
    }
});

/**
 * The default ConnectionRouter for the running applicaiton. Set this to your wanted implementation
 * {@link draw2d.layout.connection.ConnectionRouter}
 */
draw2d.shape.basic.PolyLine.DEFAULT_ROUTER= new draw2d.layout.connection.ManhattanConnectionRouter();
