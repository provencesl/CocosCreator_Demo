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
        hp: 10,
        hpMax: 10,
        hpLen: {
            default: null,
            type: cc.Node,
        },
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
        if(this.comboNext === 4) {
            this.comboNext = 0;
        }
        this.skill();
    },

    comboEnd: function () {
        this.skillPool = [];
    },

    skill: function () {
        // 技能指令
        if(this.comboLock) return;
        this.xSpeed = 0;
        this.ySpeed = 0;
        if(this.skillPool.length > 0) {
            this.canMove = false;
            this.comboLock = true;
            this.statePool(this.skillPool[0]);
            this.skillPool.shift();
        } else {
            this.canMove = true;
            this.comboNext = 0;
            this.comboLock = false;
            this.statePool("stand");
        }
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
                } else {
                    this.node.scaleX = -Math.abs(this.node.scaleX);
                }
                this.statePool("walk");
            }
        } else {
            this.xSpeed = 0;
            this.ySpeed = 0;
        }
    },

    hurt: function(x, d, lie) {
        this.canMove = false;
        this.xSpeed = 0;
        this.ySpeed = 0;
        if(lie) {
            this.statePool("lie");
            this.node.scaleX = x * Math.abs(this.node.scaleX);
            this.xSpeed = - 500 * x;
        } else {
            this.statePool("hurt");
            this.node.scaleX = x * Math.abs(this.node.scaleX);
            this.node.x -= x * 10;
        }
        this.hp -= d;
        this.hp = Math.max(0, this.hp);
        this.hpLen.width = this.hp / this.hpMax * 100;
    },

    onGround: function() {
        this.xSpeed = 0;
        this.statePool("onground");
        if(this.hp == 0) {
            this.node.destroy();
            this.game.enemyShow(-600, 0);
        }
    },

    invincible: function(bool) {
        // 禁用受击碰撞框，无敌状态
        this.node.getComponents(cc.Collider)[0].enabled = bool;
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
            case "stand":
                this.anim.play("athena-stand");
            break;
            case "walk":
                this.anim.play("athena-walk");
            break;
            case "hurt":
                this.anim.play("athena-hurt");
            break;
            case "lie":
                this.anim.play("athena-lie");
            break;
            case "onground":
                this.anim.play("athena-ground");
            break;
        }
    },

    AI: function () {


        if(Math.abs(this.game.athena.x - this.node.x) < 40 && Math.abs(this.game.athena.y - this.node.y) < 20) {
            this.statePool("combo0");
            return;
        }

        if(Math.random() < 0.95) return;

        if(Math.random() > 0.8) {
            var xs, ys;
            if(this.game.athena.x > this.node.x) {
                xs = this.xMaxSpeed;
            } else {
                xs = - this.xMaxSpeed;
            }
            if(this.game.athena.y > this.node.y) {
                ys = this.yMaxSpeed;
            } else {
                ys = - this.yMaxSpeed;
            }
            this.move(xs, ys);
        } else {
            this.move(0, 0);
        }
    },

    // use this for initialization
    onLoad: function () {
        this.xSpeed = 0;
        this.ySpeed = 0;

        this.anim.on('finished',  function() {
            this.comboLock = false;
            this.skill();
        }, this);
    },

    // called every frame, uncomment this function to activate update callback
    
    update: function (dt) {
        this.AI();
        this.node.x += this.xSpeed * dt;
        this.node.y += this.ySpeed * dt;
        this.node.zIndex = 1000 - this.node.y;

        // 限制位移的垂直位置
        this.node.y = Math.min(Math.max(this.node.y, -170), -30);
    },
});
