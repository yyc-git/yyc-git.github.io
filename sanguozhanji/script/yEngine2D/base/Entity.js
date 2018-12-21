/**YEngine2D 实体类
 * 作者：YYC
 * 日期：2014-02-08
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
//私有成员前缀为“ye_entity” ，保护成员前缀为“ye_P_”
//为什么不设成“ye”？
//这是因为是这样，那么继承Entity的引擎类的私有成员前缀就都要加一个下划线“_”。
//因此，将前缀设为Entity类独有，则不用担心子类的私有成员会覆盖Entity的私有成员！
YE.Entity = YYC.AClass({
    Init: function () {
        this.ye_entity_addUid();

        this.ye_entity_cacheData = YE.Hash.create();
    },
    Private: {
        ye_entity_uid: 0,
        ye_entity_cacheData: null,
        ye_entity_tag: null,

        ye_entity_addUid: function () {
            this.ye_entity_uid = YE.Entity.count++;
        }
    },
    Public: {
        setCacheData: function (key, dataArr) {
            this.ye_entity_cacheData.add(key, dataArr);
        },
        getCacheData: function (key) {
            return this.ye_entity_cacheData.getValue(key);
        },
        getUid: function () {
            return this.ye_entity_uid;
        },
        setTag: function (tag) {
            if (YE.Tool.judge.isArray(tag)) {
                this.ye_entity_tag = tag;
            }
            else {
                this.ye_entity_tag = [tag];
            }
        },
        addTag: function (tag) {
            if (this.ye_entity_tag === null) {
                this.setTag(tag);
                return;
            }

            this.ye_entity_tag.push(tag);
        },
        removeTag: function (tag) {
            if (this.ye_entity_tag === null) {
                return;
            }

            this.ye_entity_tag.remove(function (t) {
                return t === tag;
            });
        },
        getTag: function () {
            return this.ye_entity_tag;
        },
        hasTag: function (tag) {
            return this.ye_entity_tag &&
                (this.ye_entity_tag === tag || this.ye_entity_tag.contain(function (t) {
                    return t === tag;
                }));
        },
        containTag: function (tag) {
            if (!this.ye_entity_tag) {
                return;
            }

            return this.ye_entity_tag.contain(tag);
        }
    },
    Static: {
        //uid计数器
        count: 1
    }
});