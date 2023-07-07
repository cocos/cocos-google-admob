package com.cocos.admob.proto.rewarded;

import com.cocos.admob.proto.Base;

public class OnUserEarnedRewardListenerNTF extends Base {
    String rewardType;
    int rewardAmount;
    public OnUserEarnedRewardListenerNTF(String unitId, String rewardType, int rewardAmount) {
        super(unitId);
        this.unitId = unitId;
        this.rewardAmount = rewardAmount;
        this.rewardType = rewardType;
    }
}
