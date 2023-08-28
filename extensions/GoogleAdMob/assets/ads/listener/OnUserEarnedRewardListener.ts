/**
 * @zh
 * 激励广告用户获得奖励的回调
 * @en
 * Listener for rewarded ad.
 */
export interface OnUserEarnedRewardListener {
    onEarn?:(rewardType:string, amount:number)=>void;
}