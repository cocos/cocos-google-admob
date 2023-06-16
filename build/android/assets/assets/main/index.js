System.register("chunks:///_virtual/AdListener.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "95962tngshGAo9QWynPkwvQ", "AdListener", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AdmobTestBanner.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TestScenes.ts', './BannerView.ts', './TestUnitId.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Button, _decorator, Component, log, director, TestScenes, BannerView, TestUnitId;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Button = module.Button;
      _decorator = module._decorator;
      Component = module.Component;
      log = module.log;
      director = module.director;
    }, function (module) {
      TestScenes = module.TestScenes;
    }, function (module) {
      BannerView = module.BannerView;
    }, function (module) {
      TestUnitId = module.TestUnitId;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "9d394Q+ApVHSbiXgHSLyn7h", "AdmobTestBanner", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      const module$1 = "[AdmobTestBanner]";
      let AdmobTestBanner = exports('AdmobTestBanner', (_dec = ccclass('AdmobTestBanner'), _dec2 = property(Button), _dec3 = property(Button), _dec(_class = (_class2 = class AdmobTestBanner extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "buttonShowBanner", _descriptor, this);

          _initializerDefineProperty(this, "buttonHideBanner", _descriptor2, this);

          this.bannerView = void 0;
        }

        start() {
          var _this$bannerView;

          (_this$bannerView = this.bannerView) == null ? void 0 : _this$bannerView.destroy();
        }

        onDestroy() {
          var _this$bannerView2;

          (_this$bannerView2 = this.bannerView) == null ? void 0 : _this$bannerView2.destroy();
        }

        onClickLoadBanner() {
          if (this.bannerView != null) {
            throw new Error("duplicated create of bannerView");
          }

          this.bannerView = new BannerView();
          this.bannerView.create(TestUnitId.BannerAd, {
            onAdImpression: () => {
              log(module$1, "onAdImpression", "onAdClicked", this);
              this.buttonShowBanner.interactable = true;
              this.buttonHideBanner.interactable = true;
            },
            onAdClicked: () => {
              log(module$1, "onClickLoadBanner", "onAdClicked");
            },
            onAdLoaded: () => {
              log(module$1, "onClickLoadBanner", "onAdLoaded");
            },
            onAdFailedToLoad: loadError => {
              log(module$1, "onClickLoadBanner", "onAdLoaded");
              throw new Error(`load Ad Error, the error is: ${loadError}.`);
            }
          });
        }

        onClickShowBanner() {
          var _this$bannerView3;

          (_this$bannerView3 = this.bannerView) == null ? void 0 : _this$bannerView3.show(true);
        }

        onClickHideBanner() {
          var _this$bannerView4;

          (_this$bannerView4 = this.bannerView) == null ? void 0 : _this$bannerView4.show(false);
        }

        onClickDestroyBanner() {
          var _this$bannerView5;

          log(module$1, "onClickDestroyBanner");
          (_this$bannerView5 = this.bannerView) == null ? void 0 : _this$bannerView5.destroy();
        }

        onNextScene() {
          director.loadScene(TestScenes[1]);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "buttonShowBanner", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "buttonHideBanner", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AdmobTestInterstitialAd.ts", ['cc', './TestScenes.ts', './InterstitialAdView.ts', './TestUnitId.ts'], function (exports) {
  var cclegacy, Component, log, director, _decorator, TestScenes, InterstitialAdView, TestUnitId;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
      log = module.log;
      director = module.director;
      _decorator = module._decorator;
    }, function (module) {
      TestScenes = module.TestScenes;
    }, function (module) {
      InterstitialAdView = module.InterstitialAdView;
    }, function (module) {
      TestUnitId = module.TestUnitId;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "c1bf82HqvJF8q1nncrwWcmS", "AdmobTestInterstitialAd", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      const module$1 = "[AdmobTestInterstitialAdts]";
      let AdmobTestInterstitialAdts = exports('AdmobTestInterstitialAdts', (_dec = ccclass('AdmobTestInterstitialAdts'), _dec(_class = class AdmobTestInterstitialAdts extends Component {
        onClickLoadInterstitialAd() {
          let interstitialAdView = new InterstitialAdView();
          interstitialAdView.load(TestUnitId.InterstitialAd, {
            onAdLoaded() {
              log(module$1, "onAdLoaded");
              interstitialAdView.show();
            },

            onAdFailedToLoad(loadAdError) {
              log(module$1, "onAdFailedToLoad, error: ", loadAdError);
              interstitialAdView.destroy();
            }

          });
        }

        onNextScene() {
          director.loadScene(TestScenes[2]);
        }

      }) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AdmobTestOpenAppAd.ts", ['cc', './TestScenes.ts', './AppOpenAdView.ts', './TestUnitId.ts'], function (exports) {
  var cclegacy, Component, log, director, _decorator, TestScenes, AppOpenAdView, TestUnitId;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
      log = module.log;
      director = module.director;
      _decorator = module._decorator;
    }, function (module) {
      TestScenes = module.TestScenes;
    }, function (module) {
      AppOpenAdView = module.AppOpenAdView;
    }, function (module) {
      TestUnitId = module.TestUnitId;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "16e5cQy1xRATonmm6jvefs8", "AdmobTestOpenAppAd", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      const module$1 = "[AdmobTestOpenAppAd]";
      let AdmobTestOpenAppAd = exports('AdmobTestOpenAppAd', (_dec = ccclass('AdmobTestOpenAppAd'), _dec(_class = class AdmobTestOpenAppAd extends Component {
        constructor(...args) {
          super(...args);
          this.appOpenAdView = new AppOpenAdView();
        }

        onClickLoadOpenAppAd() {
          log(module$1, "onClickLoadOpenAppAd");
          this.appOpenAdView.loadAd(TestUnitId.OpenAppAd, {
            onAdLoaded() {
              log(module$1, "onClickLoadOpenAppAd", "onAdLoaded");
            },

            onAdFailedToLoad(loadAdError) {
              log(module$1, "onClickLoadOpenAppAd", "onAdFailedToLoad", loadAdError);
            }

          });
        }

        onClickShowOpenAppAd() {
          log(module$1, "onClickShowOpenAppAd");
          this.appOpenAdView.isValid(valid => {
            log(module$1, "onClickShowOpenAppAd", valid);

            if (valid) {
              this.appOpenAdView.show();
            }
          }, this);
        }

        onNextScene() {
          director.loadScene(TestScenes[3]);
        }

      }) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AdmobTestRewarded.ts", ['cc', './TestScenes.ts', './RewardedAdView.ts', './TestUnitId.ts'], function (exports) {
  var cclegacy, Component, log, Label, director, _decorator, TestScenes, RewardedAdView, TestUnitId;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
      log = module.log;
      Label = module.Label;
      director = module.director;
      _decorator = module._decorator;
    }, function (module) {
      TestScenes = module.TestScenes;
    }, function (module) {
      RewardedAdView = module.RewardedAdView;
    }, function (module) {
      TestUnitId = module.TestUnitId;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "8dd04dCqrRNpYi/ZNtDS+Z7", "AdmobTestRewarded", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      const module$1 = "[AdmobTestRewarded]";
      let AdmobTestRewarded = exports('AdmobTestRewarded', (_dec = ccclass('AdmobTestRewarded'), _dec(_class = class AdmobTestRewarded extends Component {
        start() {
          // Hide the reward earn dialog on start;
          let rewardEarnNode = this.node.getChildByName("DialogRewarded");
          rewardEarnNode.active = false;
        }

        onClickLoadRewardedAd() {
          log(module$1, "onClickLoadRewardedAd");
          let rewardEarnNode = this.node.getChildByName("DialogRewarded");
          let rewardedView = new RewardedAdView();
          rewardedView.load(TestUnitId.RewardedAd, {
            onAdLoaded() {
              log(module$1, "onClickLoadRewardedAd", "onAdLoaded");
              rewardedView.show();
            },

            onAdFailedToLoad(loadAdError) {
              log(module$1, "onClickLoadRewardedAd", "onAdFailedToLoad", loadAdError);
            }

          }, {
            onEarn(rewardType, amount) {
              log(module$1, "onClickLoadRewardedAd", `onEarn, rewardType = ${rewardType}, amount = ${amount}`);
              rewardEarnNode.active = true;
              const label = rewardEarnNode.getChildByName("Tip").getComponent(Label);
              label.string = `Congratulations! You have win the reward, type = ${rewardType}, amount = ${amount}!`;
            }

          });
        }

        onNextScene() {
          director.loadScene(TestScenes[4]);
        }

        onBtnClickCloseRewardDialogue() {
          let rewardEarnNode = this.node.getChildByName("DialogRewarded");
          rewardEarnNode.active = false;
        }

      }) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AdView.ts", ['cc'], function (exports) {
  var cclegacy, EventTarget;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      EventTarget = module.EventTarget;
    }],
    execute: function () {
      cclegacy._RF.push({}, "0b735awhI9CCLhW1GIXx0p0", "AdView", undefined);

      class AdView extends EventTarget {
        constructor(...args) {
          super(...args);
          this.unitId = void 0;
        }

      }

      exports('AdView', AdView);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AppOpenAd.ts", ['cc', './Base.ts'], function (exports) {
  var cclegacy, Base;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Base = module.Base;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1abb0J+bN5Lr7Y1oYGCJDOp", "AppOpenAd", undefined);

      class LoadOpenAppAdREQ extends Base {}

      exports('LoadOpenAppAdREQ', LoadOpenAppAdREQ);

      class LoadOpenAppAdACK extends Base {}

      exports('LoadOpenAppAdACK', LoadOpenAppAdACK);

      class ShowOpenAppAdREQ extends Base {}

      exports('ShowOpenAppAdREQ', ShowOpenAppAdREQ);

      class ShowOpenAppAdACK extends Base {}

      exports('ShowOpenAppAdACK', ShowOpenAppAdACK);

      class ShowOpenAppAdCompleteNTF extends Base {}

      exports('ShowOpenAppAdCompleteNTF', ShowOpenAppAdCompleteNTF);

      class OpenAppAdFullScreenContentCallbackNTF extends Base {
        constructor(...args) {
          super(...args);
          this.method = void 0;
          this.adError = void 0;
        }

      }

      exports('OpenAppAdFullScreenContentCallbackNTF', OpenAppAdFullScreenContentCallbackNTF);

      class AppOpenAdLoadCallbackNTF extends Base {
        constructor(...args) {
          super(...args);
          this.method = void 0;
          this.loadAdError = void 0;
        }

      }

      exports('AppOpenAdLoadCallbackNTF', AppOpenAdLoadCallbackNTF);

      class IsAdAvailableREQ extends Base {}

      exports('IsAdAvailableREQ', IsAdAvailableREQ);

      class IsAdAvailableACK extends Base {
        constructor(...args) {
          super(...args);
          this.valid = false;
        }

      }

      exports('IsAdAvailableACK', IsAdAvailableACK);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AppOpenAdLoadCallback.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7fbf0SeVg1CzbvSQ07T6LK2", "AppOpenAdLoadCallback", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AppOpenAdView.ts", ['cc', './Bridge.ts', './Route.ts', './AppOpenAd.ts', './AdView.ts'], function (exports) {
  var cclegacy, log, bridge, route, AppOpenAdLoadCallbackNTF, OpenAppAdFullScreenContentCallbackNTF, ShowOpenAppAdCompleteNTF, LoadOpenAppAdREQ, LoadOpenAppAdACK, IsAdAvailableREQ, IsAdAvailableACK, ShowOpenAppAdREQ, ShowOpenAppAdACK, AdView;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      log = module.log;
    }, function (module) {
      bridge = module.bridge;
    }, function (module) {
      route = module.route;
    }, function (module) {
      AppOpenAdLoadCallbackNTF = module.AppOpenAdLoadCallbackNTF;
      OpenAppAdFullScreenContentCallbackNTF = module.OpenAppAdFullScreenContentCallbackNTF;
      ShowOpenAppAdCompleteNTF = module.ShowOpenAppAdCompleteNTF;
      LoadOpenAppAdREQ = module.LoadOpenAppAdREQ;
      LoadOpenAppAdACK = module.LoadOpenAppAdACK;
      IsAdAvailableREQ = module.IsAdAvailableREQ;
      IsAdAvailableACK = module.IsAdAvailableACK;
      ShowOpenAppAdREQ = module.ShowOpenAppAdREQ;
      ShowOpenAppAdACK = module.ShowOpenAppAdACK;
    }, function (module) {
      AdView = module.AdView;
    }],
    execute: function () {
      cclegacy._RF.push({}, "655ecwFGr9Lw4ItDYJgDXQa", "AppOpenAdView", undefined);

      const module$1 = "[AppOpenAdView]";

      class AppOpenAdView extends AdView {
        constructor(...args) {
          super(...args);
          this._appOpenAdLoadCallback = void 0;
          this._fullscreenContentCallback = void 0;
          this._onShowApComplete = void 0;
        }

        set appOpenAdLoadCallback(value) {
          if (this._appOpenAdLoadCallback) {
            route.off(AppOpenAdLoadCallbackNTF.name, this.onAppOpenAdLoadCallbackNTF, this);
          }

          this._appOpenAdLoadCallback = value;
          route.on(AppOpenAdLoadCallbackNTF.name, this.onAppOpenAdLoadCallbackNTF, this);
        }

        get appOpenAdLoadCallback() {
          return this._appOpenAdLoadCallback;
        }

        set fullscreenContentCallback(value) {
          if (this._fullscreenContentCallback) {
            route.off(OpenAppAdFullScreenContentCallbackNTF.name, this.onFullScreenContentCallbackNTF, this);
          }

          this._fullscreenContentCallback = value;

          if (this._fullscreenContentCallback) {
            route.on(OpenAppAdFullScreenContentCallbackNTF.name, this.onFullScreenContentCallbackNTF, this);
          }
        }

        get fullscreenContentCallback() {
          return this._fullscreenContentCallback;
        }

        set onShowApComplete(value) {
          if (this.onShowApComplete) {
            route.off(ShowOpenAppAdCompleteNTF.name, this.onShowCompleteNTF, this);
          }

          this._onShowApComplete = value;

          if (this.onShowApComplete) {
            route.on(ShowOpenAppAdCompleteNTF.name, this.onShowCompleteNTF, this);
          }
        }

        get onShowApComplete() {
          return this._onShowApComplete;
        }

        loadAd(unitId, appOpenAdLoadCallback, fullscreenContentCallback) {
          this.appOpenAdLoadCallback = appOpenAdLoadCallback;
          this.fullscreenContentCallback = fullscreenContentCallback;
          this.unitId = unitId;
          bridge.sendToNative(LoadOpenAppAdREQ.name, {
            unitId: unitId
          }, LoadOpenAppAdACK.name, ack => {}, this);
        }

        isValid(onComplete, thisArg) {
          bridge.sendToNative(IsAdAvailableREQ.name, {
            unitId: this.unitId
          }, IsAdAvailableACK.name, ack => {
            log(module$1, "isValid", ack.valid);

            if (onComplete && thisArg) {
              onComplete.call(thisArg, ack.valid);
            }
          });
        }

        show(onComplete) {
          bridge.sendToNative(ShowOpenAppAdREQ.name, {
            unitId: this.unitId
          }, ShowOpenAppAdACK.name, ack => {
            log(module$1, "showAdIfAvailable", ack);

            if (onComplete) {
              onComplete();
            }
          });
        }

        destroy() {
          this.appOpenAdLoadCallback = null;
          this.fullscreenContentCallback = null;
          this.onShowApComplete = null;
        }

        isAdAvailable(onShowApComplete) {
          this.onShowApComplete = onShowApComplete;
        }

        onAppOpenAdLoadCallbackNTF(ntf) {
          if (this.appOpenAdLoadCallback) {
            let method = this.appOpenAdLoadCallback[ntf.method];

            if (method) {
              method(ntf.loadAdError);
            }
          }
        }

        onFullScreenContentCallbackNTF(ntf) {
          if (ntf && ntf.method && this.fullscreenContentCallback) {
            let method = this.fullscreenContentCallback[ntf.method];

            if (method) {
              method(ntf.adError);
            }
          }
        }

        onShowCompleteNTF(ntf) {
          var _this$onShowApComplet;

          (_this$onShowApComplet = this.onShowApComplete) == null ? void 0 : _this$onShowApComplet.onShowAdComplete(ntf.unitId);
        }

      }

      exports('AppOpenAdView', AppOpenAdView);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BannerAd.ts", ['cc', './Base.ts'], function (exports) {
  var cclegacy, Base;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Base = module.Base;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1f149S+joVDj6Sy/8ZJQyY2", "BannerAd", undefined);

      class CreateBannerViewREQ extends Base {}

      exports('CreateBannerViewREQ', CreateBannerViewREQ);

      class CreateBannerViewACK extends Base {}

      exports('CreateBannerViewACK', CreateBannerViewACK);

      class LoadBannerREQ extends Base {}

      exports('LoadBannerREQ', LoadBannerREQ);

      class LoadBannerACK extends Base {}

      exports('LoadBannerACK', LoadBannerACK);

      class SetBannerSizeREQ extends Base {
        constructor(...args) {
          super(...args);
          this.x = void 0;
          this.y = void 0;
        }

      }

      exports('SetBannerSizeREQ', SetBannerSizeREQ);

      class ShowBannerREQ extends Base {
        constructor(...args) {
          super(...args);
          this.visible = void 0;
        }

      }

      exports('ShowBannerREQ', ShowBannerREQ);

      class ShowBannerACK extends Base {
        constructor(...args) {
          super(...args);
          this.visible = void 0;
        }

      }

      exports('ShowBannerACK', ShowBannerACK);

      class DestroyBannerREQ extends Base {}

      exports('DestroyBannerREQ', DestroyBannerREQ);

      class DestroyBannerACK extends Base {}

      exports('DestroyBannerACK', DestroyBannerACK);

      class BannerAdListenerNTF extends Base {
        constructor(...args) {
          super(...args);
          this.method = void 0;
          this.loadAdError = void 0;
        }

      }

      exports('BannerAdListenerNTF', BannerAdListenerNTF);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BannerView.ts", ['cc', './AdView.ts', './BannerAd.ts', './Bridge.ts', './Route.ts'], function (exports) {
  var cclegacy, log, AdView, SetBannerSizeREQ, BannerAdListenerNTF, CreateBannerViewREQ, CreateBannerViewACK, ShowBannerREQ, LoadBannerREQ, LoadBannerACK, DestroyBannerREQ, DestroyBannerACK, bridge, route;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      log = module.log;
    }, function (module) {
      AdView = module.AdView;
    }, function (module) {
      SetBannerSizeREQ = module.SetBannerSizeREQ;
      BannerAdListenerNTF = module.BannerAdListenerNTF;
      CreateBannerViewREQ = module.CreateBannerViewREQ;
      CreateBannerViewACK = module.CreateBannerViewACK;
      ShowBannerREQ = module.ShowBannerREQ;
      LoadBannerREQ = module.LoadBannerREQ;
      LoadBannerACK = module.LoadBannerACK;
      DestroyBannerREQ = module.DestroyBannerREQ;
      DestroyBannerACK = module.DestroyBannerACK;
    }, function (module) {
      bridge = module.bridge;
    }, function (module) {
      route = module.route;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d22be/4K6xMKoY2GwFcRVo9", "BannerView", undefined);

      const module$1 = "[BannerView]";

      class BannerView extends AdView {
        constructor(...args) {
          super(...args);
          this._size = void 0;
          this.isLoaded = false;
          this._adListener = null;
        }

        set size(value) {
          if (this.isLoaded) {
            throw new Error(`the size can not be set after loaded.`);
          }

          this._size = value;
          let req = new SetBannerSizeREQ(this.unitId);
          req.x = this.size.x;
          req.y = this.size.y;
          bridge.sendToNative(SetBannerSizeREQ.name, req);
        }

        get size() {
          return this.size;
        }

        get adListener() {
          return this._adListener;
        }

        set adListener(v) {
          if (this._adListener) {
            route.off(BannerAdListenerNTF.name, this.onAdListenerEvent, this);
          }

          this._adListener = v;

          if (this._adListener) {
            route.on(BannerAdListenerNTF.name, this.onAdListenerEvent, this);
          }
        }

        create(unitId, adListener) {
          this.unitId = unitId;
          bridge.sendToNative(CreateBannerViewREQ.name, {
            unitId: unitId
          }, CreateBannerViewACK.name, ack => {
            this.load(adListener);
          }, this);
        }

        show(visible) {
          let req = new ShowBannerREQ(this.unitId);
          req.visible = visible;
          bridge.sendToNative(ShowBannerREQ.name, {
            unitId: this.unitId
          });
        }

        load(adListener) {
          this.adListener = adListener;
          this.isLoaded = true;
          let req = new LoadBannerREQ(this.unitId);
          bridge.sendToNative(LoadBannerREQ.name, req, LoadBannerACK.name, response => {}, this);
        }

        destroy() {
          log(module$1, "destroy", this.unitId);
          let req = new DestroyBannerREQ(this.unitId);
          this.adListener = null;
          bridge.sendToNative(DestroyBannerREQ.name, req, DestroyBannerACK.name, response => {
            this.emit(BannerView.OnDestroyed, this);
          });
        }

        onAdListenerEvent(ntf) {
          if (this.adListener) {
            const method = this.adListener[ntf.method];

            if (method && typeof method == "function") {
              method(ntf.loadAdError);
            }
          }
        }

      }

      exports('BannerView', BannerView);
      BannerView.OnDestroyed = 'OnDestroyed';

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Base.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4391dfWK9ZAQKAnvLK4nty3", "Base", undefined);

      class Base {
        constructor(unitId) {
          this.unitId = unitId;
        }

      }

      exports('Base', Base);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Bridge.ts", ['cc', './Route.ts', './Version.ts'], function (exports) {
  var cclegacy, log, native, route, VersionREQ;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      log = module.log;
      native = module.native;
    }, function (module) {
      route = module.route;
    }, function (module) {
      VersionREQ = module.VersionREQ;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5fda2TWWuhELZgGyhZZgKj6", "Bridge", undefined);

      const module$1 = "[Bridge]";

      class Bridge {
        init() {
          log(module$1, "init");
          this.overwriteCallback();
          const engineVersion = `cocos-${cc["ENGINE_VERSION"]}`;
          this.sendToNative(VersionREQ.name, new VersionREQ('', engineVersion), null, null);
          return this;
        }

        destroy() {
          log(module$1, "destroy");
        }

        overwriteCallback() {
          log(module$1, "overwriteCallback");
          {
            native.bridge.onNative = (arg0, arg1) => {
              this.onNative(arg0, arg1);
            };
          }
        }

        onNative(arg0, arg1) {
          log(module$1, `onNative method: ${arg0} | content: ${arg1}`); //te.instance.dispatch(arg0, Route.instance.codec.decode(arg1));            

          const ack = route.codec.decode(arg1);
          route.dispatch(arg0, ack);
        }

        sendToNative(arg0, req, responseMethod, onResponse, thisArg) {
          log(module$1, "sendToNative", `method = ${arg0}, req.unitId = ${req.unitId}`);

          if (onResponse) {
            route.once(responseMethod, onResponse, thisArg);
          }

          {
            native.bridge.sendToNative(arg0, route.codec.encode(req));
          }
        }

      }

      exports('Bridge', Bridge);
      const bridge = exports('bridge', new Bridge().init());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Codec.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4367e0EXQ1PcoDX5a5qOFWu", "Codec", undefined);

      class Codec {
        decode(content) {
          return JSON.parse(content);
        }

        encode(t) {
          return JSON.stringify(t);
        }

      }

      exports('Codec', Codec);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CreateBannerListener.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "39fc4JJ0zxPMo6/z0X7QA2t", "CreateBannerListener", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Node, _decorator, Component, Color, Canvas, UITransform, instantiate, Label, RichText, Toggle, Button, director;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      Color = module.Color;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      RichText = module.RichText;
      Toggle = module.Toggle;
      Button = module.Button;
      director = module.director;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "b2bd1+njXxJxaFY3ymm06WU", "debug-view-runtime-control", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let DebugViewRuntimeControl = exports('DebugViewRuntimeControl', (_dec = ccclass('internal.DebugViewRuntimeControl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = class DebugViewRuntimeControl extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "compositeModeToggle", _descriptor, this);

          _initializerDefineProperty(this, "singleModeToggle", _descriptor2, this);

          _initializerDefineProperty(this, "EnableAllCompositeModeButton", _descriptor3, this);

          this._single = 0;
          this.strSingle = ['No Single Debug', 'Vertex Color', 'Vertex Normal', 'Vertex Tangent', 'World Position', 'Vertex Mirror', 'Face Side', 'UV0', 'UV1', 'UV Lightmap', 'Project Depth', 'Linear Depth', 'Fragment Normal', 'Fragment Tangent', 'Fragment Binormal', 'Base Color', 'Diffuse Color', 'Specular Color', 'Transparency', 'Metallic', 'Roughness', 'Specular Intensity', 'IOR', 'Direct Diffuse', 'Direct Specular', 'Direct All', 'Env Diffuse', 'Env Specular', 'Env All', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Fresnel', 'Direct Transmit Diffuse', 'Direct Transmit Specular', 'Env Transmit Diffuse', 'Env Transmit Specular', 'Transmit All', 'Direct Internal Specular', 'Env Internal Specular', 'Internal All', 'Fog'];
          this.strComposite = ['Direct Diffuse', 'Direct Specular', 'Env Diffuse', 'Env Specular', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Normal Map', 'Fog', 'Tone Mapping', 'Gamma Correction', 'Fresnel', 'Transmit Diffuse', 'Transmit Specular', 'Internal Specular', 'TT'];
          this.strMisc = ['CSM Layer Coloration', 'Lighting With Albedo'];
          this.compositeModeToggleList = [];
          this.singleModeToggleList = [];
          this.miscModeToggleList = [];
          this.textComponentList = [];
          this.labelComponentList = [];
          this.textContentList = [];
          this.hideButtonLabel = void 0;
          this._currentColorIndex = 0;
          this.strColor = ['<color=#ffffff>', '<color=#000000>', '<color=#ff0000>', '<color=#00ff00>', '<color=#0000ff>'];
          this.color = [Color.WHITE, Color.BLACK, Color.RED, Color.GREEN, Color.BLUE];
        }

        start() {
          // get canvas resolution
          const canvas = this.node.parent.getComponent(Canvas);

          if (!canvas) {
            console.error('debug-view-runtime-control should be child of Canvas');
            return;
          }

          const uiTransform = this.node.parent.getComponent(UITransform);
          const halfScreenWidth = uiTransform.width * 0.5;
          const halfScreenHeight = uiTransform.height * 0.5;
          let x = -halfScreenWidth + halfScreenWidth * 0.1,
              y = halfScreenHeight - halfScreenHeight * 0.1;
          const width = 200,
                height = 20; // new nodes

          const miscNode = this.node.getChildByName('MiscMode');
          const buttonNode = instantiate(miscNode);
          buttonNode.parent = this.node;
          buttonNode.name = 'Buttons';
          const titleNode = instantiate(miscNode);
          titleNode.parent = this.node;
          titleNode.name = 'Titles'; // title

          for (let i = 0; i < 2; i++) {
            const newLabel = instantiate(this.EnableAllCompositeModeButton.getChildByName('Label'));
            newLabel.setPosition(x + (i > 0 ? 50 + width * 2 : 150), y, 0.0);
            newLabel.setScale(0.75, 0.75, 0.75);
            newLabel.parent = titleNode;
            const labelComponent = newLabel.getComponent(Label);
            labelComponent.string = i ? '----------Composite Mode----------' : '----------Single Mode----------';
            labelComponent.color = Color.WHITE;
            labelComponent.overflow = 0;
            this.labelComponentList[this.labelComponentList.length] = labelComponent;
          }

          y -= height; // single

          let currentRow = 0;

          for (let i = 0; i < this.strSingle.length; i++, currentRow++) {
            if (i === this.strSingle.length >> 1) {
              x += width;
              currentRow = 0;
            }

            const newNode = i ? instantiate(this.singleModeToggle) : this.singleModeToggle;
            newNode.setPosition(x, y - height * currentRow, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.singleModeToggle.parent;
            const textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strSingle[i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleSingleMode, this);
            this.singleModeToggleList[i] = newNode;
          }

          x += width; // buttons

          this.EnableAllCompositeModeButton.setPosition(x + 15, y, 0.0);
          this.EnableAllCompositeModeButton.setScale(0.5, 0.5, 0.5);
          this.EnableAllCompositeModeButton.on(Button.EventType.CLICK, this.enableAllCompositeMode, this);
          this.EnableAllCompositeModeButton.parent = buttonNode;
          let labelComponent = this.EnableAllCompositeModeButton.getComponentInChildren(Label);
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          const changeColorButton = instantiate(this.EnableAllCompositeModeButton);
          changeColorButton.setPosition(x + 90, y, 0.0);
          changeColorButton.setScale(0.5, 0.5, 0.5);
          changeColorButton.on(Button.EventType.CLICK, this.changeTextColor, this);
          changeColorButton.parent = buttonNode;
          labelComponent = changeColorButton.getComponentInChildren(Label);
          labelComponent.string = 'TextColor';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          const HideButton = instantiate(this.EnableAllCompositeModeButton);
          HideButton.setPosition(x + 200, y, 0.0);
          HideButton.setScale(0.5, 0.5, 0.5);
          HideButton.on(Button.EventType.CLICK, this.hideUI, this);
          HideButton.parent = this.node.parent;
          labelComponent = HideButton.getComponentInChildren(Label);
          labelComponent.string = 'Hide UI';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          this.hideButtonLabel = labelComponent; // misc

          y -= 40;

          for (let i = 0; i < this.strMisc.length; i++) {
            const newNode = instantiate(this.compositeModeToggle);
            newNode.setPosition(x, y - height * i, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = miscNode;
            const textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strMisc[i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            const toggleComponent = newNode.getComponent(Toggle);
            toggleComponent.isChecked = i ? true : false;
            newNode.on(Toggle.EventType.TOGGLE, i ? this.toggleLightingWithAlbedo : this.toggleCSMColoration, this);
            this.miscModeToggleList[i] = newNode;
          } // composite


          y -= 150;

          for (let i = 0; i < this.strComposite.length; i++) {
            const newNode = i ? instantiate(this.compositeModeToggle) : this.compositeModeToggle;
            newNode.setPosition(x, y - height * i, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.compositeModeToggle.parent;
            const textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strComposite[i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleCompositeMode, this);
            this.compositeModeToggleList[i] = newNode;
          }
        }

        isTextMatched(textUI, textDescription) {
          let tempText = new String(textUI);
          const findIndex = tempText.search('>');

          if (findIndex === -1) {
            return textUI === textDescription;
          } else {
            tempText = tempText.substr(findIndex + 1);
            tempText = tempText.substr(0, tempText.search('<'));
            return tempText === textDescription;
          }
        }

        toggleSingleMode(toggle) {
          const debugView = director.root.debugView;
          const textComponent = toggle.getComponentInChildren(RichText);

          for (let i = 0; i < this.strSingle.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strSingle[i])) {
              debugView.singleMode = i;
            }
          }
        }

        toggleCompositeMode(toggle) {
          const debugView = director.root.debugView;
          const textComponent = toggle.getComponentInChildren(RichText);

          for (let i = 0; i < this.strComposite.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strComposite[i])) {
              debugView.enableCompositeMode(i, toggle.isChecked);
            }
          }
        }

        toggleLightingWithAlbedo(toggle) {
          const debugView = director.root.debugView;
          debugView.lightingWithAlbedo = toggle.isChecked;
        }

        toggleCSMColoration(toggle) {
          const debugView = director.root.debugView;
          debugView.csmLayerColoration = toggle.isChecked;
        }

        enableAllCompositeMode(button) {
          const debugView = director.root.debugView;
          debugView.enableAllCompositeMode(true);

          for (let i = 0; i < this.compositeModeToggleList.length; i++) {
            const toggleComponent = this.compositeModeToggleList[i].getComponent(Toggle);
            toggleComponent.isChecked = true;
          }

          let toggleComponent = this.miscModeToggleList[0].getComponent(Toggle);
          toggleComponent.isChecked = false;
          debugView.csmLayerColoration = false;
          toggleComponent = this.miscModeToggleList[1].getComponent(Toggle);
          toggleComponent.isChecked = true;
          debugView.lightingWithAlbedo = true;
        }

        hideUI(button) {
          const titleNode = this.node.getChildByName('Titles');
          const activeValue = !titleNode.active;
          this.singleModeToggleList[0].parent.active = activeValue;
          this.miscModeToggleList[0].parent.active = activeValue;
          this.compositeModeToggleList[0].parent.active = activeValue;
          this.EnableAllCompositeModeButton.parent.active = activeValue;
          titleNode.active = activeValue;
          this.hideButtonLabel.string = activeValue ? 'Hide UI' : 'Show UI';
        }

        changeTextColor(button) {
          this._currentColorIndex++;

          if (this._currentColorIndex >= this.strColor.length) {
            this._currentColorIndex = 0;
          }

          for (let i = 0; i < this.textComponentList.length; i++) {
            this.textComponentList[i].string = this.strColor[this._currentColorIndex] + this.textContentList[i] + '</color>';
          }

          for (let i = 0; i < this.labelComponentList.length; i++) {
            this.labelComponentList[i].color = this.color[this._currentColorIndex];
          }
        }

        onLoad() {}

        update(deltaTime) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "compositeModeToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "singleModeToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EnableAllCompositeModeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FullScreenContentCallback.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7a606UMnzxFWI0ecgMiooIq", "FullScreenContentCallback", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ICallbackNTF.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "9edb6Fh09VO7Y37IqJ13RYv", "ICallbackNTF", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/INativeResponse.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1b4f8DNF/RLRZXInWqAThAc", "INativeResponse", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/InterstitailAd.ts", ['cc', './Base.ts'], function (exports) {
  var cclegacy, Base;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Base = module.Base;
    }],
    execute: function () {
      cclegacy._RF.push({}, "567beyhy41MZKX1V/GreujJ", "InterstitailAd", undefined);

      class LoadInterstitialAdREQ extends Base {}

      exports('LoadInterstitialAdREQ', LoadInterstitialAdREQ);

      class LoadInterstitialAdACK extends Base {}

      exports('LoadInterstitialAdACK', LoadInterstitialAdACK);

      class ShowInterstitialAdREQ extends Base {}

      exports('ShowInterstitialAdREQ', ShowInterstitialAdREQ);

      class ShowInterstitialAdACK extends Base {}

      exports('ShowInterstitialAdACK', ShowInterstitialAdACK);

      class InterstitialAdLoadCalLBackNTF extends Base {
        constructor(...args) {
          super(...args);
          this.method = void 0;
          this.loadAdError = void 0;
        }

      }

      exports('InterstitialAdLoadCalLBackNTF', InterstitialAdLoadCalLBackNTF);

      class InterstitialFullScreenContentCallbackNTF extends Base {
        constructor(...args) {
          super(...args);
          this.method = void 0;
          this.loadAdError = void 0;
        }

      }

      exports('InterstitialFullScreenContentCallbackNTF', InterstitialFullScreenContentCallbackNTF);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/InterstitialAdLoadCallback.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4366dzFmV5BEbx0ESSDXNaP", "InterstitialAdLoadCallback", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/InterstitialAdView.ts", ['cc', './Bridge.ts', './Route.ts', './InterstitailAd.ts', './AdView.ts'], function (exports) {
  var cclegacy, log, bridge, route, InterstitialAdLoadCalLBackNTF, LoadInterstitialAdREQ, LoadInterstitialAdACK, InterstitialFullScreenContentCallbackNTF, ShowInterstitialAdREQ, ShowInterstitialAdACK, AdView;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      log = module.log;
    }, function (module) {
      bridge = module.bridge;
    }, function (module) {
      route = module.route;
    }, function (module) {
      InterstitialAdLoadCalLBackNTF = module.InterstitialAdLoadCalLBackNTF;
      LoadInterstitialAdREQ = module.LoadInterstitialAdREQ;
      LoadInterstitialAdACK = module.LoadInterstitialAdACK;
      InterstitialFullScreenContentCallbackNTF = module.InterstitialFullScreenContentCallbackNTF;
      ShowInterstitialAdREQ = module.ShowInterstitialAdREQ;
      ShowInterstitialAdACK = module.ShowInterstitialAdACK;
    }, function (module) {
      AdView = module.AdView;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a5b24s2j2hCP4UlGVeevHUO", "InterstitialAdView", undefined);

      const module$1 = "[InterstitialAdView]";

      class InterstitialAdView extends AdView {
        constructor(...args) {
          super(...args);
          this._interstitialAdLoadCallback = void 0;
          this.fullScreenContentCallback = void 0;
        }

        set interstitialAdLoadCallback(value) {
          if (this._interstitialAdLoadCallback != null) {
            route.off(InterstitialAdLoadCalLBackNTF.name, this.onInterstitialAdLoadCalLBackNTF, this);
          }

          this._interstitialAdLoadCallback = value;

          if (this._interstitialAdLoadCallback) {
            route.on(InterstitialAdLoadCalLBackNTF.name, this.onInterstitialAdLoadCalLBackNTF, this);
          }
        }

        get interstitialAdLoadCallback() {
          return this._interstitialAdLoadCallback;
        }

        load(unitId, interstitialAdLoadCallback) {
          this.destroy();
          log(module$1, `load, unitId = ${unitId}`);
          this.unitId = unitId;
          this.interstitialAdLoadCallback = interstitialAdLoadCallback;
          let view = this;
          bridge.sendToNative(LoadInterstitialAdREQ.name, {
            unitId: unitId
          }, LoadInterstitialAdACK.name, ack => {
            log(module$1, `load, LoadInterstitialAdACK, ${ack}`);
            route.on(InterstitialFullScreenContentCallbackNTF.name, this.onInterstitialFullScreenContentCallback, this);
            this.fullScreenContentCallback = {
              onAdDismissedFullScreenContent() {
                log(module$1, `onAdDismissedFullScreenContent`);
                view.destroy();
              },

              onAdFailedToShowFullScreenContent(adError) {
                log(module$1, `onAdFailedToShowFullScreenContent ${adError}`);
                view.destroy();
              }

            };
          });
        }

        destroy() {
          log(module$1, `destroy`);
          this.interstitialAdLoadCallback = null;
          route.off(InterstitialFullScreenContentCallbackNTF.name, this.onInterstitialFullScreenContentCallback, this);
        }

        show(onComplete) {
          log(module$1, `show`);
          bridge.sendToNative(ShowInterstitialAdREQ.name, {
            unitId: this.unitId
          }, ShowInterstitialAdACK.name, ack => {
            if (onComplete) {
              onComplete();
            }
          });
        }

        onInterstitialAdLoadCalLBackNTF(ntf) {
          log(module$1, `onInterstitialAdLoadCalLBackNTF, ${ntf}`);

          if (this.interstitialAdLoadCallback) {
            let method = this.interstitialAdLoadCallback[ntf.method];

            if (method) {
              method(ntf.loadAdError);
            }
          }
        }

        onInterstitialFullScreenContentCallback(ntf) {
          log(module$1, `onInterstitialFullScreenContentCallback, ${ntf}`);
          const method = this.fullScreenContentCallback[ntf.method];

          if (method) {
            method();
          }
        }

      }

      exports('InterstitialAdView', InterstitialAdView);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/InterstitialFullScreenContentCallback.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4d379O3RNlHEbXfeiKjj4q7", "InterstitialFullScreenContentCallback", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './AdListener.ts', './AdView.ts', './AppOpenAdLoadCallback.ts', './AppOpenAdView.ts', './BannerView.ts', './CreateBannerListener.ts', './FullScreenContentCallback.ts', './InterstitialAdLoadCallback.ts', './InterstitialAdView.ts', './InterstitialFullScreenContentCallback.ts', './OnShowAdCompleteListener.ts', './OnUserEarnedRewardListener.ts', './OpenAppAdFullScreenContentCallback.ts', './RewardedAdFullScreenContentCallback.ts', './RewardedAdLoadCallback.ts', './RewardedAdView.ts', './TypeAlias.ts', './Bridge.ts', './Codec.ts', './INativeResponse.ts', './Route.ts', './TestUnitId.ts', './AppOpenAd.ts', './BannerAd.ts', './Base.ts', './ICallbackNTF.ts', './InterstitailAd.ts', './RewardedAd.ts', './Version.ts', './AdmobTestBanner.ts', './AdmobTestInterstitialAd.ts', './AdmobTestOpenAppAd.ts', './AdmobTestRewarded.ts', './TestScenes.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/OnShowAdCompleteListener.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "9d963PHa9xMRpvnrLbZVHQn", "OnShowAdCompleteListener", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/OnUserEarnedRewardListener.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "11470ylHixOgKO0A7bHNHgJ", "OnUserEarnedRewardListener", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/OpenAppAdFullScreenContentCallback.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "fe76dUobNtH7K/M5R+POKFu", "OpenAppAdFullScreenContentCallback", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RewardedAd.ts", ['cc', './Base.ts'], function (exports) {
  var cclegacy, Base;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Base = module.Base;
    }],
    execute: function () {
      cclegacy._RF.push({}, "aba08WlVZNGxpZ6VmKuY9Fb", "RewardedAd", undefined);

      class LoadRewardedAdREQ extends Base {}

      exports('LoadRewardedAdREQ', LoadRewardedAdREQ);

      class LoadRewardedAdACK extends Base {
        constructor(...args) {
          super(...args);
          this.method = void 0;
          this.loadAdError = void 0;
        }

      }

      exports('LoadRewardedAdACK', LoadRewardedAdACK);

      class ShowRewardedAdREQ extends Base {}

      exports('ShowRewardedAdREQ', ShowRewardedAdREQ);

      class ShowRewardedAdACK extends Base {}

      exports('ShowRewardedAdACK', ShowRewardedAdACK);

      class OnUserEarnedRewardListenerNTF extends Base {
        constructor(...args) {
          super(...args);
          this.rewardType = void 0;
          this.rewardAmount = void 0;
        }

      }

      exports('OnUserEarnedRewardListenerNTF', OnUserEarnedRewardListenerNTF);

      class RewardedAdLoadCallbackNTF extends Base {
        constructor(...args) {
          super(...args);
          this.method = void 0;
          this.adError = void 0;
        }

      }

      exports('RewardedAdLoadCallbackNTF', RewardedAdLoadCallbackNTF);

      class RewardedFullScreenContentCallbackNTF extends Base {
        constructor(...args) {
          super(...args);
          this.method = void 0;
          this.adError = void 0;
        }

      }

      exports('RewardedFullScreenContentCallbackNTF', RewardedFullScreenContentCallbackNTF);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RewardedAdFullScreenContentCallback.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b834b7ZSmVIVbG4HlulGXSQ", "RewardedAdFullScreenContentCallback", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RewardedAdLoadCallback.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "2575fXQOGhO1aZp3Z+8BDsX", "RewardedAdLoadCallback", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RewardedAdView.ts", ['cc', './Bridge.ts', './RewardedAd.ts', './AdView.ts', './Route.ts'], function (exports) {
  var cclegacy, log, bridge, OnUserEarnedRewardListenerNTF, RewardedAdLoadCallbackNTF, LoadRewardedAdREQ, LoadRewardedAdACK, RewardedFullScreenContentCallbackNTF, ShowRewardedAdREQ, ShowRewardedAdACK, AdView, route;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      log = module.log;
    }, function (module) {
      bridge = module.bridge;
    }, function (module) {
      OnUserEarnedRewardListenerNTF = module.OnUserEarnedRewardListenerNTF;
      RewardedAdLoadCallbackNTF = module.RewardedAdLoadCallbackNTF;
      LoadRewardedAdREQ = module.LoadRewardedAdREQ;
      LoadRewardedAdACK = module.LoadRewardedAdACK;
      RewardedFullScreenContentCallbackNTF = module.RewardedFullScreenContentCallbackNTF;
      ShowRewardedAdREQ = module.ShowRewardedAdREQ;
      ShowRewardedAdACK = module.ShowRewardedAdACK;
    }, function (module) {
      AdView = module.AdView;
    }, function (module) {
      route = module.route;
    }],
    execute: function () {
      cclegacy._RF.push({}, "074b3qrwzFBRbVxxt6OuQuZ", "RewardedAdView", undefined);

      const module$1 = "[RewardedAdView]";

      class RewardedAdView extends AdView {
        constructor(...args) {
          super(...args);
          this._onUserEarnedRewardListener = void 0;
          this._fullScreenContentCallback = void 0;
          this._rewardedAdLoadCallback = void 0;
        }

        get onUserEarnedRewardListener() {
          return this._onUserEarnedRewardListener;
        }

        set onUserEarnedRewardListener(value) {
          if (this._onUserEarnedRewardListener) {
            route.off(OnUserEarnedRewardListenerNTF.name, this.onOnUserEarnedRewardListenerNTF, this);
          }

          this._onUserEarnedRewardListener = value;

          if (this._onUserEarnedRewardListener) {
            route.on(OnUserEarnedRewardListenerNTF.name, this.onOnUserEarnedRewardListenerNTF, this);
          }
        }

        get fullScreenContentCallback() {
          return this._fullScreenContentCallback;
        }

        set fullScreenContentCallback(value) {
          this._fullScreenContentCallback = value;
        }

        get rewardedAdLoadCallback() {
          return this._rewardedAdLoadCallback;
        }

        set rewardedAdLoadCallback(value) {
          if (this._rewardedAdLoadCallback) {
            route.off(RewardedAdLoadCallbackNTF.name, this.onRewardedAdLoadCallbackNTF, this);
          }

          this._rewardedAdLoadCallback = value;

          if (this._rewardedAdLoadCallback) {
            route.on(RewardedAdLoadCallbackNTF.name, this.onRewardedAdLoadCallbackNTF, this);
          }
        }

        load(unitId, rewardedAdLoadCallback, onUserEarnedRewardListener) {
          log(module$1, `load, unitId = ${unitId}`);
          this.unitId = unitId;
          this.onUserEarnedRewardListener = onUserEarnedRewardListener;
          bridge.sendToNative(LoadRewardedAdREQ.name, {
            unitId: unitId
          }, LoadRewardedAdACK.name, ack => {
            log(module$1, `LoadRewardedAdACK, ${ack}`);
            this.rewardedAdLoadCallback = rewardedAdLoadCallback;
            route.on(RewardedFullScreenContentCallbackNTF.name, this.onFullScreenContentCallback, this);
          }, this);
        }

        destroy() {
          log(module$1, `destroy`);
          route.off(RewardedFullScreenContentCallbackNTF.name, this.onFullScreenContentCallback, this);
          this.onUserEarnedRewardListener = null;
          this.rewardedAdLoadCallback = null;
          this.fullScreenContentCallback = null;
        }

        show() {
          log(module$1, `show`);
          bridge.sendToNative(ShowRewardedAdREQ.name, {
            unitId: this.unitId
          }, ShowRewardedAdACK.name, ack => {
            log(module$1, `ShowRewardedAdREQ, ${ack}`);
          }, this);
        }

        onRewardedAdLoadCallbackNTF(ntf) {
          log(module$1, `onRewardedAdLoadCallbackNTF`);

          if (this.rewardedAdLoadCallback) {
            const method = this.rewardedAdLoadCallback[ntf.method];

            if (method) {
              method();
            }
          }
        }

        onFullScreenContentCallback() {
          log(module$1, `onFullScreenContentCallback`);
        }

        onOnUserEarnedRewardListenerNTF(ntf) {
          log(module$1, `onOnUserEarnedRewardListenerNTF`);

          if (this.onUserEarnedRewardListener && this.onUserEarnedRewardListener.onEarn) {
            this.onUserEarnedRewardListener.onEarn(ntf.rewardType, ntf.rewardAmount);
          }
        }

      }

      exports('RewardedAdView', RewardedAdView);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Route.ts", ['cc', './Codec.ts'], function (exports) {
  var cclegacy, EventTarget, log, Codec;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      EventTarget = module.EventTarget;
      log = module.log;
    }, function (module) {
      Codec = module.Codec;
    }],
    execute: function () {
      cclegacy._RF.push({}, "69f2fHHtVNP0rFXSQf1U3WT", "Route", undefined);

      const module$1 = "[Route]";

      class Route {
        constructor() {
          this.codec = void 0;
          this._eventTarget = new EventTarget();
        }

        init(codec) {
          log(module$1, "init");
          this.codec = codec;
          return this;
        }

        destroy() {}

        once(method, handler, thisArg) {
          log(module$1, "once", method);

          this._eventTarget.once(method, handler, thisArg);
        }

        off(method, response, thisArg) {
          log(module$1, "off", method);

          this._eventTarget.off(method, response, thisArg);
        }

        on(method, handler, thisArg) {
          log(module$1, "on", method);

          this._eventTarget.on(method, handler, thisArg);
        }

        dispatch(method, ack) {
          log(module$1, "dispatch", method);

          this._eventTarget.emit(method, ack);
        }

      }

      exports('Route', Route);
      Route.instance = new Route();
      const route = exports('route', new Route().init(new Codec()));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TestScenes.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "0d9cd6Iq1NI0bro3GkAjxQH", "TestScenes", undefined);

      const TestScenes = exports('TestScenes', ["1.banner", "2.interstitial", "3.openAppAd", "4.rewardedAd", "5.interstitialRewardedAd", "6.nativeAd"]);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TestUnitId.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "55cd6paoF5Hxq9K9vHTcY6l", "TestUnitId", undefined);

      let TestUnitId = exports('TestUnitId', /*#__PURE__*/function (TestUnitId) {
        TestUnitId["BannerAd"] = "ca-app-pub-3940256099942544/6300978111";
        TestUnitId["InterstitialAd"] = "ca-app-pub-3940256099942544/3419835294";
        TestUnitId["OpenAppAd"] = "ca-app-pub-3940256099942544/3419835294";
        TestUnitId["RewardedAd"] = "ca-app-pub-3940256099942544/5224354917";
        TestUnitId["NativeAd"] = "";
        TestUnitId["RewardedInterstitialAd"] = "";
        return TestUnitId;
      }({}));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TypeAlias.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c65f27VyXVDtYeNzcHDZMJ0", "TypeAlias", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Version.ts", ['cc', './Base.ts'], function (exports) {
  var cclegacy, Base;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Base = module.Base;
    }],
    execute: function () {
      cclegacy._RF.push({}, "03f470OFoJK/KzjtquDZG47", "Version", undefined);

      class VersionREQ extends Base {
        constructor(unitId, engineVersion) {
          super(unitId);
          this.engineVersion = engineVersion;
        }

      }

      exports('VersionREQ', VersionREQ);

      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});