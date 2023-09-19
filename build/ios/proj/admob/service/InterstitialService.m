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

#import "InterstitialService.h"

#import <GoogleMobileAds/GoogleMobileAds.h>

#import "Route.h"

#import "InterstitialAdLoadCalLBackNTF.h"
#import "InterstitialFullScreenContentCallbackNTF.h"
#import "InterstitialPaidEventNTF.h"
#import "LoadInterstitialAdACK.h"
#import "LoadInterstitialAdREQ.h"
#import "ShowInterstitialAdACK.h"
#import "ShowInterstitialAdREQ.h"

#import "../AdServiceHub.h"

@interface InterstitialService()<GADFullScreenContentDelegate>

@property(nonatomic, strong) GADInterstitialAd *interstitial;
@property(nonatomic, strong) NSString *unitId;

@property (nonatomic, weak) Bridge *bridge;

@end

@implementation InterstitialService

- (instancetype)initWithBridge:(Bridge *)bridge {
    self = [super init];
    if (self) {
        self.bridge = bridge;
        
        __weak typeof(self) wself = self;
        [bridge.route on:[LoadInterstitialAdREQ class].description type:[LoadInterstitialAdREQ class] messageHandler:^(id arg) {
            LoadInterstitialAdREQ *req = (LoadInterstitialAdREQ *) arg;
            [wself loadAd:req.unitId];
            LoadInterstitialAdACK *ack = [[LoadInterstitialAdACK alloc] initWithUnitId:req.unitId];
            [bridge sendToScript:[LoadInterstitialAdACK class].description src:ack];
        }];
        
        [bridge.route on:[ShowInterstitialAdREQ class].description type:[ShowInterstitialAdREQ class] messageHandler:^(id arg) {
            ShowInterstitialAdREQ *req = (ShowInterstitialAdREQ *) arg;
            [wself showAd];
            ShowInterstitialAdACK *ack = [[ShowInterstitialAdACK alloc] initWithUnitId:req.unitId];
            [bridge sendToScript:[ShowInterstitialAdACK class].description src:ack];
        }];
    }
    return self;
}

- (void)loadAd:(NSString *)unitId {
    self.unitId = unitId;
    GADRequest *request = [GADRequest request];
    request.requestAgent = [[AdServiceHub sharedInstance] extensionVersion];
    [GADInterstitialAd loadWithAdUnitID:unitId
                                request:request
                      completionHandler:^(GADInterstitialAd *ad, NSError *error) {
        if (error) {
            NSLog(@"Failed to load interstitial ad with error: %@", [error localizedDescription]);
            self.interstitial = nil;
            
            InterstitialAdLoadCalLBackNTF *ntf = [[InterstitialAdLoadCalLBackNTF alloc] initWithUnitId:unitId method:@"onAdFailedToLoad" loadAdError:[error localizedDescription]];
            [self.bridge sendToScript:[InterstitialAdLoadCalLBackNTF class].description src:ntf];
            return;
        }
        self.interstitial = ad;
        InterstitialAdLoadCalLBackNTF *ntf = [[InterstitialAdLoadCalLBackNTF alloc] initWithUnitId:unitId method:@"onAdLoaded"];
        [self.bridge sendToScript:[InterstitialAdLoadCalLBackNTF class].description src:ntf];
        
        self.interstitial.fullScreenContentDelegate = self;
        
        // paidEventHandler
        __weak typeof(self) wself = self;
        __weak GADInterstitialAd *weakInterstitial = ad;
        self.interstitial.paidEventHandler = ^void(GADAdValue *_Nonnull adValue) {
            InterstitialPaidEventNTF *ntf = [[InterstitialPaidEventNTF alloc] initWithUnitId:weakInterstitial.adUnitID];
            
            ntf.valueMicros = [[adValue value] longValue];
            ntf.currencyCode = adValue.currencyCode;
            ntf.precision = (int)adValue.precision;
            
            GADAdNetworkResponseInfo *loadedAdNetworkResponseInfo = weakInterstitial.responseInfo.loadedAdNetworkResponseInfo;
            ntf.adSourceName = loadedAdNetworkResponseInfo.adSourceName;
            ntf.adSourceId = loadedAdNetworkResponseInfo.adSourceID;
            ntf.adSourceInstanceName = loadedAdNetworkResponseInfo.adSourceInstanceName;
            ntf.adSourceInstanceId = loadedAdNetworkResponseInfo.adSourceInstanceID;
            
            NSDictionary<NSString *, id> *extras = weakInterstitial.responseInfo.extrasDictionary;
            ntf.mediationGroupName = extras[@"mediation_group_name"];
            ntf.mediationABTestName = extras[@"mediation_ab_test_name"];
            ntf.mediationABTestVariant = extras[@"mediation_ab_test_variant"];
            
            [wself.bridge sendToScript:[InterstitialPaidEventNTF class].description src:ntf];
        };
    }];
}

