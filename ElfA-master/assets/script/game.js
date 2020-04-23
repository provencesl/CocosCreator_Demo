cc.Class({
    extends: cc.Component,

    properties: {
        athena: {
            default: null,
            type: cc.Node
        },
        enemyPrefab: {
            default: null,
            type: cc.Prefab
        },
    },

    enemyShow: function(x,y) {
        // 使用给定的模板在场景中生成一个新节点
        var newEnemy = cc.instantiate(this.enemyPrefab);

        newEnemy.getComponent('enemy').game = this;
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newEnemy);
        // 为星星设置一个随机位置
        newEnemy.setPosition(x, y);
    },
    // use this for initialization
    onLoad: function () {
        this.enemyShow(100, -60);

        this.enemyShow(90, -80);
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.athena.x = Math.min(Math.max(this.athena.x, -400), 400);
        this.athena.y = Math.min(Math.max(this.athena.y, -170), -30);
    },
});
