describe("BombLayer.js", function () {
    var layer = null;

    beforeEach(function () {
        layer = new BombLayer();

        layer.setCanvas();
    });

    describe("setCanvas", function () {
        it("��������", function () {
            expect(layer.setCanvas).toBeDefined();
        });
        it("���bombLayerCanvas", function () {
            spyOn(document, "getElementById");

            layer.setCanvas();

            expect(document.getElementById).toHaveBeenCalledWith("bombLayerCanvas");
        });
        it("����Canvas��css", function () {
            layer.setCanvas();

            var canvas = $(layer.P__canvas);
            var expectedCss = {
                "position": "absolute",
                "top": bomberConfig.canvas.TOP.toString(),
                "left": bomberConfig.canvas.LEFT.toString(),
                "z-index": 1
            };

            expect(canvas.css("top")).toEqual(expectedCss.top);
            expect(canvas.css("left")).toEqual(expectedCss.left);
            expect(Number(canvas.css("z-index"))).toEqual(expectedCss["z-index"]);
        });
    });

    describe("init", function () {
        it("���mapLayer��fireLayer��playerLayer��enemyLayer", function () {
            var fakeLayers = {
                playerLayer: {
                },
                mapLayer: {},
                fireLayer: {},
                enemyLayer: {}
            };
            layer.init(fakeLayers);

            expect(layer.mapLayer).toBeExist();
            expect(layer.fireLayer).toBeExist();
            expect(layer.playerLayer).toBeExist();
            expect(layer.enemyLayer).toBeExist();
        });
        it("���ø���ͬ������", function () {
        });
    });

    describe("change", function () {
        it("���������Ԫ�أ������setStateChange", function () {
            var fakeBomb = {};
            layer.appendChild(fakeBomb);
            spyOn(layer, "setStateChange");

            layer.change();

            expect(layer.setStateChange).toHaveBeenCalled();
        });
    });

    describe("���ʼ������õ�API����", function () {
        beforeEach(function () {
            var fakeLayers = {
                playerLayer: {
                },
                mapLayer: {},
                fireLayer: {},
                enemyLayer: {}
            };
            layer.init(fakeLayers);
        });

        describe("draw", function () {
            beforeEach(function () {
                sprite1 = spriteFactory.createBomb();
                sprite2 = spriteFactory.createBomb();

                layer.appendChild(sprite1).appendChild(sprite2);
            });

            it("����ÿ���������draw���������context", function () {
                spyOn(sprite1, "draw");
                spyOn(sprite2, "draw");
                layer.draw();

                expect(sprite1.draw).toHaveBeenCalledWith(layer.P__context);
                expect(sprite2.draw).toHaveBeenCalledWith(layer.P__context);
            });
        });

        describe("explode", function () {
            var fakeBomb = null,
                fakeEnemy1 = null,
                fakeEnemy2 = null,
                fakeFireLayer = null,
                fakeLayers = null,
                fakeMapLayer = null,
                fakeEnemyLayer = null;

            function buildFakeLayer() {
                fakeEnemy1 = { clear: function () {
                }, index: 1 };
                fakeEnemy2 = { clear: function () {
                }, index: 2 };
                fakeFireLayer = {
                    _childs: [],
                    addSprites: function () {
                        this._childs.push(1);
                    },
                    getChilds: function () {
                        return this._childs;
                    },
                    removeAll: function () {
                        this._childs = [];
                    },
                    clear: function () {
                    }
                };
                fakeMapLayer = {
                    setStateChange: function () {
                    }
                };
                fakePlayerLayer = {
                    getChildAt: function () {
                    }
                };
                fakeEnemyLayer = {
                    remove: function () {
                    },
                    clear: function () {
                    },
                    getChilds: function () {
                        return [fakeEnemy1, fakeEnemy2];
                    }
                };
                fakeLayers = {
                    playerLayer: fakePlayerLayer,
                    mapLayer: fakeMapLayer,
                    fireLayer: fakeFireLayer,
                    enemyLayer: fakeEnemyLayer
                };
            };

            beforeEach(function () {
                fakeBomb = {
                    x: 0,
                    y: 0,
                    explode: function () {
                        return {
                            fires: [],
                            mapChange: false
                        }
                    },
                    collideFireWithCharacter: function () {
                    },
                    clear: function () {
                    },
                    isInEffectiveRange: function () {
                    }
                };
                buildFakeLayer();
                layer.setCanvas();
                layer.init(fakeLayers);
            });

            it("������������������ײ��������Ϸ״̬ΪOVER", function () {
                var backUp = testTool.extendDeep(window.gameState);

                window.gameState = window.bomberConfig.game.state.NORMAL;
                spyOn(fakeBomb, "collideFireWithCharacter").andCallFake(function () {
                    return true
                });

                layer.explode(fakeBomb);

                expect(window.gameState).toEqual(window.bomberConfig.game.state.OVER);

                window.gameState = backUp;
            });

            describe("��ÿ�������жϡ���������������ײ����õ��˱�ը�����Ӳ����Ƴ���", function () {
                beforeEach(function () {
                    spyOn(layer.enemyLayer, "remove");
                    spyOn(layer.enemyLayer, "clear");
                });

                it("��ײ���ڶ�������", function () {
                    spyOn(fakeBomb, "collideFireWithCharacter").andCallFake(function (sprite) {
                        if (sprite === fakeEnemy2) {
                            return true;
                        }
                        return false;
                    });

                    layer.explode(fakeBomb);

                    //������3�Σ�1�Σ��ж������������ײ��2�Σ��ж���ÿ��������ײ��
                    expect(fakeBomb.collideFireWithCharacter.calls.length).toEqual(3);
                    expect(layer.enemyLayer.remove.calls.length).toEqual(1);
                    expect(layer.enemyLayer.clear).toHaveBeenCalledWith(fakeEnemy2);
                });
                it("��ײ����һ���͵ڶ�������", function () {
                    spyOn(fakeBomb, "collideFireWithCharacter").andCallFake(function (sprite) {
                        if (sprite === fakeEnemy1 || sprite === fakeEnemy2) {
                            return true;
                        }
                        return false;
                    });

                    layer.explode(fakeBomb);

                    //������3�Σ�1�Σ��ж������������ײ��2�Σ��ж���ÿ��������ײ��
                    expect(fakeBomb.collideFireWithCharacter.calls.length).toEqual(3);
                    expect(layer.enemyLayer.remove.calls.length).toEqual(2);
                    expect(layer.enemyLayer.clear).toHaveBeenCalledWith(fakeEnemy1);
                    expect(layer.enemyLayer.clear).toHaveBeenCalledWith(fakeEnemy2);
                });
            });

            it("����bomb.explode", function () {
                spyOn(fakeBomb, "explode").andCallThrough();

                layer.explode(fakeBomb);

                expect(fakeBomb.explode).toHaveBeenCalled();
            });
            it("��bomb.explode���ص�fireSprite������뵽fireLayer��", function () {
                spyOn(fakeFireLayer, "addSprites");

                layer.explode(fakeBomb);

                expect(fakeFireLayer.addSprites).toHaveBeenCalledWith(fakeBomb.explode().fires);
            });
            it("���ը����ǽ����Ҫ����mapLayer״̬ΪCHANGE��ʹmapLayer���´���ѯʱ�ػ��ͼ", function () {
                fakeBomb.explode = function () {
                    return {
                        fires: [],
                        mapChange: true
                    };
                };
                spyOn(layer.mapLayer, "setStateChange");

                layer.explode(fakeBomb);

                expect(layer.mapLayer.setStateChange).toHaveBeenCalled();
            });
            it("���������ը��", function () {
                spyOn(layer, "clear");

                layer.explode(fakeBomb);

                expect(layer.clear).toHaveBeenCalledWith(fakeBomb);
            });
            it("���Ƴ�bomb", function () {
                layer.appendChild(fakeBomb);

                layer.explode(fakeBomb);

                expect(layer.getChilds().length).toEqual(0);
            });
            it("ը����ըʱ�������ڻ�����Χ�ڵ�����ը����", function () {
                var fakeBomb2 = {
                        x: 1,
                        y: 1,
                        isInEffectiveRange: function () {
                            return true;
                        },
                        explode: function () {
                            return {
                                fires: [],
                                mapChange: false
                            }
                        },
                        collideFireWithCharacter: function () {
                        },
                        clear: function () {
                        }
                    },
                    fakeBomb3 = {
                        x: 2,
                        y: 2,
                        isInEffectiveRange: function () {
                            return true;
                        },
                        explode: function () {
                            return {
                                fires: [],
                                mapChange: false
                            }
                        },
                        collideFireWithCharacter: function () {
                        },
                        clear: function () {
                        }
                    };
                fakeBomb.x = 0;
                fakeBomb.y = 0;
                layer.appendChild(fakeBomb);
                layer.appendChild(fakeBomb2);
                layer.appendChild(fakeBomb3);
                spyOn(layer, "explode").andCallThrough();

                layer.explode(fakeBomb);

                expect(layer.explode.calls.length).toEqual(3);
            });
            it("0.3s�����fireLayer�㻭�������fireLayer��������ʧ��", function () {
                jasmine.Clock.useMock();
                spyOn(fakeFireLayer, "clear");
                layer.explode(fakeBomb);
                jasmine.Clock.tick(299);
                expect(layer.fireLayer.getChilds().length).not.toEqual(0);

                jasmine.Clock.tick(1);
                expect(fakeFireLayer.clear).toHaveBeenCalled();
                expect(layer.fireLayer.getChilds().length).toEqual(0);
            });
        });

        describe("run", function () {
            function setStateNormal() {
                layer.setStateNormal();
            };
            function setStateChange() {
                layer.setStateChange();
            };

            it("���P__stateΪnormal���򷵻�", function () {
                setStateNormal();
                spyOn(layer, "clear");

                layer.run();

                expect(layer.clear).not.toHaveBeenCalled();
            });

            describe("���P__stateΪchange", function () {
                beforeEach(function () {
                    setStateChange();
                });

                it("����clear", function () {
                    spyOn(layer, "clear");

                    layer.run();

                    expect(layer.clear).toHaveBeenCalled();
                });
                it("����draw", function () {
                    spyOn(layer, "draw");

                    layer.run();

                    expect(layer.draw).toHaveBeenCalled();
                });
                it("�ָ�״̬stateΪnormal", function () {
                    layer.setStateChange();

                    layer.run();

                    expect(layer.P__isNormal()).toBeTruthy();
                });
            });
        });
    });
});