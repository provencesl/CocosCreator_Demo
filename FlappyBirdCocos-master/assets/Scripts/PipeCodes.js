 

cc.Class({
    extends: cc.Component,


    properties: {
        game: {
            default: null,
            serializable: false
        },
        
    },
    onLoad () {},

    start () { 

    },

    update (dt) {
         

       if( this.game.camera.x - this.node.x >= 700 ){cc.log('delete pipe');this.node.destroy();
         }
    }, 

});
