# 开屏广告

[谷歌文档地址](https://developers.google.com/admob/android/app-open?hl=zh-cn)

使用示例：

在 TS  端：

- 加载广告

```ts
this.appOpenAdView.loadAd(TestUnitId.AppOpenAd, {
    onAdLoaded: ()=> {
        log(module, "onClickLoadAppOpenAd", "onAdLoaded");
    },
    onAdFailedToLoad: (loadAdError) => {
        log(module, "onClickLoadAppOpenAd", "onAdFailedToLoad", loadAdError);
    },            
    onShowAdComplete(unitId) {
        log(module, "onClickLoadAppOpenAd", "onShowAdComplete");
    },
    onPaidEvent(paidNTF) {
        log(module, "onClickLoadAppOpenAd", "onPaidEvent");
    },
});

```

- 展示广告

```ts
this.appOpenAdView.isValid((valid: boolean) => {
        log(module, "onClickShowOpenAppAd", valid);
        if (valid) {
            this.appOpenAdView.show();
        }
    }, this);
```

考虑到通常打开App时需要提高加载速度，因此开屏广告的加载和展示是分开的。

每个开屏广告都有一定的有效期，因此需要通过判断他是否有效来决定是否展示。同时需要考虑超出4小时有效期的广告是没有收益的，更多请参考官方的 [考虑广告有效期](https://developers.google.com/admob/android/app-open?hl=zh-cn#expiration) 以及 [冷启动和加载屏幕](https://developers.google.com/admob/android/app-open?hl=zh-cn#coldstart) 部分

请参考 [最佳实践](https://developers.google.com/admob/android/app-open?hl=zh-cn#best_practices) 来确保让用户不反感。
