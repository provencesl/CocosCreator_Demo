cc.Class({
    extends: cc.Component,

    properties: {
        athena: {
            default: null,
            type: cc.Node
        },
    },

    setInputControl: function () {
    },

    // use this for initialization
    onLoad: function () {
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        // this.athena.x += this.athena.xSpeed * dt;
        // this.athena.y += this.athena.ySpeed * dt;
    },
});
