/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/
/**
 * @class draw2d.layout.connection.InteractiveManhattanConnectionRouter
 * Route the connection in an Manhattan style and add resize handles to all vertex for interactive alignment of the
 * routing.
 * 
 * 
 * @author Andreas Herz
 * @since 4.0.2
 * @extends  draw2d.layout.connection.ManhattanConnectionRouter
 */
draw2d.layout.connection.InteractiveManhattanConnectionRouter = draw2d.layout.connection.ManhattanConnectionRouter.extend({
    NAME : "draw2d.layout.connection.InteractiveManhattanConnectionRouter",


	/**
	 * @constructor 
	 * Creates a new Router object.
	 * 
	 */
    init: function(){
        this._super();

    },
    
    onInstall: function(conn)
    {
        conn.installEditPolicy(new draw2d.policy.line.OrthogonalSelectionFeedbackPolicy());
        if(!conn._routingMetaData){
            conn._routingMetaData = {
                    routedByUserInteraction:false,
                    fromDir:-1,
                    toDir:-1
            };
        }
    },
    
    onUninstall: function(conn)
    {
        delete conn._routingMetaData;
    },
 
    /**
	 * @method
	 * Layout the hands over connection in a manhattan like layout
	 * 
	 * @param {draw2d.Connection} conn the connection to layout
     * @param {draw2d.util.ArrayList} oldVertices old/existing vertices of the Connection
	 */
	route : function(conn, oldVertices) {
	    if(oldVertices.getSize()===0 || conn._routingMetaData.routedByUserInteraction===false){
	        this._super(conn, oldVertices);
	        conn._routingMetaData.fromDir = conn.getSource().getConnectionDirection(conn, conn.getTarget());
	        conn._routingMetaData.toDir   = conn.getTarget().getConnectionDirection(conn, conn.getSource());
	    }
	    else{
	        this.halfRoute(conn, oldVertices);
	        this._paint(conn);
	    }
 	},
	
    /**
     * @method
     * The routing algorithm if the user has changed at least on of the vertices manually.
     * This kind of routing just align the start and end vertices to the new source/target port
     * location.
     * The vertices between keep untouched. Modification of this vertices are done by the
     * draw2d.policy.line.OrthogonalSelectionFeedbackPolicy
     * 
     * @param {draw2d.Connection} conn the connection to route
     * @param {draw2d.util.ArrayList} oldVertices the vertices of the routing before
     */	
    halfRoute:function(conn, oldVertices){

       var vertexCount  = oldVertices.getSize();
       
       var fromPt  = conn.getStartPoint();
       var fromDir = conn.getSource().getConnectionDirection(conn, conn.getTarget());

       var toPt    = conn.getEndPoint();
       var toDir   = conn.getTarget().getConnectionDirection(conn, conn.getSource());
       
       var max = Math.max;
       var min = Math.min;

       // the port orientation has been changed. This can happen if the node rotates. In this case
       // we must recalculate the routing.
       if(conn._routingMetaData.fromDir !== fromDir || conn._routingMetaData.toDir !== toDir){
           conn._routingMetaData.routedByUserInteraction = false;
           this.route(conn, oldVertices);
       }
       
	   //  go back to the default if no routing is possible anymore
	   //
	   if((fromDir===1 ) && (toDir === 3) && (fromPt.x > toPt.x) && (vertexCount<=4)){
	       conn._routingMetaData.routedByUserInteraction = false;
	       this.route(conn, oldVertices);
	   }

       // transfer the old vertices into the connection
       //
       oldVertices.each(function(i,vertex){
           conn.addPoint(vertex);
       });

	    
	    // The SOURCE port (labeled with p0) has been moved/changed.
	    //
	    if(!fromPt.equals(oldVertices.get(0))){
	        var p1 = oldVertices.get(1);
	        var p2 = oldVertices.get(2);
	        conn.setVertex(0,fromPt);
	        switch(fromDir){
    	       //          .
    	       //   p0     . p1
    	       //   +------+
    	       //          .
    	       //          .
    	       //
	           case draw2d.geo.Rectangle.DIRECTION_RIGHT:
    	         conn.setVertex(1,max(fromPt.x+10,p1.x),fromPt.y);// p1
    	         conn.setVertex(2,max(fromPt.x+10,p1.x),p2.y);    // p2
    	         break;
    	       //   .       
    	       //   . p1     p0
    	       //   +------+
    	       //   .       
    	       //   .       
    	       //
	           case draw2d.geo.Rectangle.DIRECTION_LEFT:
    	         conn.setVertex(1,min(fromPt.x-10,p1.x),fromPt.y);// p1
    	         conn.setVertex(2,min(fromPt.x-10,p1.x),p2.y);    // p2
    	         break;
    	       //     ...+....
    	       //     p1 |      
    	       //        |  
    	       //        |  
    	       //     p0 +  
    	       //
	           case draw2d.geo.Rectangle.DIRECTION_UP:
	             conn.setVertex(1,fromPt.x, min(fromPt.y-10,p1.y)); // p1
                 conn.setVertex(2,p2.x    , min(fromPt.y-10,p1.y)); // p2
                 break;
               //        +
               //     p0 |      
               //        |  
               //     p1 |  
               //    ....+....  
               //
	           case draw2d.geo.Rectangle.DIRECTION_DOWN:
                 conn.setVertex(1,fromPt.x, max(fromPt.y+10,p1.y)); // p1
                 conn.setVertex(2,p2.x    , max(fromPt.y+10,p1.y));     // p2
    	         break;
	       }
	    }
        //////////////////////////////////////////////////////////////////
	    // the TARGET port ( labeled with p0) has moved
	    //
	    if(!toPt.equals(oldVertices.get(vertexCount-1))){
            var p1 = oldVertices.get(vertexCount-2);
            var p2 = oldVertices.get(vertexCount-3);
            conn.setVertex(vertexCount-1,toPt);                        // p0
	        
    	      switch(toDir){
    	      //               .
    	      //      p0       . p1
    	      //    +----------+ 
    	      //               .
    	      //               .
    	      case draw2d.geo.Rectangle.DIRECTION_RIGHT:
    	         conn.setVertex(vertexCount-2,max(toPt.x+10,p1.x),toPt.y);  // p1
    	         conn.setVertex(vertexCount-3,max(toPt.x+10,p1.x),p2.y);    // p2
    	         break;

    	      //    .
    	      //    .
    	      //    . p1         p0
    	      //    +----------+ 
    	      //    .
    	      //    .
    	      //
    	      case draw2d.geo.Rectangle.DIRECTION_LEFT:
    	         conn.setVertex(vertexCount-2,min(toPt.x-10,p1.x),toPt.y);  // p1
    	         conn.setVertex(vertexCount-3,min(toPt.x-10,p1.x),p2.y);    // p2
    	         break;
    	         
    	      //     ...+....
    	      //     p1 |      
    	      //        |  
    	      //        |  
    	      //     p0 +  
    	      //
    	      case draw2d.geo.Rectangle.DIRECTION_UP:
    	         conn.setVertex(vertexCount-2, toPt.x,min(toPt.y+10,p1.y));  // p1
    	         conn.setVertex(vertexCount-3, p2.x  ,min(toPt.y+10,p1.y));  // p2
    	         break;
    	         
    	      //        +    
    	      //     p0 |      
    	      //        |  
    	      //     p1 |  
    	      //     ...+...
    	      //
    	      case draw2d.geo.Rectangle.DIRECTION_DOWN:
    	         conn.setVertex(vertexCount-2,toPt.x,max(toPt.y+10,p1.y));  // p1
    	         conn.setVertex(vertexCount-3,p2.x  ,max(toPt.y+10,p1.y));  // p2
    	         break;
    	      }
	   }
	},
	
    /**
     * Callback method for the PolyLine or Connection to verify that a segment is deletable.
     * @param index
     * @returns {Boolean}
     * @since 4.2.3
     */
    canRemoveSegmentAt: function(conn, index){

       var segmentCount= conn.getVertices().getSize()-1; // segmentCount is one less than vertex count
        
	   // The first and last segment isn't deletable
	   //
	   if( (index<=0) || (index>= segmentCount)){
	      return false;
	   }

       // a connection need at least three strokes
       //
       if(segmentCount<4){
          return false;
       }

       var fromPt  = conn.getStartPoint();
       var fromDir = conn.getSource().getConnectionDirection(conn, conn.getTarget());

       var toPt    = conn.getEndPoint();
       var toDir   = conn.getTarget().getConnectionDirection(conn, conn.getSource());

       if(segmentCount<=5){
    	   //     ___
    	   //    |   |      From
    	   //    | 1 |-----+
    	   //    |___|     |
    	   //              |
    	   //   +----------+
    	   //   |
    	   //   |    ___
    	   //   |   |   |
    	   //   +---| 2 |    To
    	   //       |___|
    	   // the connection needs at least 5 segments if the routing is like this above
           //
    	   if( (fromDir === draw2d.geo.Rectangle.DIRECTION_RIGHT) && ( toDir === draw2d.geo.Rectangle.DIRECTION_LEFT) && (fromPt.x >= toPt.x)){
    	      return false;
    	   }
    
    
           //     ___
           //    |   |        To
           //    | 2 |-----+
           //    |___|     |
           //              |
           //   +----------+
           //   |
           //   |    ___
           //   |   |   |
           //   +---| 1 |    From
           //       |___|
    	   //
    	   if( (fromDir == draw2d.geo.Rectangle.DIRECTION_LEFT) & ( toDir == draw2d.geo.Rectangle.DIRECTION_RIGHT) && (fromPt.x <= toPt.x)){
    	      return false;
    	   }
    	   
           //                          ___
    	   //      +_______           |   |
           //      | from  |          | 2 |
           //     _+_      |          |___| 
           //    |   |     |       To   +
           //    | 1 |     |____________|
           //    |___|     
            //
           if( (fromDir == draw2d.geo.Rectangle.DIRECTION_UP) & ( toDir == draw2d.geo.Rectangle.DIRECTION_DOWN) && (fromPt.y <= toPt.y)){
              return false;
           }
    
           //                          ___
           //      +_______           |   |
           //      | to    |          | 1 |
           //     _+_      |          |___| 
           //    |   |     |     from   +
           //    | 2 |     |____________|
           //    |___|     
            //
           if( (fromDir == draw2d.geo.Rectangle.DIRECTION_DOWN) & ( toDir == draw2d.geo.Rectangle.DIRECTION_UP) && (fromPt.y >= toPt.y)){
              return false;
           }
           
           // unable to make the decision on the easy way. calculate the route again and
           // check if the segment count of the new routed connection allows a removal
           //
           var tmpConn = new draw2d.Connection();
           tmpConn.lineSegments = new draw2d.util.ArrayList();
           tmpConn.vertices   = new draw2d.util.ArrayList();
           tmpConn.sourcePort = conn.sourcePort;
           tmpConn.targetPort = conn.targetPort;
           tmpConn._routingMetaData = {routedByUserInteraction:false,fromDir:-1,toDir:-1};
           this.route(tmpConn, new draw2d.util.ArrayList());
           var curSegmentCount = conn.getVertices().getSize()-1;
           var minSegmentCount = tmpConn.getVertices().getSize()-1;
           if(curSegmentCount<=minSegmentCount){
               return false;
           }
       }
       
	   return true;
	},


    /**
     * @method 
     * Tweak or enrich the polyline persistence data with routing information
     * 
     * @since 2.10.0
     * @param {draw2d.shape.basic.PolyLine} line
     * @param {Object} memento The memento data of the polyline
     * @returns {Object}
     */
    getPersistentAttributes : function(line, memento)
    {   
        memento.vertex = [];
        
        line.getVertices().each(function(i,e){
            memento.vertex.push({x:e.x, y:e.y});
        });
        memento.routingMetaData = $.extend({},line._routingMetaData);
        
        return memento;
    },
    
    /**
     * @method 
     * set the attributes for the polyline with routing information of the interactive manhattan router.
     * 
     * @since 4..0.0
     * @param {Object} memento
     */
    setPersistentAttributes : function(line, memento)
    {
        // restore the points from the JSON data and add them to the polyline
        //
        if(typeof memento.vertex !=="undefined"){
            
            line.oldPoint=null;
            line.lineSegments = new draw2d.util.ArrayList();
            line.vertices     = new draw2d.util.ArrayList();

            $.each(memento.vertex, function(i,e){
                line.addPoint(e.x, e.y);
            });
        }
        
        if(typeof memento.routingMetaData !== "undefinied"){
            line._routingMetaData = $.extend({},memento.routingMetaData);
        }
    }
    
});