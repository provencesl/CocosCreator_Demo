 cc.Class({
    extends: cc.Component,

    properties: { 
        ctr:0,
        meter:0,
        lookingatground:true,
        bird: {
            default: null,
            type: cc.Node
        },
        overNode: {
            default: null,
            type: cc.Node
        },
        camera: {
            default: null,
            type: cc.Node
        },
        first: {
            default: null,
            type: cc.Node
        },
        second: {
            default: null,
            type: cc.Node
        },
        third: {
            default: null,
            type: cc.Node
        },
        label: {
            default: null,
            type: cc.Node
        },
        scoreMini: {
            default: null,
            type: cc.Node
        },
        cloneGround: {
            default: null,
            type: cc.Prefab
        },
        clonePipe: {
            default: null,
            type: cc.Prefab
        },
        cloneBotPipe: {
            default: null,
            type: cc.Prefab
        },
        
        ground: {
            default: null,
            type: cc.Node
        },
        scoreCard: {
            default: null,
            type: cc.Node
        },
        pipes: {
            default: null,
            type: cc.Node
        },
        btn: {
            default: null,
            type: cc.Node
        },
        zeropic: {
            default: null,
            type: cc.SpriteFrame
        },
        pctr:0,
        randPos:0,
        scoreClip: {
            default: null,
            url: cc.AudioClip
        },
        swooshClip: {
            default: null,
            url: cc.AudioClip
        },
        score:0,
        activated : false,
        
        

        
    },
    

    onLoad () {  
        
        this.touch();
        this.btn.on('click', this.reset, this);
        
    },

    start () { 
        this.pctr = 0;
        this.ctr = 0;
        cc.log("started" + this.camera.x + " " + this.bird.x)
        cc.audioEngine.playEffect(this.swooshClip,false, 1);
        this.spawnGround();  
        //this.setScoreBoard();

        
        
        
    },

    update (dt) { 
        cc.log('revoemag?' +this.bird.getComponent('Bird').gameover )
        var c_move = this.bird.y; 
        
        this.label.getComponent(cc.Label).string = this.score; 
        //if(this.camera.x >= 2070){
        //    this.bird.x = -144;
        //    this.camera.x = 0;
        //}
        if(Math.round(this.camera.x % 700) <= 4 ){
            this.ctr+=1;
            this.spawnGround(); 
        }

        if(Math.round(this.camera.x % 200 ) <=1   ){ 
            this.pctr+=1; 
            var randPos =  320*cc.random0To1();
            this.spawnPipe( randPos);
            this.spawnBotPipe( randPos); 
        }

        if( Math.round (this.bird.x) % 360 <=3 && this.bird.x >=360 ){
        
            this.score +=1;
            cc.audioEngine.playEffect(this.scoreClip ,false , 1);
        }

        if(this.bird.getComponent('Bird').gameover&& !this.activated){
           // this.btn.setPosition(325, 486)
           cc.audioEngine.playEffect(this.swooshClip,false, 1);
           var moveUp =  cc.moveTo(0.7, cc.p(0, -11)).easing(cc.easeCubicActionOut()); ;
           this.overNode.runAction(moveUp);
           var fadeAction = cc.fadeTo(0.32 , 0)  ;
           this.label.runAction(fadeAction);
           this.scoreMini.getComponent(cc.Label).string = this.score;
           this.activated = true
        }

 
    
    },

    touch:function(){
        if(!this.bird.gameover){
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
 
            onTouchBegan: function(touch, event) {
                cc.log('Touched');   
                self.bird.getComponent('Bird').flap();
                //self.setScoreBoard();
                 self.scoreCard.getChildByName('left').getComponent(cc.Sprite).setTexture( this.zeropic );

                 
                
                return true
            },
            onTouchEnded :  function(touch, event) {   
                this.onShareGame();
                 
                return true
            },
        }, self.node);
    }

    },
    spawnGround(){
        cc.log('created')
        
        var newGround = cc.instantiate(this.cloneGround); 
        this.ground.addChild(newGround);  
        newGround.setPosition( this.ctr*705 , 0) 
        newGround.getComponent('ground').game = this;
        
    },
    spawnPipe(randPos){

        
        var newPipe = cc.instantiate(this.clonePipe);
        
        //newPipe.parent = this.pipes;
        this.pipes.addChild(newPipe)
        newPipe.setPosition(this.pctr*360 , randPos)
        newPipe.getComponent('PipeCodes').game = this;
        cc.log('piped')
 
    },
    spawnBotPipe(randPos){ 
        var newBotPipe = cc.instantiate(this.cloneBotPipe);
        //newPipe.parent = this.pipes;
        this.pipes.addChild(newBotPipe)
        newBotPipe.setPosition(this.pctr*360 , randPos - 190)
        newBotPipe.getComponent('PipeCodes').game = this;
        cc.log('piped')
 
    },

    tss(){},
    setScoreBoard(){
        var zerourl = cc.url.raw("assets\flappy bird - sprites\number_large_0")
        var oneurl = cc.url.raw("assets\flappy bird - sprites\number_large_1")
        var twourl = cc.url.raw("assets\flappy bird - sprites\number_large_2")
        var threeurl = cc.url.raw("assets\flappy bird - sprites\number_large_3")
        var foururl = cc.url.raw("assets\flappy bird - sprites\number_large_4")
        var fiveurl = cc.url.raw("assets\flappy bird - sprites\number_large_5")
        var sixurl = cc.url.raw("assets\flappy bird - sprites\number_large_6")
        var sevenourl = cc.url.raw("assets\flappy bird - sprites\number_large_7")
        var eighturl = cc.url.raw("assets\flappy bird - sprites\number_large_8")
        var nineurl = cc.url.raw("assets\flappy bird - sprites\number_large_9")

        var zero = cc.textureCache.addImage(zerourl);
        var one = cc.textureCache.addImage(oneurl);
        var two = cc.textureCache.addImage(twourl);
        var three = cc.textureCache.addImage(threeurl);
        var four = cc.textureCache.addImage(foururl);
        var five = cc.textureCache.addImage(fiveurl);
        var six = cc.textureCache.addImage(sixurl);
        var seven = cc.textureCache.addImage(sevenourl);
        var eight = cc.textureCache.addImage(eighturl);
        var nine = cc.textureCache.addImage(nineurl);
        

        var x = this.scoreCard.getChildByName('left').getComponent(cc.Sprite);
        x.spriteFrame.texture = zero;


        
    },
    
    reset(){
        cc.audioEngine.playEffect(this.swooshClip,false, 1);
        cc.game.restart();
    },
    riseScore(){},

    onShareGame () {
        cc.log('haahaas')
        if (typeof FBInstant === 'undefined') return;
        FBInstant.shareAsync({
            intent: 'SHARE',
            image:   this.getIMG(),
            text: 'James is asking for your help!',
            data: {myReplayData: '...'},
        }).then(() => {
            // continue with the game.
        });
    },

    // 截屏返回 iamge base6，用于 Share
    getImgBase64 () {
        let sp = cc.find('Canvas/New Sprite(Splash)').getComponent(cc.Sprite);

        let target = cc.find('Canvas');
        let width = 960, height = 640;
        let renderTexture = new cc.RenderTexture(width, height);
        renderTexture.begin();
        target._sgNode.visit();
        renderTexture.end();
        //
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
            let texture = renderTexture.getSprite().getTexture();
            let image = texture.getHtmlElementObj();
            ctx.drawImage(image, 0, 0);
        }
        else if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
            let buffer = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, buffer);
            let texture = renderTexture.getSprite().getTexture()._glID;
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
            let data = new Uint8Array(width * height * 4);
            gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, data);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            let rowBytes = width * 4;
            for (let row = 0; row < height; row++) {
                let srow = height - 1 - row;
                let data2 = new Uint8ClampedArray(data.buffer, srow * width * 4, rowBytes);
                let imageData = new ImageData(data2, width, 1);
                ctx.putImageData(imageData, 0, row);
            }
        }
        return canvas.toDataURL('image/png');
    },

    getIMG(){

        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = 200;
        canvas.height = 200;
        return canvas.toDataURL('image/png');

    }
});
