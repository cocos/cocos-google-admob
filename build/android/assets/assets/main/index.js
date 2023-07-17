System.register("chunks:///_virtual/AdClient.ts", ['cc'], function (exports) {
  var cclegacy, EventTarget;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      EventTarget = module.EventTarget;
    }],
    execute: function () {
      cclegacy._RF.push({}, "913ddXSZoBEo5AGp798igBP", "AdClient", undefined);

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
      cclegacy._RF.push({}, "f6d88RBS9tPzIA7DyZtLjZT", "AdListener", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AdmobTestAppOpenAd.ts", ['cc', './TestScenes.ts', './AppOpenAdClient.ts', './TestUnitId.ts'], function (exports) {
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

      cclegacy._RF.push({}, "16e5cQy1xRATonmm6jvefs8", "AdmobTestAppOpenAd", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      const module$1 = "[AdmobTestAppOpenAd]";
      let AdmobTestAppOpenAd = exports('AdmobTestAppOpenAd', (_dec = ccclass('AdmobTestAppOpenAd'), _dec(_class = class AdmobTestAppOpenAd extends Component {
        constructor(...args) {
          super(...args);
          this.appOpenAdView = new AppOpenAdClient();
        }

        onClickLoadAppOpenAd() {
          log(module$1, "onClickLoadAppOpenAd");
          this.appOpenAdView.loadAd(TestUnitId.AppOpenAd, {
            onAdLoaded: () => {
              log(module$1, "onClickLoadAppOpenAd", "onAdLoaded");
            },
            onAdFailedToLoad: loadAdError => {
              log(module$1, "onClickLoadAppOpenAd", "onAdFailedToLoad", loadAdError);
            },

            onShowAdComplete(unitId) {
              log(module$1, "onClickLoadAppOpenAd", "onShowAdComplete");
            },

            onPaidEvent(paidNTF) {
              log(module$1, "onClickLoadAppOpenAd", "onPaidEvent");
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

System.register("chunks:///_virtual/AdmobTestBanner.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TestScenes.ts', './BannerClient.ts', './TestUnitId.ts', './BannerSize.ts', './BannerAlignment.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Button, _decorator, Component, log, director, TestScenes, BannerClient, TestUnitId, BannerSize, TopCenter;

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
    }, function (module) {
      BannerSize = module.BannerSize;
    }, function (module) {
      TopCenter = module.TopCenter;
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
          this.bannerClient.load(TestUnitId.BannerAd, {
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
            },

            onPaidEvent(paidNTF) {
              // paid event, you can do your own analysis here.
              log(module$1, "onPaidEvent", paidNTF);
            }

          }, {
            size: BannerSize.BANNER,
            alignments: TopCenter
          });
        }

        onClickDestroyBanner() {
          var _this$bannerClient3;

          log(module$1, "onClickDestroyBanner");
          (_this$bannerClient3 = this.bannerClient) == null ? void 0 : _this$bannerClient3.destroy();
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
            onAdLoaded: () => {
              log(module$1, "onAdLoaded");
              interstitialAdClient.show();
            },
            onAdFailedToLoad: loadAdError => {
              log(module$1, "onAdFailedToLoad, error: ", loadAdError);
              interstitialAdClient.destroy();
            },

            onPaidEvent(paidNTF) {
              // paid event, you can do your own analysis here.
              log(module$1, "onPaidEvent", paidNTF);
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
            onAdLoaded: () => {
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
            onAdLoaded: () => {
              log(module$1, "onClickLoadSmallAd", "onAdLoaded");
            },

            onPaidEvent(paidNTF) {
              // paid event, you can do your own analysis here.
              log(module$1, "onPaidEvent", paidNTF);
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
            onAdLoaded: () => {
              log(module$1, "onClickLoadRewardedAd", "onAdLoaded");
              rewardedAdClient.show();
            },
            onAdFailedToLoad: loadAdError => {
              log(module$1, "onClickLoadRewardedAd", "onAdFailedToLoad", loadAdError);
            },
            onEarn: (rewardType, amount) => {
              log(module$1, "onClickLoadRewardedAd", `onEarn, rewardType = ${rewardType}, amount = ${amount}`);
              rewardEarnNode.active = true;
              const label = rewardEarnNode.getChildByName("Tip").getComponent(Label);
              label.string = `You have won the reward, type = ${rewardType}, amount = ${amount}!`;
            },
            onAdDismissedFullScreenContent: () => {
              log(module$1, "onAdDismissedFullScreenContent");
              rewardedAdClient.destroy();
            },
            onAdFailedToShowFullScreenContent: adError => {
              log(module$1, "onAdFailedToShowFullScreenContent, adError: ", adError);
              rewardedAdClient.destroy();
            },

            onPaidEvent(paidNTF) {
              log(module$1, "onPaidEvent", paidNTF);
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
            onAdLoaded: () => {
              log(module$1, "onClickLoadRewardedAd", "onAdLoaded");
              rewardedInterstitialAdClient.show();
            },
            onAdFailedToLoad: loadAdError => {
              log(module$1, "onClickLoadRewardedAd", "onAdFailedToLoad", loadAdError);
            },
            onEarn: (rewardType, amount) => {
              log(module$1, "onClickLoadRewardedAd", `onEarn, rewardType = ${rewardType}, amount = ${amount}`);
              rewardEarnNode.active = true;
              const label = rewardEarnNode.getChildByName("Tip").getComponent(Label);
              label.string = `You have won the reward, type = ${rewardType}, amount = ${amount}!`;
            },
            onAdDismissedFullScreenContent: () => {
              log(module$1, "onAdDismissedFullScreenContent");
              rewardedInterstitialAdClient.destroy();
            },
            onAdFailedToShowFullScreenContent: adError => {
              log(module$1, "onAdFailedToShowFullScreenContent, adError: ", adError);
              rewardedInterstitialAdClient.destroy();
            },

            onPaidEvent(paidNTF) {
              log(module$1, "onPaidEvent", paidNTF);
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
      cclegacy._RF.push({}, "1b2e4BJmARLoYFp0UFuCx/t", "AppOpenAd", undefined);

      class LoadAppOpenAdREQ extends Base {}

      exports('LoadAppOpenAdREQ', LoadAppOpenAdREQ);

      class LoadAppOpenAdACK extends Base {}

      exports('LoadAppOpenAdACK', LoadAppOpenAdACK);

      class ShowAppOpenAdREQ extends Base {}

      exports('ShowAppOpenAdREQ', ShowAppOpenAdREQ);

      class ShowAppOpenAdACK extends Base {}

      exports('ShowAppOpenAdACK', ShowAppOpenAdACK);

      class ShowAppOpenAdCompleteNTF extends Base {}

      exports('ShowAppOpenAdCompleteNTF', ShowAppOpenAdCompleteNTF);

      class AppOpenAdFullScreenContentCallbackNTF extends Base {
        constructor(...args) {
          super(...args);
          this.method = void 0;
          this.adError = void 0;
        }

      }

      exports('AppOpenAdFullScreenContentCallbackNTF', AppOpenAdFullScreenContentCallbackNTF);

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

System.register("chunks:///_virtual/AppOpenAdClient.ts", ['cc', './Bridge.ts', './Route.ts', './AppOpenAd.ts', './AdClient.ts', './PaidEventNTF.ts'], function (exports) {
  var cclegacy, log, bridge, route, AppOpenAdLoadCallbackNTF, AppOpenAdFullScreenContentCallbackNTF, ShowAppOpenAdCompleteNTF, LoadAppOpenAdREQ, LoadAppOpenAdACK, IsAdAvailableREQ, IsAdAvailableACK, ShowAppOpenAdREQ, ShowAppOpenAdACK, AdClient, AppOpenPaidEventNTF;
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
      AppOpenAdFullScreenContentCallbackNTF = module.AppOpenAdFullScreenContentCallbackNTF;
      ShowAppOpenAdCompleteNTF = module.ShowAppOpenAdCompleteNTF;
      LoadAppOpenAdREQ = module.LoadAppOpenAdREQ;
      LoadAppOpenAdACK = module.LoadAppOpenAdACK;
      IsAdAvailableREQ = module.IsAdAvailableREQ;
      IsAdAvailableACK = module.IsAdAvailableACK;
      ShowAppOpenAdREQ = module.ShowAppOpenAdREQ;
      ShowAppOpenAdACK = module.ShowAppOpenAdACK;
    }, function (module) {
      AdClient = module.AdClient;
    }, function (module) {
      AppOpenPaidEventNTF = module.AppOpenPaidEventNTF;
    }],
    execute: function () {
      cclegacy._RF.push({}, "de391JGZ7RFmILooPgf1Zbb", "AppOpenAdClient", undefined);

      const module$1 = "[AppOpenAdClient]";

      class AppOpenAdClient extends AdClient {
        constructor(...args) {
          super(...args);
          this._appOpenAdListener = void 0;
        }

        set appOpenAdListener(value) {
          if (this._appOpenAdListener) {
            route.off(AppOpenAdLoadCallbackNTF.name, this.onAppOpenAdLoadCallbackNTF, this);
            route.off(AppOpenPaidEventNTF.name, this.onPaidEvent, this);
            route.off(AppOpenAdFullScreenContentCallbackNTF.name, this.onFullScreenContentCallbackNTF, this);
            route.off(ShowAppOpenAdCompleteNTF.name, this.onShowCompleteNTF, this);
          }

          this._appOpenAdListener = value;

          if (value) {
            route.on(AppOpenAdLoadCallbackNTF.name, this.onAppOpenAdLoadCallbackNTF, this);
            route.on(AppOpenPaidEventNTF.name, this.onPaidEvent, this);
            route.on(AppOpenAdFullScreenContentCallbackNTF.name, this.onFullScreenContentCallbackNTF, this);
            route.on(ShowAppOpenAdCompleteNTF.name, this.onShowCompleteNTF, this);
          }
        }

        get appOpenAdListener() {
          return this._appOpenAdListener;
        }

        loadAd(unitId, appOpenAdListener) {
          this.appOpenAdListener = appOpenAdListener;
          this.unitId = unitId;
          bridge.sendToNative(LoadAppOpenAdREQ.name, {
            unitId: unitId
          }, LoadAppOpenAdACK.name, ack => {}, this);
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
          bridge.sendToNative(ShowAppOpenAdREQ.name, {
            unitId: this.unitId
          }, ShowAppOpenAdACK.name, ack => {
            log(module$1, "showAdIfAvailable", ack);

            if (onComplete) {
              onComplete();
            }
          });
        }

        destroy() {
          this.appOpenAdListener = null;
        }

        onAppOpenAdLoadCallbackNTF(ntf) {
          if (this.appOpenAdListener) {
            let method = this.appOpenAdListener[ntf.method];

            if (method) {
              method(ntf.loadAdError);
            }
          }
        }

        onFullScreenContentCallbackNTF(ntf) {
          if (ntf && ntf.method && this.appOpenAdListener) {
            let method = this.appOpenAdListener[ntf.method];

            if (method) {
              method(ntf.adError);
            }
          }
        }

        onShowCompleteNTF(ntf) {
          const c = this.appOpenAdListener;

          if (c && c.onShowAdComplete) {
            c.onShowAdComplete(ntf.unitId);
          }
        }

        onPaidEvent(ntf) {
          const listener = this.appOpenAdListener;

          if (listener) {
            listener == null ? void 0 : listener.onPaidEvent(ntf);
          }
        }

      }

      exports('AppOpenAdClient', AppOpenAdClient);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AppOpenAdFullScreenContentCallback.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a57d6Vr4nlN9pl61y73AbVj", "AppOpenAdFullScreenContentCallback", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AppOpenAdListener.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "515ea1S85lFFpJR2p7bWBrP", "AppOpenAdListener", undefined);

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
      cclegacy._RF.push({}, "22adflecGJOkqbjch9VPNzC", "AppOpenAdLoadCallback", undefined);

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
      cclegacy._RF.push({}, "a3850FFnhpK8LXjWJ/XukPq", "BannerAd", undefined);

      class LoadBannerREQ extends Base {
        constructor(...args) {
          super(...args);
          this.bannerSize = void 0;
          this.method = void 0;
          this.width = void 0;
          this.maxWidth = void 0;
          this.alignments = void 0;
        }

      }

      exports('LoadBannerREQ', LoadBannerREQ);

      class LoadBannerACK extends Base {}

      exports('LoadBannerACK', LoadBannerACK);

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

System.register("chunks:///_virtual/BannerAdListener.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "94014wU+XZGi4mP2AihKg4J", "BannerAdListener", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BannerAlignment.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "22c7dg+reFL/bvh46PA4/ED", "BannerAlignment", undefined);
      /**
       * @en
       * Defines the RelativeLayout of Android in Typescript. 
       * See RelativeLayout.java for more details. 
       */


      let BannerAlignment = exports('BannerAlignment', /*#__PURE__*/function (BannerAlignment) {
        BannerAlignment["ALIGN_LEFT"] = "ALIGN_LEFT";
        BannerAlignment["ALIGN_TOP"] = "ALIGN_TOP";
        BannerAlignment["ALIGN_RIGHT"] = "ALIGN_RIGHT";
        BannerAlignment["ALIGN_BOTTOM"] = "ALIGN_BOTTOM";
        BannerAlignment["ALIGN_PARENT_LEFT"] = "ALIGN_PARENT_LEFT";
        BannerAlignment["ALIGN_PARENT_TOP"] = "ALIGN_PARENT_TOP";
        BannerAlignment["ALIGN_PARENT_BOTTOM"] = "ALIGN_PARENT_BOTTOM";
        BannerAlignment["CENTER_IN_PARENT"] = "CENTER_IN_PARENT";
        BannerAlignment["CENTER_HORIZONTAL"] = "CENTER_HORIZONTAL";
        BannerAlignment["CENTER_VERTICAL"] = "CENTER_VERTICAL";
        return BannerAlignment;
      }({}));
      /**
       * @en
       * Put the banner at bottom-center of the screen
       */

      const BottomCenter = exports('BottomCenter', [BannerAlignment.ALIGN_BOTTOM, BannerAlignment.CENTER_HORIZONTAL]);
      /**
       * @en
       * Put the banner at the top-center of the screen.
       */

      const TopCenter = exports('TopCenter', [BannerAlignment.ALIGN_TOP, BannerAlignment.CENTER_HORIZONTAL]);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BannerClient.ts", ['cc', './AdClient.ts', './BannerAd.ts', './Bridge.ts', './Route.ts', './BannerSize.ts', './BannerAlignment.ts', './PaidEventNTF.ts'], function (exports) {
  var cclegacy, log, AdClient, BannerAdListenerNTF, ShowBannerREQ, LoadBannerREQ, LoadBannerACK, DestroyBannerREQ, DestroyBannerACK, bridge, route, BannerSize, BottomCenter, BannerPaidEventNTF;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      log = module.log;
    }, function (module) {
      AdClient = module.AdClient;
    }, function (module) {
      BannerAdListenerNTF = module.BannerAdListenerNTF;
      ShowBannerREQ = module.ShowBannerREQ;
      LoadBannerREQ = module.LoadBannerREQ;
      LoadBannerACK = module.LoadBannerACK;
      DestroyBannerREQ = module.DestroyBannerREQ;
      DestroyBannerACK = module.DestroyBannerACK;
    }, function (module) {
      bridge = module.bridge;
    }, function (module) {
      route = module.route;
    }, function (module) {
      BannerSize = module.BannerSize;
    }, function (module) {
      BottomCenter = module.BottomCenter;
    }, function (module) {
      BannerPaidEventNTF = module.BannerPaidEventNTF;
    }],
    execute: function () {
      cclegacy._RF.push({}, "67876+xkzJIO6gfVziSiyV8", "BannerClient", undefined);

      const module$1 = "[BannerClient]";

      class BannerClient extends AdClient {
        constructor(...args) {
          super(...args);
          this._adListener = null;
        }

        get adListener() {
          return this._adListener;
        }

        set adListener(v) {
          if (this._adListener) {
            route.off(BannerAdListenerNTF.name, this.onAdListenerEvent, this);
            route.off(BannerPaidEventNTF.name, this.onPaidEvent, this);
          }

          this._adListener = v;

          if (this._adListener) {
            route.on(BannerAdListenerNTF.name, this.onAdListenerEvent, this);
            route.on(BannerPaidEventNTF.name, this.onPaidEvent, this);
          }
        }

        show(visible) {
          let req = new ShowBannerREQ(this.unitId);
          req.visible = visible;
          bridge.sendToNative(ShowBannerREQ.name, {
            unitId: this.unitId
          });
        }

        load(unitId, adListener, opt) {
          this.adListener = adListener;
          this.unitId = unitId;
          bridge.sendToNative(LoadBannerREQ.name, {
            unitId: unitId,
            bannerSize: opt != null && opt.size ? opt == null ? void 0 : opt.size : BannerSize.BANNER,
            alignments: opt != null && opt.alignments ? opt == null ? void 0 : opt.alignments : BottomCenter
          }, LoadBannerACK.name, response => {}, this);
        }

        destroy() {
          log(module$1, "destroy", this.unitId);
          let req = new DestroyBannerREQ(this.unitId);
          this.adListener = null;
          bridge.sendToNative(DestroyBannerREQ.name, req, DestroyBannerACK.name, response => {});
        }

        onAdListenerEvent(ntf) {
          if (this.adListener) {
            const method = this.adListener[ntf.method];

            if (method && typeof method == "function") {
              method(ntf.loadAdError);
            }
          }
        }

        onPaidEvent(ntf) {
          const listener = this.adListener;

          if (listener) {
            listener == null ? void 0 : listener.onPaidEvent(ntf);
          }
        }

      }

      exports('BannerClient', BannerClient);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BannerSize.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e3b6eOKvZVEtZgTOUkZOxTU", "BannerSize", undefined);
      /**
       * @en
       * Builtin BannerSize 
       * See https://developers.google.com/admob/android/banner?hl=zh-cn#banner_sizes for more details.
       * @zh
       * 内置的 Banner 的大小
       * 查看 https://developers.google.com/admob/android/banner?hl=zh-cn#banner_sizes 获取更多细节。、
       */


      let BannerSize = exports('BannerSize', /*#__PURE__*/function (BannerSize) {
        BannerSize["BANNER"] = "BANNER";
        BannerSize["LARGE_BANNER"] = "LARGE_BANNER";
        BannerSize["MEDIUM_RECTANGLE"] = "MEDIUM_RECTANGLE";
        BannerSize["FULL_BANNER"] = "FULL_BANNER";
        BannerSize["LEADERBOARD"] = "LEADERBOARD";
        BannerSize["SMART_BANNER"] = "SMART_BANNER";
        return BannerSize;
      }({}));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BannerSizeOption.ts", ['cc', './BannerAlignment.ts', './BannerSize.ts'], function (exports) {
  var cclegacy, BottomCenter, BannerSize;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BottomCenter = module.BottomCenter;
    }, function (module) {
      BannerSize = module.BannerSize;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5616bT5rtJEcY/73XVD9E9f", "BannerSizeOption", undefined);
      /**
       * @en
       * 
       */


      class BannerSizeOption {
        constructor() {
          this.size = BannerSize.BANNER;
          this.alignments = BottomCenter;
        }

      }

      exports('BannerSizeOption', BannerSizeOption);

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
      cclegacy._RF.push({}, "83981cFerZAEJC1MboCagJY", "Base", undefined);

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
      cclegacy._RF.push({}, "9fa2b+aj71GBKZ5Ae4Zxwy/", "Bridge", undefined);

      const module$1 = "[Bridge]";

      class Bridge {
        constructor() {
          this.onNative = (arg0, arg1) => {
            log(module$1, `onNative method: ${arg0} | content: ${arg1}`); //te.instance.dispatch(arg0, Route.instance.codec.decode(arg1));            

            const ack = route.codec.decode(arg1);
            route.dispatch(arg0, ack);
          };
        }

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
            native.bridge.onNative = this.onNative;
          }
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
      cclegacy._RF.push({}, "5fc3csE8LBMtJ0kAlIAJVfi", "Codec", undefined);

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
      cclegacy._RF.push({}, "37fb7dk2tpKnKLMY9BVIgk4", "FullScreenContentCallback", undefined);

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
      cclegacy._RF.push({}, "6c8dadexLJGwqjGQ2usL63Y", "ICallbackNTF", undefined);

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
      cclegacy._RF.push({}, "03548ZFhZZARbvS8YmyP/AH", "INativeResponse", undefined);

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
      cclegacy._RF.push({}, "351a6cGhWdHlaZa5uq/AsZ8", "InterstitailAd", undefined);

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

System.register("chunks:///_virtual/InterstitialAdClient.ts", ['cc', './Bridge.ts', './Route.ts', './InterstitailAd.ts', './AdClient.ts', './PaidEventNTF.ts'], function (exports) {
  var cclegacy, log, bridge, route, InterstitialFullScreenContentCallbackNTF, InterstitialAdLoadCalLBackNTF, LoadInterstitialAdREQ, LoadInterstitialAdACK, ShowInterstitialAdREQ, ShowInterstitialAdACK, AdClient, InterstitialPaidEventNTF;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      log = module.log;
    }, function (module) {
      bridge = module.bridge;
    }, function (module) {
      route = module.route;
    }, function (module) {
      InterstitialFullScreenContentCallbackNTF = module.InterstitialFullScreenContentCallbackNTF;
      InterstitialAdLoadCalLBackNTF = module.InterstitialAdLoadCalLBackNTF;
      LoadInterstitialAdREQ = module.LoadInterstitialAdREQ;
      LoadInterstitialAdACK = module.LoadInterstitialAdACK;
      ShowInterstitialAdREQ = module.ShowInterstitialAdREQ;
      ShowInterstitialAdACK = module.ShowInterstitialAdACK;
    }, function (module) {
      AdClient = module.AdClient;
    }, function (module) {
      InterstitialPaidEventNTF = module.InterstitialPaidEventNTF;
    }],
    execute: function () {
      cclegacy._RF.push({}, "0133a1I+utKjZdl7GATzhls", "InterstitialAdClient", undefined);

      const module$1 = "[InterstitialAdClient]";

      class InterstitialAdClient extends AdClient {
        constructor(...args) {
          super(...args);
          this._interstitialListener = void 0;
        }

        get interstitialListener() {
          return this._interstitialListener;
        }

        set interstitialListener(value) {
          if (!value) {
            route.off(InterstitialFullScreenContentCallbackNTF.name, this.onInterstitialFullScreenContentCallback, this);
            route.off(InterstitialAdLoadCalLBackNTF.name, this.onInterstitialAdLoadCalLBackNTF, this);
            route.off(InterstitialPaidEventNTF.name, this.onPaidEvent, this);
          }

          this._interstitialListener = value;

          if (value) {
            route.on(InterstitialFullScreenContentCallbackNTF.name, this.onInterstitialFullScreenContentCallback, this);
            route.on(InterstitialAdLoadCalLBackNTF.name, this.onInterstitialAdLoadCalLBackNTF, this);
            route.on(InterstitialPaidEventNTF.name, this.onPaidEvent, this);
          }
        }

        load(unitId, interstitialListener) {
          this.destroy();
          log(module$1, `load, unitId = ${unitId}`);
          this.unitId = unitId;
          this.interstitialListener = interstitialListener;
          bridge.sendToNative(LoadInterstitialAdREQ.name, {
            unitId: unitId
          }, LoadInterstitialAdACK.name, ack => {
            log(module$1, `load, LoadInterstitialAdACK, ${ack}`);
          });
        }

        destroy() {
          log(module$1, `destroy`);
          this.interstitialListener = null;
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

          if (this.interstitialListener) {
            let method = this.interstitialListener[ntf.method];

            if (method) {
              method(ntf.loadAdError);
            }
          }
        }

        onInterstitialFullScreenContentCallback(ntf) {
          log(module$1, `onInterstitialFullScreenContentCallback, ${ntf}`);
          const method = this.interstitialListener[ntf.method];

          if (method) {
            method();
          }
        }

        onPaidEvent(ntf) {
          const listener = this.interstitialListener;

          if (listener) {
            listener == null ? void 0 : listener.onPaidEvent(ntf);
          }
        }

      }

      exports('InterstitialAdClient', InterstitialAdClient);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/InterstitialAdListener.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4f5447hMxxIepLeOECu2PRF", "InterstitialAdListener", undefined);

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
      cclegacy._RF.push({}, "95c6biRenVPv70yEzTspX+h", "InterstitialAdLoadCallback", undefined);

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
      cclegacy._RF.push({}, "26862PsMLhAsYZJMHVxZiYj", "InterstitialFullScreenContentCallback", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './AdmobTestAppOpenAd.ts', './AdmobTestBanner.ts', './AdmobTestInterstitialAd.ts', './AdmobTestNative.ts', './AdmobTestRewarded.ts', './AdmobTestRewardedInterstitialAd.ts', './TestScenes.ts', './TypeAlias.ts', './AdClient.ts', './AppOpenAdClient.ts', './BannerClient.ts', './InterstitialAdClient.ts', './NativeAdClient.ts', './RewardedAdClient.ts', './RewardedInterstitialAdClient.ts', './AdListener.ts', './AppOpenAdFullScreenContentCallback.ts', './AppOpenAdListener.ts', './AppOpenAdLoadCallback.ts', './BannerAdListener.ts', './FullScreenContentCallback.ts', './InterstitialAdListener.ts', './InterstitialAdLoadCallback.ts', './InterstitialFullScreenContentCallback.ts', './NativeAdListener.ts', './OnNativeAdLoadedListener.ts', './OnPaidEventListener.ts', './OnShowAdCompleteListener.ts', './OnUserEarnedRewardListener.ts', './RewardedAdFullScreenContentCallback.ts', './RewardedAdListener.ts', './RewardedAdLoadCallback.ts', './RewardedInterstitialAdLoadCallback.ts', './RewardedInterstitialFullScreenContentCallback.ts', './RewardedInterstitialListener.ts', './Bridge.ts', './Codec.ts', './INativeResponse.ts', './Route.ts', './Version2.ts', './BannerAlignment.ts', './BannerSize.ts', './BannerSizeOption.ts', './TestUnitId.ts', './AppOpenAd.ts', './BannerAd.ts', './Base.ts', './ICallbackNTF.ts', './InterstitailAd.ts', './NativeAd.ts', './PaidEventNTF.ts', './RewardedAd.ts', './RewardedInterstitialAd.ts', './Version.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
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
      cclegacy._RF.push({}, "7b7c2Gl5W9GoreLVP8oHwTY", "NativeAd", undefined);

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

System.register("chunks:///_virtual/NativeAdClient.ts", ['cc', './Bridge.ts', './BannerAd.ts', './NativeAd.ts', './AdClient.ts', './Route.ts', './PaidEventNTF.ts'], function (exports) {
  var cclegacy, log, bridge, DestroyBannerACK, NativeLoadedNTF, NativeAdListenerNTF, LoadNativeAdREQ, LoadNativeAdACK, DestroyNativeAdREQ, AdClient, route, NativePaidEventNTF;
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
    }, function (module) {
      NativePaidEventNTF = module.NativePaidEventNTF;
    }],
    execute: function () {
      cclegacy._RF.push({}, "2051einid9F8YRS5orUMZnQ", "NativeAdClient", undefined);

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
            route.off(NativePaidEventNTF.name, this.onPaidEvent, this);
          }

          this._nativeAdListener = value;

          if (this._nativeAdListener) {
            route.on(NativeLoadedNTF.name, this.onNativeLoadedNTF, this);
            route.on(NativeAdListenerNTF.name, this.onNativeAdListenerNTF, this);
            route.on(NativePaidEventNTF.name, this.onPaidEvent, this);
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

        onPaidEvent(ntf) {
          const paid = this.nativeAdListener;

          if (paid) {
            paid == null ? void 0 : paid.onPaidEvent(ntf);
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
      cclegacy._RF.push({}, "98273YC00NE6pnlSV02h9oy", "NativeAdListener", undefined);

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
      cclegacy._RF.push({}, "2a2e6fRYgBIe6tHmj67gL2S", "OnNativeAdLoadedListener", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/OnPaidEventListener.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "0f711NbGkZBQ48WmxkneNNW", "OnPaidEventListener", undefined);

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
      cclegacy._RF.push({}, "62f0fffhWRH1rGcDJtj6FDT", "OnShowAdCompleteListener", undefined);

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
      cclegacy._RF.push({}, "6d0a2WiUoRBA455UFNYwzFU", "OnUserEarnedRewardListener", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PaidEventNTF.ts", ['cc', './Base.ts'], function (exports) {
  var cclegacy, Base;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Base = module.Base;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e2d81qcvaVBva080tOWZBU/", "PaidEventNTF", undefined);

      class PaidEventNTF extends Base {
        constructor(...args) {
          super(...args);
          this.valueMicros = void 0;
          this.currencyCode = void 0;
          this.precision = void 0;
          this.adSourceName = void 0;
          this.adSourceId = void 0;
          this.adSourceInstanceName = void 0;
          this.adSourceInstanceId = void 0;
          this.mediationGroupName = void 0;
          this.mediationABTestName = void 0;
          this.mediationABTestVariant = void 0;
        }

      }

      exports('PaidEventNTF', PaidEventNTF);

      class BannerPaidEventNTF extends PaidEventNTF {}

      exports('BannerPaidEventNTF', BannerPaidEventNTF);

      class InterstitialPaidEventNTF extends PaidEventNTF {}

      exports('InterstitialPaidEventNTF', InterstitialPaidEventNTF);

      class NativePaidEventNTF extends PaidEventNTF {}

      exports('NativePaidEventNTF', NativePaidEventNTF);

      class AppOpenPaidEventNTF extends PaidEventNTF {}

      exports('AppOpenPaidEventNTF', AppOpenPaidEventNTF);

      class RewardedPaidEventNTF extends PaidEventNTF {}

      exports('RewardedPaidEventNTF', RewardedPaidEventNTF);

      class RewardedInterstitialPaidEventNTF extends PaidEventNTF {}

      exports('RewardedInterstitialPaidEventNTF', RewardedInterstitialPaidEventNTF);

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
      cclegacy._RF.push({}, "a19d623UwdAurbcHSnuSt4c", "RewardedAd", undefined);

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

System.register("chunks:///_virtual/RewardedAdClient.ts", ['cc', './Bridge.ts', './RewardedAd.ts', './AdClient.ts', './Route.ts', './PaidEventNTF.ts'], function (exports) {
  var cclegacy, log, bridge, RewardedAdLoadCallbackNTF, RewardedFullScreenContentCallbackNTF, OnUserEarnedRewardListenerNTF, LoadRewardedAdREQ, LoadRewardedAdACK, ShowRewardedAdREQ, ShowRewardedAdACK, AdClient, route, RewardedPaidEventNTF;
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
    }, function (module) {
      RewardedPaidEventNTF = module.RewardedPaidEventNTF;
    }],
    execute: function () {
      cclegacy._RF.push({}, "9c823kMEqhG354V3pAi+6bv", "RewardedAdClient", undefined);

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
            route.off(RewardedPaidEventNTF.name, this.onPaidEvent, this);
          }

          this._rewardedListener = value;

          if (this._rewardedListener) {
            route.on(RewardedAdLoadCallbackNTF.name, this.onRewardedAdLoadCallbackNTF, this);
            route.on(RewardedFullScreenContentCallbackNTF.name, this.onFullScreenContentCallback, this);
            route.on(OnUserEarnedRewardListenerNTF.name, this.onOnUserEarnedRewardListenerNTF, this);
            route.on(RewardedPaidEventNTF.name, this.onPaidEvent, this);
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

        onPaidEvent(ntf) {
          const paid = this.rewardedListener;

          if (paid) {
            paid == null ? void 0 : paid.onPaidEvent(ntf);
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
      cclegacy._RF.push({}, "ccbcclTM5BLeaQxYmDylXnq", "RewardedAdFullScreenContentCallback", undefined);

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
      cclegacy._RF.push({}, "b10b1DUlehJBrliYcPlp/9I", "RewardedAdListener", undefined);

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
      cclegacy._RF.push({}, "59c6ayhqOxKuIKCFYiHSxfo", "RewardedAdLoadCallback", undefined);

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
      cclegacy._RF.push({}, "f35b0ZWnitHd4mL4VnNo7Th", "RewardedInterstitialAd", undefined);

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

System.register("chunks:///_virtual/RewardedInterstitialAdClient.ts", ['cc', './AdClient.ts', './RewardedInterstitialAd.ts', './Bridge.ts', './Route.ts', './PaidEventNTF.ts'], function (exports) {
  var cclegacy, log, AdClient, RewardedInterstitialAdLoadCallbackNTF, OnUserEarnedRewardedInterstitialListenerNTF, LoadRewardedInterstitialAdREQ, LoadRewardedInterstitialAdACK, ShowRewardedInterstitialAdREQ, ShowRewardedInterstitialAdACK, bridge, route, RewardedInterstitialPaidEventNTF;
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
    }, function (module) {
      RewardedInterstitialPaidEventNTF = module.RewardedInterstitialPaidEventNTF;
    }],
    execute: function () {
      cclegacy._RF.push({}, "bcd464DuS9EHZFqL+Wv7Zc9", "RewardedInterstitialAdClient", undefined);

      const module$1 = "[RewardedInterstitialAdClient]";

      class RewardedInterstitialAdClient extends AdClient {
        constructor(...args) {
          super(...args);
          this._rewardedInterstitialListener = void 0;
        }

        set rewardedInterstitialListener(value) {
          if (this._rewardedInterstitialListener) {
            route.off(RewardedInterstitialAdLoadCallbackNTF.name, this.onRewardedInterstitialAdLoadCallbackNTF, this);
            route.off(OnUserEarnedRewardedInterstitialListenerNTF.name, this.onOnUserEarnedRewardListenerNTF, this);
            route.off(RewardedInterstitialPaidEventNTF.name, this.onPaidEvent, this);
          }

          this._rewardedInterstitialListener = value;

          if (this._rewardedInterstitialListener) {
            route.on(RewardedInterstitialAdLoadCallbackNTF.name, this.onRewardedInterstitialAdLoadCallbackNTF, this);
            route.on(OnUserEarnedRewardedInterstitialListenerNTF.name, this.onOnUserEarnedRewardListenerNTF, this);
            route.on(RewardedInterstitialPaidEventNTF.name, this.onPaidEvent, this);
          }
        }

        get rewardedInterstitialListener() {
          return this._rewardedInterstitialListener;
        }

        load(unitId, listener) {
          this.destroy();
          this.unitId = unitId;
          this.rewardedInterstitialListener = listener;
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

        onRewardedInterstitialAdLoadCallbackNTF(ntf) {
          log(module$1, "onRewardedInterstitialAdLoadCallbackNTF", ntf.method);
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

        onPaidEvent(ntf) {
          const paid = this.rewardedInterstitialListener;

          if (paid) {
            paid == null ? void 0 : paid.onPaidEvent(ntf);
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
      cclegacy._RF.push({}, "31b4agsy/RARJF/0v6HTKzC", "RewardedInterstitialAdLoadCallback", undefined);

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
      cclegacy._RF.push({}, "684a9OsAopPXKs/PNqQRKhv", "RewardedInterstitialFullScreenContentCallback", undefined);

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
      cclegacy._RF.push({}, "2ce66tAXYJKTYcwXNbPTkD2", "RewardedInterstitialListener", undefined);

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
      cclegacy._RF.push({}, "d7d2caHkbhJx7OojQtGJlDF", "Route", undefined);

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

      const TestScenes = exports('TestScenes', ["1.banner", "2.interstitial", "3.appOpenAd", "4.rewardedAd", "5.interstitialRewardedAd", "6.nativeAd"]);

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
      cclegacy._RF.push({}, "82ff3DgPcxO9pSnl1qmYr+u", "TestUnitId", undefined);

      let TestUnitId = exports('TestUnitId', /*#__PURE__*/function (TestUnitId) {
        TestUnitId["BannerAd"] = "ca-app-pub-3940256099942544/6300978111";
        TestUnitId["InterstitialAd"] = "ca-app-pub-3940256099942544/3419835294";
        TestUnitId["AppOpenAd"] = "ca-app-pub-3940256099942544/3419835294";
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
      cclegacy._RF.push({}, "5738fx85WpMp6bb3Q7WK7YX", "TypeAlias", undefined);

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
      cclegacy._RF.push({}, "54026AUb3NNTbcYO88Ecs9i", "Version", undefined);

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
      cclegacy._RF.push({}, "aca25+juFNMM5K8dGC0LPU/", "Version", undefined);

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