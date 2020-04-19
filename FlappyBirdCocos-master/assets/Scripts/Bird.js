 
cc.Class({
    extends: cc.Component,

    properties: {
        //scalar only haysss
        velX:200, 
        velY:300,
        lookDownSpeed:105,
        lookUpSpeed:700,
        minAngle:90,
        maxAngle:30,
        body:"nil",
        flapping:false,
        turnAngle:0,
        gameover:false,
        acc:1,
        riseClip: {
            default: null,
            url: cc.AudioClip
        },
        
        collisionClip: {
            default: null,
            url: cc.AudioClip
        },
        particle: {
            default: null,
            type: cc.Node
        },

 
    },
 
    onLoad () {
        this.body = this.node.getComponent(cc.RigidBody);

        this.body.linearVelocity.x = this.velX; 
        
    },  

    start () { 
        

    },

    update (dt) {    
        if(!this.gameover){
            
        if(this.node.y >= -326 ){
        this.looking(dt);
        } }
        else {
            this.node.getComponent(cc.Animation).pause('flapping');
        }



    },

    looking(dt) {  
        this.acc+= 0;
        this.turnAngle+= this.acc + (this.lookDownSpeed*dt );
        if(this.turnAngle >=90){
            this.turnAngle = 90;
        }
        if(this.flapping){
            this.acc = 0;
            if(this.turnAngle <=-35){ 
                this.turnAngle = -35;
                this.flapping =false;
            }
            else {
            this.turnAngle-= this.lookUpSpeed*dt;
            }
        }
        this.node.rotation = this.turnAngle;
    },
    
    flap () {   
        this.flapping = true;
        cc.audioEngine.playEffect(this.riseClip, false , 0.5);
        this.body.linearVelocity = cc.v2( this.velX ,this.velY);
    },
    setPos(){
        cc.log('wtf');
        var POS = this.body.position;
        this.node.position = POS;
        this.node.getComponent(cc.Sprite).position = POS;
        this.node.getComponent(cc.PhysicsCircleCollider).position = POS;
    },
    onBeginContact: function (contact, selfCollider, otherCollider) {
        cc.log('ouchyy')
        if(!this.gameover){
            this.gameover = true;
        cc.audioEngine.playEffect(this.collisionClip, false ,0.5);}

        this.velX = 0;
        this.velY = 0; 
        
    },
 
    

});
