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

#import "AppOpenAdService.h"
#import "Route.h"

#import "AppOpenAdFullScreenContentCallbackNTF.h"
#import "AppOpenAdLoadCallbackNTF.h"
#import "AppOpenPaidEventNTF.h"
#import "IsAdAvailableACK.h"
#import "IsAdAvailableREQ.h"
#import "LoadAppOpenAdACK.h"
#import "LoadAppOpenAdREQ.h"
#import "ShowAppOpenAdREQ.h"
#import "ShowAppOpenAdCompleteNTF.h"

#import "../AdServiceHub.h"

@interface AppOpenAdService() <GADFullScreenContentDelegate>

@property(strong, nonatomic) GADAppOpenAd* appOpenAd;
@property(strong, nonatomic) NSDate *loadTime;

@property (nonatomic, weak) Bridge *bridge;

@property (nonatomic, assign) BOOL isLoading;
@property (nonatomic, assign) BOOL isShowing;
@property (nonatomic, assign) NSString *unitId;
@end

@implementation AppOpenAdService

- (instancetype)initWithBridge:(Bridge *)bridge {
    self = [super init];
    if (self) {
        self.bridge = bridge;
        __weak typeof(self) wself = self;
        [bridge.route on:[LoadAppOpenAdREQ class].description type:[LoadAppOpenAdREQ class] messageHandler:^(id arg) {
            LoadAppOpenAdREQ *req = (LoadAppOpenAdREQ *)arg;
            [wself loadAd:req.unitId];
            LoadAppOpenAdACK *ack = [[LoadAppOpenAdACK alloc] initWithUnitId:req.unitId];
            [bridge sendToScript:[LoadAppOpenAdACK class].description src:ack];
        }];
        
        [bridge.route on:[ShowAppOpenAdREQ class].description type:[ShowAppOpenAdREQ class] messageHandler:^(id arg) {
            ShowAppOpenAdREQ *ack = (ShowAppOpenAdREQ *)arg;
            [wself showAdIfAvailable];
            [bridge sendToScript:[LoadAppOpenAdACK class].description src:ack];
        }];
        
        [bridge.route on:[IsAdAvailableREQ class].description type:[IsAdAvailableREQ class] messageHandler:^(id arg) {
            IsAdAvailableREQ *req = (IsAdAvailableREQ *)arg;
            BOOL valid = [wself isAdAvailable];
            IsAdAvailableACK *ack = [[IsAdAvailableACK alloc] initWithUnitId:req.unitId valid:valid];
            [bridge sendToScript:[IsAdAvailableACK class].description src:ack];
        }];
    }
    return self;
}

- (void)loadAd: (NSString*)unitId {
    self.unitId = unitId;
    
    if(self.isLoading || [self isAdAvailable]) {
        return;
    }
    self.isLoading = true;
    self.appOpenAd = nil;
    
    GADRequest *request = [GADRequest request];
    request.requestAgent = [[AdServiceHub sharedInstance] extensionVersion];
    [GADAppOpenAd loadWithAdUnitID:unitId
                           request:request
                 completionHandler:^(GADAppOpenAd *_Nullable appOpenAd, NSError *_Nullable error) {
        self.isLoading = false;
        if (error) {
            NSLog(@"Failed to load app open ad: %@", error);
            AppOpenAdLoadCallbackNTF *ntf = [[AppOpenAdLoadCallbackNTF alloc] initWithUnitId: self.unitId];
            ntf.method = @"onAdLoaded";
            ntf.loadAdError = [error localizedDescription];
            if(self.bridge) {
                [self.bridge sendToScript:[AppOpenAdLoadCallbackNTF class].description src:ntf];
            }
            return;
        }
        self.appOpenAd = appOpenAd;
        self.appOpenAd.fullScreenContentDelegate = self;
        self.loadTime = [NSDate date];
        
        AppOpenAdLoadCallbackNTF *ntf = [[AppOpenAdLoadCallbackNTF alloc] initWithUnitId: self.unitId];
        ntf.method = @"onAdLoaded";
        if(self.bridge) {
            [self.bridge sendToScript:[AppOpenAdLoadCallbackNTF class].description src:ntf];
        }
        
        __weak typeof(self) wself = self;
        self.appOpenAd.paidEventHandler = ^void(GADAdValue *_Nonnull adValue){
            AppOpenPaidEventNTF *ntf = [[AppOpenPaidEventNTF alloc] initWithUnitId:wself.unitId];
            
            ntf.valueMicros = [[adValue value] longValue];
            ntf.currencyCode = adValue.currencyCode;
            ntf.precision = (int)adValue.precision;
            
            GADAdNetworkResponseInfo *loadedAdNetworkResponseInfo = wself.appOpenAd.responseInfo.loadedAdNetworkResponseInfo;
            ntf.adSourceName = loadedAdNetworkResponseInfo.adSourceName;
            ntf.adSourceId = loadedAdNetworkResponseInfo.adSourceID;
            ntf.adSourceInstanceName = loadedAdNetworkResponseInfo.adSourceInstanceName;
            ntf.adSourceInstanceId = loadedAdNetworkResponseInfo.adSourceInstanceID;
            
            NSDictionary<NSString *, id> *extras = wself.appOpenAd.responseInfo.extrasDictionary;
            ntf.mediationGroupName = extras[@"mediation_group_name"];
            ntf.mediationABTestName = extras[@"mediation_ab_test_name"];
            ntf.mediationABTestVariant = extras[@"mediation_ab_test_variant"];
            
            [wself.bridge sendToScript:[AppOpenPaidEventNTF class].description src:ntf];
        };
    }];
}

