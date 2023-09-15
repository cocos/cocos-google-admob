# Cocos Creator Google admob extension

本插件为使 Cocos Creator 工程可以快捷方便的接入谷歌 Mobile Advertisement SDK 而设计。

If you want to read the English version, please refer to [EN](../en/README.md)。

## Android 接入指南

Android 接入指南请移步 [Android 接入指南](./android/index.md)。

## iOS 接入指南

iOS 接入指南移步 [iOS 接入指南](./ios/index.md)。

## 支持的广告类型

- [横幅](./ads/Banner.md)
- [插页式](./ads/Interstitial.md)
- [开屏](./ads/AppOpenAd.md)
- [激励广告](./ads/Rewarded.md)
- [插页式激励广告](./ads/InterstistualRewadedAd.md)
- [原生](./ads/NativeAd.md)

## 更新日志

- v1.0.0(2023-08-28 发布)
  - 接入安卓平台
- v1.0.1(2023-09-15 发布)
  - 新增
    - 接入 iOS 平台
  - 修复
    - 修复 onAdFailedToShowFullScreenContent 事件发送错误
    - rewardedInterstitial Ad 增加了全屏的安卓接口
    - NativeAdListenerNTF 丢失的问题。
  