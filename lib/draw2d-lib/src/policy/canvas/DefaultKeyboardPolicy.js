/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/
/**
 * @class draw2d.policy.canvas.DefaultKeyboardPolicy
 * Standard keyboard policy. This is the standard installed keyboard policy.
 * <br> 
 * <br>
 * Keyboard commands
 * <ul>
 *    <li>DEL    - delete selection</li>
 * </ul>
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.KeyboardPolicy
 */
draw2d.policy.canvas.DefaultKeyboardPolicy = draw2d.policy.canvas.KeyboardPolicy.extend({

    NAME : "draw2d.policy.canvas.DefaultKeyboardPolicy",
    
    /**
     * @constructor 
     */
    init: function(){
        this._super();
    },
    
    /**
     * @method
     * Callback if the user press a key.<br>
     * This implementation checks only if the <b>DEL</b> has been pressed and creates an
     * CommandDelete if this happens.
     * 
     * @param {draw2d.Canvas} canvas the related canvas
     * @param {Number} keyCode the pressed key
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/
    onKeyDown:function(canvas, keyCode, shiftKey, ctrlKey){
        //
        if(keyCode===46 && canvas.getCurrentSelection()!==null){
            // create a single undo/redo transaction if the user delete more than one element. 
            // This happens with command stack transactions.
            //
            canvas.getCommandStack().startTransaction(draw2d.Configuration.i18n.command.deleteShape);
            canvas.getSelection().each(function(index, figure){
               var cmd = figure.createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.DELETE));
               if(cmd!==null){
                   canvas.getCommandStack().execute(cmd);
               }
           });
           // execute all single commands at once.
           canvas.getCommandStack().commitTransaction();
        }
        else{
            this._super(canvas, keyCode, shiftKey, ctrlKey);
         }
        
    }


});
