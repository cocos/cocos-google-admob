export interface OnUserEarnedRewardListener {
    onEarn?:(rewardType:string, amount:number)=>void;
}