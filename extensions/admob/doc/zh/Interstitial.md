# 插页式广告

[谷歌官方文档](https://developers.google.com/admob/android/interstitial?hl=zh-cn)。

使用示例

- TS 端：

```ts
let interstitialAdClient = new InterstitialAdClient();

interstitialAdClient.load(TestUnitId.InterstitialAd, {
    onAdLoaded: () => {
        log(module, "onAdLoaded");
        interstitialAdClient.show();
    },
    onAdFailedToLoad: (loadAdError) => {
        log(module, "onAdFailedToLoad, error: ", loadAdError);
        interstitialAdClient.destroy();
    },

    onPaidEvent(paidNTF:InterstitialPaidEventNTF) {
        // paid event, you can do your own analysis here.
        log(module, "onPaidEvent", paidNTF);                
    },
});
```