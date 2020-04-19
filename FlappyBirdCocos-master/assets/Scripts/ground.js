 

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
         

        if( this.game.camera.x - this.node.x >=1100 ){cc.log('destroyed');this.node.destroy();
        }
    }, 

});
