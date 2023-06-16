import { _decorator, Component } from 'cc';
import { director } from 'cc';
import { TestScenes } from './TestScenes';
import { RewardedAdView } from '../admob/ads/RewardedAdView';
import { TestUnitId } from '../admob/misc/TestUnitId';
import { log } from 'cc';
import { Node } from 'cc';
import { Label } from 'cc';
import { animation } from 'cc';
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
        let rewardedView = new RewardedAdView();
        rewardedView.load(TestUnitId.RewardedAd, {
            onAdLoaded() {
                log(module, "onClickLoadRewardedAd", "onAdLoaded");
                rewardedView.show();
            },
            onAdFailedToLoad(loadAdError) {
                log(module, "onClickLoadRewardedAd", "onAdFailedToLoad", loadAdError);
            },
        }, {
            onEarn(rewardType, amount) {                
                log(module, "onClickLoadRewardedAd", `onEarn, rewardType = ${rewardType}, amount = ${amount}`);                
                rewardEarnNode.active = true;
                const label = rewardEarnNode.getChildByName("Tip").getComponent(Label);
                label.string = `Congratulations! You have win the reward, type = ${rewardType}, amount = ${amount}!`;
            },
        });
        
    }

    onNextScene() {
        director.loadScene(TestScenes[4]);
    }

    onBtnClickCloseRewardDialogue(){
        let rewardEarnNode: Node = this.node.getChildByName("DialogRewarded");
        rewardEarnNode.active = false;
    }
}