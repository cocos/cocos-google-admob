System.register("chunks:///_virtual/AdClient.ts", ['cc'], function (exports) {
  var cclegacy, EventTarget;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      EventTarget = module.EventTarget;
    }],
    execute: function () {
      cclegacy._RF.push({}, "75cbdUoOilEO4Zv4j4/er2J", "AdClient", undefined);

      class AdClient extends EventTarget {
        constructor(...args) {
          super(...args);
          this.unitId = void 0;
        }

      }

      exports('AdClient', AdClient);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AdListener.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "eeabbSrcf9JUJAhW53QJEys", "AdListener", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AdmobTestBanner.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TestScenes.ts', './BannerView.ts', './TestUnitId.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Button, _decorator, Component, log, director, TestScenes, BannerClient, TestUnitId;

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
      BannerClient = module.BannerClient;
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

          this.bannerClient = void 0;
        }

        start() {
          var _this$bannerClient;

          (_this$bannerClient = this.bannerClient) == null ? void 0 : _this$bannerClient.destroy();
        }

        onDestroy() {
          var _this$bannerClient2;

          (_this$bannerClient2 = this.bannerClient) == null ? void 0 : _this$bannerClient2.destroy();
        }

        onClickLoadBanner() {
          if (this.bannerClient != null) {
            throw new Error("duplicated create of bannerView");
          }

          this.bannerClient = new BannerClient();
          this.bannerClient.create(TestUnitId.BannerAd, {
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
          var _this$bannerClient3;

          (_this$bannerClient3 = this.bannerClient) == null ? void 0 : _this$bannerClient3.show(true);
        }

        onClickHideBanner() {
          var _this$bannerClient4;

          (_this$bannerClient4 = this.bannerClient) == null ? void 0 : _this$bannerClient4.show(false);
        }

        onClickDestroyBanner() {
          var _this$bannerClient5;

          log(module$1, "onClickDestroyBanner");
          (_this$bannerClient5 = this.bannerClient) == null ? void 0 : _this$bannerClient5.destroy();
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

System.register("chunks:///_virtual/AdmobTestInterstitialAd.ts", ['cc', './TestScenes.ts', './InterstitialAdClient.ts', './TestUnitId.ts'], function (exports) {
  var cclegacy, Component, log, director, _decorator, TestScenes, InterstitialAdClient, TestUnitId;

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
      InterstitialAdClient = module.InterstitialAdClient;
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
          let interstitialAdClient = new InterstitialAdClient();
          interstitialAdClient.load(TestUnitId.InterstitialAd, {
            onAdLoaded() {
              log(module$1, "onAdLoaded");
              interstitialAdClient.show();
            },

            onAdFailedToLoad(loadAdError) {
              log(module$1, "onAdFailedToLoad, error: ", loadAdError);
              interstitialAdClient.destroy();
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

System.register("chunks:///_virtual/AdmobTestNative.ts", ['cc', './TestScenes.ts', './NativeAdClient.ts', './TestUnitId.ts', './NativeAd.ts'], function (exports) {
  var cclegacy, Component, log, director, _decorator, TestScenes, NativeAdClient, TestUnitId, NativeAdTemplateSize;

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
      NativeAdClient = module.NativeAdClient;
    }, function (module) {
      TestUnitId = module.TestUnitId;
    }, function (module) {
      NativeAdTemplateSize = module.NativeAdTemplateSize;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "ea986Q9mz9KGpCuuqEIc3OH", "AdmobTestNative", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      const module$1 = "[AdmobTestNative]";
      let AdmobTestNative = exports('AdmobTestNative', (_dec = ccclass('AdmobTestNative'), _dec(_class = class AdmobTestNative extends Component {
        constructor(...args) {
          super(...args);
          this.smallNativeAd = void 0;
          this.mediumNativeAd = void 0;
        }

        onClickLoadSmallAd() {
          log(module$1, "onClickLoadNativeAd");
          this.smallNativeAd = new NativeAdClient();
          this.smallNativeAd.load(TestUnitId.NativeAd, NativeAdTemplateSize.Small, {
            onAdLoaded() {
              log(module$1, "onClickLoadSmallAd", "onAdLoaded");
            }

          });
        }

        onClickCloseSmallAd() {
          if (this.smallNativeAd) {
            this.smallNativeAd.destroy();
          }
        }

        onClickLoadMediumAd() {
          log(module$1, "onClickLoadNativeAd");
          this.mediumNativeAd = new NativeAdClient();
          this.mediumNativeAd.load(TestUnitId.NativeAd, NativeAdTemplateSize.Medium, {
            onAdLoaded() {
              log(module$1, "onClickLoadSmallAd", "onAdLoaded");
            }

          });
        }

        onClickCloseMediumAd() {
          if (this.mediumNativeAd) {
            this.mediumNativeAd.destroy();
          }
        }

        onNextScene() {
          director.loadScene(TestScenes[0]);
        }

      }) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AdmobTestOpenAppAd.ts", ['cc', './TestScenes.ts', './AppOpenAdClient.ts', './TestUnitId.ts'], function (exports) {
  var cclegacy, Component, log, director, _decorator, TestScenes, AppOpenAdClient, TestUnitId;

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
      AppOpenAdClient = module.AppOpenAdClient;
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
          this.appOpenAdView = new AppOpenAdClient();
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

System.register("chunks:///_virtual/AdmobTestRewarded.ts", ['cc', './TestScenes.ts', './RewardedAdClient.ts', './TestUnitId.ts'], function (exports) {
  var cclegacy, Component, log, Label, director, _decorator, TestScenes, RewardedAdClient, TestUnitId;

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
      RewardedAdClient = module.RewardedAdClient;
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
          let rewardedAdClient = new RewardedAdClient();
          rewardedAdClient.load(TestUnitId.RewardedAd, {
            onAdLoaded() {
              log(module$1, "onClickLoadRewardedAd", "onAdLoaded");
              rewardedAdClient.show();
            },

            onAdFailedToLoad(loadAdError) {
              log(module$1, "onClickLoadRewardedAd", "onAdFailedToLoad", loadAdError);
            },

            onEarn(rewardType, amount) {
              log(module$1, "onClickLoadRewardedAd", `onEarn, rewardType = ${rewardType}, amount = ${amount}`);
              rewardEarnNode.active = true;
              const label = rewardEarnNode.getChildByName("Tip").getComponent(Label);
              label.string = `You have won the reward, type = ${rewardType}, amount = ${amount}!`;
            },

            onAdDismissedFullScreenContent() {
              log(module$1, "onAdDismissedFullScreenContent");
              rewardedAdClient.destroy();
            },

            onAdFailedToShowFullScreenContent(adError) {
              log(module$1, "onAdFailedToShowFullScreenContent, adError: ", adError);
              rewardedAdClient.destroy();
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

System.register("chunks:///_virtual/AdmobTestRewardedInterstitialAd.ts", ['cc', './TestScenes.ts', './TestUnitId.ts', './RewardedInterstitialAdClient.ts'], function (exports) {
  var cclegacy, Component, log, Label, director, _decorator, TestScenes, TestUnitId, RewardedInterstitialAdClient;

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
      TestUnitId = module.TestUnitId;
    }, function (module) {
      RewardedInterstitialAdClient = module.RewardedInterstitialAdClient;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "656d5HDu/9GNovXemUUx9J7", "AdmobTestRewardedInterstitialAd", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      const module$1 = "[AdmobTestRewardedInterstitialAd]";
      let AdmobTestRewardedInterstitialAd = exports('AdmobTestRewardedInterstitialAd', (_dec = ccclass('AdmobTestRewardedInterstitialAd'), _dec(_class = class AdmobTestRewardedInterstitialAd extends Component {
        start() {
          // Hide the reward earn dialog on start;
          let rewardEarnNode = this.node.getChildByName("DialogRewarded");
          rewardEarnNode.active = false;
        }

        onClickLoadRewardedAd() {
          log(module$1, "onClickLoadRewardedAd");
          let rewardEarnNode = this.node.getChildByName("DialogRewarded");
          let rewardedInterstitialAdClient = new RewardedInterstitialAdClient();
          rewardedInterstitialAdClient.load(TestUnitId.RewardedInterstitialAd, {
            onAdLoaded() {
              log(module$1, "onClickLoadRewardedAd", "onAdLoaded");
              rewardedInterstitialAdClient.show();
            },

            onAdFailedToLoad(loadAdError) {
              log(module$1, "onClickLoadRewardedAd", "onAdFailedToLoad", loadAdError);
            },

            onEarn(rewardType, amount) {
              log(module$1, "onClickLoadRewardedAd", `onEarn, rewardType = ${rewardType}, amount = ${amount}`);
              rewardEarnNode.active = true;
              const label = rewardEarnNode.getChildByName("Tip").getComponent(Label);
              label.string = `You have won the reward, type = ${rewardType}, amount = ${amount}!`;
            },

            onAdDismissedFullScreenContent() {
              log(module$1, "onAdDismissedFullScreenContent");
              rewardedInterstitialAdClient.destroy();
            },

            onAdFailedToShowFullScreenContent(adError) {
              log(module$1, "onAdFailedToShowFullScreenContent, adError: ", adError);
              rewardedInterstitialAdClient.destroy();
            }

          });
        }

        onNextScene() {
          director.loadScene(TestScenes[5]);
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

System.register("chunks:///_virtual/AppOpenAdClient.ts", ['cc', './Bridge.ts', './Route.ts', './AppOpenAd.ts', './AdClient.ts'], function (exports) {
  var cclegacy, log, bridge, route, AppOpenAdLoadCallbackNTF, OpenAppAdFullScreenContentCallbackNTF, ShowOpenAppAdCompleteNTF, LoadOpenAppAdREQ, LoadOpenAppAdACK, IsAdAvailableREQ, IsAdAvailableACK, ShowOpenAppAdREQ, ShowOpenAppAdACK, AdClient;
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
      AdClient = module.AdClient;
    }],
    execute: function () {
      cclegacy._RF.push({}, "84e98N5sqRD5bh10i/EComX", "AppOpenAdClient", undefined);

      const module$1 = "[AppOpenAdClient]";

      class AppOpenAdClient extends AdClient {
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

      exports('AppOpenAdClient', AppOpenAdClient);

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
      cclegacy._RF.push({}, "4e5033RcxVOzZ3gnkXZCeuD", "AppOpenAdLoadCallback", undefined);

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

System.register("chunks:///_virtual/BannerView.ts", ['cc', './AdClient.ts', './BannerAd.ts', './Bridge.ts', './Route.ts'], function (exports) {
  var cclegacy, log, AdClient, SetBannerSizeREQ, BannerAdListenerNTF, CreateBannerViewREQ, CreateBannerViewACK, ShowBannerREQ, LoadBannerREQ, LoadBannerACK, DestroyBannerREQ, DestroyBannerACK, bridge, route;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      log = module.log;
    }, function (module) {
      AdClient = module.AdClient;
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
      cclegacy._RF.push({}, "c134clsj91M34EZ30WPUV7n", "BannerView", undefined);

      const module$1 = "[BannerClient]";

      class BannerClient extends AdClient {
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
            this.emit(BannerClient.OnDestroyed, this);
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

      exports('BannerClient', BannerClient);
      BannerClient.OnDestroyed = 'OnDestroyed';

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

System.register("chunks:///_virtual/Bridge.ts", ['cc', './Route.ts', './Version.ts', './Version2.ts'], function (exports) {
  var cclegacy, log, native, route, VersionREQ, AdMobVersion;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      log = module.log;
      native = module.native;
    }, function (module) {
      route = module.route;
    }, function (module) {
      VersionREQ = module.VersionREQ;
    }, function (module) {
      AdMobVersion = module.AdMobVersion;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5fda2TWWuhELZgGyhZZgKj6", "Bridge", undefined);

      const module$1 = "[Bridge]";

      class Bridge {
        init() {
          log(module$1, "init");
          this.overwriteCallback();
          const engineVersion = `cocos-${AdMobVersion}`;
          console.log(module$1, "init", `report engineVersion: ${engineVersion}.`);
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
      cclegacy._RF.push({}, "f9800LbeD1M642D45zyHUQ4", "FullScreenContentCallback", undefined);

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
      cclegacy._RF.push({}, "50bf32kIfdFT6mUWmlo3xTy", "InterstitailAd", undefined);

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

System.register("chunks:///_virtual/InterstitialAdClient.ts", ['cc', './Bridge.ts', './Route.ts', './InterstitailAd.ts', './AdClient.ts'], function (exports) {
  var cclegacy, log, bridge, route, InterstitialAdLoadCalLBackNTF, LoadInterstitialAdREQ, LoadInterstitialAdACK, InterstitialFullScreenContentCallbackNTF, ShowInterstitialAdREQ, ShowInterstitialAdACK, AdClient;
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
      AdClient = module.AdClient;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f5127/q14VHfYxNfoF9+P6R", "InterstitialAdClient", undefined);

      const module$1 = "[InterstitialAdClient]";

      class InterstitialAdClient extends AdClient {
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

      exports('InterstitialAdClient', InterstitialAdClient);

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
      cclegacy._RF.push({}, "c6af7uO9xdG9L3zq6nKjfxX", "InterstitialAdLoadCallback", undefined);

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
      cclegacy._RF.push({}, "f05b5kjguVPgYcKjjXMMy59", "InterstitialFullScreenContentCallback", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './TypeAlias.ts', './AdClient.ts', './AppOpenAdClient.ts', './BannerView.ts', './InterstitialAdClient.ts', './NativeAdClient.ts', './RewardedAdClient.ts', './RewardedInterstitialAdClient.ts', './AdListener.ts', './AppOpenAdLoadCallback.ts', './FullScreenContentCallback.ts', './InterstitialAdLoadCallback.ts', './InterstitialFullScreenContentCallback.ts', './NativeAdListener.ts', './OnNativeAdLoadedListener.ts', './OnShowAdCompleteListener.ts', './OnUserEarnedRewardListener.ts', './OpenAppAdFullScreenContentCallback.ts', './RewardedAdFullScreenContentCallback.ts', './RewardedAdListener.ts', './RewardedAdLoadCallback.ts', './RewardedInterstitialAdLoadCallback.ts', './RewardedInterstitialFullScreenContentCallback.ts', './RewardedInterstitialListener.ts', './Bridge.ts', './Codec.ts', './INativeResponse.ts', './Route.ts', './Version2.ts', './TestUnitId.ts', './AppOpenAd.ts', './BannerAd.ts', './Base.ts', './ICallbackNTF.ts', './InterstitailAd.ts', './NativeAd.ts', './RewardedAd.ts', './RewardedInterstitialAd.ts', './Version.ts', './AdmobTestBanner.ts', './AdmobTestInterstitialAd.ts', './AdmobTestNative.ts', './AdmobTestOpenAppAd.ts', './AdmobTestRewarded.ts', './AdmobTestRewardedInterstitialAd.ts', './TestScenes.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/NativeAd.ts", ['cc', './Base.ts'], function (exports) {
  var cclegacy, Base;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Base = module.Base;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8c2ff5jR+5DsbkJ9see0252", "NativeAd", undefined);

      let NativeAdTemplateSize = exports('NativeAdTemplateSize', /*#__PURE__*/function (NativeAdTemplateSize) {
        NativeAdTemplateSize["Small"] = "small";
        NativeAdTemplateSize["Medium"] = "medium";
        return NativeAdTemplateSize;
      }({}));

      class LoadNativeAdREQ extends Base {
        constructor(...args) {
          super(...args);
          this.size = NativeAdTemplateSize.Small;
        }

      }

      exports('LoadNativeAdREQ', LoadNativeAdREQ);

      class LoadNativeAdACK extends Base {}

      exports('LoadNativeAdACK', LoadNativeAdACK);

      class NativeLoadedNTF extends Base {}

      exports('NativeLoadedNTF', NativeLoadedNTF);

      class NativeAdListenerNTF extends Base {
        constructor(...args) {
          super(...args);
          this.method = void 0;
          this.loadAdError = void 0;
        }

      }

      exports('NativeAdListenerNTF', NativeAdListenerNTF);

      class DestroyNativeAdREQ extends Base {}

      exports('DestroyNativeAdREQ', DestroyNativeAdREQ);

      class DestroyNativeAdACK extends Base {}

      exports('DestroyNativeAdACK', DestroyNativeAdACK);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NativeAdClient.ts", ['cc', './Bridge.ts', './BannerAd.ts', './NativeAd.ts', './AdClient.ts', './Route.ts'], function (exports) {
  var cclegacy, log, bridge, DestroyBannerACK, NativeLoadedNTF, NativeAdListenerNTF, LoadNativeAdREQ, LoadNativeAdACK, DestroyNativeAdREQ, AdClient, route;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      log = module.log;
    }, function (module) {
      bridge = module.bridge;
    }, function (module) {
      DestroyBannerACK = module.DestroyBannerACK;
    }, function (module) {
      NativeLoadedNTF = module.NativeLoadedNTF;
      NativeAdListenerNTF = module.NativeAdListenerNTF;
      LoadNativeAdREQ = module.LoadNativeAdREQ;
      LoadNativeAdACK = module.LoadNativeAdACK;
      DestroyNativeAdREQ = module.DestroyNativeAdREQ;
    }, function (module) {
      AdClient = module.AdClient;
    }, function (module) {
      route = module.route;
    }],
    execute: function () {
      cclegacy._RF.push({}, "9f47abEDV5OsLkRJx/ZinC7", "NativeAdClient", undefined);

      const module$1 = "[NativeAdClient]";

      class NativeAdClient extends AdClient {
        constructor(...args) {
          super(...args);
          this._nativeAdListener = void 0;
        }

        get nativeAdListener() {
          return this._nativeAdListener;
        }

        set nativeAdListener(value) {
          if (this._nativeAdListener) {
            route.off(NativeLoadedNTF.name, this.onNativeLoadedNTF, this);
            route.off(NativeAdListenerNTF.name, this.onNativeAdListenerNTF, this);
          }

          this._nativeAdListener = value;

          if (this._nativeAdListener) {
            route.on(NativeLoadedNTF.name, this.onNativeLoadedNTF, this);
            route.on(NativeAdListenerNTF.name, this.onNativeAdListenerNTF, this);
          }
        }

        load(unitId, size, nativeListener) {
          log(module$1, "load", `unitId = ${unitId}`);
          this.nativeAdListener = nativeListener;
          let req = new LoadNativeAdREQ(unitId);
          req.size = size;
          bridge.sendToNative(LoadNativeAdREQ.name, req, LoadNativeAdACK.name, ack => {
            log(module$1, "load", `LoadNativeAdACK: ${ack}`);
          }, this);
        }

        destroy() {
          log(module$1, "destroy");
          this.nativeAdListener = null;
          bridge.sendToNative(DestroyNativeAdREQ.name, {
            unitId: this.unitId
          }, DestroyBannerACK.name, ack => {
            log(module$1, "destroy", `DestroyNativeAdACK = ${ack}`);
          });
        }

        onNativeLoadedNTF(ntf) {
          if (this.nativeAdListener) {
            const listener = this.nativeAdListener;

            if (listener && listener.onNativeAdLoaded) {
              listener.onNativeAdLoaded();
            }
          }
        }

        onNativeAdListenerNTF(ntf) {
          const method = this.nativeAdListener[ntf.method];

          if (method) {
            method(ntf.loadAdError);
          }
        }

      }

      exports('NativeAdClient', NativeAdClient);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NativeAdListener.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "deb7afxfyxLQ6ZJNanDJ1iH", "NativeAdListener", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/OnNativeAdLoadedListener.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "181b0/jeMNP8YOPFq0hClM0", "OnNativeAdLoadedListener", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/OnShowAdCompleteListener.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "48248gpGjlLd772IYhQqcpV", "OnShowAdCompleteListener", undefined);

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
      cclegacy._RF.push({}, "7f2cf7vts1KnY/2/8iuRVrB", "OnUserEarnedRewardListener", undefined);

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
      cclegacy._RF.push({}, "ff564t2fchKHZrWEv4E62Hw", "OpenAppAdFullScreenContentCallback", undefined);

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
          this.loadAdError = void 0;
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

System.register("chunks:///_virtual/RewardedAdClient.ts", ['cc', './Bridge.ts', './RewardedAd.ts', './AdClient.ts', './Route.ts'], function (exports) {
  var cclegacy, log, bridge, RewardedAdLoadCallbackNTF, RewardedFullScreenContentCallbackNTF, OnUserEarnedRewardListenerNTF, LoadRewardedAdREQ, LoadRewardedAdACK, ShowRewardedAdREQ, ShowRewardedAdACK, AdClient, route;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      log = module.log;
    }, function (module) {
      bridge = module.bridge;
    }, function (module) {
      RewardedAdLoadCallbackNTF = module.RewardedAdLoadCallbackNTF;
      RewardedFullScreenContentCallbackNTF = module.RewardedFullScreenContentCallbackNTF;
      OnUserEarnedRewardListenerNTF = module.OnUserEarnedRewardListenerNTF;
      LoadRewardedAdREQ = module.LoadRewardedAdREQ;
      LoadRewardedAdACK = module.LoadRewardedAdACK;
      ShowRewardedAdREQ = module.ShowRewardedAdREQ;
      ShowRewardedAdACK = module.ShowRewardedAdACK;
    }, function (module) {
      AdClient = module.AdClient;
    }, function (module) {
      route = module.route;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f671fUVeRZAD5cN05OWkw+n", "RewardedAdClient", undefined);

      const module$1 = "[RewardedAdClient]";

      class RewardedAdClient extends AdClient {
        constructor(...args) {
          super(...args);
          this._rewardedListener = void 0;
        }

        set rewardedListener(value) {
          if (this._rewardedListener) {
            route.off(RewardedAdLoadCallbackNTF.name, this.onRewardedAdLoadCallbackNTF, this);
            route.off(RewardedFullScreenContentCallbackNTF.name, this.onFullScreenContentCallback, this);
            route.off(OnUserEarnedRewardListenerNTF.name, this.onOnUserEarnedRewardListenerNTF, this);
          }

          this._rewardedListener = value;

          if (this._rewardedListener) {
            route.on(RewardedAdLoadCallbackNTF.name, this.onRewardedAdLoadCallbackNTF, this);
            route.on(RewardedFullScreenContentCallbackNTF.name, this.onFullScreenContentCallback, this);
            route.on(OnUserEarnedRewardListenerNTF.name, this.onOnUserEarnedRewardListenerNTF, this);
          }
        }

        get rewardedListener() {
          return this._rewardedListener;
        }

        load(unitId, rewardedListener) {
          log(module$1, `load, unitId = ${unitId}`);
          this.unitId = unitId;
          this.rewardedListener = rewardedListener;
          bridge.sendToNative(LoadRewardedAdREQ.name, {
            unitId: unitId
          }, LoadRewardedAdACK.name, ack => {
            log(module$1, `LoadRewardedAdACK, ${ack}`);
          }, this);
        }

        destroy() {
          log(module$1, `destroy`);
          this.rewardedListener = null;
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

          if (this.rewardedListener) {
            const method = this.rewardedListener[ntf.method];

            if (method) {
              method();
            }
          }
        }

        onFullScreenContentCallback(ntf) {
          log(module$1, `onFullScreenContentCallback`);

          if (this.rewardedListener) {
            let method = this.rewardedListener[ntf.method];

            if (method) {
              method(ntf.adError);
            }
          }
        }

        onOnUserEarnedRewardListenerNTF(ntf) {
          log(module$1, `onOnUserEarnedRewardListenerNTF`);

          if (this.rewardedListener) {
            const onUserEarnedRewardListener = this.rewardedListener;

            if (onUserEarnedRewardListener && onUserEarnedRewardListener.onEarn) {
              onUserEarnedRewardListener.onEarn(ntf.rewardType, ntf.rewardAmount);
            }
          }
        }

      }

      exports('RewardedAdClient', RewardedAdClient);

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
      cclegacy._RF.push({}, "b056e+LxdFFxod26wtZGDRm", "RewardedAdFullScreenContentCallback", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RewardedAdListener.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "71a58UbDcFEEI4mXQYqyg2n", "RewardedAdListener", undefined);

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
      cclegacy._RF.push({}, "4a1efNLiMlIf7RTSxC1P7kI", "RewardedAdLoadCallback", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RewardedInterstitialAd.ts", ['cc', './Base.ts'], function (exports) {
  var cclegacy, Base;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Base = module.Base;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8d7acjr7ExBIanfhtFo2bVc", "RewardedInterstitialAd", undefined);

      class LoadRewardedInterstitialAdREQ extends Base {}

      exports('LoadRewardedInterstitialAdREQ', LoadRewardedInterstitialAdREQ);

      class LoadRewardedInterstitialAdACK extends Base {}

      exports('LoadRewardedInterstitialAdACK', LoadRewardedInterstitialAdACK);

      class ShowRewardedInterstitialAdREQ extends Base {}

      exports('ShowRewardedInterstitialAdREQ', ShowRewardedInterstitialAdREQ);

      class ShowRewardedInterstitialAdACK extends Base {}

      exports('ShowRewardedInterstitialAdACK', ShowRewardedInterstitialAdACK);

      class RewardedInterstitialAdLoadCallbackNTF extends Base {
        constructor(...args) {
          super(...args);
          this.method = void 0;
          this.loadAdError = void 0;
        }

      }

      exports('RewardedInterstitialAdLoadCallbackNTF', RewardedInterstitialAdLoadCallbackNTF);

      class OnUserEarnedRewardedInterstitialListenerNTF extends Base {
        constructor(...args) {
          super(...args);
          this.rewardType = void 0;
          this.rewardAmount = void 0;
        }

      }

      exports('OnUserEarnedRewardedInterstitialListenerNTF', OnUserEarnedRewardedInterstitialListenerNTF);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RewardedInterstitialAdClient.ts", ['cc', './AdClient.ts', './RewardedInterstitialAd.ts', './Bridge.ts', './Route.ts'], function (exports) {
  var cclegacy, log, AdClient, RewardedInterstitialAdLoadCallbackNTF, OnUserEarnedRewardedInterstitialListenerNTF, LoadRewardedInterstitialAdREQ, LoadRewardedInterstitialAdACK, ShowRewardedInterstitialAdREQ, ShowRewardedInterstitialAdACK, bridge, route;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      log = module.log;
    }, function (module) {
      AdClient = module.AdClient;
    }, function (module) {
      RewardedInterstitialAdLoadCallbackNTF = module.RewardedInterstitialAdLoadCallbackNTF;
      OnUserEarnedRewardedInterstitialListenerNTF = module.OnUserEarnedRewardedInterstitialListenerNTF;
      LoadRewardedInterstitialAdREQ = module.LoadRewardedInterstitialAdREQ;
      LoadRewardedInterstitialAdACK = module.LoadRewardedInterstitialAdACK;
      ShowRewardedInterstitialAdREQ = module.ShowRewardedInterstitialAdREQ;
      ShowRewardedInterstitialAdACK = module.ShowRewardedInterstitialAdACK;
    }, function (module) {
      bridge = module.bridge;
    }, function (module) {
      route = module.route;
    }],
    execute: function () {
      cclegacy._RF.push({}, "9ca7a3u0FdOSqTQ9U0IGJLD", "RewardedInterstitialAdClient", undefined);

      const module$1 = "[RewardedInterstitialAdClient]";

      class RewardedInterstitialAdClient extends AdClient {
        constructor(...args) {
          super(...args);
          this._rewardedInterstitialListener = void 0;
        }

        set rewardedInterstitialListener(value) {
          if (this._rewardedInterstitialListener) {
            route.off(RewardedInterstitialAdLoadCallbackNTF.name, this.onRewardedInterstitialAdLoadCallback, this);
            route.off(OnUserEarnedRewardedInterstitialListenerNTF.name, this.onOnUserEarnedRewardListenerNTF, this);
          }

          this._rewardedInterstitialListener = value;

          if (this._rewardedInterstitialListener) {
            route.on(RewardedInterstitialAdLoadCallbackNTF.name, this.onRewardedInterstitialAdLoadCallback, this);
            route.on(OnUserEarnedRewardedInterstitialListenerNTF.name, this.onOnUserEarnedRewardListenerNTF, this);
          }
        }

        get rewardedInterstitialListener() {
          return this._rewardedInterstitialListener;
        }

        load(unitId, listener) {
          this.destroy();
          this.unitId = unitId;
          this._rewardedInterstitialListener = listener;
          bridge.sendToNative(LoadRewardedInterstitialAdREQ.name, {
            unitId: unitId
          }, LoadRewardedInterstitialAdACK.name, ack => {}, this);
        }

        destroy() {
          this.rewardedInterstitialListener = null;
        }

        show() {
          bridge.sendToNative(ShowRewardedInterstitialAdREQ.name, {
            unitId: this.unitId
          }, ShowRewardedInterstitialAdACK.name, ack => {}, this);
        }

        onRewardedInterstitialAdLoadCallback(ntf) {
          const method = this.rewardedInterstitialListener[ntf.method];

          if (method) {
            method(ntf.loadAdError);
          }
        }

        onOnUserEarnedRewardListenerNTF(ntf) {
          log(module$1, `onOnUserEarnedRewardListenerNTF`);

          if (this.rewardedInterstitialListener) {
            const onEarn = this.rewardedInterstitialListener;

            if (onEarn && onEarn.onEarn) {
              onEarn.onEarn(ntf.rewardType, ntf.rewardAmount);
            }
          }
        }

      }

      exports('RewardedInterstitialAdClient', RewardedInterstitialAdClient);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RewardedInterstitialAdLoadCallback.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1d0c7+MjgZPsq0TZhuhn0Pv", "RewardedInterstitialAdLoadCallback", undefined);

      class RewardedInterstitialAdLoadCallback {
        constructor() {
          this.onAdLoaded = void 0;
          this.onAdFailedToLoad = void 0;
        }

      }

      exports('RewardedInterstitialAdLoadCallback', RewardedInterstitialAdLoadCallback);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RewardedInterstitialFullScreenContentCallback.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "47bafOZ4M1MWKiSYrPGSpAJ", "RewardedInterstitialFullScreenContentCallback", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RewardedInterstitialListener.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ac4bfpM0CdLA7O4sXFC0Kjj", "RewardedInterstitialListener", undefined);

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
        TestUnitId["NativeAd"] = "ca-app-pub-3940256099942544/2247696110";
        TestUnitId["RewardedInterstitialAd"] = "ca-app-pub-3940256099942544/5354046379";
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
      cclegacy._RF.push({}, "e95983XLbRBV56VoA+XtVpR", "TypeAlias", undefined);

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

System.register("chunks:///_virtual/Version2.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "be287/1NUNA9I/6LyztSgFf", "Version", undefined);

      const AdMobVersion = exports('AdMobVersion', "0.0.1");

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