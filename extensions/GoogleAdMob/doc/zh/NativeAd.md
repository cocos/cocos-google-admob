# 原生广告

目前我们提供两种尺寸的原生广告。

- small：小尺寸。代码示例如下：

```ts
this.smallNativeAd = new NativeAdClient();        
        this.smallNativeAd.load(TestUnitId.NativeAd, NativeAdTemplateSize.Small, {
            onAdLoaded: () => {
                log(module, "onClickLoadSmallAd", "onAdLoaded");
            },
        });
```

- medium： 中等尺寸，代码示例如下：

```ts
this.mediumNativeAd = new NativeAdClient();
        this.mediumNativeAd.load(TestUnitId.NativeAd, NativeAdTemplateSize.Medium, {
            onAdLoaded: () => {
                log(module, "onClickLoadSmallAd", "onAdLoaded");
            },
        });
```

您也可以通过 `onPaidEvent` 来监听广告的收益，代码示例如下：

```ts

this.mediumNativeAd = new NativeAdClient();
this.mediumNativeAd.load(TestUnitId.NativeAd, NativeAdTemplateSize.Medium, {
    onAdLoaded: () => {
        log(module, "onClickLoadSmallAd", "onAdLoaded");
    },

    onPaidEvent(paidNTF:NativePaidEventNTF) {
        // paid event, you can do your own analysis here.
        log(module, "onPaidEvent", paidNTF);                
    },
});
```

释放广告资源，代码示例如下：

```ts
if (this.mediumNativeAd) {
        this.mediumNativeAd.destroy();
}
```

通常来说不太建议游戏应用接入原生广告（屏占比比较高，容易影响用户体验）。