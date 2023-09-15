# 横幅广告

谷歌文档地址： [横幅广告](https://developers.google.com/admob/android/banner?hl=zh-cn)

横幅广告的用法如下：

在 TS  端启动横幅：

```ts
this.bannerClient = new BannerClient();
this.bannerClient.load(TestUnitId.BannerAd, {
    onAdImpression: () => {
        log(module, "onAdImpression", "onAdClicked", this);
    },

    onAdClicked: () => {
        log(module, "onClickLoadBanner", "onAdClicked")
    },

    onAdLoaded: () => {
        log(module, "onClickLoadBanner", "onAdLoaded")
    },

    onAdFailedToLoad: (loadError: LoadAdError) => {
        log(module, "onClickLoadBanner", "onAdLoaded", `${loadError}`);
    },

    onPaidEvent(paidNTF: BannerPaidEventNTF) {
        // paid event, you can do your own analysis here.
        log(module, "onPaidEvent", paidNTF);
    },

}, { size: BannerSize.BANNER, alignments: this.currentAlignment, type: BannerSizeType.Builtin });
```

目前设计的是可以通过多个 UnityId 来加载横幅广告，但是考虑到游戏一般只会有1个
所以如果要添加多个横幅广告，需要使用不同的 UnitId。

记得调用 destroy 方法以释放横幅广告

```ts
this.bannerClient?.destroy();
```