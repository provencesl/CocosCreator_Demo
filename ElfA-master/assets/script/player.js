cc.Class({
    extends: cc.Component,

    properties: {
        anim: cc.Animation,
        xMaxSpeed: 0,
        yMaxSpeed: 0,
        canMove: true,
        comboNext: 0,
        comboLock: false,
        state: "stand",
        skillPool: [],
        ex: 0,
        ey: 0,
        playerHit: {
            default: null,
        },
        hitEffect: {
            default: null,
        },
        hp: {
            default: null,
            type: cc.ProgressBar,
        },
        controller: {
            default: null,
            type: cc.Node,
        },
        joypadPanel: {
            default: null,
            type: cc.Node,
        },
        joypad: {
            default: null,
            type: cc.Node
        },
        playerHitPrefab: {
            default: null,
            type: cc.Prefab
        },
        hitEffectPrefab: {
            default: null,
            type: cc.Prefab
        },
        hitAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    moveOffset: function(offset) {
        // 动画偏移修正
        if(this.node.scaleX < 0) {
            offset *= -1;
        }
        this.node.x += offset;
    },

    combo: function () {
        // 指令输入
        this.skillPool.push("combo" + this.comboNext);

        this.comboNext++;
        if(this.comboNext > 6) {
            this.comboNext = 0;
        }
        this.skill();
    },

    hitPrefabShow: function (x, y, w, h, lie, ex, ey) {
        // 碰撞框出现
        // ex, ey 打击效果出现的位置
        this.playerHit = cc.instantiate(this.playerHitPrefab);

        this.node.addChild(this.playerHit);

        this.playerHit.setPosition(x, y);
        this.playerHit.getComponents(cc.Collider)[0].size.width = w;
        this.playerHit.getComponents(cc.Collider)[0].size.height = h;
        this.playerHit.getComponents("playerHit")[0].damage = 1;
        this.playerHit.getComponents("playerHit")[0].lie = lie || this.playerHit.getComponents("playerHit")[0].lie;

        this.ex = ex || x;
        this.ey = ey || y;
    },

    hitPrefabHide: function () {
        // 碰撞框消失
        this.playerHit.destroy();
    },

    hitEffectPrefabShow: function () {
        // 打击效果,效果位置在建立打击框时设置
        this.hitEffect = cc.instantiate(this.hitEffectPrefab);
        this.node.addChild(this.hitEffect);
        this.hitEffect.setPosition(this.ex, this.ey);
        
        cc.audioEngine.playEffect(this.hitAudio, false);
    },

    skillStart: function () {
        this.comboLock = true;
        this.canMove = false;
    },

    skillEnd: function () {
        this.canMove = true;
        this.comboLock = false;
        this.skill();
    },

    comboEnd: function () {
        this.skillPool = [];
        this.skill();
    },

    skill: function () {
        // 技能指令
        if(this.comboLock) return;
        this.xSpeed = 0;
        this.ySpeed = 0;
        if(this.skillPool.length > 0) {
            this.statePool(this.skillPool[0]);
            this.skillPool.shift();
        } else {
            this.comboNext = 0;
            this.statePool("stand");
        }
        this.hp.progress = Math.random();
    },

    move: function(xs, ys) {
        // 移动指令
        if(this.canMove) {
            this.xSpeed = xs;
            this.ySpeed = ys;
            if(xs == 0 && ys == 0) {
                this.statePool("stand");
            } else {
                if(xs > 0) {
                    this.node.scaleX = Math.abs(this.node.scaleX);
                } else if (xs < 0) {
                    this.node.scaleX = -Math.abs(this.node.scaleX);
                }
                this.statePool("walk");
            }
        } else {
            this.xSpeed = 0;
            this.ySpeed = 0;
        }
    },

    statePool: function(s) {
        if(this.state == s) return;
        // 状态池
        this.state = s;
        switch(s) {
            case "combo0":
                this.anim.play("athena-c0");
            break;
            case "combo1":
                this.anim.play("athena-c1");
            break;
            case "combo2":
                this.anim.play("athena-c2");
            break;
            case "combo3":
                this.anim.play("athena-c3");
            break;
            case "combo4":
                this.anim.play("athena-c4");
            break;
            case "combo5":
                this.anim.play("athena-c5");
            break;
            case "stand":
                this.anim.play("athena-stand");
            break;
            case "walk":
                this.anim.play("athena-walk");
            break;
        }
    },

    setInputControl: function () {
        var self = this;

        var controller = this.controller;
            controller.zIndex = 3000;

        var joypad = this.joypad;
        var joypadPanel = this.joypadPanel;
        var mousemove = false;
        // 添加键盘事件监听
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
                        self.xSpeed = - self.xMaxSpeed;
                        self.move(self.xSpeed, self.ySpeed);
                        break;
                    case cc.KEY.d:
                        self.xSpeed = self.xMaxSpeed;
                        self.move(self.xSpeed, self.ySpeed);
                        break;
                    case cc.KEY.w:
                        self.ySpeed = self.yMaxSpeed;
                        self.move(self.xSpeed, self.ySpeed);
                        break;
                    case cc.KEY.s:
                        self.ySpeed = - self.yMaxSpeed;
                        self.move(self.xSpeed, self.ySpeed);
                        break;
                    case cc.KEY.j:
                        self.combo();
                        break;
                }
            },
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.d:
                        self.xSpeed = 0;
                        break;
                    case cc.KEY.w:
                    case cc.KEY.s:
                        self.ySpeed = 0;
                        break;
                }
                self.move(self.xSpeed, self.ySpeed);
            }
        }, self.node);
        
        var Xtouch,Ytouch;
        var XtouchMove,YtouchMove;
        var xs, ys;
        var listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (touch, event) {
                if(mousemove) return;
                Xtouch = touch.getLocationX();
                Ytouch = touch.getLocationY();

                if(Xtouch > 0 && Xtouch < 300 && Ytouch > 0 && Ytouch < 300) {
                    // 摇杆
                    mousemove = true;
                    joypadPanel.x = Xtouch;
                    joypadPanel.y = Ytouch;
                }

                return true;
            },
            onTouchMoved: function (touch, event) {
                if(!mousemove) return;
                XtouchMove = touch.getLocationX();
                YtouchMove = touch.getLocationY();
                if(XtouchMove > Xtouch) {
                    xs = self.xMaxSpeed;
                } else if(XtouchMove < Xtouch) {
                    xs = - self.xMaxSpeed;
                }

                if(YtouchMove > Ytouch) {
                    ys = self.yMaxSpeed;
                } else if (YtouchMove < Ytouch) {
                    ys = - self.yMaxSpeed;
                }

                xs = xs || 0;
                ys = ys || 0;
                self.move(xs, ys);

                joypad.x = Math.min(40, Math.max((XtouchMove - Xtouch) * 0.5, -40));
                joypad.y = Math.min(40, Math.max((YtouchMove - Ytouch) * 0.5, -40));
            },
            onTouchEnded: function (touch, event) {
                if(!mousemove) return;
                self.move(0, 0);
                mousemove = false;
            },
            onTouchCancelled: function (touch, event) {
                if(!mousemove) return;
                self.move(0, 0);
                mousemove = false;
            },
        }
        // 绑定单点触摸事件
        cc.eventManager.addListener(listener, this.node);

    },
    
    // use this for initialization
    onLoad: function () {
        this.xSpeed = 0;
        this.ySpeed = 0;
        // 初始化键盘输入监听
        this.setInputControl();
    },

    // called every frame, uncomment this function to activate update callback
    
    update: function (dt) {
        this.node.x += this.xSpeed * dt;
        this.node.y += this.ySpeed * dt;
        this.node.zIndex = 1000 - this.node.y;
    },

});
