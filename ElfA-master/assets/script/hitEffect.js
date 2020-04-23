cc.Class({
    extends: cc.Component,

    properties: {
        anim: cc.Animation,
    },

    // use this for initialization
    onLoad: function () {
        this.anim.play("hit-effect");
    },

    hide: function () {
        this.destroy();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
