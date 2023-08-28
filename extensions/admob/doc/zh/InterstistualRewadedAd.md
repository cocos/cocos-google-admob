# 插页式激励广告

- [官方文档](https://developers.google.com/admob/android/rewarded-interstitial?hl=zh-cn)
- TS 端使用示例

```ts
let rewardEarnNode: Node = this.node.getChildByName("DialogRewarded");
let rewardedInterstitialAdClient = new RewardedInterstitialAdClient();
rewardedInterstitialAdClient.load(TestUnitId.RewardedInterstitialAd, {
    onAdLoaded: () => {
        log(module, "onClickLoadRewardedAd", "onAdLoaded");
        rewardedInterstitialAdClient.show();
    },
    onAdFailedToLoad: (loadAdError) => {
        log(module, "onClickLoadRewardedAd", "onAdFailedToLoad", loadAdError);
    },
    onEarn: (rewardType, amount) => {
        log(module, "onClickLoadRewardedAd", `onEarn, rewardType = ${rewardType}, amount = ${amount}`);
        rewardEarnNode.active = true;
        const label = rewardEarnNode.getChildByName("Tip").getComponent(Label);
        label.string = `You have won the reward, type = ${rewardType}, amount = ${amount}!`;
    },
    onAdDismissedFullScreenContent: () => {
        log(module, "onAdDismissedFullScreenContent");
        rewardedInterstitialAdClient.destroy();
    },
    onAdFailedToShowFullScreenContent: (adError) => {
        log(module, "onAdFailedToShowFullScreenContent, adError: ", adError);
        rewardedInterstitialAdClient.destroy();
    },
    onPaidEvent(paidNTF) {
        log(module, "onPaidEvent", paidNTF);
    },
});
```

`onEarn` 方法会将奖励类型和奖励的货币值通知到游戏端，此时可以给玩家发放奖励。


目前暂未支持 [[可选] 验证服务器端验证 (SSV) 回调](https://developers.google.com/admob/android/rewarded-interstitial?hl=zh-cn#validate-ssv)。