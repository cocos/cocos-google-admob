import { _decorator, Component } from 'cc';
import { director } from 'cc';
import { TestScenes } from './TestScenes';
import { RewardedAdClient } from 'db://admob/ads/client/RewardedAdClient';
import { AdFormat, getTestAdUnitId } from 'db://admob/misc/TestUnitId';
import { log } from 'cc';
import { Node } from 'cc';
import { Label } from 'cc';
const { ccclass, property } = _decorator;

const module = "[AdmobTestRewarded]"
@ccclass('AdmobTestRewarded')
export class AdmobTestRewarded extends Component {

    protected start(): void {
        // Hide the reward earn dialog on start;
        let rewardEarnNode: Node = this.node.getChildByName("DialogRewarded");
        rewardEarnNode.active = false;
    }

    onClickLoadRewardedAd() {
        log(module, "onClickLoadRewardedAd");

        let rewardEarnNode: Node = this.node.getChildByName("DialogRewarded");
        let rewardedAdClient = new RewardedAdClient();

        rewardedAdClient.load(getTestAdUnitId(AdFormat.Rewarded), {
            onAdLoaded: () => {
                log(module, "onClickLoadRewardedAd", "onAdLoaded");
                rewardedAdClient.show();
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
                rewardedAdClient.destroy();
            },
            onAdFailedToShowFullScreenContent: (adError) => {
                log(module, "onAdFailedToShowFullScreenContent, adError: ", adError);
                rewardedAdClient.destroy();
            },
            onPaidEvent(paidNTF) {
                log(module, "onPaidEvent", paidNTF);
            },
        })

    }

    onNextScene() {
        director.loadScene(TestScenes[4]);
    }

    onBtnClickCloseRewardDialogue() {
        let rewardEarnNode: Node = this.node.getChildByName("DialogRewarded");
        rewardEarnNode.active = false;
    }
}