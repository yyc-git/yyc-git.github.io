/**三国战记
 * 作者：YYC
 * 日期：2014-09-01
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
var Scene = YYC.Class(YE.Scene, {
    Private: {
        _levelData: null,

        _initScene: function () {
            this._addLayer();
        },
        _addLayer: function () {
            window.mapLayer = new MapLayer("mapLayerCanvas", {x: 0, y: 0});
            window.entityLayer = new EntityLayer("entityLayerCanvas", {x: 0, y: 0});

            //先加入元素到层中，再将层加入到场景中。
            //这样可保证layer->onenter中可访问layer的元素
            this._addElementsToLayers();

            this.addChild(window.mapLayer, 1);
            this.addChild(window.entityLayer, 2);
        },
        _addElementsToLayers: function () {
            window.entityLayer.addChilds(this._createPlayerSprite(), 0, "unit");
            window.entityLayer.addChilds(this._createEnemySprite(), 0, "unit");
        },
        _createPlayerSprite: function () {
            var playerSprites = this._createSprites(
                this._levelData.items.player, PlayerSprite
            );

            window.playerSprite = playerSprites[0];

            return playerSprites;
        },
        _createEnemySprite: function () {
            var enemySprites = this._createSprites(
                this._levelData.items.enemy, EnemySprite
            );

            return enemySprites;
        },
        _createSprites: function (items, Class) {
            var i = 0,
                len = 0,
                sprites = [],
                sprite = null;

            for (i = 0, len = items.length; i < len; i++) {
                sprite = Class.create(items[i]);
                sprites.push(sprite);
            }

            return sprites;
        },
        _initEvent: function () {
            YE.EventManager.addListener(YE.Event.KEY_DOWN, KeyManager.getInstance().keyDown, document, KeyManager.getInstance());
            YE.EventManager.addListener(YE.Event.KEY_UP, KeyManager.getInstance().keyUp, document, KeyManager.getInstance());
        }
    },
    Public: {
        onenter: function () {
            this._levelData = LevelManager.getInstance().getLevelData();

            this._initScene();
            this._initEvent();

            setInterval(function () {
                ui.showSystemInfo("FPS:" + Math.floor(YE.Director.getInstance().getFps()));
            }, 1000);
        }
    }
});
