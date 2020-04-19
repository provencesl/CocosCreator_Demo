 

cc.Class({
    extends: cc.Component,

    properties: {
        bird: {
            default: null,
            type: cc.Node
        },
    
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        //cc.director.getPhysicsManager().attachDebugDrawToCamera (this.node);
//  cc.director.getCollisionManager().attachDebugDrawToCamera (this.node);

    },

    update (dt) {

        //this.node.rotation+= dt*90;
       // this.node.scale = 200;
    this.node.x = this.bird.x+ 500;  
        this.node.y =  480;
    },
});