- (void)showAd {
    if(!self.interstitial) {
        NSLog(@"interstitial ad is not loaded");
        return;
    }
    NSSet<UIScene *> *connectedScenes = UIApplication.sharedApplication.connectedScenes;
    NSMutableArray<UIWindowScene *> *windowScenes = [NSMutableArray array];
    for (UIScene *scene in connectedScenes) {
        if ([scene isKindOfClass:[UIWindowScene class]]) {
            [windowScenes addObject:(UIWindowScene *)scene];
        }
    }
    UIViewController *viewController = nil;
    for (UIWindowScene *scene in windowScenes) {
        if (scene.activationState == UISceneActivationStateForegroundActive) {
            UIWindow *keyWindow = scene.windows.firstObject;
            UIViewController *rootViewController = keyWindow.rootViewController;
            if (!rootViewController) {
                return;
            }
            viewController = rootViewController;
            break;
        }
    }
    if(!viewController) {
        NSLog(@"interstitial service viewController search failure!");
        return;
    }
    
    [self.interstitial presentFromRootViewController:viewController];
}

#pragma mark GADFullScreenContentDelegate implementation

/// Tells the delegate that an impression has been recorded for the ad.
- (void)adDidRecordImpression:(nonnull id<GADFullScreenPresentingAd>)ad {
    InterstitialFullScreenContentCallbackNTF *ntf = [[InterstitialFullScreenContentCallbackNTF alloc]
                                                     initWithUnitId:self.unitId
                                                     method:@"onAdImpression"];
    [self.bridge sendToScript:[InterstitialFullScreenContentCallbackNTF class].description src:ntf];
}

/// Tells the delegate that a click has been recorded for the ad.
- (void)adDidRecordClick:(nonnull id<GADFullScreenPresentingAd>)ad {
    InterstitialFullScreenContentCallbackNTF *ntf = [[InterstitialFullScreenContentCallbackNTF alloc]
                                                     initWithUnitId:self.unitId
                                                     method:@"onAdClicked"];
    [self.bridge sendToScript:[InterstitialFullScreenContentCallbackNTF class].description src:ntf];
}

/// Tells the delegate that the ad failed to present full screen content.
- (void)ad:(nonnull id<GADFullScreenPresentingAd>)ad didFailToPresentFullScreenContentWithError:(nonnull NSError *)error {
    self.interstitial = nil;
    InterstitialFullScreenContentCallbackNTF *ntf = [[InterstitialFullScreenContentCallbackNTF alloc]
                                                     initWithUnitId:self.unitId
                                                     method:@"onAdFailedToShowFullScreenContent"
                                                     adError:[error localizedDescription]];
    [self.bridge sendToScript:[InterstitialFullScreenContentCallbackNTF class].description src:ntf];
}

/// Tells the delegate that the ad will present full screen content.
- (void)adWillPresentFullScreenContent:(nonnull id<GADFullScreenPresentingAd>)ad {
    InterstitialFullScreenContentCallbackNTF *ntf = [[InterstitialFullScreenContentCallbackNTF alloc]
                                                     initWithUnitId:self.unitId
                                                     method:@"onAdShowedFullScreenContent"];
    [self.bridge sendToScript:[InterstitialFullScreenContentCallbackNTF class].description src:ntf];
}

/// Tells the delegate that the ad will dismiss full screen content.
- (void)adWillDismissFullScreenContent:(nonnull id<GADFullScreenPresentingAd>)ad {
    
}

/// Tells the delegate that the ad dismissed full screen content.
- (void)adDidDismissFullScreenContent:(nonnull id<GADFullScreenPresentingAd>)ad {
    self.interstitial = nil;
    InterstitialAdLoadCalLBackNTF *ntf = [[InterstitialAdLoadCalLBackNTF alloc]
                                          initWithUnitId:self.unitId
                                          method:@"onAdDismissedFullScreenContent"];
    [self.bridge sendToScript:[InterstitialFullScreenContentCallbackNTF class].description src:ntf];
}

@end


