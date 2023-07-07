package com.cocos.admob.proto;

public class PaidEventNTF extends Base{
    public long valueMicros;
    public String currencyCode;
    public int precision;

    public String adSourceName;
    public String adSourceId;
    public String adSourceInstanceName;
    public String adSourceInstanceId;

    public String mediationGroupName;
    public String mediationABTestName;
    public String mediationABTestVariant;

    public PaidEventNTF(String unitId) {
        super(unitId);
    }
}
