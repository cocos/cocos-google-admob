/****************************************************************************
 Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You
shall not use Cocos Creator software for developing other software or tools
that's used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to
you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
****************************************************************************/
#import <GoogleMobileAds/GoogleMobileAds.h>

#import "AdServiceHub.h"

#import "core/Bridge.h"
#import "core/Codec.h"
#import "core/Route.h"
#import "VersionREQ.h"

#import "service/AppOpenAdService.h"
#import "service/BannerService.h"
#import "service/InterstitialService.h"
#import "service/RewardedAdService.h"
#import "service/RewardedInterstitialAdService.h"
#import "service/NativeService.h"

@interface AdServiceHub()

@property (nonatomic, strong) Bridge *bridge;
@property (nonatomic, strong) Codec *codec;

@property (nonatomic, strong) AppOpenAdService *appOpenAdService;
@property (nonatomic, strong) BannerService *bannerService;
@property (nonatomic, strong) InterstitialService *interstitialService;
@property (nonatomic, strong) RewardedAdService *rewardedAdService;
@property (nonatomic, strong) RewardedInterstitialAdService *rewardedInterstitialAdService;
@property (nonatomic, strong) NativeService *nativeService;

@end

@implementation AdServiceHub

static AdServiceHub *sharedInstance = nil;

+ (instancetype)sharedInstance {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[super allocWithZone:NULL] init];
    });
    return sharedInstance;
}

+ (id)allocWithZone:(struct _NSZone *)zone {
    return [AdServiceHub sharedInstance];
}

+ (id)copyWithZone:(struct _NSZone *)zone {
    return [AdServiceHub sharedInstance];
}

- (void)initAdService {
    // Initialize Google Mobile Ads SDK.
    [GADMobileAds.sharedInstance startWithCompletionHandler:nil];
    self.codec = [[Codec alloc] init];
    self.bridge = [[Bridge alloc] initWithCodec:self.codec];
    __weak typeof(self) wself = self;
    [self.bridge.route on:[VersionREQ class].description type:[VersionREQ class] messageHandler:^(id arg) {
        VersionREQ *req = (VersionREQ *)arg;
        wself.extensionVersion = req.engineVersion;
    }];
    
    self.appOpenAdService = [[AppOpenAdService alloc] initWithBridge:self.bridge];
    self.bannerService = [[BannerService alloc] initWithBridge:self.bridge];
    self.interstitialService = [[InterstitialService alloc] initWithBridge:self.bridge];
    self.rewardedAdService = [[RewardedAdService alloc] initWithBridge:self.bridge];
    self.rewardedInterstitialAdService = [[RewardedInterstitialAdService alloc] initWithBridge:self.bridge];
    self.nativeService = [[NativeService alloc] initWithBridge:self.bridge];
}

@end