- (BOOL)wasLoadTimeLessThanNHoursAgo:(int)n {
    NSDate *now = [NSDate date];
    NSTimeInterval timeIntervalBetweenNowAndLoadTime = [now timeIntervalSinceDate:self.loadTime];
    double secondsPerHour = 3600.0;
    double intervalInHours = timeIntervalBetweenNowAndLoadTime / secondsPerHour;
    return intervalInHours < n;
}

- (BOOL)isAdAvailable {
    return self.appOpenAd != nil && [self wasLoadTimeLessThanNHoursAgo:4];
}

- (void)showAdIfAvailable {
    if(self.isShowing) {
        NSLog(@"App open ad is not ready yet.");
        return;
    }
    
    // If the app open ad is not available yet but it is supposed to show,
    // it is considered to be complete in this example. Call the adDidComplete method
    // and load a new ad.
    if (![self isAdAvailable]) {
        NSLog(@"App open ad is not ready yet.");
        ShowAppOpenAdCompleteNTF *ntf = [[ShowAppOpenAdCompleteNTF alloc] initWithUnitId:self.unitId];
        [self.bridge sendToScript:[ShowAppOpenAdCompleteNTF class].description src:ntf];
        return;
    }
    
    NSSet<UIScene *> *connectedScenes = UIApplication.sharedApplication.connectedScenes;
    NSMutableArray<UIWindowScene *> *windowScenes = [NSMutableArray array];
    for (UIScene *scene in connectedScenes) {
        if ([scene isKindOfClass:[UIWindowScene class]]) {
            [windowScenes addObject:(UIWindowScene *)scene];
        }
    }
    for (UIWindowScene *scene in windowScenes) {
        if (scene.activationState == UISceneActivationStateForegroundActive) {
            UIWindow *keyWindow = scene.windows.firstObject;
            UIViewController *rootViewController = keyWindow.rootViewController;
            if (!rootViewController) {
                return;
            }
            
            _isShowing = true;
            [_appOpenAd presentFromRootViewController:rootViewController];
            
            break;
        }
    }
    
}

#pragma mark - GADFullScreenContentDelegate

/// Tells the delegate that the ad failed to present full screen content.
- (void)ad:(nonnull id<GADFullScreenPresentingAd>)ad
didFailToPresentFullScreenContentWithError:(nonnull NSError *)error {
    NSLog(@"didFailToPresentFullScreenContentWithError");
    _isShowing = false;
    
    ShowAppOpenAdCompleteNTF *ntf = [[ShowAppOpenAdCompleteNTF alloc] initWithUnitId:self.unitId];
    [self.bridge sendToScript:[ShowAppOpenAdCompleteNTF class].description src:ntf];
    
    AppOpenAdFullScreenContentCallbackNTF *dissNtf = [[AppOpenAdFullScreenContentCallbackNTF alloc] initWithUnitId:self.unitId method:@"onAdFailedToShowFullScreenContent" adError:[error localizedDescription]];
    [self.bridge sendToScript:[AppOpenAdFullScreenContentCallbackNTF class].description src:dissNtf];
}

/// Tells the delegate that the ad will present full screen content.
- (void)adWillPresentFullScreenContent:(nonnull id<GADFullScreenPresentingAd>)ad {
    NSLog(@"adWillPresentFullScreenContent");
    
    AppOpenAdFullScreenContentCallbackNTF *ntf = [[AppOpenAdFullScreenContentCallbackNTF alloc] initWithUnitId:self.unitId method:@"onAdShowedFullScreenContent"];
    [self.bridge sendToScript:[AppOpenAdFullScreenContentCallbackNTF class].description src:ntf];
}

/// Tells the delegate that the ad dismissed full screen content.
- (void)adDidDismissFullScreenContent:(nonnull id<GADFullScreenPresentingAd>)ad {
    NSLog(@"adDidDismissFullScreenContent");
    _isShowing = false;
    _appOpenAd = nil;
    
    ShowAppOpenAdCompleteNTF *ntf = [[ShowAppOpenAdCompleteNTF alloc] initWithUnitId:self.unitId];
    [self.bridge sendToScript:[ShowAppOpenAdCompleteNTF class].description src:ntf];
    
    AppOpenAdFullScreenContentCallbackNTF *dissNtf = [[AppOpenAdFullScreenContentCallbackNTF alloc] initWithUnitId:self.unitId method:@"onAdDismissedFullScreenContent"];
    [self.bridge sendToScript:[AppOpenAdFullScreenContentCallbackNTF class].description src:dissNtf];
}

@end
