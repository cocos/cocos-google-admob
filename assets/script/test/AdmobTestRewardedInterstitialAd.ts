import { _decorator, Component } from 'cc';
import { director } from 'cc';
import { TestScenes } from './TestScenes';
import { AdFormat, getTestAdUnitId } from 'db://admob/misc/TestUnitId';
import { log } from 'cc';
import { Node } from 'cc';
import { Label } from 'cc';
import { RewardedInterstitialAdClient } from 'db://admob/ads/client/RewardedInterstitialAdClient';
const { ccclass, property } = _decorator;

const module = "[AdmobTestRewardedInterstitialAd]"
@ccclass('AdmobTestRewardedInterstitialAd')
export class AdmobTestRewardedInterstitialAd extends Component {

    protected start(): void {
        // Hide the reward earn dialog on start;
        let rewardEarnNode: Node = this.node.getChildByName("DialogRewarded");
        rewardEarnNode.active = false;
    }

    onClickLoadRewardedAd() {
        log(module, "onClickLoadRewardedAd");

        let rewardEarnNode: Node = this.node.getChildByName("DialogRewarded");
        let rewardedInterstitialAdClient = new RewardedInterstitialAdClient();
        rewardedInterstitialAdClient.load(getTestAdUnitId(AdFormat.RewardedInterstitial), {
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
    }

    onNextScene() {
        director.loadScene(TestScenes[5]);
    }

    onBtnClickCloseRewardDialogue() {
        let rewardEarnNode: Node = this.node.getChildByName("DialogRewarded");
        rewardEarnNode.active = false;
    }
}